// Dashboard / vitals screen

const DashboardScreen = ({ goLanding }) => {
  const [tab, setTab] = React.useState('vitals');
  return (
    <div data-screen-label="05 Dashboard" className="screen" style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <FlowNav />
      <div className="container" style={{ paddingTop: 32, paddingBottom: 80 }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
          <div className="col gap-2">
            <Eyebrow icon={<IconActivity size={14} />}>Painel clínico · Pedro Silva</Eyebrow>
            <h1 className="font-display" style={{ fontSize: '2.25rem' }}>Sinais vitais & histórico</h1>
            <div className="row gap-3" style={{ color: 'var(--ink-3)', fontSize: '0.875rem' }}>
              <span className="row gap-2"><div className="live-dot" />Monitorando · última leitura há <span className="font-mono">12s</span></span>
              <span>·</span>
              <span><IconCalendar size={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />12 mai 2026</span>
            </div>
          </div>
          <div className="row gap-2">
            {['vitals', 'historico', 'anatomia'].map(t => (
              <button key={t} className={`chip ${tab === t ? 'chip-active' : ''}`} onClick={() => setTab(t)}>
                {t === 'vitals' ? 'Sinais vitais' : t === 'historico' ? 'Histórico' : 'Anatomia'}
              </button>
            ))}
            <button className="btn btn-secondary btn-md">Exportar</button>
          </div>
        </div>

        {/* Top vitals row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }} className="stagger">
          <VitalCard icon={<IconHeart size={18} />} label="Frequência cardíaca" value="72" unit="bpm" trend={[68,70,74,72,70,72,74,76,73,72,71,72]} color="#0EA5E9" delta="+2" status="normal" />
          <VitalCard icon={<IconWind size={18} />} label="SpO₂" value="98" unit="%" trend={[97,98,98,97,99,98,98,97,98,99,98,98]} color="#10B981" delta="±0" status="normal" />
          <VitalCard icon={<IconDroplet size={18} />} label="Pressão" value="118/76" unit="mmHg" trend={[112,115,118,116,119,117,118,120,117,118,116,118]} color="#22D3EE" delta="+3" status="watch" />
          <VitalCard icon={<IconThermometer size={18} />} label="Temperatura" value="36.6" unit="°C" trend={[36.4,36.5,36.6,36.7,36.6,36.6,36.5,36.6,36.6,36.7,36.6,36.6]} color="#F59E0B" delta="±0" status="normal" />
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
          {/* Left: ECG + glycemia + timeline */}
          <div className="col gap-4">
            <div className="card" style={{ padding: 24 }}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
                <div className="row gap-3">
                  <div className="icon-chip"><IconActivity size={18} /></div>
                  <div className="col">
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 600 }}>Eletrocardiograma</h3>
                    <span className="text-ink-3" style={{ fontSize: '0.8125rem' }}>Derivação II · Tempo real</span>
                  </div>
                </div>
                <div className="row gap-3">
                  <span className="badge sev-low"><IconCheck size={12} />Ritmo sinusal normal</span>
                </div>
              </div>
              <div style={{ background: 'linear-gradient(180deg, rgba(14,165,233,0.03), transparent)', borderRadius: 12, padding: '12px 0' }}>
                <ECGFull />
              </div>
              <div className="row gap-6" style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                {[
                  { k: 'PR', v: '142', u: 'ms' },
                  { k: 'QRS', v: '88', u: 'ms' },
                  { k: 'QT', v: '388', u: 'ms' },
                  { k: 'Eixo', v: '+62', u: '°' },
                ].map(m => (
                  <div key={m.k} className="col" style={{ gap: 2 }}>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{m.k}</span>
                    <span className="vital-value" style={{ fontSize: '1.125rem' }}>{m.v}<span style={{ fontSize: '0.75rem', color: 'var(--ink-4)', marginLeft: 4 }}>{m.u}</span></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Glycemia + sleep grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="card" style={{ padding: 24 }}>
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
                  <div className="row gap-3">
                    <div className="icon-chip"><IconDroplet size={18} /></div>
                    <div className="col">
                      <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Glicemia</h3>
                      <span className="text-ink-3" style={{ fontSize: '0.75rem' }}>Últimas 12h</span>
                    </div>
                  </div>
                  <span className="badge sev-low">94 mg/dL</span>
                </div>
                <div style={{ position: 'relative', height: 100, marginTop: 8 }}>
                  <AreaChart data={[88,92,98,104,112,108,102,96,92,94,96,94]} color="#0EA5E9" />
                </div>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
                  <div className="row gap-3">
                    <div className="icon-chip"><IconBrain size={18} /></div>
                    <div className="col">
                      <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Variabilidade FC</h3>
                      <span className="text-ink-3" style={{ fontSize: '0.75rem' }}>HRV · RMSSD</span>
                    </div>
                  </div>
                  <span className="vital-value" style={{ fontSize: '1.125rem' }}>48<span style={{ fontSize: '0.75rem', color: 'var(--ink-4)', marginLeft: 4 }}>ms</span></span>
                </div>
                <div style={{ height: 100, marginTop: 8 }}>
                  <BarChart data={[42, 38, 48, 52, 45, 50, 44, 48, 46, 50, 49, 48]} />
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="card" style={{ padding: 24 }}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 600 }}>Timeline do caso</h3>
                <button className="btn btn-ghost btn-sm">Ver tudo</button>
              </div>
              <div className="col gap-4">
                {[
                  { time: '14:32', title: 'Análise IA concluída', body: 'Score 72 · alta gravidade · encaminhamento PS', icon: <IconBrain size={14} />, color: 'var(--high)' },
                  { time: '14:30', title: 'Sintomas registrados', body: 'Dor torácica + irradiação braço E + falta de ar', icon: <IconMessageCircle size={14} />, color: 'var(--brand-500)' },
                  { time: '14:26', title: 'Aferição de vitais via wearable', body: 'FC 72 · SpO₂ 98 · PA 118/76 · Temp 36.6', icon: <IconActivity size={14} />, color: 'var(--ok)' },
                  { time: '08:14', title: 'Check-in matinal', body: 'Bem-estar reportado: bom · sono 7h12', icon: <IconCheck size={14} />, color: 'var(--ink-4)' },
                ].map((it, i, arr) => (
                  <div key={i} className="row gap-3" style={{ position: 'relative', alignItems: 'flex-start' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--surface)', border: `2px solid ${it.color}`, color: it.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                      {it.icon}
                    </div>
                    {i < arr.length - 1 && <div style={{ position: 'absolute', left: 13, top: 28, bottom: -16, width: 2, background: 'var(--border)' }} />}
                    <div className="col" style={{ flex: 1, paddingBottom: 4 }}>
                      <div className="row gap-3" style={{ alignItems: 'baseline' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{it.title}</span>
                        <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--ink-4)' }}>{it.time}</span>
                      </div>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--ink-3)' }}>{it.body}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: anatomy + alerts + meds */}
          <div className="col gap-4">
            <div className="card" style={{ padding: 24 }}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 600 }}>Painel anatômico</h3>
                <span className="badge sev-high"><IconAlertTriangle size={12} />Tórax</span>
              </div>
              <AnatomyPanel selected={['chest']} onToggle={() => {}} scanning={true} />
              <div className="card" style={{ padding: 12, marginTop: 12, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                <div className="row gap-2">
                  <IconInfo size={14} style={{ color: 'var(--brand-600)', marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.8125rem', color: 'var(--ink-2)', lineHeight: 1.45 }}>
                    Região torácica em análise contínua. Sensor de wearable sincronizado.
                  </span>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: 24, background: 'var(--navy)', color: '#fff', border: 'none', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--g-aurora)', opacity: 0.5 }} />
              <div style={{ position: 'relative' }}>
                <div className="row gap-2" style={{ marginBottom: 12 }}>
                  <IconStethoscope size={18} style={{ color: 'var(--brand-400)' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--brand-400)' }}>Plantão clínico</span>
                </div>
                <h3 className="font-display" style={{ color: '#fff', fontSize: '1.25rem', marginBottom: 8 }}>Dra. Helena Vasconcellos disponível agora</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: 16 }}>
                  Cardiologista · CRM-SP 142.890 · tempo médio de espera <span className="font-mono" style={{ color: 'var(--brand-400)' }}>2min</span>
                </p>
                <button className="btn btn-md" style={{ background: '#fff', color: 'var(--navy)', width: '100%', justifyContent: 'center' }}>
                  <IconPhone size={16} /> Iniciar consulta agora
                </button>
              </div>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 600 }}>Alertas</h3>
                <span className="badge sev-moderate">3 ativos</span>
              </div>
              <div className="col gap-3">
                {[
                  { sev: 'high', t: 'Pressão sistólica em alta', s: '+8 mmHg na última hora' },
                  { sev: 'moderate', t: 'Dor torácica há 2h', s: 'Aguardar nova avaliação' },
                  { sev: 'low', t: 'Hidratação abaixo da meta', s: '1.2 L hoje · meta 2.5 L' },
                ].map((a, i) => (
                  <div key={i} className="row gap-3" style={{ padding: 12, borderRadius: 10, background: 'var(--surface-2)' }}>
                    <div style={{ width: 6, alignSelf: 'stretch', borderRadius: 999, background: a.sev === 'high' ? 'var(--high)' : a.sev === 'moderate' ? 'var(--warn)' : 'var(--ok)' }} />
                    <div className="col" style={{ flex: 1, gap: 2 }}>
                      <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{a.t}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--ink-3)' }}>{a.s}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom credibility row */}
        <div className="row" style={{ marginTop: 32, padding: '20px 24px', background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div className="row gap-2" style={{ fontSize: '0.8125rem', color: 'var(--ink-3)' }}>
            <IconLock size={14} style={{ color: 'var(--ok)' }} /> Dados protegidos por criptografia AES-256 ponta-a-ponta.
          </div>
          <div className="cred-row">
            <span className="trust-pill" style={{ fontSize: '0.75rem' }}><IconShield size={12} />LGPD</span>
            <span className="trust-pill" style={{ fontSize: '0.75rem' }}><IconBuilding size={12} />ANVISA SaMD</span>
            <span className="trust-pill" style={{ fontSize: '0.75rem' }}><IconStethoscope size={12} />CFM</span>
            <span className="trust-pill" style={{ fontSize: '0.75rem' }}><IconFile size={12} />ISO 27001</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const VitalCard = ({ icon, label, value, unit, trend, color, delta, status }) => {
  const statusMap = { normal: { c: 'var(--ok)', l: 'Normal' }, watch: { c: 'var(--warn)', l: 'Observar' }, alert: { c: 'var(--high)', l: 'Atenção' } };
  const s = statusMap[status] || statusMap.normal;
  return (
    <div className="card card-hover" style={{ padding: 20 }}>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
        <div className="icon-chip" style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)`, color }}>{icon}</div>
        <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: s.c, letterSpacing: '0.04em', textTransform: 'uppercase' }}>● {s.l}</span>
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      <div className="row" style={{ alignItems: 'baseline', gap: 6 }}>
        <span className="vital-value" style={{ fontSize: '1.75rem', color: 'var(--ink-1)' }}>{value}</span>
        <span style={{ fontSize: '0.875rem', color: 'var(--ink-4)', fontWeight: 500 }}>{unit}</span>
        <span className="font-mono" style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--ink-3)' }}>{delta}</span>
      </div>
      <div style={{ marginTop: 10 }}>
        <Sparkline data={trend} color={color} height={36} width={240} />
      </div>
    </div>
  );
};

const ECGFull = () => {
  // Build a longer ECG-like wave
  const w = 800, h = 110, cycle = 80;
  const pts = [];
  for (let x = 0; x <= w; x += 1) {
    const t = x % cycle;
    let y = h / 2;
    if (t === 8) y = h / 2 + 2;
    else if (t === 10) y = h / 2 - 6;
    else if (t === 12) y = h / 2;
    else if (t === 18) y = h / 2 + 4;
    else if (t === 20) y = h / 2 - 36; // R peak
    else if (t === 22) y = h / 2 + 16;
    else if (t === 24) y = h / 2;
    else if (t === 40) y = h / 2 - 8;
    else if (t === 44) y = h / 2;
    pts.push(`${x},${y}`);
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ display: 'block' }}>
      <defs>
        <pattern id="ecg-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(14,165,233,0.06)" strokeWidth="1" />
        </pattern>
        <linearGradient id="ecg-fade-full" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#0EA5E9" stopOpacity="1" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill="url(#ecg-grid)" />
      <polyline points={pts.join(' ')} fill="none" stroke="url(#ecg-fade-full)" strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};

const AreaChart = ({ data, color }) => {
  const w = 280, h = 100;
  const max = Math.max(...data), min = Math.min(...data);
  const range = (max - min) || 1;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - min) / range) * (h - 10) - 6]);
  const line = pts.map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`)).join(' ');
  const area = line + ` L ${w},${h} L 0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="area-fill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#area-fill)" />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const BarChart = ({ data }) => {
  const max = Math.max(...data);
  return (
    <div className="row" style={{ alignItems: 'flex-end', height: '100%', gap: 4 }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1,
          height: `${(v / max) * 100}%`,
          background: `linear-gradient(180deg, var(--brand-400), var(--brand-600))`,
          borderRadius: '4px 4px 0 0',
          opacity: 0.85,
        }} />
      ))}
    </div>
  );
};

Object.assign(window, { DashboardScreen });
