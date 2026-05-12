// Shared UI components

const LogoMark = ({ size = 32 }) => (
  <div className="logo-mark" style={{ width: size, height: size, fontSize: size * 0.42 }}>T.I.</div>
);

const Logo = () => (
  <div className="row gap-3" style={{ alignItems: 'center' }}>
    <LogoMark />
    <div className="col" style={{ lineHeight: 1 }}>
      <span className="font-display" style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>T.I.</span>
      <span className="text-ink-4" style={{ fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Triagem Inteligente</span>
    </div>
  </div>
);

const Eyebrow = ({ children, icon }) => (
  <div className="row gap-2 eyebrow" style={{ alignItems: 'center' }}>
    {icon}
    <span>{children}</span>
  </div>
);

const TrustPill = ({ icon, label }) => (
  <div className="trust-pill">
    <span style={{ color: 'var(--brand-600)' }}>{icon}</span>
    <span>{label}</span>
  </div>
);

const Stepper = ({ steps, current }) => (
  <div
    className="stepper"
    role="progressbar"
    aria-valuenow={current + 1}
    aria-valuemax={steps.length}
    aria-readonly="true"
    contentEditable={false}
    suppressContentEditableWarning={true}
    style={{ userSelect: 'none' }}
  >
    {steps.map((s, i) => (
      <React.Fragment key={i}>
        <div className="row gap-2" style={{ alignItems: 'center' }} aria-hidden="false">
          <div
            className={`step-dot ${i < current ? 'step-done' : i === current ? 'step-current' : 'step-pending'}`}
            contentEditable={false}
            suppressContentEditableWarning={true}
          >
            {i < current ? <IconCheck size={14} /> : i + 1}
          </div>
          <span
            contentEditable={false}
            suppressContentEditableWarning={true}
            style={{ fontSize: '0.8125rem', fontWeight: i === current ? 600 : 500, color: i === current ? 'var(--ink-1)' : i < current ? 'var(--ink-2)' : 'var(--ink-4)', pointerEvents: 'none' }}
          >
            {s}
          </span>
        </div>
        {i < steps.length - 1 && <div className={`step-line ${i < current ? 'done' : ''}`} />}
      </React.Fragment>
    ))}
  </div>
);

const SeverityBadge = ({ level }) => {
  const map = {
    low:      { cls: 'sev-low',      label: 'Baixa gravidade',  icon: <IconCheck size={12} /> },
    moderate: { cls: 'sev-moderate', label: 'Atenção',          icon: <IconInfo size={12} /> },
    high:     { cls: 'sev-high',     label: 'Alta gravidade',   icon: <IconAlertTriangle size={12} /> },
    crit:     { cls: 'sev-crit',     label: 'Emergência',       icon: <IconAlertTriangle size={12} /> },
  };
  const m = map[level] || map.moderate;
  return <span className={`badge ${m.cls}`}>{m.icon}{m.label}</span>;
};

// Score donut (animates from 0 to target)
const ScoreDonut = ({ value = 72, label = 'Índice', sub = 'de risco', color = 'var(--g-primary)' }) => {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    let raf, start;
    const dur = 1100;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(value * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  const r = 56, c = 2 * Math.PI * r;
  const off = c - (v / 100) * c;
  return (
    <div style={{ position: 'relative', width: 144, height: 144 }}>
      <svg width="144" height="144" viewBox="0 0 144 144">
        <defs>
          <linearGradient id="donut-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="50%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>
        <circle cx="72" cy="72" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="10" />
        <circle cx="72" cy="72" r={r} fill="none" stroke="url(#donut-grad)" strokeWidth="10"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          transform="rotate(-90 72 72)" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--ink-1)', lineHeight: 1 }}>{Math.round(v)}<span style={{ fontSize: '1rem', color: 'var(--ink-4)' }}>/100</span></div>
        <div style={{ fontSize: '0.75rem', color: 'var(--ink-3)', marginTop: 6, letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
      </div>
    </div>
  );
};

// ECG-style sparkline
const Sparkline = ({ data, color = 'var(--brand-500)', height = 40, width = 200, glow = false }) => {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${height - ((v - min) / range) * height}`).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      {glow && <defs><filter id="spark-glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>}
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter={glow ? 'url(#spark-glow)' : undefined} />
    </svg>
  );
};

// ECG continuously animating
const ECGTrace = ({ height = 48 }) => {
  const pattern = "0,24 20,24 24,24 28,8 32,40 36,16 40,24 60,24 80,24 100,24 104,8 108,40 112,16 116,24 140,24 160,24 164,8 168,40 172,16 176,24 200,24";
  return (
    <div style={{ position: 'relative', height, overflow: 'hidden' }}>
      <svg width="100%" height={height} viewBox="0 0 200 48" preserveAspectRatio="none" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="ecg-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="1" />
          </linearGradient>
        </defs>
        <polyline points={pattern} fill="none" stroke="url(#ecg-fade)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// Anatomy panel — clean symmetric medical figure built from primitives
const AnatomyPanel = ({ selected = [], onToggle, scanning = false }) => {
  // Regions as separate clean shapes — they ARE the body (no separate silhouette)
  // Centered around x=120, viewBox 240x380
  const regions = [
    // Head — perfect circle
    { id: 'head',    label: 'Cabeça',
      d: 'M 120 60 m -28 0 a 28 28 0 1 0 56 0 a 28 28 0 1 0 -56 0' },
    // Neck — trapezoid
    { id: 'neck',    label: 'Pescoço',
      d: 'M 108 86 L 132 86 L 134 102 L 106 102 Z' },
    // Chest — wide rounded shape with shoulder slopes
    { id: 'chest',   label: 'Tórax',
      d: 'M 106 102 L 134 102 C 154 102 174 110 178 120 L 178 158 L 62 158 L 62 120 C 66 110 86 102 106 102 Z' },
    // Abdomen
    { id: 'abdomen', label: 'Abdômen',
      d: 'M 62 160 L 178 160 L 174 218 C 168 224 152 226 120 226 C 88 226 72 224 66 218 Z' },
    // Left arm — clean tube
    { id: 'lArm',    label: 'Braço esq.',
      d: 'M 62 122 L 60 122 C 50 124 44 134 46 146 L 56 244 C 57 254 64 260 72 258 L 76 258 C 80 256 82 250 80 244 L 70 158 L 62 122 Z' },
    // Right arm
    { id: 'rArm',    label: 'Braço dir.',
      d: 'M 178 122 L 180 122 C 190 124 196 134 194 146 L 184 244 C 183 254 176 260 168 258 L 164 258 C 160 256 158 250 160 244 L 170 158 L 178 122 Z' },
    // Left leg
    { id: 'lLeg',    label: 'Perna esq.',
      d: 'M 70 228 L 118 228 L 116 340 C 116 350 110 358 102 358 C 94 358 88 350 86 340 L 80 280 L 70 228 Z' },
    // Right leg
    { id: 'rLeg',    label: 'Perna dir.',
      d: 'M 170 228 L 122 228 L 124 340 C 124 350 130 358 138 358 C 146 358 152 350 154 340 L 160 280 L 170 228 Z' },
  ];

  // Combined silhouette path for clip + scan
  const bodyOutline = regions.map(r => r.d).join(' ');

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 220, margin: '0 auto', aspectRatio: '240/380' }}>
      <svg viewBox="0 0 240 380" width="100%" height="100%" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="regionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
          <linearGradient id="scanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.55" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <clipPath id="bodyClip">
            <path d={bodyOutline} />
          </clipPath>
        </defs>

        {/* Base fill — each region as soft body color */}
        <g>
          {regions.map(r => (
            <path key={`base-${r.id}`} d={r.d} fill="url(#bodyGrad)" />
          ))}
        </g>

        {/* Center symmetry guide */}
        <line x1="120" y1="100" x2="120" y2="230" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 3" />

        {/* Clickable highlight layer */}
        <g>
          {regions.map(r => (
            <path
              key={r.id}
              d={r.d}
              className={`anatomy-region ${selected.includes(r.id) ? 'active' : ''}`}
              onClick={() => onToggle && onToggle(r.id)}
              style={{ fill: selected.includes(r.id) ? undefined : 'transparent', stroke: '#CBD5E1', strokeWidth: 1.25 }}
            >
              <title>{r.label}</title>
            </path>
          ))}
        </g>

        {/* Scan line */}
        {scanning && (
          <g clipPath="url(#bodyClip)" style={{ pointerEvents: 'none' }}>
            <rect x="0" y="0" width="240" height="50" fill="url(#scanGrad)">
              <animate attributeName="y" from="-50" to="380" dur="3s" repeatCount="indefinite" />
            </rect>
          </g>
        )}
      </svg>
    </div>
  );
};

const Tooltip = ({ label, children }) => (
  <span style={{ position: 'relative', display: 'inline-flex' }} className="tt-wrap">
    {children}
    <span style={{
      position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
      background: 'var(--navy)', color: '#fff', padding: '6px 10px', borderRadius: 8,
      fontSize: '0.75rem', fontWeight: 500, whiteSpace: 'nowrap', pointerEvents: 'none',
      opacity: 0, transition: 'opacity 180ms var(--ease)', boxShadow: 'var(--e-2)',
    }} className="tt-bubble">{label}</span>
    <style dangerouslySetInnerHTML={{ __html: '.tt-wrap:hover .tt-bubble{opacity:1}' }} />
  </span>
);

Object.assign(window, {
  LogoMark, Logo, Eyebrow, TrustPill, Stepper, SeverityBadge,
  ScoreDonut, Sparkline, ECGTrace, AnatomyPanel, Tooltip,
});
