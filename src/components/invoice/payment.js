import React from 'react';

const Payment = (props) => {
    const {paymentMethod, bankName, sortCode, accountNumber, accountName} = props.paymentDetails;

    return (
        <div className="cp-invoice-payment">
            <strong>
                Payment method
            </strong>
            <p>{paymentMethod}</p>
            <p>&nbsp;</p>
            <p><span>Bank name</span>{bankName}</p>
            <p><span>Sort Code</span>{sortCode}</p>
            <p><span>Account number</span>{accountNumber}</p>
            <p><span>Account name</span>{accountName}</p>
        </div>
    );
};

export default Payment;
