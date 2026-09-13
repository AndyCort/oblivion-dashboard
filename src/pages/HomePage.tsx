import { useState, useEffect } from "react";
import styled from "styled-components";

interface Props {
  isActive: boolean;
}

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const Quote =
  'childhood trauma doesn\'t "build character" it destroys you before you are even able to start growing';
const Author = "Anonymous";
export function HomePage({ isActive }: Props) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");

  const hour = time.getHours();
  const greeting =
    hour < 6
      ? "Good night"
      : hour < 12
        ? "Good morning"
        : hour < 18
          ? "Good afternoon"
          : hour < 23
            ? "Good evening"
            : "Good night";

  return (
    <section className={`page ${isActive ? "active" : ""}`} id="home">
      <HomeContent>
        <div className="eyebrow">{greeting}</div>
        <div className="clock" id="clock">
          {hh}:{mm}
        </div>
        <div className="date" id="date">
          {months[time.getMonth()]} {time.getDate()}
        </div>
        <div className="subdate" id="weekday">
          {weekdays[time.getDay()]} · {time.getFullYear()}
        </div>

        <div className="quote">
          {Quote}
          <small>— {Author}</small>
        </div>
      </HomeContent>
    </section>
  );
}

const HomeContent = styled.div`
  width: min(1000px, 82vw);
  position: relative;
  margin-top: 1vh;

  .eyebrow {
    font-size: 11px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 22px;
  }
  .clock {
    font-size: clamp(64px, 15vw, 210px);
    line-height: 0.82;
    letter-spacing: -0.065em;
    font-weight: 400;
  }
  .date {
    margin-top: 27px;
    font-family: "Playfair Display", Georgia, serif;
    font-size: clamp(24px, 3vw, 43px);
    letter-spacing: -0.02em;
  }
  .subdate {
    margin-top: 8px;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .quote {
    position: absolute;
    right: 0;
    bottom: 4px;
    width: 30vw;
    font-family: "Playfair Display", Georgia, serif;
    font-size: 18px;
    line-height: 1.55;

    @media (max-width: 720px) {
      position: relative;
      margin-top: 40px;
      right: auto;
      bottom: auto;
    }
  }
  .quote small {
    display: block;
    margin-top: 12px;
    font-family: "DM Sans", system-ui, sans-serif;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
  }
`;
