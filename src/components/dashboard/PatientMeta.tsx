const metaData = [
  { value: "34", label: "Anos" },
  { value: "180", label: "Altura, cm" },
  { value: "78", label: "Peso, kg" },
  { value: "A+", label: "Tipo Sanguíneo" },
];

export default function PatientMeta() {
  return (
    <div className="flex gap-10 mb-7">
      {metaData.map((item) => (
        <div key={item.label} className="flex flex-col">
          <span className="text-xl font-semibold text-[#1E293B]">{item.value}</span>
          <span className="text-[11px] text-[#94A3B8] mt-0.5">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
