import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile(new URL("../public/observatory/data.json", import.meta.url), "utf8"));
const app = await readFile(new URL("../public/observatory/app.js", import.meta.url), "utf8");
const html = await readFile(new URL("../public/observatory/index.html", import.meta.url), "utf8");
const rows = data.investigation_explorer;
const required = ["investigation_id", "scenario_id", "domain", "status", "provider", "retrieval_mode", "duration_ms", "evidence_count", "citation_count"];

if (!Array.isArray(rows) || rows.length !== 20) throw new Error(`Expected 20 investigation rows, found ${rows?.length ?? "invalid"}`);
if (new Set(rows.map((row) => row.investigation_id)).size !== rows.length) throw new Error("Investigation IDs are not unique");
for (const row of rows) for (const field of required) if (!(field in row)) throw new Error(`Missing ${field} in ${row.investigation_id}`);
for (const id of ["kpi-grid", "status-chart", "retrieval-chart", "domain-chart", "explorer-body", "detail-drawer"]) if (!html.includes(`id="${id}"`)) throw new Error(`Missing dashboard mount ${id}`);
if (app.includes("innerHTML")) throw new Error("Unsafe innerHTML usage detected in Observatory app");
for (const field of ["status", "retrieval_mode", "domain"]) if (!rows.every((row) => typeof row[field] === "string" && row[field])) throw new Error(`Invalid ${field} value`);
console.log(`Observatory validation passed: ${rows.length} unique records, required fields present, safe text rendering, dashboard mounts present.`);
