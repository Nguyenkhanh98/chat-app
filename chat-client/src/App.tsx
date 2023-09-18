import { Suspense } from "react";
import "./App.css";
import Routes from "@/routers";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes />
    </Suspense>
  );
}

export default App;
