import './style/App.css';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Tgat from './pages/Tgat';
import Tpat from './pages/Tpat';
import Alevel from './pages/Alevel';
import MockExam from './pages/MockExam';
import Footer from './Components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tgat" element={<Tgat />} />
          <Route path="/tpat" element={<Tpat />} />
          <Route path="/a-level" element={<Alevel />} />
          <Route path="/mock-exam" element={<MockExam />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
