import './App.css';
import { Routes, Route } from "react-router-dom";
import Container from './components/Container';
import Home from './pages/Home';
import Redirect from './pages/Redirect';
import VerifyCertificate from './pages/VerifyCertificate';

function App() {
  return (
    <Container>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/events/pokeprompt" element={<Redirect route="game" />} />
        <Route exact path="/events/latest" element={<Redirect route="latest" />} />
        <Route path="/cert/verify/:certificateID" element={<VerifyCertificate />} />
      </Routes>
    </Container>
  )
}

export default App