import "./App.css";
import Audio from "./page/Audio";
import Music from "./page/Music";
import { BrowserRouter, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Pitch Finder</h1>
        <Route path="/">
          <Audio />
        </Route>
        <Route path="/music">
          <Music />
        </Route>
      </div>
    </BrowserRouter>
  );
}
