import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import RealTimeGraph from "./components/RealTimeGraph";
import PercentageCircle from "./components/PercentageCircle";
import Thermostat from "./components/Thermostat";
import DynamicCircle from "./components/DynamicCricle";

const App = () => {
  const PROD = "false";
  const [percentage, setPercentage] = useState(0);
  const [page, setPage] = useState(1);

  const updatePercentage = (value: number) => {
    setPercentage(Math.abs(Math.round(value * 100)));
  };

  const onSwiped = (direction: unknown) => {
    if (direction === "Left" && page < 3) {
      setPage(page + 1);
    } else if (direction === "Right" && page > 1) {
      setPage(page - 1);
    } else if (direction === "Right" && page === 1) {
      setPage(3);
    } else if (direction === "Left" && page === 3) {
      setPage(1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => onSwiped("Left"),
    onSwipedRight: () => onSwiped("Right"),
  });

  const [temperature, setTemperature] = useState(70);
  const [y, setY] = useState(0);
  const [particleSize, setParticleSize] = useState(0);

  useEffect(() => {
    // Function to set the default values
    const setDefaults = () => {
      setTemperature(70);
      setY(80);
      setParticleSize(1200);
    };

    if (PROD === "false") {
      setDefaults();
      return; // Skip the WebSocket connection in development mode
    }

    const ws = new WebSocket(
      "wss://excellent-memory-production.up.railway.app"
    );

    ws.onopen = () => {
      console.log("Connected to server");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // convert data.temperature to Fahrenheit
      data.temperature = (data.temperature * 9) / 5 + 32;
      setTemperature(data.temperature);
      setY(data.humidity);
      setParticleSize(data.particleSize);
      console.log(y);
      console.log(temperature);
      console.log(particleSize);
    };

    ws.onclose = () => {
      console.log("Disconnected from server");
    };

    ws.onerror = () => {
      console.log("Error with server connection");
    };

    // Clean up the effect by closing the WebSocket connection when the component unmounts
    return () => ws.close();
  }, [temperature, y, particleSize]);

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <>
            <RealTimeGraph onDataUpdate={updatePercentage} y={y} />
            <PercentageCircle percentage={percentage} />
          </>
        );
      case 2:
        return (
          <>
            <h2 className="centered-number font-extrabold">Temperature</h2>
            <div>
              <Thermostat temperature={temperature} />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="centered-number">Particle Size</h2>
            <div>
              <DynamicCircle number={particleSize} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-4xl">Tricorder Readings</h1>
      </header>
      <main {...swipeHandlers}>{renderPage()}</main>
    </div>
  );
};

export default App;
