import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Boards from "./components/boards/boards/Boards";
import BoadrDetail from "./components/boards/board-details/BoadrDetails";

function App() {
  return (
    <div style={{ minHeight: "100%" }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Boards />} />
          <Route index path="/:id" element={<BoadrDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
