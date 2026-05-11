import { Bell } from "lucide-react";

export default function PatientHeader() {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <p className="text-[13px] text-[#94A3B8] mb-1">Bom dia,</p>
        <h1 className="text-[28px] font-bold text-[#1E293B] leading-tight">
          William Johnson
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer">
          <Bell size={20} className="text-[#64748B]" strokeWidth={1.5} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#EF4444] border-2 border-white" />
        </div>
        <img
          src="/avatar-william.jpg"
          alt="William Johnson"
          className="w-9 h-9 rounded-full object-cover border-2 border-[#E2E8F0]"
        />
      </div>
    </div>
  );
}
