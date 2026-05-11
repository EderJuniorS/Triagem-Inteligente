import TemperatureCard from "./TemperatureCard";
import BloodSugarCard from "./BloodSugarCard";
import BloodPressureCard from "./BloodPressureCard";

export default function VitalsCards() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <TemperatureCard />
      <BloodSugarCard />
      <BloodPressureCard />
    </div>
  );
}
