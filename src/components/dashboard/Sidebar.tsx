import {
  LayoutDashboard,
  Heart,
  BarChart3,
  Bell,
  TrendingUp,
  Settings,
  User,
} from "lucide-react";
import type { PageId } from "../../App";

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  pageId: PageId;
}

const generalItems: MenuItem[] = [
  { icon: LayoutDashboard, label: "Visão Geral", pageId: "visao-geral" },
  { icon: Heart,           label: "Saúde",       pageId: "saude" },
  { icon: BarChart3,       label: "Estatísticas", pageId: "estatisticas" },
  { icon: Bell,            label: "Notificações", pageId: "notificacoes" },
  { icon: TrendingUp,      label: "Análises",     pageId: "analises" },
];

const toolsItems: MenuItem[] = [
  { icon: Settings, label: "Configurações", pageId: "configuracoes" },
  { icon: User,     label: "Perfil",        pageId: "perfil" },
];

function MenuItemComponent({
  icon: Icon,
  label,
  pageId,
  activePage,
  onNavigate,
}: MenuItem & { activePage: PageId; onNavigate: (p: PageId) => void }) {
  const active = activePage === pageId;
  return (
    <div
      onClick={() => onNavigate(pageId)}
      className={`
        flex items-center gap-3 px-3 py-2.5 rounded-[10px] cursor-pointer
        transition-all duration-150
        ${
          active
            ? "bg-[rgba(6,182,212,0.06)] border-l-[3px] border-l-[#06B6D4] text-[#06B6D4] font-semibold"
            : "text-[#64748B] hover:bg-[rgba(0,0,0,0.03)] border-l-[3px] border-l-transparent"
        }
      `}
    >
      <Icon size={18} strokeWidth={active ? 2 : 1.5} />
      <span className="text-sm">{label}</span>
    </div>
  );
}

function MenuSection({
  title,
  items,
  activePage,
  onNavigate,
}: {
  title: string;
  items: MenuItem[];
  activePage: PageId;
  onNavigate: (p: PageId) => void;
}) {
  return (
    <div className="mb-6">
      <div className="text-[10px] uppercase tracking-[1px] text-[#94A3B8] mb-3 px-3">
        {title}
      </div>
      <div className="space-y-0.5">
        {items.map((item) => (
          <MenuItemComponent
            key={item.pageId}
            {...item}
            activePage={activePage}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-[210px] min-h-full bg-[#F8FAFB] flex flex-col py-6 px-4 flex-shrink-0 border-r border-[#F1F5F9]">
      {/* Logo — JS monogram */}
      <div className="flex items-center gap-2.5 mb-8 px-3">
        <div className="w-8 h-8 rounded-[8px] bg-gradient-to-br from-[#22D3EE] to-[#0EA5E9] flex items-center justify-center shadow-sm flex-shrink-0">
          <span className="text-white font-black text-[13px] tracking-tight leading-none">JS</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[12px] font-black text-[#1E293B] leading-tight tracking-tight">Hospital JS</span>
          <span className="text-[9px] font-semibold text-[#06B6D4] uppercase tracking-wider leading-tight">Excelência</span>
        </div>
      </div>

      <nav className="flex-1">
        <MenuSection title="GERAL" items={generalItems} activePage={activePage} onNavigate={onNavigate} />
        <MenuSection title="FERRAMENTAS" items={toolsItems} activePage={activePage} onNavigate={onNavigate} />
      </nav>

      {/* Bottom user badge */}
      <div className="mt-auto pt-4 border-t border-[#F1F5F9]">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-[10px] hover:bg-[rgba(0,0,0,0.03)] cursor-pointer transition-colors">
          <img
            src="/avatar-william.jpg"
            alt="William Johnson"
            className="w-7 h-7 rounded-full object-cover border border-[#E2E8F0] flex-shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-semibold text-[#1E293B] truncate">William Johnson</span>
            <span className="text-[9px] text-[#94A3B8]">Paciente</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
