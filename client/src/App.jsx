import './App.css';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Container from './components/Container';
import Protected from './pages/Protected';
import Home from './pages/Home';
import Redirect from './pages/Redirect';
import VerifyCertificate from './pages/Certificate/VerifyCertificate';
import Auth from './pages/Auth';
import Test from './pages/Test';
import { useLoginStore } from './store/useAuthStore';

function App() {
  const location = useLocation();
  const { loadUser } = useLoginStore();

  useEffect(() => {
    if (location.pathname !== '/auth') loadUser();
  }, [location.pathname]);


  return (
    <>
      <Container>
        <Routes>
          <Route path="/auth" element={<Auth />} />

          <Route path="/test" element={<Protected />}>
            <Route index element={<Test />} />
          </Route>

          <Route path="/" element={<Home />} />

          <Route exact path="/events/pokeprompt" element={<Redirect route="game" />} />

          <Route exact path="/events/latest" element={<Redirect route="latest" />} />

          <Route path="/cert/verify/:certificateID" element={<VerifyCertificate />} />
        </Routes>
      </Container>
    </>
  )
}

export default App