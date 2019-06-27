import React from "react";

const BrandBar = props => {
  const { logoColor, logoWhite, name, website } = props.company;

  return (
    <div className="cp-invoice-brand-bar">
      <img
        src={logoWhite}
        className="cp-invoice-brand-bar-logo company-logo-white"
        alt={name}
      />
      <img
        src={logoColor}
        className="cp-invoice-brand-bar-logo company-logo-color"
        alt={name}
      />
      <a
        href={`//${website}`}
        target="_blank"
        className="cp-invoice-brand-bar-link"
      >
        {website}
      </a>
    </div>
  );
};

export default BrandBar;
