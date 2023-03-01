import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CreateEvent from './components/CreateEvent';
import MobileEventList from './components/mobile/MobileEventList';
import ShowEventDetails from './components/ShowEventDetails';
import ShowEventList from './components/ShowEventList';
import UpdateEventInfo from './components/UpdateEventInfo';
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
          <Route exact path='/' element={isDesktop ? <ShowEventList /> : <MobileEventList />} />
          <Route path='/create-event' element={<CreateEvent />} />
          <Route path='/edit-event/:id' element={<UpdateEventInfo />} />
          <Route path='/show-event/:id' element={<ShowEventDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
