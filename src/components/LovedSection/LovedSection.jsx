import React from 'react';
import './LovedSection.css';

const LovedSection = () => {
  const logos = [
    { name: 'iBanFirst', src: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
    { name: 'lemlist', src: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
    { name: 'MakerLead', src: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
    { name: 'WebiSharp', src: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
    { name: 'SOCIALHACKRS', src: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
    { name: 'PINPOINT INTERACTIVE', src: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
    { name: 'BOLE', src: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
    { name: 'Awwwsome', src: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
  ];

  return (
    <section className="lovedSection">
      <div className="lovedSection__container">
        {logos.map((logo, index) => (
          <div key={index} className="lovedSection__logoWrapper">
            <img src={logo.src} alt={logo.name} className="lovedSection__logo" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LovedSection;