export function OrbitalBackdrop() {
  return (
    <div className="orbital-backdrop" aria-hidden="true">
      <div className="orbital-aura" />
      <div className="orbital-grid" />
      <div className="orbital-system">
        <div className="orbital-ring orbital-ring-one"><span /></div>
        <div className="orbital-ring orbital-ring-two"><span /></div>
        <div className="orbital-ring orbital-ring-three"><span /></div>
        <div className="orbital-crosshair orbital-crosshair-one" />
        <div className="orbital-crosshair orbital-crosshair-two" />
      </div>
      <span className="orbital-coordinate orbital-coordinate-left">24.8607° N<br />SYSTEMS / SIGNAL / INTELLIGENCE</span>
      <span className="orbital-coordinate orbital-coordinate-right">01 — ENGINEERING<br />FROM FIRST PRINCIPLES</span>
    </div>
  );
}
