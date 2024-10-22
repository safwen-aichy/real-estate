import React from 'react'
import './Styles/home.css';
import Banner from './banner.js'
import Propositions from './propositions.js';
import { FloatButton } from 'antd';

function Home() {
    return (
      <div className="Home">
        <Banner/>
        <Propositions/>
        <FloatButton.BackTop></FloatButton.BackTop>
      </div>
    );
  }
  
  export default Home;