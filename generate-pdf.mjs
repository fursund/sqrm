#!/usr/bin/env node

/**
 * generate-pdf.mjs -- Convert HTML to PDF using Playwright
 *
 * Usage: node generate-pdf.mjs <input.html> <output.pdf> [letter|a4]
 *
 * ATS-friendly: normalizes Unicode characters that legacy parsers struggle with.
 */

import { readFileSync, writeFileSync, statSync } from "fs";
import { resolve, dirname } from "path";
import { pathToFileURL } from "url";

const [inputPath, outputPath, format = "a4"] = process.argv.slice(2);

if (!inputPath || !outputPath) {
  console.error("Usage: node generate-pdf.mjs <input.html> <output.pdf> [letter|a4]");
  process.exit(1);
}

const absInput = resolve(inputPath);
const absOutput = resolve(outputPath);

console.log(`Input:  ${absInput}`);
console.log(`Output: ${absOutput}`);
console.log(`Format: ${format}`);

// ATS text normalization: replace problematic Unicode
const ATS_REPLACEMENTS = [
  [/\u2013/g, "-"],       // en-dash
  [/\u2014/g, "--"],      // em-dash
  [/\u2018/g, "'"],       // left single quote
  [/\u2019/g, "'"],       // right single quote
  [/\u201C/g, '"'],       // left double quote
  [/\u201D/g, '"'],       // right double quote
  [/\u2026/g, "..."],     // ellipsis
  [/\u00A0/g, " "],       // non-breaking space
  [/\u200B/g, ""],        // zero-width space
  [/\u200C/g, ""],        // zero-width non-joiner
  [/\u200D/g, ""],        // zero-width joiner
  [/\uFEFF/g, ""],        // BOM
];

function normalizeForATS(html) {
  // Mask <style> and <script> blocks to preserve them
  const masks = [];
  let masked = html.replace(/<(style|script)[^>]*>[\s\S]*?<\/\1>/gi, (match) => {
    masks.push(match);
    return `<!--MASK_${masks.length - 1}-->`;
  });

  let replacements = 0;
  for (const [pattern, replacement] of ATS_REPLACEMENTS) {
    const before = masked;
    masked = masked.replace(pattern, replacement);
    if (masked !== before) replacements++;
  }

  // Restore masked blocks
  masked = masked.replace(/<!--MASK_(\d+)-->/g, (_, i) => masks[parseInt(i)]);

  if (replacements > 0) {
    console.log(`ATS normalization: ${replacements} character type(s) replaced`);
  }

  return masked;
}

function resolveLocalFonts(html, htmlDir) {
  // Convert relative font paths to absolute file:// URLs
  return html.replace(
    /url\(['"]?(\.\.\/(fonts\/[^'")\s]+))['"]?\)/g,
    (match, relPath) => {
      const absPath = resolve(htmlDir, "..", relPath.replace("../", ""));
      return `url('${pathToFileURL(absPath).href}')`;
    }
  );
}

async function generatePDF() {
  let html = readFileSync(absInput, "utf-8");
  html = normalizeForATS(html);
  html = resolveLocalFonts(html, dirname(absInput));

  // Write processed HTML back (temp)
  const processedPath = absInput.replace(".html", ".processed.html");
  writeFileSync(processedPath, html);

  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(pathToFileURL(processedPath).href, { waitUntil: "networkidle" });
  await page.waitForFunction(() => document.fonts.ready);

  const margins = { top: "0.6in", bottom: "0.6in", left: "0.6in", right: "0.6in" };

  await page.pdf({
    path: absOutput,
    format: format === "letter" ? "Letter" : "A4",
    margin: margins,
    printBackground: true,
  });

  await browser.close();

  // Clean up processed file
  const { unlinkSync } = await import("fs");
  try { unlinkSync(processedPath); } catch {}

  const stats = statSync(absOutput);
  const pages = format === "a4" ? "~1-2" : "~1-2";
  console.log(`PDF generated: ${absOutput}`);
  console.log(`File size: ${(stats.size / 1024).toFixed(1)} KB`);
  console.log(`Done.`);
}

generatePDF().catch((err) => {
  console.error("PDF generation failed:", err.message);
  process.exit(1);
});
