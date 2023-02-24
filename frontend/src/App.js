import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ShowEventList from './components/ShowEventList';
import CreateEvent from './components/CreateEvent';
import ShowEventDetails from './components/ShowEventDetails';
import UpdateEventInfo from './components/UpdateEventInfo';
import './App.css';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Segoe UI Light'
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<ShowEventList />} />
          <Route path='/create-event' element={<CreateEvent />} />
          <Route path='/edit-event/:id' element={<UpdateEventInfo />} />
          <Route path='/show-event/:id' element={<ShowEventDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
