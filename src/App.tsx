import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './scenes/HomePage';
import LoginPage from './scenes/LoginPage';
import ProfilePage from './scenes/ProfilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import RegisterPage from './scenes/RegisterPage';

const App = () => {
  const mode = useSelector((state: any) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state: any) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/register" element={!isAuth ? <RegisterPage /> : <Navigate to="/" />} />
            <Route path="/login" element={!isAuth ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/" element={isAuth ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
