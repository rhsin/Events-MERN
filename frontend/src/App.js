import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import ShowEventList from './components/ShowEventList';
import CreateEvent from './components/CreateEvent';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowEventList />} />
          <Route path='/create-event' element={<CreateEvent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
