import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Home.css';
import MainNav from '../components/MainNav/MainNav';
import DetailSection from '../components/DetailSection/DetailSection';
import HomeFormSection from '../components/HomeFormSection/HomeFormSection';
import MoreInfoSection from '../components/MoreInfoSection/MoreInfoSection';
import OurPartnerSection from '../components/OurPartnerSection/OurPartnerSection';
import FeatureSection from '../components/FeatureSection/FeatureSection';
import LovedSection from '../components/LovedSection/LovedSection';
import ContactUsSection from '../components/ContactUsSection/ContactUsSection';
import MainFooterSection from '../components/MainFooterSection/MainFooterSection';

export default function Home() {
  return (
    <div className="home-container">
      {/* <Navbar /> */}
      <MainNav />
      <DetailSection />
      <HomeFormSection />
      <MoreInfoSection />
      <OurPartnerSection />
      <FeatureSection />
      <LovedSection />
<ContactUsSection />
<MainFooterSection/>      
        </div>
  );
}