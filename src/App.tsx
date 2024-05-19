import "@/App.css";
import Home from "@/page/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Music from "@/page/Music";
import Test from "@/page/Test";
import Header from "@/components/common/Header";

export default function App() {
  return (
    <BrowserRouter>
      <html lang="kor">
        <body className="max-w-[440px] min-h-screen m-auto bg-white p-4 bg-img">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<Test />} />
              <Route path="/music" element={<Music />} />
            </Routes>
          </main>
        </body>
      </html>
    </BrowserRouter>
  );
}
