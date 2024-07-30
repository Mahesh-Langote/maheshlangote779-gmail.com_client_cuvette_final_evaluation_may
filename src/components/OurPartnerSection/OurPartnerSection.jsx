import React, { useEffect, useRef } from 'react';
import './OurPartnerSection.css';

const partnerLogos = [
  { name: 'Gmail', url: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
  { name: 'Mailchimp', url: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
  { name: 'Notion', url: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
  { name: 'Webflow', url: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
  { name: 'WordPress', url: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
  { name: 'Google Calendar', url: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
  { name: 'Make', url: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
  { name: 'Google Drive', url: 'https://example.com/google-drive-logo.png' },
  { name: 'Slack', url: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
  { name: 'Shopify', url: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
  { name: 'Airtable', url: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
  { name: 'Google Sheets', url: 'https://example.com/google-sheets-logo.png' },
  { name: 'Zapier', url: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
  { name: 'Crunchbase', url: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
  { name: 'Salesforce', url: 'https://mahesh-langote.github.io/MaheshLangote/mahesh.png' },
];

const OurPartnerSection = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const scrollWidth = scrollContainer.scrollWidth;
      const clientWidth = scrollContainer.clientWidth;

      let scrollPosition = 0;
      const scroll = () => {
        scrollPosition += 1;
        if (scrollPosition > scrollWidth - clientWidth) {
          scrollPosition = 0;
        }
        scrollContainer.scrollTo(scrollPosition, 0);
      };

      const intervalId = setInterval(scroll, 50);

      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <section className="OurPartnerSection">
      <div className="OurPartnerSection__scrollContainer" ref={scrollRef}>
        <div className="OurPartnerSection__grid">
          {partnerLogos.map((partner, index) => (
            <div key={index} className="OurPartnerSection__logoWrapper">
              <img src={partner.url} alt={partner.name} className="OurPartnerSection__logo" />
            </div>
          ))}
        </div>
      </div>
      <div className="OurPartnerSection__content">
        <h2 className="OurPartnerSection__title">Integrate with any platform</h2>
        <p className="OurPartnerSection__description">
          Typebot offers several native integrations blocks as well as instructions on how to embed typebot on particular platforms
        </p>
      </div>
    </section>
  );
};

export default OurPartnerSection;