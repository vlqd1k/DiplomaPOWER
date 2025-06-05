import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './pages/Header/Header';
import Home from './pages/Home/Home';
import Footer from './pages/footer/Footer';
import About from './pages/About';
import Service from './pages/calculatePower/calculatePower';
import { flowersData } from './flowers.data';
import { FlowerInfo } from './pages/FlowerInfo';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/calculate' element={<Service />}>




          {/* <Route index element={<Service />} />*/}

          {/* 
          {flowersData.map(({ path, image, title, alt, description }) => (
          <Route
            path={path}
            element={
              <FlowerInfo
                title={title}
                description={description.split("***").map((text, index) => (
                  <p style={{paddingLeft:"280px",paddingRight:"50px", paddingBottom:"20px"}} key={index}>{text}</p>
                ))}
                image={image}
                alt={alt}
              />
            }
          />
        ))} */}
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
