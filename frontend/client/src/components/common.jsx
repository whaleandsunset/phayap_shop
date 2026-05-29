export function DataPanel({ title, children, wide = false }) {
  return (
    <section className={`data-panel ${wide ? "panel-wide" : ""}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function TextInput({ label, value, onChange, type = "text", required = false }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </label>
  );
}

export function TextArea({ label, value, onChange, required = false }) {
  return (
    <label className="field field-full">
      <span>{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        rows="3"
      />
    </label>
  );
}

export function StatusPill({ children, tone = "neutral" }) {
  return <span className={`status-pill status-${tone}`}>{children}</span>;
}
