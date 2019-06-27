import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { bindActionCreators } from "redux";
import * as clientActions from "../../actions/client-actions";
import * as companyActions from "../../actions/company-actions";
import * as settingsActions from "../../actions/settings-actions";
import * as loaderActions from "../../actions/loader-actions";
import DataLoader from "../../services/data-loader";
import Invoice from "../../components/invoice";
import InvoiceQuickMenu from "../../components/invoice/quick-menu";
import Footer from "../../components/common/footer/footer";
import "./page-invoice.css";

class PageInvoice extends Component {
  componentWillMount() {
    DataLoader.load(this.props, ["settings", "company", "client"]);
  }

  render() {
    const { company, client, settings } = this.props;

    return (
      <div className="page page-invoice">
        {!!settings && !!company && !!client && (
          <Invoice settings={settings} company={company} client={client} />
        )}
        <InvoiceQuickMenu />
        <Footer />
      </div>
    );
  }
}

PageInvoice.propTypes = {
  client: PropTypes.object,
  company: PropTypes.object,
  settings: PropTypes.object
};

function mapStateToProps(state) {
  return {
    client: state.client,
    company: state.company,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      client: bindActionCreators(clientActions, dispatch),
      company: bindActionCreators(companyActions, dispatch),
      settings: bindActionCreators(settingsActions, dispatch),
      loader: bindActionCreators(loaderActions, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageInvoice);
