import { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";

const Thermostat = ({ temperature }: { temperature: number }) => {
  const [gaugeValue, setGaugeValue] = useState(0);

  useEffect(() => {
    const minTemp = 32; // Fahrenheit
    const maxTemp = 120; // Fahrenheit
    const gaugeRange = maxTemp - minTemp;
    const value = (temperature - minTemp) / gaugeRange;
    setGaugeValue(value);
  }, [temperature]);

  return (
    <div className="thermostat">
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={5}
        percent={gaugeValue}
        textColor="#000"
        hideText={true}
        animDelay={500}
        needleColor="#000"
        arcPadding={0.03}
      />
      <p>{temperature.toFixed(1)} °F</p>
    </div>
  );
};

export default Thermostat;
