import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

const redirect = await read("public/observatory/index.html");
assert.match(redirect, /http-equiv="refresh" content="0; url=\.\.\/#observatory"/);
assert.match(redirect, /rel="canonical" href="https:\/\/itsmyfacade\.github\.io\/#observatory"/);
assert.match(redirect, /href="\.\.\/#observatory"/);
assert.doesNotMatch(redirect, /app\.js|styles\.css|data\.json/);

const page = await read("app/page.tsx");
assert.doesNotMatch(page, /Open interactive browser companion|href="\/observatory\//);
assert.match(page, /observatory-report-1\.png/);
assert.match(page, /AEGIS-Intelligence-Observatory\.pbix/);

for (let index = 1; index <= 5; index += 1) {
  const path = `public/project-media/observatory-report-${index}.png`;
  await access(new URL(path, root));
  const file = await stat(new URL(path, root));
  assert.ok(file.size > 0, `${path} must be non-empty`);
}

console.log("Observatory redirect and gallery validation passed.");
