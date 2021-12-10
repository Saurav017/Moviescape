import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import MainNav from './components/Navbar/MainNav'
import { Container } from '@mui/material'
import { Routes, Route } from 'react-router'
import Trending from './pages/Trending';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Search from './pages/Search';

const App = () => {
    return (
      <React.Fragment>
        <Header />
        <main>
          <Container>
            <Routes>
              <Route path="/" exact element={<Trending />} />
                <Route path="/movies" exact element={<Movies />} />
                <Route path="/series" exact element={<Series />} />
                <Route path="/search" exact element={<Search />} />          
               </Routes>     
           </Container>     
            </main>
            <MainNav />
            
      </React.Fragment>
    );
}

export default App
