// ── Shared skeleton row (adapts cols via prop) ────────────────
export const SkeletonRow = ({ cols = 4 }) => (
  <tr className="skeleton-row">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i}>
        {i === 1 ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="skeleton skeleton-avatar" />
            <div className="skeleton skeleton-cell skeleton-md" />
          </div>
        ) : i === cols - 1 ? (
          <div style={{ display: "flex", gap: 8 }}>
            <div className="skeleton skeleton-btn" />
            <div className="skeleton skeleton-btn" />
          </div>
        ) : (
          <div
            className={`skeleton skeleton-cell ${i === 0 ? "skeleton-sm" : "skeleton-lg"}`}
          />
        )}
      </td>
    ))}
  </tr>
);

// ── Search bar ────────────────────────────────────────────────
export const TableSearch = ({ value, onChange, placeholder = "Search…" }) => (
  <div className="table-search-wrapper">
    <i className="bi bi-search table-search-icon" />
    <input
      type="text"
      className="table-search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {value && (
      <button className="table-search-clear" onClick={() => onChange("")}>
        <i className="bi bi-x" />
      </button>
    )}
  </div>
);

// ── Stat chip above table ─────────────────────────────────────
export const TableStatChip = ({ icon, label, value, color }) => (
  <div className={`tbl-chip tbl-chip--${color}`}>
    <i className={`bi ${icon}`} />
    <span className="tbl-chip__value">{value ?? "—"}</span>
    <span className="tbl-chip__label">{label}</span>
  </div>
);

// ── Footer count ──────────────────────────────────────────────
export const TableFooter = ({ shown, total, noun = "records" }) =>
  total != null ? (
    <p className="table-footer">
      Showing <b>{shown}</b> of <b>{total}</b> {noun}
    </p>
  ) : null;

// ── Empty state ───────────────────────────────────────────────
export const EmptyRow = ({ cols, message = "Nothing found." }) => (
  <tr>
    <td colSpan={cols} className="table-empty">
      <i className="bi bi-inbox" />
      <span>{message}</span>
    </td>
  </tr>
);
