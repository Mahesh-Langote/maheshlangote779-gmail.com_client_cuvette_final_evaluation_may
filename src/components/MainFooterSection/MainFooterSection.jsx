import React from 'react';
import './MainFooterSection.css';

const MainFooterSection = () => {
  const footerColumns = [
    {
      title: 'Made with ❤️ by Baptiste',
      links: []
    },
    {
      title: 'Status',
      links: ['Documentation', 'Roadmap', 'Pricing']
    },
    {
      title: 'Discord',
      links: ['GitHub repository', 'Twitter', 'LinkedIn', 'OSS Friends']
    },
    {
      title: 'About',
      links: ['Contact', 'Terms of Service', 'Privacy Policy']
    }
  ];

  return (
    <footer className="mainFooter">
      <div className="mainFooter__container">
        {footerColumns.map((column, index) => (
          <div key={index} className="mainFooter__column">
            <h3 className="mainFooter__title">{column.title}</h3>
            {column.links.length > 0 && (
              <ul className="mainFooter__list">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="mainFooter__item">
                    <a href="#" className="mainFooter__link">{link}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default MainFooterSection;