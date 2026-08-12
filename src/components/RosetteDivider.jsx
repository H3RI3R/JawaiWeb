export function RosetteDivider({ label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="rosette-motif" aria-hidden="true" />
      <span className="font-mono text-xs uppercase tracking-widest2 text-gold">{label}</span>
    </div>
  );
}
