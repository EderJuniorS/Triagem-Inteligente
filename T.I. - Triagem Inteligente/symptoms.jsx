// Symptoms input screen

const QUICK_SYMPTOMS = [
  'Febre', 'Dor de cabeça', 'Falta de ar', 'Dor no peito',
  'Dor abdominal', 'Tontura', 'Náusea', 'Tosse seca', 'Calafrios', 'Fadiga',
];

const DURATIONS = ['< 1h', 'Hoje', 'Há dias', 'Há semanas'];

const SymptomsScreen = ({ goAnalysis, goLanding }) => {
  const [text, setText] = React.useState('Sinto pressão no peito há cerca de 2 horas, acompanhada de leve falta de ar e formigamento no braço esquerdo. Sem histórico de problemas cardíacos.');
  const [pain, setPain] = React.useState(6);
  const [duration, setDuration] = React.useState('< 1h');
  const [temp, setTemp] = React.useState('36.9');
  const [regions, setRegions] = React.useState(['chest']);
  const [chips, setChips] = React.useState(['Dor no peito', 'Falta de ar']);

  const toggleRegion = (id) =>
    setRegions(r => r.includes(id) ? r.filter(x => x !== id) : [...r, id]);

  const toggleChip = (c) => {
    setChips(arr => {
      if (arr.includes(c)) return arr.filter(x => x !== c);
      // Append to textarea too
      setText(t => t + (t.endsWith(' ') || t === '' ? '' : '. ') + c.toLowerCase());
      return [...arr, c];
    });
  };

  return (
    <div data-screen-label="02 Sintomas" className="screen" style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="aurora" style={{ position: 'absolute', inset: 0, height: 400, pointerEvents: 'none' }} />
      <FlowNav />
      <div className="container" style={{ position: 'relative', paddingTop: 48, paddingBottom: 120 }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {/* Header */}
          <div className="col gap-4" style={{ marginBottom: 32 }}>
            <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start', padding: '6px 10px', color: 'var(--ink-3)' }} onClick={goLanding}>
              <span style={{ transform: 'scaleX(-1)', display: 'inline-flex' }}><IconArrowRight size={14} /></span>
              Voltar
            </button>
            <div className="col gap-2">
              <h1 className="font-display" style={{ fontSize: '2.25rem' }}>
                Olá, Pedro. <span className="gradient-text">Vamos entender</span> o que você está sentindo.
              </h1>
              <div className="row gap-2" style={{ color: 'var(--ink-3)', fontSize: '0.9375rem' }}>
                <IconLock size={14} style={{ color: 'var(--ok)' }} />
                Suas respostas são privadas, anônimas e criptografadas.
              </div>
            </div>
            <div style={{ marginTop: 8 }}>
              <Stepper steps={['Sintomas', 'Histórico', 'Análise', 'Resultado']} current={0} />
            </div>
          </div>

          {/* Main field */}
          <div className="card" style={{ padding: 28, marginBottom: 20 }}>
            <div className="row gap-3" style={{ marginBottom: 16 }}>
              <div className="icon-chip"><IconMessageCircle size={18} /></div>
              <div className="col" style={{ gap: 2 }}>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 600 }}>Descreva seus sintomas</h3>
                <span className="text-ink-3" style={{ fontSize: '0.8125rem' }}>Quanto mais detalhes, mais precisa será a análise da IA.</span>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <textarea
                className="text-input"
                rows={5}
                placeholder="Descreva como está se sentindo. Ex: dor no peito há 2 horas, falta de ar, formigamento no braço…"
                value={text}
                onChange={e => setText(e.target.value)}
                maxLength={1200}
              />
              <span className="font-mono" style={{ position: 'absolute', right: 14, bottom: 12, fontSize: '0.75rem', color: 'var(--ink-4)' }}>
                {text.length}/1200
              </span>
            </div>
            {/* Quick chips */}
            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Sugestões rápidas</div>
              <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
                {QUICK_SYMPTOMS.map(c => (
                  <button key={c} className={`chip ${chips.includes(c) ? 'chip-active' : ''}`} onClick={() => toggleChip(c)}>
                    {chips.includes(c) && <IconCheck size={12} />}
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Structured row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            {/* Pain slider */}
            <div className="card" style={{ padding: 24 }}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
                <div className="col gap-1">
                  <span style={{ fontSize: '0.75rem', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Intensidade da dor</span>
                  <div className="row gap-2" style={{ alignItems: 'baseline' }}>
                    <span className="vital-value" style={{ fontSize: '1.75rem', color: 'var(--ink-1)' }}>{pain}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--ink-4)' }}>/ 10</span>
                  </div>
                </div>
                <span className={`badge ${pain <= 3 ? 'sev-low' : pain <= 6 ? 'sev-moderate' : pain <= 8 ? 'sev-high' : 'sev-crit'}`}>
                  {pain <= 3 ? 'Leve' : pain <= 6 ? 'Moderada' : pain <= 8 ? 'Forte' : 'Severa'}
                </span>
              </div>
              <PainSlider value={pain} onChange={setPain} />
              <div className="row" style={{ justifyContent: 'space-between', marginTop: 8, fontSize: '0.75rem', color: 'var(--ink-4)' }}>
                <span>Sem dor</span>
                <span>Pior dor</span>
              </div>
            </div>
            {/* Duration */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>Duração</div>
              <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
                {DURATIONS.map(d => (
                  <button key={d} className={`chip ${duration === d ? 'chip-active' : ''}`} onClick={() => setDuration(d)}>{d}</button>
                ))}
              </div>
              <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--border)' }}>
                <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="col gap-1">
                    <span style={{ fontSize: '0.75rem', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Temperatura</span>
                    <span className="text-ink-3" style={{ fontSize: '0.75rem' }}>Opcional</span>
                  </div>
                  <div className="row gap-2" style={{ alignItems: 'center' }}>
                    <input type="text" value={temp} onChange={e => setTemp(e.target.value)} style={{ width: 70, textAlign: 'center', padding: '8px 4px', borderRadius: 10, border: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace', fontSize: '1.0625rem', fontWeight: 500, color: 'var(--ink-1)', background: 'var(--surface)' }} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--ink-3)' }}>°C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Anatomy panel */}
          <div className="card" style={{ padding: 28, marginBottom: 20 }}>
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div className="row gap-3">
                <div className="icon-chip"><IconMapPin size={18} /></div>
                <div className="col" style={{ gap: 2 }}>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 600 }}>Onde você sente?</h3>
                  <span className="text-ink-3" style={{ fontSize: '0.8125rem' }}>Toque nas regiões do corpo. Selecione uma ou mais.</span>
                </div>
              </div>
              {regions.length > 0 && (
                <button className="btn btn-ghost btn-sm" onClick={() => setRegions([])}>Limpar</button>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24, alignItems: 'center' }}>
              <AnatomyPanel selected={regions} onToggle={toggleRegion} />
              <div className="col gap-3">
                {regions.length === 0 ? (
                  <div style={{ fontSize: '0.9375rem', color: 'var(--ink-4)' }}>Nenhuma região selecionada ainda.</div>
                ) : (
                  <>
                    <div style={{ fontSize: '0.75rem', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Regiões marcadas ({regions.length})</div>
                    <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
                      {regions.map(r => {
                        const labels = { head: 'Cabeça', neck: 'Pescoço', chest: 'Tórax', abdomen: 'Abdômen', lArm: 'Braço esquerdo', rArm: 'Braço direito', lLeg: 'Perna esquerda', rLeg: 'Perna direita' };
                        return (
                          <span key={r} className="chip chip-active" style={{ cursor: 'default' }}>
                            {labels[r]}
                            <button onClick={() => toggleRegion(r)} style={{ background: 'transparent', border: 'none', color: '#fff', display: 'inline-flex', cursor: 'pointer', marginLeft: 2 }}>
                              <IconX size={12} />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  </>
                )}
                <div className="card" style={{ padding: 14, marginTop: 8, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <div className="row gap-2" style={{ fontSize: '0.8125rem', color: 'var(--ink-3)' }}>
                    <IconInfo size={14} style={{ marginTop: 2, flexShrink: 0, color: 'var(--brand-600)' }} />
                    <span>Marcar a região ajuda a IA a correlacionar sintomas com padrões clínicos (ex: dor torácica + braço esquerdo).</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI disclosure */}
          <div className="card" style={{ padding: 16, marginBottom: 24, background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <div className="row gap-3">
              <IconAlertTriangle size={18} style={{ color: 'var(--warn)', flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)', margin: 0, lineHeight: 1.5 }}>
                A análise é gerada por inteligência artificial a partir dos sintomas informados e <strong>não substitui consulta médica</strong>. Em caso de emergência, ligue <strong>192</strong> (SAMU).
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div className="row gap-2" style={{ fontSize: '0.8125rem', color: 'var(--ink-3)' }}>
              <IconLock size={14} style={{ color: 'var(--ok)' }} />
              Seus dados estão protegidos por criptografia ponta-a-ponta.
            </div>
            <button className="btn btn-primary btn-lg" onClick={goAnalysis} disabled={text.trim().length < 10}>
              <IconActivity size={18} /> Analisar com IA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PainSlider = ({ value, onChange }) => {
  const trackRef = React.useRef(null);
  const dragging = React.useRef(false);

  const setFromEvent = (e) => {
    const rect = trackRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const p = Math.max(0, Math.min(1, x / rect.width));
    onChange(Math.round(p * 10));
  };

  const onDown = (e) => { dragging.current = true; setFromEvent(e); };
  React.useEffect(() => {
    const move = (e) => { if (dragging.current) setFromEvent(e); };
    const up = () => { dragging.current = false; };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
  });

  return (
    <div ref={trackRef} className="slider-track" onMouseDown={onDown} onTouchStart={onDown} style={{ cursor: 'pointer' }}>
      <div className="slider-thumb" style={{ left: `${value * 10}%` }} />
    </div>
  );
};

Object.assign(window, { SymptomsScreen });
