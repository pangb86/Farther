import React from 'react';

const Footer = () => {
  return (
    <div className="footer-main">
      <div className="footer-links-one">
        <div className="footer-one-header">
          Affiliations
        </div>
        <a href="https://www.appacademy.io/" target="_blank">
          App Academy
        </a>
        <a href="https://www.osu.edu" target="_blank">
          The Ohio State University
        </a>
        <a href="https://en.wikipedia.org/wiki/Columbus,_Ohio" target="_blank">
          Columbus, OH
        </a>
      </div>

      <div className="footer-links-two">
        <div className="footer-one-header">
          Social
        </div>
        <a href="https://github.com/pangb86" target="_blank">
          Github
        </a>
        <a href="https://www.linkedin.com/in/bo-pang-83a321154" target="_blank">
          LinkedIn
        </a>
        <a href="https://www.strava.com/athletes/5732596" target="_blank">
          Strava
        </a>
      </div>
    </div>
  );
};

export default Footer;
