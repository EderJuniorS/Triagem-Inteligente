import { Pill, Download, Clock, AlertTriangle, Tag, FileText, User, Calendar } from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────

const medications = [
  {
    name: "Losartana Potássica 50mg",
    dosage: "1 comprimido a cada 12h",
  },
  {
    name: "Metformina 850mg",
    dosage: "1 comprimido após o almoço",
  },
];

const tags = [
  { label: "Alérgico a Penicilina", variant: "red" as const },
  { label: "Hipertensão",           variant: "blue" as const },
  { label: "Diabetes Tipo 2",       variant: "blue" as const },
];

const labResults = [
  {
    date: "12/10/2023",
    exam: "Hemograma Completo",
    doctor: "Dr. Pedro Santos",
    status: "download" as const,
  },
  {
    date: "10/10/2023",
    exam: "Eletrocardiograma",
    doctor: "Dr. Éder Junior",
    status: "download" as const,
  },
  {
    date: "Hoje",
    exam: "Ressonância Magnética",
    doctor: "Dra. Ana Silva",
    status: "processing" as const,
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────

function SectionCard({
  title,
  icon: Icon,
  children,
  className = "",
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-[20px] border border-[#E2E8F0] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] ${className}`}>
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-[#22D3EE] to-[#0EA5E9] flex items-center justify-center flex-shrink-0">
          <Icon size={14} className="text-white" strokeWidth={2.2} />
        </div>
        <h3 className="text-[13px] font-bold text-[#1E293B]">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function MedicationItem({ name, dosage }: { name: string; dosage: string }) {
  return (
    <div className="flex items-start gap-3 p-3.5 rounded-[14px] bg-[#F8FAFB] border border-[#F1F5F9] hover:border-[#A5F3FC] transition-colors duration-150 group">
      <div className="w-8 h-8 rounded-[9px] bg-white border border-[#E2E8F0] flex items-center justify-center flex-shrink-0 shadow-sm group-hover:border-[#67E8F9] transition-colors">
        <Pill size={14} className="text-[#06B6D4]" strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#1E293B] leading-tight">{name}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <Clock size={10} className="text-[#94A3B8]" strokeWidth={1.8} />
          <p className="text-[11px] text-[#94A3B8]">{dosage}</p>
        </div>
      </div>
      <span className="text-[10px] font-semibold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] rounded-full px-2.5 py-1 flex-shrink-0 self-center">
        Em uso
      </span>
    </div>
  );
}

function ConditionTag({ label, variant }: { label: string; variant: "red" | "blue" }) {
  const styles =
    variant === "red"
      ? "bg-[#FFF1F2] border-[#FECDD3] text-[#BE123C]"
      : "bg-[#EFF6FF] border-[#BFDBFE] text-[#1D4ED8]";

  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold border rounded-full px-3 py-1.5 ${styles}`}>
      {variant === "red" ? (
        <AlertTriangle size={11} strokeWidth={2.2} />
      ) : (
        <Tag size={10} strokeWidth={2.2} />
      )}
      {label}
    </span>
  );
}

function LabTable() {
  return (
    <div className="overflow-hidden rounded-[14px] border border-[#F1F5F9]">
      {/* Table header */}
      <div className="grid grid-cols-[110px_1fr_160px_130px] bg-[#F8FAFB] border-b border-[#F1F5F9]">
        {["Data", "Exame", "Médico", "Status"].map((h) => (
          <div key={h} className="px-4 py-3">
            <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">{h}</span>
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#F8FAFB]">
        {labResults.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-[110px_1fr_160px_130px] items-center hover:bg-[#FAFCFF] transition-colors duration-100"
          >
            {/* Date */}
            <div className="px-4 py-3.5">
              <div className="flex items-center gap-1.5">
                <Calendar size={11} className="text-[#94A3B8]" strokeWidth={1.8} />
                <span
                  className={`text-[12px] font-semibold ${
                    row.date === "Hoje" ? "text-[#06B6D4]" : "text-[#475569]"
                  }`}
                >
                  {row.date}
                </span>
              </div>
            </div>

            {/* Exam */}
            <div className="px-4 py-3.5">
              <div className="flex items-center gap-2">
                <FileText size={13} className="text-[#CBD5E1] flex-shrink-0" strokeWidth={1.5} />
                <span className="text-[13px] font-semibold text-[#1E293B]">{row.exam}</span>
              </div>
            </div>

            {/* Doctor */}
            <div className="px-4 py-3.5">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#0EA5E9] flex items-center justify-center flex-shrink-0">
                  <User size={10} className="text-white" strokeWidth={2} />
                </div>
                <span className="text-[12px] text-[#475569] font-medium">{row.doctor}</span>
              </div>
            </div>

            {/* Status */}
            <div className="px-4 py-3.5">
              {row.status === "download" ? (
                <button className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-gradient-to-r from-[#22D3EE] to-[#0EA5E9] rounded-[8px] px-3 py-1.5 hover:opacity-90 active:scale-95 transition-all duration-150 shadow-sm">
                  <Download size={11} strokeWidth={2.2} />
                  Baixar PDF
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#92400E] bg-[#FFFBEB] border border-[#FDE68A] rounded-[8px] px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                  Em Análise
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function SaudePage() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#22D3EE] to-[#0EA5E9]" />
          <h1 className="text-[26px] font-black text-[#1E293B] leading-tight tracking-tight">
            Prontuário e Saúde
          </h1>
        </div>
        <p className="text-[13px] text-[#94A3B8] pl-3 font-medium">
          Histórico médico e acompanhamento clínico de William Johnson.
        </p>
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-[380px_1fr] gap-5">

        {/* ── Column 1 (Left) ── */}
        <div className="flex flex-col gap-5">

          {/* Medicações Atuais */}
          <SectionCard title="Medicações Atuais" icon={Pill}>
            <div className="space-y-3">
              {medications.map((med) => (
                <MedicationItem key={med.name} {...med} />
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
              <span className="text-[11px] text-[#94A3B8]">Última atualização: 10/10/2023</span>
              <span className="text-[10px] font-bold text-[#06B6D4] bg-[#E0F7FA] rounded-full px-2.5 py-1">
                {medications.length} ativas
              </span>
            </div>
          </SectionCard>

          {/* Alergias e Condições */}
          <SectionCard title="Alergias e Condições" icon={AlertTriangle}>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <ConditionTag key={tag.label} {...tag} />
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#F1F5F9]">
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Informar equipe médica sobre alergias antes de qualquer procedimento.
              </p>
            </div>
          </SectionCard>
        </div>

        {/* ── Column 2 (Right — wider) ── */}
        <div className="flex flex-col gap-5">
          <SectionCard title="Resultados de Exames" icon={FileText} className="flex-1">
            <LabTable />

            <div className="mt-4 pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
              <span className="text-[11px] text-[#94A3B8]">
                {labResults.length} exames registrados
              </span>
              <button className="text-[11px] font-semibold text-[#06B6D4] hover:underline transition-colors">
                Ver histórico completo →
              </button>
            </div>
          </SectionCard>
        </div>

      </div>
    </div>
  );
}
