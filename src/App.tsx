import "@/App.css";
import Home from "@/page/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Music from "@/page/Music";
import Test from "@/page/Test";
import Header from "@/components/common/Header";
import Bottom from "@/assets/bottom.png";

export default function App() {
  const location = useLocation();

  return (
    <body>
      <div className="flex-1 p-5 grid custom-grid-template-rows">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/music" element={<Music />} />
          </Routes>
        </main>
      </div>

      {location.pathname === "/" && (
        <img src={Bottom} alt="홈페이지 하단 이미지" />
      )}
    </body>
  );
}
