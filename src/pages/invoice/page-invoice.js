import React, { Component } from "react";
import history from "../../providers/history.js";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { bindActionCreators } from "redux";
import * as clientActions from "../../actions/client-actions";
import * as companyActions from "../../actions/company-actions";
import * as settingsActions from "../../actions/settings-actions";
import * as loaderActions from "../../actions/loader-actions";
import * as invoiceActions from "../../actions/invoice-actions";
import DataLoader from "../../services/data-loader";
import Invoice from "../../components/invoice";
import InvoiceQuickMenu from "../../components/invoice/quick-menu";
import Footer from "../../components/common/footer/footer";
import { withRouter } from "react-router";
import "./page-invoice.css";

class PageInvoice extends Component {
  constructor() {
    super();

    this.saveInvoice = this.saveInvoice.bind(this);
  }

  componentWillMount() {
    const { params } = this.props;

    if (params && params.type === "current") {
      return;
    }

    DataLoader.load(this.props, ["settings", "company", "client"]);
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
    history.push("/invoice");
  }

  printCurrentInvoice() {
    window.print();
  }

  render() {
    const { company, client, params, settings } = this.props;

    return (
      <div className="page page-invoice">
        {!!settings && !!company && !!client && (
          <Invoice settings={settings} company={company} client={client} />
        )}
        <InvoiceQuickMenu />
        <div className="invoice-actions">
          <button className="btn btn-secondary" onClick={this.viewAllInvoices}>
            View All
          </button>
          <button
            className="btn btn-primary"
            onClick={this.printCurrentInvoice}
          >
            Print
          </button>
          {(!params || params.type !== "current") && (
            <button className="btn btn-danger" onClick={this.saveInvoice}>
              Save
            </button>
          )}
          {params && params.type === "current" && (
            <button className="btn btn-success" onClick={this.createNewInvoice}>
              Create new
            </button>
          )}
        </div>
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
      loader: bindActionCreators(loaderActions, dispatch)
    }
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageInvoice)
);
