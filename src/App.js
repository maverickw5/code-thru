import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Ide from './components/Ide';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Ide />} />
        
      </Routes>
    </Router>
  );
}

export default App;
