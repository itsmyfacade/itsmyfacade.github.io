(() => {
  "use strict";

  const state = {
    data: null,
    view: "overview",
    search: "",
    status: "all",
    retrieval: "all",
    domain: "all",
    sort: "investigation_id",
  };

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const text = (value) => String(value ?? "");
  const number = (value, digits = 0) => Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: digits });
  const title = (value) => text(value).replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  const clear = (node) => { if (node) node.replaceChildren(); };
  const make = (tag, className, value) => { const node = document.createElement(tag); if (className) node.className = className; if (value !== undefined) node.textContent = value; return node; };

  function filteredRows() {
    const rows = state.data?.investigation_explorer || [];
    const query = state.search.trim().toLowerCase();
    return rows.filter((row) => {
      const searchable = [row.investigation_id, row.scenario_id, row.domain].join(" ").toLowerCase();
      return (!query || searchable.includes(query)) && (state.status === "all" || row.status === state.status) && (state.retrieval === "all" || row.retrieval_mode === state.retrieval) && (state.domain === "all" || row.domain === state.domain);
    });
  }

  function aggregate(rows, key) {
    return rows.reduce((result, row) => { const value = text(row[key]); result[value] = (result[value] || 0) + 1; return result; }, {});
  }

  function average(rows, key) {
    return rows.length ? rows.reduce((total, row) => total + Number(row[key] || 0), 0) / rows.length : 0;
  }

  function sortedEntries(values, numeric = true) {
    return Object.entries(values).sort((a, b) => numeric ? b[1] - a[1] : a[0].localeCompare(b[0]));
  }

  function optionValues(id, values, label = title) {
    const select = $(id);
    if (!select) return;
    [...select.options].slice(1).forEach((option) => option.remove());
    values.sort((a, b) => a.localeCompare(b)).forEach((value) => select.add(new Option(label(value), value)));
  }

  function chart(node, entries, config = {}) {
    clear(node);
    if (!node) return;
    if (!entries.length) { node.append(make("p", "empty-copy", "No records match the active filters.")); return; }
    const max = Math.max(...entries.map((entry) => Number(entry.value)), 1);
    entries.forEach((entry) => {
      const row = make("div", "chart-row");
      const interactive = Boolean(config.clickable);
      const button = make(interactive ? "button" : "div", `chart-bar ${interactive ? "is-clickable" : ""}`);
      if (interactive) {
        button.type = "button";
        button.setAttribute("aria-label", `${entry.label}: ${number(entry.value, config.digits || 0)}`);
      }
      const label = make("span", "chart-label", entry.label);
      const track = make("span", "chart-track");
      const fill = make("span", `chart-fill ${config.tone || "tone-cyan"}`);
      fill.style.width = `${Math.max(5, (Number(entry.value) / max) * 100)}%`;
      const value = make("strong", "chart-value", `${number(entry.value, config.digits || 0)}${config.suffix || ""}`);
      track.append(fill); button.append(label, track, value); row.append(button); node.append(row);
      if (config.clickable) button.addEventListener("click", () => config.clickable(entry.key));
    });
  }

  function metricCard(label, value, detail, tone) {
    const card = make("article", `kpi-card ${tone || ""}`);
    card.append(make("span", "eyebrow", label), make("strong", "kpi-value", value), make("small", "kpi-detail", detail));
    return card;
  }

  function renderKpis(rows) {
    const grid = $("#kpi-grid"); clear(grid);
    const statuses = aggregate(rows, "status");
    const avgDuration = average(rows, "duration_ms");
    grid.append(metricCard("VISIBLE INVESTIGATIONS", number(rows.length), `of ${number(state.data.investigation_explorer.length)} source records`, "tone-cyan"));
    grid.append(metricCard("COMPLETED", number(statuses.completed || 0), "successful workflow outcomes", "tone-emerald"));
    grid.append(metricCard("ESCALATED", number(statuses.escalated || 0), "requiring additional attention", "tone-blue"));
    grid.append(metricCard("AVG DURATION", `${number(avgDuration, 1)} ms`, "filtered investigation average", "tone-teal"));
    $("#overview-count").textContent = `${number(rows.length)} filtered records`;
  }

  function renderOverview(rows) {
    renderKpis(rows);
    chart($("#status-chart"), sortedEntries(aggregate(rows, "status")).map(([key, value]) => ({ key, label: title(key), value })), { clickable: (key) => { state.status = key; $("#status-filter").value = key; render(); }, tone: "tone-emerald" });
    chart($("#retrieval-chart"), sortedEntries(aggregate(rows, "retrieval_mode")).map(([key, value]) => ({ key, label: title(key), value })), { clickable: (key) => { state.retrieval = key; $("#retrieval-filter").value = key; render(); }, tone: "tone-cyan" });
    chart($("#domain-chart"), sortedEntries(aggregate(rows, "domain")).map(([key, value]) => ({ key, label: title(key), value })), { clickable: (key) => { state.domain = key; $("#domain-filter").value = key; render(); }, tone: "tone-teal" });
    const visible = rows.length === state.data.investigation_explorer.length ? "All 20 source investigations are visible." : `${rows.length} records remain after filtering.`;
    $("#overview-insight").textContent = visible;
    $("#overview-insight-copy").textContent = rows.length ? "Use the bars as cross-filters, then open Investigation Explorer to inspect the exact fields behind each aggregate." : "Reset filters to restore the full synthetic investigation set.";
  }

  function modeAggregates(rows) {
    return Object.entries(aggregate(rows, "retrieval_mode")).map(([mode, count]) => ({ mode, count, duration: average(rows.filter((row) => row.retrieval_mode === mode), "duration_ms"), evidence: average(rows.filter((row) => row.retrieval_mode === mode), "evidence_count") }));
  }

  function renderRetrieval(rows) {
    const modes = modeAggregates(rows);
    chart($("#retrieval-duration-chart"), modes.map((item) => ({ key: item.mode, label: title(item.mode), value: item.duration })), { clickable: (key) => { state.retrieval = key; $("#retrieval-filter").value = key; render(); }, suffix: " ms", digits: 1, tone: "tone-cyan" });
    chart($("#retrieval-evidence-chart"), modes.map((item) => ({ key: item.mode, label: title(item.mode), value: item.evidence })), { clickable: (key) => { state.retrieval = key; $("#retrieval-filter").value = key; render(); }, digits: 1, tone: "tone-emerald" });
    const target = $("#retrieval-summary"); clear(target);
    (state.data.retrieval_summary || []).forEach((row) => { const item = make("div", "summary-item"); item.append(make("span", "eyebrow", title(row.retrieval_mode)), make("strong", "summary-value", `${number(row.relevance_rate * 100, 1)}%`), make("small", "summary-detail", `${number(row.investigations)} investigations · ${number(row.retrieved_documents)} retrieved documents · avg score ${number(row.avg_score, 3)}`)); target.append(item); });
  }

  function renderEvidence(rows) {
    const evidence = aggregate(rows, "evidence_count");
    const citations = aggregate(rows, "citation_count");
    chart($("#evidence-chart"), sortedEntries(evidence).map(([key, value]) => ({ key, label: `${key} records`, value })), { tone: "tone-cyan" });
    chart($("#citation-chart"), sortedEntries(citations).map(([key, value]) => ({ key, label: `${key} citations`, value })), { tone: "tone-emerald" });
    const byStatus = Object.entries(aggregate(rows, "status")).map(([status, count]) => ({ key: status, label: title(status), value: average(rows.filter((row) => row.status === status), "evidence_count") }));
    chart($("#evidence-status-chart"), byStatus, { clickable: (key) => { state.status = key; $("#status-filter").value = key; render(); }, suffix: " avg", digits: 1, tone: "tone-teal" });
  }

  function renderPerformance(rows) {
    const durations = rows.map((row) => Number(row.duration_ms || 0)).sort((a, b) => a - b);
    const midpoint = Math.floor(durations.length / 2);
    const median = durations.length ? (durations.length % 2 ? durations[midpoint] : (durations[midpoint - 1] + durations[midpoint]) / 2) : 0;
    chart($("#latency-chart"), [{ key: "minimum", label: "Minimum", value: durations[0] || 0 }, { key: "median", label: "Median", value: median }, { key: "maximum", label: "Maximum", value: durations.at(-1) || 0 }], { suffix: " ms", digits: 1, tone: "tone-blue" });
    chart($("#provider-chart"), sortedEntries(aggregate(rows, "provider")).map(([key, value]) => ({ key, label: title(key), value })), { tone: "tone-emerald" });
    const target = $("#reliability-summary"); clear(target);
    (state.data.reliability_summary || []).forEach((row) => { const item = make("div", "summary-item"); item.append(make("span", "eyebrow", title(row.status)), make("strong", "summary-value", `${number(row.citation_ratio * 100, 1)}%`), make("small", "summary-detail", `citation ratio · ${number(row.investigations)} investigations · average duration ${number(row.avg_duration_ms, 1)} ms`)); target.append(item); });
  }

  function renderExplorer(rows) {
    const body = $("#explorer-body"); clear(body);
    const ordered = [...rows].sort((a, b) => { const av = a[state.sort]; const bv = b[state.sort]; return typeof av === "number" ? av - bv : text(av).localeCompare(text(bv)); });
    $("#table-summary").textContent = `${number(ordered.length)} matching records`;
    $("#explorer-count").textContent = ordered.length ? "Select a record to inspect the fields available in the source dataset." : "No records match the active filters.";
    ordered.forEach((row) => {
      const tr = make("tr"); tr.tabIndex = 0; tr.setAttribute("role", "button"); tr.setAttribute("aria-label", `Open ${row.investigation_id}`);
      [row.investigation_id, row.scenario_id, row.domain, row.status, row.provider, row.retrieval_mode, `${number(row.duration_ms)} ms`, number(row.evidence_count), number(row.citation_count)].forEach((value, index) => { const td = make("td", index === 3 ? `status status-${row.status}` : "", value); tr.append(td); });
      const open = () => openDrawer(row); tr.addEventListener("click", open); tr.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } }); body.append(tr);
    });
  }

  function openDrawer(row) {
    const drawer = $("#detail-drawer"); const content = $("#detail-content"); clear(content); $("#detail-title").textContent = row.investigation_id;
    const fields = [["Scenario ID", row.scenario_id], ["Domain", row.domain], ["Status", row.status], ["Provider", row.provider], ["Retrieval mode", row.retrieval_mode], ["Duration", `${number(row.duration_ms)} ms`], ["Evidence records", row.evidence_count], ["Citations", row.citation_count]];
    const list = make("dl", "detail-list"); fields.forEach(([label, value]) => { list.append(make("dt", "eyebrow", label), make("dd", "", title(value))); }); content.append(list, make("p", "drawer-note", "This record exposes only fields present in the synthetic Observatory dataset. No narrative, root cause, or hidden evidence has been inferred."));
    drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); $(".drawer-close").focus();
  }

  function closeDrawer() { const drawer = $("#detail-drawer"); drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); }

  function render() {
    const rows = filteredRows();
    renderOverview(rows); renderRetrieval(rows); renderEvidence(rows); renderPerformance(rows); renderExplorer(rows);
  }

  function setView(view) {
    state.view = view;
    $$(".view-tab").forEach((tab) => { const active = tab.dataset.view === view; tab.classList.toggle("is-active", active); tab.setAttribute("aria-selected", String(active)); });
    $$(".dashboard-view").forEach((panel) => panel.classList.toggle("is-hidden", panel.dataset.panel !== view));
  }

  function wire() {
    $$(".view-tab").forEach((tab, index, tabs) => tab.addEventListener("click", () => setView(tab.dataset.view)) || tab.addEventListener("keydown", (event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); tabs[(index + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length].focus(); } }));
    $("#search").addEventListener("input", (event) => { state.search = event.target.value; render(); });
    $("#status-filter").addEventListener("change", (event) => { state.status = event.target.value; render(); });
    $("#retrieval-filter").addEventListener("change", (event) => { state.retrieval = event.target.value; render(); });
    $("#domain-filter").addEventListener("change", (event) => { state.domain = event.target.value; render(); });
    $("#sort-field").addEventListener("change", (event) => { state.sort = event.target.value; render(); });
    $("#reset-filters").addEventListener("click", () => { state.search = ""; state.status = "all"; state.retrieval = "all"; state.domain = "all"; $("#search").value = ""; $("#status-filter").value = "all"; $("#retrieval-filter").value = "all"; $("#domain-filter").value = "all"; render(); });
    $$('[data-close-drawer]').forEach((node) => node.addEventListener("click", closeDrawer));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeDrawer(); });
  }

  async function init() {
    try {
      const response = await fetch("data.json", { cache: "no-store" });
      if (!response.ok) throw new Error(`data.json returned HTTP ${response.status}`);
      state.data = await response.json();
      const rows = state.data.investigation_explorer;
      if (!Array.isArray(rows) || !rows.length) throw new Error("investigation_explorer is empty or invalid");
      optionValues("#status-filter", [...new Set(rows.map((row) => row.status))]); optionValues("#retrieval-filter", [...new Set(rows.map((row) => row.retrieval_mode))]); optionValues("#domain-filter", [...new Set(rows.map((row) => row.domain))]);
      wire(); $("#loading-state").classList.add("is-hidden"); $("#app-content").classList.remove("is-hidden"); setView("overview"); render();
    } catch (error) { $("#loading-state").classList.add("is-hidden"); $("#error-state").classList.remove("is-hidden"); $("#error-message").textContent = error instanceof Error ? error.message : "Unknown data error"; }
  }

  init();
})();
