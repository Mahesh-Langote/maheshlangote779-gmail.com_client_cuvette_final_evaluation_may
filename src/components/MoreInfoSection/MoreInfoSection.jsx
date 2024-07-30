import React from 'react';
import builderEnd from '../../assets/images/builder-dnd.webp';
import nativefeeling from '../../assets/images/native-feeling.webp';
import './MoreInfoSection.css';

const MoreInfoSection = () => {
  return (
    <section className="MoreInfoSection">
      <div className="MoreInfoSection__item">
        <div className="MoreInfoSection__imageWrapper MoreInfoSection__imageWrapper--blue">
          <img src={builderEnd} alt="Easy building experience" className="MoreInfoSection__image" />
        </div>
        <div className="MoreInfoSection__content">
          <h3 className="MoreInfoSection__title">Easy building experience</h3>
          <p className="MoreInfoSection__description">
            All you have to do is drag and drop blocks to create your typebot. You can customize your bot's design until it fits your brand perfectly.
          </p>
        </div>
      </div>
      <div className="MoreInfoSection__item MoreInfoSection__item--reverse">
        <div className="MoreInfoSection__imageWrapper MoreInfoSection__imageWrapper--orange">
          <img src={nativefeeling} alt="Embed it in a click" className="MoreInfoSection__image" />
        </div>
        <div className="MoreInfoSection__content">
          <h3 className="MoreInfoSection__title">Embed it in a click</h3>
          <p className="MoreInfoSection__description">
            Embedding your typebot in your application is a walk in the park. Typebot gives you several easy-to-copy options, from a simple HTML snippet to React or Javascript code. Your typebot will always feel "native".
          </p>
        </div>
      </div>
    </section>
  );
};

export default MoreInfoSection;