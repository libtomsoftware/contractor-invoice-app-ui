import React from "react";

const Header = props => {
  const client = props.client,
    company = props.company,
    invoice = props.invoice;

  return (
    <div className="cp-invoice-header">
      <div className="cp-invoice-title">
        <h1>Invoice</h1>
        <p>
          <span>Invoice number</span> {invoice.number}
        </p>
        <p>
          <span>Invoice date</span> {invoice.date}
        </p>
        <p>
          <span>Period start / end date</span> {invoice.periodBoundaries}
        </p>
      </div>

      <div className="cp-invoice-contrahents">
        <div className="cp-invoice-bill-to">
          <p>
            <span>Bill to</span>
            {client.name}
          </p>
          <p>
            <span>Address</span>
            {client.address}
          </p>
        </div>

        <div className="cp-invoice-ship-to">
          <p>
            <span>Ship to</span>
            {company.name}
          </p>
          <p>
            <span>Address</span>
            {company.address}
          </p>
          <p>
            <span>Company Reg No</span>
            {company.reg}
          </p>
          {!invoice.isHideVatFields &&
            <p>
              <span>VAT Reg No</span>
              {company.vat}
            </p>
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
