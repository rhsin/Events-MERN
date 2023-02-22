import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowEventList from './components/ShowEventList';
import CreateEvent from './components/CreateEvent';
import ShowEventDetails from './components/ShowEventDetails';
import UpdateEventInfo from './components/UpdateEventInfo';
import CreateCategory from './components/category/CreateCategory';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowEventList />} />
          <Route path='/create-event' element={<CreateEvent />} />
          <Route path='/edit-event/:id' element={<UpdateEventInfo />} />
          <Route path='/show-event/:id' element={<ShowEventDetails />} />
          <Route path='/create-category' element={<CreateCategory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
