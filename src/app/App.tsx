import { RadioPlayer } from "./components/RadioPlayer";

export default function App() {
  return (
    <div
      className="size-full flex items-center justify-center"
      style={{ background: "#d7d7d7", minHeight: "100vh" }}
    >
      <RadioPlayer />
    </div>
  );
}
