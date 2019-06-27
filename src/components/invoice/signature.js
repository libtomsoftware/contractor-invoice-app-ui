import React from "react";

const Signature = props => {
  return (
    <div className="cp-invoice-signature">
      <div className="cp-invoice-signature-details">
        <strong>{props.name}</strong>
        <p>{props.function}</p>
      </div>
    </div>
  );
};

export default Signature;
