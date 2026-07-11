export function ReadinessPanel() {
  return (
    <section className="insightPanel">
      <p className="eyebrow">Check-in readiness</p>
      <strong>QR flow ready for 2 upcoming events</strong>
      <div className="progressTrack">
        <span />
      </div>
      <small>Scanner, payloads, and organizer permissions are connected.</small>
    </section>
  );
}
