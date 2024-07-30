import React from 'react';
import './FeatureSection.css';

const FeatureSection = () => {
  const features = [
    {
      icon: '👤',
      title: 'Hidden fields',
      description: 'Include data in your form URL to segment your user and use its data directly in your form.'
    },
    {
      icon: '👥',
      title: 'Team collaboration',
      description: 'Invite your teammates to work on your typebots with you'
    },
    {
      icon: '🔗',
      title: 'Link to sub typebots',
      description: 'Reuse your typebots in different parent bots.'
    },
    {
      icon: '🧮',
      title: 'Custom code',
      description: 'Customize everything with your own javascript & CSS code'
    },
    {
      icon: '🌐',
      title: 'Custom domain',
      description: 'Connect your typebot to the custom URL of your choice'
    },
    {
      icon: '📁',
      title: 'Folder management',
      description: 'Organize your typebots in specific folders to keep it clean and work with multiple clients'
    }
  ];

  return (
    <div className="featureSection">
      <h2 className="featureSection__title">Typebot makes form building easy and comes with powerful features</h2>
      <div className="featureSection__grid">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="featureSection__card">
      <div className="featureSection__iconContainer">
        <span className="featureSection__icon">{icon}</span>
      </div>
      <h3 className="featureSection__cardTitle">{title}</h3>
      <p className="featureSection__cardDescription">{description}</p>
    </div>
  );
};

export default FeatureSection;