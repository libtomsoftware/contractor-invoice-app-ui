import React from "react";
import history from "../../providers/history.js";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import "./page-home.css";
import { bindActionCreators } from "redux";
import * as clientActions from "../../actions/client-actions";
import * as companyActions from "../../actions/company-actions";
import * as invoiceActions from "../../actions/invoice-actions";
import * as settingsActions from "../../actions/settings-actions";
import * as servicesActions from "../../actions/services-actions";
import Invoices from "../../components/invoices";

class PageHome extends React.Component {
  constructor() {
    super();

    this.viewCurrentInvoice = this.viewCurrentInvoice.bind(this);
  }

  componentDidMount() {
    const { invoice, settings } = this.props.actions;

    settings.load();
    invoice.fetchAll();
  }

  viewCurrentInvoice(event, entry) {
    event.preventDefault();
    event.stopPropagation();

    const { actions } = this.props;

    actions.client.update(entry.client);
    actions.company.update(entry.company);
    actions.invoice.update(entry.invoice);
    actions.services.update(entry.services);

    history.push("/invoice/current");
  }

  render() {
    const { invoices, settings } = this.props;

    return (
      <div className="page page-home">
        {settings && invoices.length && (
          <div className="invoices-table">
            <Invoices
              invoices={invoices}
              settings={settings}
              viewCurrentInvoiceMethod={this.viewCurrentInvoice}
            />
          </div>
        )}
        {settings &&
          (!invoices || (!invoices.length && <p>No saved invoices...</p>))}
        {!settings && <p>No settings available...</p>}
      </div>
    );
  }
}

PageHome.propTypes = {
  invoices: PropTypes.array
};

function mapStateToProps(state) {
  const { invoices, settings } = state;

  return {
    invoices,
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
      services: bindActionCreators(servicesActions, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHome);
