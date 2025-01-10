import Calendar from "./components/calendar";

export default function Home() {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        Next.js Calendar
      </h1>
      <Calendar />
    </div>
  );
}
