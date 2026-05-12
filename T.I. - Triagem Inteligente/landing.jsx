// Landing page

const Nav = ({ onCTA, onSymptoms }) => (
  <nav className="nav">
    <div className="container row" style={{ height: 72, justifyContent: 'space-between' }}>
      <div className="row gap-8">
        <Logo />
        <div className="row gap-6 hide-md" style={{ fontSize: '0.9375rem', color: 'var(--ink-2)', fontWeight: 500 }}>
          <a href="#produto" style={{ color: 'inherit', textDecoration: 'none' }}>Produto</a>
          <a href="#hospitais" style={{ color: 'inherit', textDecoration: 'none' }}>Para hospitais</a>
          <a href="#pacientes" style={{ color: 'inherit', textDecoration: 'none' }}>Para pacientes</a>
          <a href="#seguranca" style={{ color: 'inherit', textDecoration: 'none' }}>Segurança</a>
        </div>
      </div>
      <div className="row gap-3">
        <button className="btn btn-ghost btn-sm hide-md">Entrar</button>
        <button className="btn btn-primary btn-md" onClick={onSymptoms}>
          Iniciar triagem <IconArrowRight size={16} />
        </button>
      </div>
    </div>
  </nav>
);

// Slim in-flow nav for triagem screens — just logo + safety badges + help, no landing menu
const FlowNav = () => (
  <nav className="nav">
    <div className="container row" style={{ height: 64, justifyContent: 'space-between' }}>
      <Logo />
      <div className="row gap-3">
        <span className="trust-pill hide-md" style={{ fontSize: '0.75rem' }}>
          <IconLock size={12} style={{ color: 'var(--ok)' }} />
          Sessão protegida
        </span>
        <span className="trust-pill hide-md" style={{ fontSize: '0.75rem' }}>
          <IconPhone size={12} style={{ color: 'var(--crit)' }} />
          Emergência: <strong style={{ color: 'var(--ink-1)' }}>192</strong>
        </span>
        <button className="btn btn-ghost btn-sm">
          <IconInfo size={14} /> Ajuda
        </button>
      </div>
    </div>
  </nav>
);

const Hero = ({ onSymptoms }) => (
  <section style={{ position: 'relative', paddingTop: 80, paddingBottom: 120, overflow: 'hidden' }}>
    <div className="aurora" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
    <div className="container" style={{ position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 64, alignItems: 'center' }}>
        <div className="col gap-6 fade-up">
          <Eyebrow icon={<IconSparkles size={14} />}>HealthTech · Inteligência Artificial</Eyebrow>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}>
            Sua triagem médica em <span className="gradient-text">segundos</span>,
            com a clareza de um especialista.
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--ink-3)', lineHeight: 1.55, maxWidth: 540 }}>
            Descreva seus sintomas. Nossa IA clínica avalia gravidade, sugere encaminhamento
            e acompanha seus sinais vitais — antes mesmo de você chegar ao consultório.
          </p>
          <div className="row gap-3" style={{ marginTop: 4 }}>
            <button className="btn btn-primary btn-lg" onClick={onSymptoms}>
              Iniciar triagem gratuita <IconArrowRight size={18} />
            </button>
            <button className="btn btn-secondary btn-lg">
              <IconPlay size={16} /> Ver demo (2 min)
            </button>
          </div>
          <div className="row gap-3" style={{ flexWrap: 'wrap', marginTop: 12 }}>
            <TrustPill icon={<IconShield size={14} />} label="LGPD" />
            <TrustPill icon={<IconBuilding size={14} />} label="ANVISA" />
            <TrustPill icon={<IconStethoscope size={14} />} label="Validado por CFM" />
            <TrustPill icon={<IconLock size={14} />} label="Criptografia AES-256" />
          </div>
        </div>
        <HeroMockup />
      </div>
    </div>
  </section>
);

const HeroMockup = () => (
  <div className="mockup-glow float-soft" style={{ position: 'relative' }}>
    <div className="card-glass" style={{ padding: 18, borderRadius: 24 }}>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
        <div className="row gap-2">
          <div className="live-dot" />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink-2)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Monitorando</span>
        </div>
        <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--ink-4)' }}>14:32 · 12 MAI</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <VitalMini label="Frequência" value="72" unit="bpm" trend={[68,70,71,74,73,72,71,72,74,72]} color="#0EA5E9" />
        <VitalMini label="SpO₂" value="98" unit="%" trend={[97,98,98,97,98,99,98,98,97,98]} color="#10B981" />
        <VitalMini label="Pressão" value="118/76" unit="mmHg" trend={[112,115,118,116,119,117,118,120,117,118]} color="#22D3EE" />
        <VitalMini label="Temp" value="36.6" unit="°C" trend={[36.4,36.5,36.6,36.7,36.6,36.6,36.5,36.6,36.6,36.6]} color="#F59E0B" />
      </div>
      <div className="card" style={{ marginTop: 12, padding: 14, borderRadius: 16, background: 'linear-gradient(135deg, rgba(34,211,238,0.08), rgba(14,165,233,0.04))', border: '1px solid rgba(14,165,233,0.18)' }}>
        <div className="row gap-3">
          <div className="icon-chip"><IconBrain size={18} /></div>
          <div className="col" style={{ gap: 2 }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ink-1)' }}>Análise IA concluída</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--ink-3)' }}>Sintomas leves — encaminhamento: telemedicina</span>
          </div>
          <span className="badge sev-low" style={{ marginLeft: 'auto' }}><IconCheck size={12} />Baixa</span>
        </div>
      </div>
    </div>
  </div>
);

const VitalMini = ({ label, value, unit, trend, color }) => (
  <div className="card" style={{ padding: 12, borderRadius: 14 }}>
    <div style={{ fontSize: '0.6875rem', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
    <div className="row" style={{ alignItems: 'baseline', gap: 4 }}>
      <span className="vital-value" style={{ fontSize: '1.25rem' }}>{value}</span>
      <span style={{ fontSize: '0.75rem', color: 'var(--ink-4)', fontWeight: 500 }}>{unit}</span>
    </div>
    <div style={{ marginTop: 6 }}>
      <Sparkline data={trend} color={color} height={28} width={120} />
    </div>
  </div>
);

const Partners = () => {
  const names = ['Albert Sano', 'MedCore', 'Sírio-Líbero', 'Clínica Vita+', 'Vida Plena', 'Hospital Aurora', 'BemEstar'];
  return (
    <section style={{ padding: '48px 0 24px' }}>
      <div className="container">
        <div style={{ fontSize: '0.75rem', textAlign: 'center', color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24 }}>
          Em uso por +200 clínicas e hospitais
        </div>
        <div className="row" style={{ flexWrap: 'wrap', justifyContent: 'space-around', gap: 32 }}>
          {names.map(n => <span key={n} className="partner-logo">{n}</span>)}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const items = [
    { n: '01', title: 'Descreva seus sintomas', body: 'Em linguagem natural. Texto, sliders e painel anatômico interativo.', icon: <IconMessageCircle size={20} /> },
    { n: '02', title: 'IA clínica avalia', body: 'Modelo treinado em diretrizes médicas. Análise em 6 segundos, com fontes citadas.', icon: <IconBrain size={20} /> },
    { n: '03', title: 'Receba o encaminhamento', body: 'Gravidade, recomendação, próximos passos e contato com profissional, se necessário.', icon: <IconStethoscope size={20} /> },
  ];
  return (
    <section id="produto" style={{ padding: '96px 0' }}>
      <div className="container">
        <div className="col gap-3" style={{ maxWidth: 640, marginBottom: 56 }}>
          <Eyebrow>Como funciona</Eyebrow>
          <h2 className="font-display">Três etapas. Seis segundos. Uma decisão clínica clara.</h2>
        </div>
        <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {items.map(it => (
            <div key={it.n} className="card card-hover" style={{ padding: 28 }}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 24 }}>
                <span className="font-display gradient-text" style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1 }}>{it.n}</span>
                <div className="icon-chip" style={{ width: 44, height: 44 }}>{it.icon}</div>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 8 }}>{it.title}</h3>
              <p style={{ color: 'var(--ink-3)', lineHeight: 1.55, margin: 0 }}>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TwoAudiences = () => (
  <section style={{ padding: '24px 0 96px' }}>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <div id="hospitais" className="card" style={{ padding: 40, background: 'linear-gradient(135deg, #0B1E3F 0%, #143A6E 100%)', color: '#fff', border: 'none', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--g-aurora)', opacity: 0.6 }} />
        <div style={{ position: 'relative' }}>
          <Eyebrow icon={<IconHospital size={14} />}><span style={{ color: 'var(--brand-400)' }}>Para hospitais</span></Eyebrow>
          <h3 className="font-display" style={{ fontSize: '1.875rem', marginTop: 16, color: '#fff' }}>Reduza 38% do tempo de classificação de risco.</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, marginTop: 12, marginBottom: 28 }}>
            Integre a triagem inteligente ao seu pronto-atendimento. Protocolos Manchester
            e CTAS suportados. Dashboard de fluxo em tempo real para equipe clínica.
          </p>
          <div className="col gap-3" style={{ marginBottom: 28 }}>
            {['Integração HL7 / FHIR nativa', 'Painel clínico em tempo real', 'Auditoria completa por caso'].map(t => (
              <div key={t} className="row gap-2"><IconCheck size={16} style={{ color: 'var(--brand-400)' }} /><span style={{ fontSize: '0.9375rem' }}>{t}</span></div>
            ))}
          </div>
          <button className="btn btn-secondary btn-md" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
            Agendar demo clínica <IconArrowUpRight size={16} />
          </button>
        </div>
      </div>
      <div id="pacientes" className="card" style={{ padding: 40, background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 240, height: 240, background: 'var(--g-aurora)', borderRadius: '50%', filter: 'blur(20px)' }} />
        <div style={{ position: 'relative' }}>
          <Eyebrow icon={<IconUsers size={14} />}>Para pacientes</Eyebrow>
          <h3 className="font-display" style={{ fontSize: '1.875rem', marginTop: 16 }}>Saiba se precisa procurar atendimento — em 6 segundos.</h3>
          <p style={{ color: 'var(--ink-3)', lineHeight: 1.55, marginTop: 12, marginBottom: 28 }}>
            Sem cadastro obrigatório. Sem consulta paga. Sintomas analisados por IA clínica
            com referência em diretrizes da OMS, SBC e SBP.
          </p>
          <div className="col gap-3" style={{ marginBottom: 28 }}>
            {['Análise gratuita e anônima', 'Encaminhamento para SUS, plano ou particular', 'Telemedicina integrada quando necessário'].map(t => (
              <div key={t} className="row gap-2"><IconCheck size={16} style={{ color: 'var(--ok)' }} /><span style={{ fontSize: '0.9375rem' }}>{t}</span></div>
            ))}
          </div>
          <button className="btn btn-primary btn-md">
            Fazer minha triagem <IconArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  </section>
);

const SecuritySection = () => {
  const items = [
    { icon: <IconShield size={20} />, title: 'LGPD em conformidade', body: 'Tratamento de dados sensíveis de saúde com base legal de consentimento e tutela.' },
    { icon: <IconLock size={20} />, title: 'AES-256 ponta a ponta', body: 'Criptografia em repouso e em trânsito. Chaves rotacionadas a cada 90 dias.' },
    { icon: <IconBuilding size={20} />, title: 'ANVISA SaMD Classe II', body: 'Registro como Software como Dispositivo Médico em andamento (RDC 657/2022).' },
    { icon: <IconStethoscope size={20} />, title: 'Validação CFM', body: 'Protocolo revisado por conselho clínico com 8 especialistas (CRM ativo).' },
    { icon: <IconFile size={20} />, title: 'ISO 27001 + 27799', body: 'Padrões internacionais de segurança da informação em saúde.' },
    { icon: <IconEye size={20} />, title: 'Auditoria transparente', body: 'Log completo por caso. Paciente baixa seu histórico em PDF a qualquer momento.' },
  ];
  return (
    <section id="seguranca" style={{ padding: '96px 0', background: 'var(--surface-2)' }}>
      <div className="container">
        <div className="col gap-3" style={{ maxWidth: 640, marginBottom: 56 }}>
          <Eyebrow icon={<IconShield size={14} />}>Segurança e regulação</Eyebrow>
          <h2 className="font-display">Saúde é dado sensível.<br />Tratamos como tal.</h2>
        </div>
        <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {items.map(it => (
            <div key={it.title} className="card card-hover" style={{ padding: 24 }}>
              <div className="icon-chip" style={{ marginBottom: 16 }}>{it.icon}</div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, marginBottom: 6 }}>{it.title}</h3>
              <p style={{ color: 'var(--ink-3)', fontSize: '0.9375rem', lineHeight: 1.5, margin: 0 }}>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = ({ onSymptoms }) => (
  <section style={{ padding: '96px 0' }}>
    <div className="container">
      <div style={{ position: 'relative', borderRadius: 28, padding: '72px 56px', overflow: 'hidden', background: 'linear-gradient(135deg, #0B1E3F 0%, #0EA5E9 130%)', boxShadow: 'var(--e-3)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--g-aurora)', opacity: 0.7 }} />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'center' }}>
          <div className="col gap-4">
            <h2 className="font-display" style={{ color: '#fff', fontSize: '2.5rem', maxWidth: 540 }}>
              Comece sua triagem agora. <br />
              <span style={{ color: 'var(--brand-400)' }}>Em 6 segundos</span> você saberá o próximo passo.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.0625rem', maxWidth: 520 }}>
              Gratuito. Anônimo. Sem cadastro. Sua saúde merece clareza imediata.
            </p>
            <div className="row gap-3" style={{ marginTop: 12 }}>
              <button className="btn btn-md" onClick={onSymptoms} style={{ background: '#fff', color: 'var(--navy)' }}>
                Iniciar triagem <IconArrowRight size={16} />
              </button>
              <button className="btn btn-ghost btn-md" style={{ color: '#fff' }}>
                Falar com vendas (hospitais) <IconArrowUpRight size={16} />
              </button>
            </div>
          </div>
          <div className="col gap-3" style={{ alignItems: 'flex-end' }}>
            <div className="trust-pill" style={{ background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
              <IconClock size={14} /> Tempo médio de triagem: <span className="font-mono" style={{ color: 'var(--brand-400)' }}>5.8s</span>
            </div>
            <div className="trust-pill" style={{ background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
              <IconCheck size={14} /> Concordância clínica: <span className="font-mono" style={{ color: 'var(--brand-400)' }}>94.2%</span>
            </div>
            <div className="trust-pill" style={{ background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
              <IconUsers size={14} /> Triagens realizadas: <span className="font-mono" style={{ color: 'var(--brand-400)' }}>2.4M+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{ background: 'var(--navy)', color: 'rgba(255,255,255,0.7)', padding: '64px 0 32px' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
        <div className="col gap-3">
          <div className="row gap-3">
            <div className="logo-mark" />
            <div className="col" style={{ lineHeight: 1 }}>
              <span style={{ color: '#fff', fontFamily: 'Inter Tight', fontWeight: 700, fontSize: '1rem' }}>T.I.</span>
              <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Triagem Inteligente</span>
            </div>
          </div>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.55, maxWidth: 320 }}>
            HealthTech brasileira. Pré-atendimento inteligente para hospitais, clínicas e pacientes.
          </p>
          <div className="row gap-2" style={{ marginTop: 8 }}>
            <span className="trust-pill" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem' }}><IconLock size={12} />Criptografia end-to-end</span>
          </div>
        </div>
        {[
          { t: 'Produto', i: ['Triagem IA', 'Dashboard clínico', 'Telemedicina', 'API'] },
          { t: 'Empresa', i: ['Sobre', 'Conselho clínico', 'Carreiras', 'Imprensa'] },
          { t: 'Legal', i: ['Termos', 'Privacidade', 'LGPD', 'Cookies'] },
        ].map(col => (
          <div key={col.t} className="col gap-3">
            <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem' }}>{col.t}</div>
            {col.i.map(x => <a key={x} href="#" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem' }}>{x}</a>)}
          </div>
        ))}
      </div>
      <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24 }}>
        <span style={{ fontSize: '0.8125rem' }}>© 2026 T.I. Triagem Inteligente. CNPJ 00.000.000/0001-00.</span>
        <div className="cred-row">
          <span className="trust-pill" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>LGPD</span>
          <span className="trust-pill" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>ANVISA SaMD</span>
          <span className="trust-pill" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>CFM</span>
          <span className="trust-pill" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>ISO 27001</span>
        </div>
      </div>
    </div>
  </footer>
);

const LandingPage = ({ goSymptoms }) => (
  <div data-screen-label="01 Landing">
    <Nav onSymptoms={goSymptoms} />
    <Hero onSymptoms={goSymptoms} />
    <Partners />
    <HowItWorks />
    <TwoAudiences />
    <SecuritySection />
    <FinalCTA onSymptoms={goSymptoms} />
    <Footer />
  </div>
);

Object.assign(window, { LandingPage });
