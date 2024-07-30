import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import './DetailSection.css';
import dashboardImage from '../../assets/images/DetailSectionHome.png';
import triangleImage from '../../assets/images/triangle.svg';
import halfcircle from '../../assets/images/halfcicrle.svg';

const DetailSection = () => {
  return (
    <section className="DetailSection">
      <div className="DetailSection__header">
        <h1 className="DetailSection__title">Build advanced chatbots visually</h1>
        <p>Typebot gives you powerful blocks to create unique chat experiences. Embed them
          anywhere on your web/mobile apps and start collecting results like magic.</p>
        {/* <button className="DetailSection__button" onClick={window.location.href = '/'}>Create a FormBot for free</button> */}

        <Link to="/workspace" className="DetailSection__button"> Create a FormBot for free </Link>
      </div>
      <div className="DetailSection__content">
        <div className="DetailSection__shapes">
          <div className="DetailSection__triangle">
            <img src={triangleImage} alt="Triangle" />
          </div>
          <div className="DetailSection__arc">
            <img src={halfcircle} alt="Triangle" />
          </div>
        </div>
        <div className="DetailSection__dashboard">
          <img
            src={dashboardImage}
            alt="FormBot Dashboard"
            className="DetailSection__dashboardImage"
          />
        </div>
      </div>
    </section>
  );
};

export default DetailSection;