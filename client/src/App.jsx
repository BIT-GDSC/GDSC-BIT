import './App.css'
import { Routes, Route } from "react-router-dom";
import { Home } from './pages/Home'
import { Redirect } from './pages/Redirect'

function App () {
  return (
    <div>
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/events/pokeprompt" element={<Redirect route="game" />} />
        <Route exact path="/events/latest" element={<Redirect route="latest" />} />
      </Routes>
    </div>
  )
}

export default App
