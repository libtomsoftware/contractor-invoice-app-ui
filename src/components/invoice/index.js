import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import Header from "./header";
import BrandBar from "./brand-bar";
import ServicesListing from "./services-listing";
import Payment from "./payment";
import Signature from "./signature";
import InvoiceFooter from "./footer";
import "./invoice.css";

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
          <ServicesListing services={services} settings={settings} />
          <Payment paymentDetails={company.paymentDetails} />
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
  services: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    invoice: state.invoice,
    services: state.services
  };
}

export default connect(mapStateToProps)(Invoice);
