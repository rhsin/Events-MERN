import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import AdminPanel from './components/admin/AdminPanel';
import SignIn from './components/admin/SignIn';
import CreateEvent from './components/CreateEvent';
import EventDetails from './components/EventDetails';
import EventList from './components/EventList';
import MobileEventList from './components/mobile/MobileEventList';
import UpdateEvent from './components/UpdateEvent';
import { AuthContextProvider, useAuthState } from './firebase';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthState();
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

function App() {
  const isDesktop = useMediaQuery('(min-width: 700px)');

  const theme = createTheme({
    typography: {
      fontFamily: 'Segoe UI Light'
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={isDesktop ? <EventList /> : <MobileEventList />} />
            <Route path='/create-event' element={<CreateEvent />} />
            <Route path='/edit-event/:id' element={<UpdateEvent />} />
            <Route path='/show-event/:id' element={<EventDetails />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/admin' element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
