import React from 'react';
import eLearningImg from '../images/elearning.jpg';


const Intro = props => (
  <div className="billboard-container">
    <img src={eLearningImg} alt="billboard" className="billboard-image"/>
      <div className="billboard">
        <h2>Learn. Master. Thrive.</h2>
        <p className="details">Begin your journey to learning a new skill today.</p>
      </div>
  </div>

);

export default Intro;

