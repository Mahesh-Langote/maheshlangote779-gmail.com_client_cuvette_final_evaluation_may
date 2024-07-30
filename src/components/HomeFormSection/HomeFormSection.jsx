import React from 'react';
import welcomeImage from '../../assets/images/welcome.gif';
import Avatar from '../../assets/images/mahesh.png';
import './HomeFormSection.css';


const HomeFormSection = () => {
  return (
    <section className="HomeFormSection"><div className="HomeFormSection__tryItOut">
    <span>Try it out!</span>
    <svg className="HomeFormSection__arrow" viewBox="0 0 24 24">
      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
    </svg>
  </div>
      <h2 className="HomeFormSection__title">Replace your old school forms<br />with<br />chatbots</h2>
      <p className="HomeFormSection__description">
        Typebot is a better way to ask for information. It leads to an increase in customer satisfaction and retention and multiply by your conversion rate compared to classical forms.
      </p>
      
      <div className="HomeFormSection__content">
        
        <div className="HomeFormSection__formWrapper">
        <div className="HomeFormSection__comparisonWrong">
            <span className="HomeFormSection__icon">✕</span>
          </div>
          <div className="HomeFormSection__form">
            <div className="HomeFormSection__formField">
              <label htmlFor="name" className="HomeFormSection__label">Your name *</label>
              <input type="text" id="name" className="HomeFormSection__input" />
            </div>
            <div className="HomeFormSection__formField">
              <label htmlFor="email" className="HomeFormSection__label">Email *</label>
              <input type="email" id="email" className="HomeFormSection__input" />
            </div>
            <div className="HomeFormSection__formField">
              <label className="HomeFormSection__label">What services are you interested in? *</label>
              <div className="HomeFormSection__checkboxGroup">
                <label className="HomeFormSection__checkbox">
                  <input type="checkbox" /> Website Dev
                </label>
                <label className="HomeFormSection__checkbox">
                  <input type="checkbox" /> Content Marketing
                </label>
                <label className="HomeFormSection__checkbox">
                  <input type="checkbox" /> Social Media
                </label>
                <label className="HomeFormSection__checkbox">
                  <input type="checkbox" /> UIUX Design
                </label>
              </div>
            </div>
            <div className="HomeFormSection__formField">
              <label htmlFor="additional" className="HomeFormSection__label">Additional information *</label>
              <textarea id="additional" className="HomeFormSection__textarea"></textarea>
            </div>
            <button className="HomeFormSection__submit">Submit</button>
          </div>
          
        </div>
        <div className="HomeFormSection__chatWrapper">
        <div className="HomeFormSection__comparisonCorrect">
            <span className="HomeFormSection__icon">✓</span>
          </div>
          <div className="HomeFormSection__chat">
            <div className="HomeFormSection__chatHeader">
              <span>Welcome to RA (Insurance Agency)</span>
            </div>
            <div className="HomeFormSection__chatContent">
              <img src={welcomeImage} alt="Welcome" className="HomeFormSection__welcomeImage" />
              <div className="HomeFormSection__message">
                <img src={Avatar} alt="Avatar" className="HomeFormSection__avatar" />
                <span className="HomeFormSection__messageText">Welcome!</span>
              </div>
            </div>
            <div className="HomeFormSection__chatFooter">
              <button className="HomeFormSection__chatButton">Hi</button>
            </div>
          </div>
          
        </div>
      </div>
      
    </section>
  );
};

export default HomeFormSection;