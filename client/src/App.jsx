import './App.css'
import { Routes, Route } from "react-router-dom";
import { Home } from './pages/Home'
import { Redirect } from './pages/Redirect'
import Container from './components/Container';

function App() {
  return (
    <Container>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/events/pokeprompt" element={<Redirect route="game" />} />
        <Route exact path="/events/latest" element={<Redirect route="latest" />} />
      </Routes>
    </Container>
  )
}

export default App