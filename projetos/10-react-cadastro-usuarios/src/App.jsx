import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cadastro from "./pages/Cadastro";
import Listagem from "./pages/Listagem";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/usuarios" element={<Listagem />} />
      </Routes>
    </>
  );
}

export default App;
