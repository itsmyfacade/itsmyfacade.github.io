import styles from "./SignalFlow.module.css";

const stages = [
  { index: "01", label: "RETRIEVE", detail: "Find relevant evidence" },
  { index: "02", label: "ANALYZE", detail: "Inspect operational context" },
  { index: "03", label: "SYNTHESIZE", detail: "Build a bounded finding" },
  { index: "04", label: "VALIDATE", detail: "Trace claims to sources" },
];

export function SignalFlow() {
  return <section className={`${styles.flow} signal-flow`} aria-labelledby="signal-flow-title">
    <div className={styles.header}>
      <div><p className="eyebrow">AEGIS / INSIDE THE INVESTIGATION</p><h3 id="signal-flow-title">Follow the evidence.<br /><em>See what gets validated.</em></h3></div>
      <p>One bounded path from technical question to evidence-backed output. The diagram describes the implemented workflow; it is not a live trace of this page.</p>
    </div>
    <ul className={styles.track} aria-label="AEGIS investigation workflow">
      <div className={styles.beam} aria-hidden="true" />
      {stages.map(stage => <li key={stage.index} className={styles.stage}><span>{stage.index}</span><strong>{stage.label}</strong><small>{stage.detail}</small><i aria-hidden="true" /></li>)}
    </ul>
    <div className={styles.footer}><span>FastAPI</span><span>LangGraph</span><span>Retrieval</span><span>SQLite</span><span>Citation validation</span></div>
  </section>;
}
