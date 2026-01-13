import React from 'react';
import "../styles/TopBar.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

function TopBar() {
  return (
    <div className="topbar">
      <div className="left-info">
        <span><PhoneIcon /> +961 76575289</span>
        <span><EmailIcon /> MRrental@gmail.com</span>
      </div>
      <div className="right-icons">
          <InstagramIcon /> <TwitterIcon /> <FacebookIcon /> <LinkedInIcon /><LinkedInIcon />
      </div>
    </div>
  );
}

export default TopBar;