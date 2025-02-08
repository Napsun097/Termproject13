
import './App.css'
import Header from './Header/header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/home';
import Course from './Components/Course/course';
import Tgat from './Components/Course/tgat';
import Tpat from './Components/Course/tpat';
import Alevel from './Components/Course/alevel';
import MockExam from './Components/Course/mockexam';

function App() {

  return (
    
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
        <Routes>
          <Route path='/all-course' element={<Course/>} />
        </Routes>
        <Routes>
          <Route path='/tgat' element={<Tgat/>} />
        </Routes>
        <Routes>
          <Route path='/tpat' element={<Tpat/>} />
        </Routes>
        <Routes>
          <Route path='/a-level' element={<Alevel/>} />
        </Routes>
        <Routes>
          <Route path='/mock-exam' element={<MockExam />} />
        </Routes>
      </Router>
    
  )
}

export default App
