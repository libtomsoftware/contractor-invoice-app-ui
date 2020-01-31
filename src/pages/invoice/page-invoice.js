import React, { Component } from "react";
import history from "../../providers/history.js";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { bindActionCreators } from "redux";
import * as clientActions from "../../actions/client-actions";
import * as companyActions from "../../actions/company-actions";
import * as settingsActions from "../../actions/settings-actions";
import * as servicesActions from "../../actions/services-actions";
import * as loaderActions from "../../actions/loader-actions";
import * as invoiceActions from "../../actions/invoice-actions";
import DataLoader from "../../services/data-loader";
import Invoice from "../../components/invoice";
import InvoiceQuickMenu from "../../components/invoice/quick-menu";
import InvoiceActions from "../../components/invoice/invoice-actions";
import Footer from "../../components/common/footer/footer";
import { withRouter } from "react-router";
import "./page-invoice.css";

class PageInvoice extends Component {
  constructor() {
    super();

    this.saveInvoice = this.saveInvoice.bind(this);
    this.createNewInvoice = this.createNewInvoice.bind(this);

    this.state = {
      isExistingInvoice: false
    };
  }

  componentWillMount() {
    const { location } = this.props;
    const isExisting = location.pathname.includes("invoice-existing");

    this.setState({
      isExistingInvoice: isExisting
    });

    if (isExisting) {
      return;
    }

    DataLoader.load(this.props, ["settings", "company", "client", "services"]);
  }

  saveInvoice() {
    const { company, client, invoice, services, settings } = this.props;
    const data = {
      client,
      company,
      invoice,
      services,
      settings
    };

    this.props.actions.invoice.save(data);
  }

  viewAllInvoices() {
    history.push("/");
  }

  createNewInvoice() {
    this.setState({
      isExistingInvoice: false
    });
    history.push("/invoice");
  }

  printExistingInvoice() {
    window.print();
  }

  render() {
    const { company, client, settings } = this.props;
    const { isExistingInvoice } = this.state;
    const hasEnoughInvoiceData = !!company && !!client && !!settings;

    return (
      <div className="page page-invoice">
        {hasEnoughInvoiceData && (
          <Invoice
            settings={settings}
            company={company}
            client={client}
            isExistingInvoice={isExistingInvoice}
          />
        )}
        {hasEnoughInvoiceData && <InvoiceQuickMenu />}
        {hasEnoughInvoiceData && (
          <InvoiceActions
            viewAllInvoices={this.viewAllInvoices}
            printExistingInvoice={this.printExistingInvoice}
            saveInvoice={this.saveInvoice}
            createNewInvoice={this.createNewInvoice}
            isExisting={this.state.isExistingInvoice}
          />
        )}
        {!hasEnoughInvoiceData && (
          <div className="card border-warning mb-3">
            <div className="card-header">Something went wrong...</div>
            <div className="card-body">
              <h4 className="card-title">Oops...</h4>
              <p className="card-text">Not enough data for invoice available</p>
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

PageInvoice.propTypes = {
  client: PropTypes.object,
  company: PropTypes.object,
  invoice: PropTypes.object,
  services: PropTypes.array,
  settings: PropTypes.object
};

function mapStateToProps(state) {
  const { client, company, invoice, services, settings } = state;

  return {
    client,
    company,
    invoice,
    services,
    settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      client: bindActionCreators(clientActions, dispatch),
      company: bindActionCreators(companyActions, dispatch),
      invoice: bindActionCreators(invoiceActions, dispatch),
      settings: bindActionCreators(settingsActions, dispatch),
      services: bindActionCreators(servicesActions, dispatch),
      loader: bindActionCreators(loaderActions, dispatch)
    }
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PageInvoice)
);
