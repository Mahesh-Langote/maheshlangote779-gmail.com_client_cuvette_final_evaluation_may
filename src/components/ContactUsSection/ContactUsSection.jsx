import React from 'react';
import './ContactUsSection.css';

import triangleImage from '../../assets/images/triangle.svg';
import halfcircle from '../../assets/images/halfcicrle.svg';
const ContactUsSection = () => {
  return (
    <section className="contactUsSection">
      <div className="contactUsSection__container">
        <div className="contactUsSection__shape contactUsSection__shape--left"><img src={triangleImage} alt="Triangle" /></div>
        <div className="contactUsSection__content">
          <h2>Improve conversion and user  engagement <br />
          with FormBots </h2>
          <button className="contactUsSection__button" onClick={() => window.location.href = '/dashboard'}>Create a FormBot</button>
          <p className="contactUsSection__text">No trial. Generous free plan.</p>
        </div>
        <div className="contactUsSection__shape contactUsSection__shape--right"> <img src={halfcircle} alt="Triangle" /></div>
      </div>
    </section>
  );
};

export default ContactUsSection;