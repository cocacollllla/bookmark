import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import BookInfo from './pages/BookInfo/BookInfo';
import Main from './pages/Main/Main';
import Search from './pages/Main/Search/Search';
import Recording from './pages/Recording/Recording';

const Routing = () => {

  return (
    <Router>
      <Header />
 
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/search"} element={<Search />} />
        <Route path={"/bookinfo"} element={<BookInfo />} />
        <Route path={"/recording"} element={<Recording />} />
      </Routes>
        
    </Router>
  );
};
export default Routing;

