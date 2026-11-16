"use client";

import { useEffect, useRef } from "react";
import styles from "./IntelligenceField.module.css";

const nodes = [
  { id: "AEGIS", label: "Evidence-grounded investigations", href: "#aegis", className: "node-aegis" },
  { id: "OBSERVATORY", label: "Validated operational analytics", href: "#observatory", className: "node-observatory" },
  { id: "SENTIMENT LAB", label: "Real transformer inference", href: "#sentiment-lab", className: "node-sentiment" },
  { id: "SEMANTIC DISCOVERY", label: "Embedding-based retrieval", href: "#semantic-discovery", className: "node-semantic" },
];

export function IntelligenceField() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const field = ref.current;
    if (!field || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (event: PointerEvent) => {
      const bounds = field.getBoundingClientRect();
      field.style.setProperty("--pointer-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
      field.style.setProperty("--pointer-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
    };
    field.addEventListener("pointermove", onMove);
    return () => field.removeEventListener("pointermove", onMove);
  }, []);

  return <section ref={ref} className={`${styles["intelligence-field"]} intelligence-field`} aria-labelledby="field-title">
    <div className={styles["field-grid"]} aria-hidden="true" />
    <div className={styles["field-intro"]}><p className="eyebrow">MISSION CONTROL / SELECT A SYSTEM</p><h2 id="field-title">A portfolio built as<br /><em>an inspectable network.</em></h2><p>Each node is an independent public project. Follow the evidence trail into the implementation, constraints, and validation behind it.</p></div>
    <div className={styles["field-map"]}>
      <svg className={styles["field-connections"]} viewBox="0 0 1000 560" aria-hidden="true" preserveAspectRatio="none"><path d="M260 190 C390 120 590 120 740 190" /><path d="M260 190 C360 330 620 330 740 190" /><path d="M260 190 C320 430 680 430 740 190" /><path d="M260 430 C420 300 580 300 740 430" /></svg>
      {nodes.map((node, index) => <a key={node.id} className={`${styles["field-node"]} ${styles[node.className]}`} href={node.href}><span className={styles["node-index"]}>0{index + 1}</span><strong>{node.id}</strong><span>{node.label}</span><i aria-hidden="true" /></a>)}
    </div>
    <p className={styles["field-footnote"]}>Independent systems · synthetic data labeled · claims tied to evidence</p>
  </section>;
}
