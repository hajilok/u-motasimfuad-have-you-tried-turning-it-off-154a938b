import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Championship single-line reply selected via multi-round blind pairwise evaluation.
const ENTRY_LINE =
  'Oh, the stranger on your baby monitor is coming through clearly? Awesome\u2014that rules out a speaker issue!';

function validateLine(line: string): string {
  if (line.includes('\n') || line.includes('\r')) {
    throw new Error('Entry must be a single line without line breaks.');
  }
  const charCount = [...line].length;
  if (charCount < 1 || charCount >= 200 || line.trim().length === 0) {
    throw new Error(`Invalid entry length: ${charCount} characters.`);
  }
  return line;
}

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
  const entry = validateLine(ENTRY_LINE);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, 'entry.txt'), entry, { encoding: 'utf8' });
}

main();
