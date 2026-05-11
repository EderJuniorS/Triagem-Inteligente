import { useState } from "react";
import { Pill, FileText, Calendar, CheckCheck, Clock } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// TYPES & DATA
// ─────────────────────────────────────────────────────────────

type NotifVariant = "cyan" | "blue" | "orange";

interface Notification {
  id: number;
  icon: React.ElementType;
  variant: NotifVariant;
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    icon: Pill,
    variant: "cyan",
    title: "Lembrete de Medicação",
    description: "Está na hora de tomar Losartana Potássica 50mg.",
    time: "Agora mesmo",
    unread: true,
  },
  {
    id: 2,
    icon: FileText,
    variant: "blue",
    title: "Resultado de Exame Disponível",
    description:
      "O laudo do seu Hemograma Completo já está liberado para download.",
    time: "Há 2 horas",
    unread: true,
  },
  {
    id: 3,
    icon: Calendar,
    variant: "orange",
    title: "Consulta Próxima",
    description:
      "Sua consulta de rotina com o Dr. Éder Junior é amanhã às 09:30.",
    time: "Ontem",
    unread: false,
  },
];

// ─────────────────────────────────────────────────────────────
// VARIANT STYLES
// ─────────────────────────────────────────────────────────────

const variantConfig = {
  cyan: {
    iconBg: "bg-gradient-to-br from-[#22D3EE] to-[#06B6D4]",
    glow: "shadow-[0_0_16px_rgba(6,182,212,0.28)]",
    dot: "bg-[#06B6D4]",
    dotGlow: "shadow-[0_0_6px_rgba(6,182,212,0.7)]",
    ring: "ring-[#E0F7FA]",
  },
  blue: {
    iconBg: "bg-gradient-to-br from-[#60A5FA] to-[#3B82F6]",
    glow: "shadow-[0_0_16px_rgba(59,130,246,0.22)]",
    dot: "bg-[#3B82F6]",
    dotGlow: "shadow-[0_0_6px_rgba(59,130,246,0.5)]",
    ring: "ring-[#EFF6FF]",
  },
  orange: {
    iconBg: "bg-gradient-to-br from-[#FB923C] to-[#F97316]",
    glow: "",
    dot: "bg-[#F97316]",
    dotGlow: "",
    ring: "ring-[#FFF7ED]",
  },
};

// ─────────────────────────────────────────────────────────────
// NOTIFICATION CARD
// ─────────────────────────────────────────────────────────────

function NotificationCard({
  notif,
  onRead,
}: {
  notif: Notification;
  onRead: (id: number) => void;
}) {
  const cfg = variantConfig[notif.variant];
  const Icon = notif.icon;

  return (
    <div
      onClick={() => onRead(notif.id)}
      className={`
        relative flex items-start gap-4 px-5 py-4 rounded-[18px] cursor-pointer
        border transition-all duration-200 group
        ${
          notif.unread
            ? "bg-white border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.09)]"
            : "bg-[#FAFCFE] border-[#F1F5F9] shadow-none hover:bg-white hover:border-[#E2E8F0] hover:shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
        }
      `}
    >
      {/* Unread left accent stripe */}
      {notif.unread && (
        <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-[#22D3EE] to-[#0EA5E9]" />
      )}

      {/* Icon */}
      <div
        className={`
          w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 mt-0.5
          ring-4 ${cfg.ring}
          ${cfg.iconBg} ${notif.unread ? cfg.glow : ""}
        `}
      >
        <Icon size={17} className="text-white" strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-0.5">
          <p
            className={`text-[13px] leading-snug ${
              notif.unread
                ? "font-bold text-[#1E293B]"
                : "font-semibold text-[#475569]"
            }`}
          >
            {notif.title}
          </p>
        </div>
        <p className="text-[12px] text-[#64748B] leading-relaxed pr-6">
          {notif.description}
        </p>
        <div className="flex items-center gap-1.5 mt-2">
          <Clock size={10} className="text-[#94A3B8]" strokeWidth={1.8} />
          <span className="text-[10px] text-[#94A3B8] font-medium">{notif.time}</span>
        </div>
      </div>

      {/* Unread dot */}
      {notif.unread && (
        <div
          className={`
            w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5
            ${cfg.dot} ${cfg.dotGlow}
          `}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

export default function NotificacoesPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  const markOneRead = (id: number) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );

  return (
    <div className="max-w-[680px]">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#22D3EE] to-[#0EA5E9]" />
            <h1 className="text-[26px] font-black text-[#1E293B] leading-tight tracking-tight">
              Notificações
            </h1>
            {unreadCount > 0 && (
              <span className="ml-1 text-[10px] font-bold text-white bg-gradient-to-r from-[#22D3EE] to-[#0EA5E9] rounded-full px-2 py-0.5 leading-none">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-[13px] text-[#94A3B8] pl-3 font-medium">
            Avisos, lembretes e atualizações do seu prontuário.
          </p>
        </div>

        {/* Mark all read */}
        {unreadCount > 0 ? (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-[12px] font-semibold text-[#06B6D4] hover:text-[#0891B2] transition-colors duration-150"
          >
            <CheckCheck size={14} strokeWidth={2.2} />
            Marcar todas como lidas
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#94A3B8]">
            <CheckCheck size={14} strokeWidth={2} />
            Tudo lido
          </div>
        )}
      </div>

      {/* ── Feed ── */}
      <div className="flex flex-col gap-3">
        {/* Section label: Recentes */}
        <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest px-1 mb-1">
          Recentes
        </p>

        {notifications.map((notif) => (
          <NotificationCard key={notif.id} notif={notif} onRead={markOneRead} />
        ))}
      </div>

      {/* Empty state hint */}
      <div className="mt-6 pt-6 border-t border-dashed border-[#F1F5F9] text-center">
        <p className="text-[11px] text-[#CBD5E1]">
          Clique em uma notificação para marcá-la como lida.
        </p>
      </div>
    </div>
  );
}
