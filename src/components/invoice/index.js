import "./invoice.css";

import React, { Component } from "react";

import BrandBar from "./brand-bar";
import Header from "./header";
import InvoiceFooter from "./footer";
import Payment from "./payment";
import { PropTypes } from "prop-types";
import ServicesListing from "./services-listing";
import Signature from "./signature";
import { connect } from "react-redux";

class Invoice extends Component {
  constructor() {
    super();
    this.invoice = {};
  }

  render() {
    const {
      settings,
      invoice,
      company,
      client,
      services,
      isExistingInvoice
    } = this.props;

    return (
      <div className="cp-invoice">
        {isExistingInvoice && (
          <div className="cp-existing-invoice-ribbon">
            <span>existing invoice</span>
          </div>
        )}
        <BrandBar company={company} />
        <div className="cp-invoice-inner">
          <Header client={client} company={company} invoice={invoice} />
          <ServicesListing invoice={invoice} services={services} settings={settings} />
          <Payment paymentDetails={company.paymentDetails} invoice={invoice} />
          <Signature
            name={company.representative.name}
            function={company.representative.function}
          />
          <InvoiceFooter greetings={settings.greetings} />
        </div>
      </div>
    );
  }
}

Invoice.propTypes = {
  client: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  services: PropTypes.array
};

function mapStateToProps(state) {
  return {
    invoice: state.invoice,
    services: state.services
  };
}

export default connect(mapStateToProps)(Invoice);
