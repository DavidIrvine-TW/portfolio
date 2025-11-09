import "./AtmosphericBackground.css";

function AtmosphericBackground() {
  return (
    <div className="atmospheric-background">
      {/* Deep space nebula layers with morphing shapes */}
      <div className="nebula-layer nebula-1">
        <div className="nebula-blob blob-1"></div>
        <div className="nebula-blob blob-2"></div>
      </div>
      <div className="nebula-layer nebula-2">
        <div className="nebula-blob blob-3"></div>
        <div className="nebula-blob blob-4"></div>
      </div>
      <div className="nebula-layer nebula-3">
        <div className="nebula-blob blob-5"></div>
        <div className="nebula-blob blob-6"></div>
      </div>

      {/* Atmospheric fog layers with different depths */}
      <div className="fog-layer fog-far"></div>
      <div className="fog-layer fog-mid"></div>
      <div className="fog-layer fog-near"></div>

      {/* Subtle light streaks */}
      <div className="light-streak light-streak-1"></div>
      <div className="light-streak light-streak-2"></div>
      <div className="light-streak light-streak-3"></div>

      {/* Deep vignette */}
      <div className="deep-vignette"></div>
    </div>
  );
}

export default AtmosphericBackground;
