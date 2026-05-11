import { useState } from "react";
import Sidebar from "./components/dashboard/Sidebar";
import PatientHeader from "./components/dashboard/PatientHeader";
import PatientMeta from "./components/dashboard/PatientMeta";
import VitalsCards from "./components/dashboard/VitalsCards";
import HeartRateChart from "./components/dashboard/HeartRateChart";
import AnatomyPanel from "./components/dashboard/AnatomyPanel";
import AppointmentsWidget from "./components/dashboard/AppointmentsWidget";
import TriageWidget from "./components/dashboard/TriageWidget";
import SaudePage from "./components/dashboard/SaudePage";
import EstatisticasPage from "./components/dashboard/EstatisticasPage";
import NotificacoesPage from "./components/dashboard/NotificacoesPage";
import AnalisesPage from "./components/dashboard/AnalisesPage";

export type PageId =
  | "visao-geral"
  | "saude"
  | "estatisticas"
  | "notificacoes"
  | "analises"
  | "configuracoes"
  | "perfil";

function PlaceholderPage({ label }: { label: string }) {
  return (
    <main
      className="flex-1 overflow-y-auto p-8 bg-white flex items-center justify-center"
      style={{ animation: "fadeSlideIn 0.22s ease both" }}
    >
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#0EA5E9] flex items-center justify-center mx-auto mb-4 opacity-30">
          <span className="text-white font-black text-xl">JS</span>
        </div>
        <p className="text-[#94A3B8] text-sm font-medium">{label} — Em desenvolvimento</p>
      </div>
    </main>
  );
}

const pageWrapper = (children: React.ReactNode) => (
  <main
    className="flex-1 overflow-y-auto p-8 bg-white"
    style={{ animation: "fadeSlideIn 0.22s ease both" }}
  >
    {children}
  </main>
);

export default function App() {
  const [activePage, setActivePage] = useState<PageId>("visao-geral");

  return (
    <div className="w-screen h-screen bg-white flex overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      {activePage === "visao-geral" && (
        <>
          {pageWrapper(
            <>
              <PatientHeader />
              <PatientMeta />
              <VitalsCards />
              <HeartRateChart />
              <div className="grid grid-cols-2 gap-4 mt-6">
                <AppointmentsWidget />
                <TriageWidget />
              </div>
            </>
          )}
          <AnatomyPanel />
        </>
      )}

      {activePage === "saude"        && pageWrapper(<SaudePage />)}
      {activePage === "estatisticas" && pageWrapper(<EstatisticasPage />)}
      {activePage === "notificacoes" && pageWrapper(<NotificacoesPage />)}
      {activePage === "analises"     && pageWrapper(<AnalisesPage />)}
      {activePage === "configuracoes" && <PlaceholderPage label="Configurações" />}
      {activePage === "perfil"       && <PlaceholderPage label="Perfil" />}

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
