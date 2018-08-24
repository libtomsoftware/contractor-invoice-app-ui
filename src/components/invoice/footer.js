import React from 'react';

const InvoiceFooter = (props) => {
    return (
        <div className="cp-invoice-footer">
            <p className="cp-invoice-footer-greetings">{props.greetings}</p>
            <div className="cp-invoice-footer-border">
                <div className="cp-invoice-footer-border-left" />
                <div className="cp-invoice-footer-border-inner" />
                <div className="cp-invoice-footer-border-right" />
                <div className="cp-invoice-footer-border-mask" />
            </div>
        </div>
    );
};

export default InvoiceFooter;
