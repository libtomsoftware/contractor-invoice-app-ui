import React from "react";

const Payment = props => {
  const { showInternationalBankNumber } = props.invoice;
  const {
    bankName,
    sortCode,
    accountNumber,
    accountName,
    internationalBankNumber,
    swift
  } = props.paymentDetails;

  return (
    <div className="cp-invoice-payment">
      <strong>Payment method</strong>

      {!showInternationalBankNumber &&
        <p>Direct Bank Transfer</p>
      }
      {showInternationalBankNumber &&
        <p>International Bank Transfer</p>
      }
      <p>&nbsp;</p>
      <p>
        <span>Bank name</span>
        {bankName}
      </p>
      {!showInternationalBankNumber &&
        <div>
          <p>
            <span>Sort Code</span>
            {sortCode}
          </p>
          <p>
            <span>Account number</span>
            {accountNumber}
          </p>
          <p>
            <span>Account name</span>
            {accountName}
          </p>
        </div>
      }
      {showInternationalBankNumber &&
        <div>
          <p>
            <span>IBAN</span>
            {internationalBankNumber}
          </p>
          <p>
            <span>SWIFT</span>
            {swift}
          </p>
        </div>
      }
    </div>
  );
};

export default Payment;
