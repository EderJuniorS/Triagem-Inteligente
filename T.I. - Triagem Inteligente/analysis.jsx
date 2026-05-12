// Analysis (loading) + Result screen

const ANALYSIS_STEPS = [
  'Estruturando sintomas relatados…',
  'Correlacionando com diretrizes clínicas (SBC, OMS)…',
  'Avaliando padrões de gravidade…',
  'Gerando recomendação de encaminhamento…',
];

const AnalysisScreen = ({ goResult, goSymptoms }) => {
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    const timers = [];
    ANALYSIS_STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i + 1), 900 * (i + 1)));
    });
    timers.push(setTimeout(() => goResult(), 900 * (ANALYSIS_STEPS.length + 1)));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div data-screen-label="03 Analise" className="screen" style={{ minHeight: '100vh' }}>
      <div className="aurora" style={{ position: 'absolute', inset: 0, height: 500, pointerEvents: 'none' }} />
      <FlowNav />
      <div className="container" style={{ position: 'relative', paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ marginBottom: 32 }}>
            <Stepper steps={['Sintomas', 'Histórico', 'Análise', 'Resultado']} current={2} />
          </div>

          <div className="card" style={{ padding: 48, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--g-aurora)', opacity: 0.4 }} />
            <div className="col gap-6" style={{ alignItems: 'center', position: 'relative', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: 120, height: 120 }}>
                <div className="scan-ring" style={{ width: 120, height: 120, position: 'relative' }} />
                <div style={{ position: 'absolute', inset: 14, borderRadius: '50%', background: 'var(--g-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: 'var(--e-glow)', animation: 'pulseSoft 2.4s var(--ease) infinite' }}>
                  <IconBrain size={36} />
                </div>
              </div>
              <div className="col gap-2">
                <h2 className="font-display" style={{ fontSize: '1.75rem' }}>Analisando seus sintomas com IA clínica</h2>
                <p style={{ color: 'var(--ink-3)', maxWidth: 480, margin: 0 }}>
                  Nossa IA está cruzando seus relatos com diretrizes médicas e protocolos de triagem.
                  Isso costuma levar entre <span className="font-mono">5</span> e <span className="font-mono">8</span> segundos.
                </p>
              </div>
              <div className="col gap-3" style={{ width: '100%', maxWidth: 460, marginTop: 16 }}>
                {ANALYSIS_STEPS.map((label, i) => (
                  <div key={i} className="row gap-3" style={{ alignItems: 'center', textAlign: 'left' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: i < step ? 'var(--ok)' : i === step ? 'transparent' : 'var(--surface-2)', border: i === step ? '2px solid var(--brand-500)' : 'none', flexShrink: 0 }}>
                      {i < step ? <IconCheck size={14} style={{ color: '#fff' }} /> : i === step ? <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-500)', animation: 'pulseSoft 1s infinite' }} /> : null}
                    </div>
                    <span style={{ fontSize: '0.9375rem', fontWeight: i === step ? 600 : 500, color: i < step ? 'var(--ink-3)' : i === step ? 'var(--ink-1)' : 'var(--ink-4)' }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ width: '100%', maxWidth: 460, height: 4, background: 'var(--surface-2)', borderRadius: 999, overflow: 'hidden', marginTop: 8 }}>
                <div style={{ width: `${(step / ANALYSIS_STEPS.length) * 100}%`, height: '100%', background: 'var(--g-primary)', borderRadius: 999, transition: 'width 700ms var(--ease)' }} />
              </div>
              <button className="btn btn-ghost btn-sm" onClick={goSymptoms} style={{ color: 'var(--ink-4)' }}>
                Cancelar e editar sintomas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultScreen = ({ goDashboard, goSymptoms }) => {
  return (
    <div data-screen-label="04 Resultado" className="screen" style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="aurora" style={{ position: 'absolute', inset: 0, height: 400, pointerEvents: 'none' }} />
      <FlowNav />
      <div className="container" style={{ position: 'relative', paddingTop: 48, paddingBottom: 100 }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <div style={{ marginBottom: 32 }}>
            <Stepper steps={['Sintomas', 'Histórico', 'Análise', 'Resultado']} current={3} />
          </div>

          {/* Headline result card */}
          <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 20 }}>
            <div style={{ padding: '28px 32px', background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(245,158,11,0.04))', borderBottom: '1px solid var(--border)' }}>
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                <div className="col gap-2">
                  <SeverityBadge level="high" />
                  <h2 className="font-display" style={{ fontSize: '2rem', maxWidth: 540 }}>
                    Recomendamos atendimento <span style={{ color: '#C2410C' }}>presencial em até 6 horas</span>.
                  </h2>
                  <p style={{ color: 'var(--ink-3)', margin: 0, maxWidth: 560, lineHeight: 1.55 }}>
                    Os sintomas relatados (dor torácica + irradiação para o braço esquerdo + falta de ar)
                    indicam um quadro que requer avaliação cardiológica não eletiva.
                  </p>
                </div>
                <ScoreDonut value={72} label="Score" />
              </div>
            </div>

            <div style={{ padding: '28px 32px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32 }}>
              <div className="col gap-4">
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Próximos passos</div>
                  <div className="col gap-3">
                    {[
                      { p: 1, t: 'Procure um pronto-socorro com cardiologia', s: 'Em até 6 horas. Não dirija — peça transporte.', d: true },
                      { p: 2, t: 'Leve esta análise impressa ou no celular', s: 'Inclui timeline de sintomas e sinais vitais aferidos.' },
                      { p: 3, t: 'Repouse e evite esforço físico', s: 'Não tome medicamentos por conta própria.' },
                      { p: 4, t: 'Em caso de piora, ligue 192 imediatamente', s: 'Falta de ar súbita, perda de consciência, dor irradiando.', alert: true },
                    ].map(it => (
                      <div key={it.p} className="row gap-3" style={{ alignItems: 'flex-start' }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: it.alert ? 'rgba(239,68,68,0.1)' : 'var(--surface-2)', color: it.alert ? 'var(--crit)' : 'var(--ink-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '0.8125rem', flexShrink: 0 }}>{it.p}</div>
                        <div className="col" style={{ gap: 2 }}>
                          <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--ink-1)' }}>{it.t}</span>
                          <span style={{ fontSize: '0.8125rem', color: 'var(--ink-3)', lineHeight: 1.5 }}>{it.s}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Sintomas considerados</div>
                  <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
                    {['Dor torácica', 'Irradiação braço esquerdo', 'Falta de ar', 'Pressão 2h', 'Sem histórico cardíaco'].map(c => (
                      <span key={c} className="chip" style={{ cursor: 'default' }}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col gap-3">
                <div className="card" style={{ padding: 18, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>Encaminhamento sugerido</div>
                  <div className="col gap-3">
                    <Referral icon={<IconHospital size={18} />} title="Pronto-socorro" sub="Hospital São Paulo · 2.1 km · ~12 min" primary />
                    <Referral icon={<IconStethoscope size={18} />} title="Telecardiologia" sub="Disponível agora · 3 médicos online" />
                    <Referral icon={<IconPhone size={18} />} title="SAMU 192" sub="Em caso de piora súbita" />
                  </div>
                </div>
                <div className="card" style={{ padding: 16, background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
                  <div className="row gap-2">
                    <IconInfo size={16} style={{ color: 'var(--warn)', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: '0.8125rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>
                      Análise gerada por IA com base em diretrizes clínicas. <strong>Não substitui consulta médica.</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer card */}
          <div className="card" style={{ padding: 24 }}>
            <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div className="col gap-1">
                <span style={{ fontSize: '0.75rem', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Detalhes da análise</span>
                <div className="row gap-4" style={{ flexWrap: 'wrap', color: 'var(--ink-3)', fontSize: '0.875rem' }}>
                  <span><IconClock size={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />Gerada em <span className="font-mono">12/05/2026 14:32</span></span>
                  <span><IconZap size={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />Tempo: <span className="font-mono">5.8s</span></span>
                  <span><IconFile size={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />ID: <span className="font-mono">#A0F4-9C12</span></span>
                </div>
              </div>
              <div className="row gap-3">
                <button className="btn btn-secondary btn-md" onClick={goSymptoms}>Editar sintomas</button>
                <button className="btn btn-secondary btn-md">Baixar PDF</button>
                <button className="btn btn-primary btn-md" onClick={goDashboard}>
                  Ver painel clínico <IconArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Referral = ({ icon, title, sub, primary }) => (
  <div className="row gap-3 card-hover" style={{ padding: 12, borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', transition: 'all var(--dur) var(--ease)' }}>
    <div className="icon-chip" style={{ background: primary ? 'var(--g-primary)' : undefined, color: primary ? '#fff' : undefined }}>{icon}</div>
    <div className="col" style={{ gap: 2, flex: 1, minWidth: 0 }}>
      <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{title}</span>
      <span style={{ fontSize: '0.8125rem', color: 'var(--ink-3)' }}>{sub}</span>
    </div>
    <IconChevronRight size={16} style={{ color: 'var(--ink-4)' }} />
  </div>
);

Object.assign(window, { AnalysisScreen, ResultScreen });
