import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Tired Dark Lord: a 100-word villain monologue.
// The tiredness lives in the voice, the rhythm and the small deflections:
// a door that locks itself, heroes given blankets, a grudge that retired,
// a death rehearsed while waiting for the kettle. Never announced outright.
const MONOLOGUE = [
  "Come in. The door locks itself \u2014 one of the few spells that still works.",
  "",
  "You want the crown, the throne, the map room. Take a number. Three heroes are queuing in the courtyard; I gave them blankets. It rains through the roof, and the steward holds the umbrella over the treasury.",
  "",
  "I built this empire on four hours of sleep and a grudge against my brother. The grudge has retired. The sleep has not returned.",
  "",
  "Kneel, or don't. The floor is cold either way. I have rehearsed your death three times today \u2014 twice while waiting for the kettle.",
].join("\n");

const outDir = process.env.OUTPUT_DIR ?? "/output";
const words = MONOLOGUE.split(/\s+/).filter(Boolean);
const chars = [...MONOLOGUE].length;
if (words.length < 95 || words.length > 105) {
  throw new Error(`word count ${words.length} outside 95-105`);
}
if (chars < 1 || chars > 600) {
  throw new Error(`char count ${chars} outside 1-600`);
}
if (/\b(tired|weary|exhausted|fatigued)\b/i.test(MONOLOGUE)) {
  throw new Error("tiredness must be felt, never announced");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), MONOLOGUE + "\n", "utf8");
console.log(`wrote entry.txt: ${words.length} words, ${chars} chars`);
