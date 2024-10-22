import React from 'react';
import './Styles/banner.css';
import Searchbar from './searchbar';


function Banner() {

  return (
    <div className="Banner">
      <div className="BannerShadow">
        <p className="motto"><b>Unveil Your Ideal Property</b></p>
        <Searchbar/>
      </div>
    </div>
  );
}

export default Banner;
