import { Calendar, Clock } from "lucide-react";

const appointments = [
  {
    doctor: "Dr. Pedro Santos",
    specialty: "Clínica Geral",
    time: "Amanhã, 14:00",
    icon: Calendar,
  },
  {
    doctor: "Dr. Éder Junior",
    specialty: "Exames de Rotina",
    time: "15 de Out, 09:30",
    icon: Clock,
  },
];

export default function AppointmentsWidget() {
  return (
    <div className="rounded-[20px] bg-white border border-[#E2E8F0] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#1E293B]">Próximos Agendamentos</h3>
        <span className="text-[10px] font-semibold text-[#06B6D4] bg-[#E0F7FA] rounded-full px-2.5 py-0.5">
          {appointments.length} pendentes
        </span>
      </div>

      <div className="space-y-3">
        {appointments.map((appt, i) => {
          const Icon = appt.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-[12px] bg-[#F8FAFB] border border-[#F1F5F9] hover:border-[#A5F3FC] transition-colors duration-150 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#22D3EE] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-white" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#1E293B] truncate">{appt.doctor}</p>
                <p className="text-[11px] text-[#94A3B8]">{appt.specialty}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[11px] font-semibold text-[#06B6D4]">{appt.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
