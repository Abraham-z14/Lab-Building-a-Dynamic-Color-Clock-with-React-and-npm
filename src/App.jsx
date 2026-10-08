import { useEffect, useState } from "react";
import { format } from "date-fns";
import "./App.css";

function App() {
  const [time, setTime] = useState(new Date());
// Update the current time every second so the clock stays accurate.
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
// Convert the current time into a hue so the clock colors shift throughout the day.
  const secondsOfDay =
    time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  const hue = Math.round((secondsOfDay / 86400) * 360);
  const background = `hsl(${hue} 70% 60%)`;
  const text = `hsl(${(hue + 40) % 360} 90% 96%)`;
  const panelBackground = `hsla(${hue} 70% 50% / 0.18)`;

  return (
    <main className="clock" style={{ background, color: text }}>
      <section
        className="clock-panel"
        style={{
          background: panelBackground,
          borderColor: text,
        }}
      >
        <p className="label">Current time</p>
        <h1>{format(time, "h:mm:ss a")}</h1>
        <p className="date">{format(time, "EEEE, MMMM d, yyyy")}</p>
      </section>
    </main>
  );
}

export default App;