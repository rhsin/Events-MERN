import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CreateEvent from './components/CreateEvent';
import EventDetails from './components/EventDetails';
import EventList from './components/EventList';
import MobileEventList from './components/mobile/MobileEventList';
import UpdateEvent from './components/UpdateEvent';
import './App.css';

function App() {
  const isDesktop = useMediaQuery('(min-width: 700px)');

  const theme = createTheme({
    typography: {
      fontFamily: 'Segoe UI Light'
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={isDesktop ? <EventList /> : <MobileEventList />} />
          <Route path='/create-event' element={<CreateEvent />} />
          <Route path='/edit-event/:id' element={<UpdateEvent />} />
          <Route path='/show-event/:id' element={<EventDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
