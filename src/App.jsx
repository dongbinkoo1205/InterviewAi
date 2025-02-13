import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavigateProvider } from './Context/NavigateContext';
import { QuestionProvider } from './Context/QuestionContext';
import MainPage from './components/MainPage';
import QuestionList from './components/QuestionList';
import SignUp from './components/SignUp';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavigateProvider>
                <QuestionProvider>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/QuestionList" element={<QuestionList />} />
                        <Route path="/SignUp" element={<SignUp />} />
                    </Routes>
                </QuestionProvider>
            </NavigateProvider>
        </ThemeProvider>
    );
}

export default App;
