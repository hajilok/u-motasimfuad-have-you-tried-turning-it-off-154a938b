import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Round-2 rank-defense champion selected via dual-panel blind pairwise evaluation.
const ENTRY_LINE =
  "I'd love to escalate this\u2014just let it wipe one more drive while I screen-record so it counts as a pattern!";

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
