import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import ShowEventList from './components/ShowEventList';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowEventList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
