// Main App + screen switcher

const App = () => {
  const [screen, setScreen] = React.useState('landing');

  const switchTo = (s) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setScreen(s), 80);
  };

  return (
    <>
      {screen === 'landing' && <LandingPage goSymptoms={() => switchTo('symptoms')} />}
      {screen === 'symptoms' && <SymptomsScreen goAnalysis={() => switchTo('analysis')} goLanding={() => switchTo('landing')} />}
      {screen === 'analysis' && <AnalysisScreen goResult={() => switchTo('result')} goSymptoms={() => switchTo('symptoms')} />}
      {screen === 'result' && <ResultScreen goDashboard={() => switchTo('dashboard')} goSymptoms={() => switchTo('symptoms')} />}
      {screen === 'dashboard' && <DashboardScreen goLanding={() => switchTo('landing')} />}

      <div className="screen-switcher" role="tablist" aria-label="Prototype navigation">
        {[
          ['landing', 'Landing'],
          ['symptoms', 'Sintomas'],
          ['analysis', 'Análise'],
          ['result', 'Resultado'],
          ['dashboard', 'Painel'],
        ].map(([id, label]) => (
          <button key={id} className={screen === id ? 'active' : ''} onClick={() => switchTo(id)}>{label}</button>
        ))}
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
