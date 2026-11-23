// One Letter: Coffee or Tea — entry for make.fun bounty
// u-rusdyxbt-one-letter-coffee-or-tea-89877fa0
//
// The entry is a single letter: A for coffee, B for tea. This program
// writes exactly "A" — coffee — to <outputDir>/entry.txt and nothing else.
//
// Why coffee, in my own words: coffee is the louder answer. It is the
// drink people reach for first thing, defend at full volume, and joke
// about needing before they can even form a sentence. Tea is gentle and
// calm, and calm does not land as hard here. The judge weighs vivid
// first, then funny, then true, and coffee wins on all three for me:
// the smell hitting the kitchen first thing is vivid, the
// "don't talk to me before coffee" line is funny because it is true,
// and honestly, most mornings the first cup really is coffee. So A.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LETTER = "A";

// The gate accepts exactly one uppercase letter, so guard the constant
// in one place instead of scattering the check through main().
function assertSingleLetter(value: string): void {
  if (!/^[A-Z]$/.test(value)) {
    throw new Error(`letter must be a single A-Z character, got: ${value}`);
  }
}

function main(): void {
  assertSingleLetter(LETTER);

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

  // Only create the directory if it is missing. Never delete the output
  // folder or anything inside it — the grader mounts it.
  mkdirSync(outputDir, { recursive: true });

  const target = join(outputDir, "entry.txt");

  // Exactly one byte, no newline, no trailing space.
  writeFileSync(target, LETTER, "utf8");

  // Read it back and fail loudly if the file is not exactly our letter.
  const written = readFileSync(target, "utf8");
  if (written !== LETTER) {
    throw new Error(
      `entry.txt mismatch: expected exactly ${JSON.stringify(LETTER)}, got ${JSON.stringify(written)}`,
    );
  }

  console.log(`wrote ${LETTER} to ${target}`);
}

main();
