import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from './Components/Header';
import Landing from './Layout/Landing';


function App() {
  return (
    <BrowserRouter>
        <Header />
      <Routes>
        <Route path='/' element={<Landing/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
