import * as invoiceActions from "../../../actions/invoice-actions";

import React, { Component } from "react";

import { PropTypes } from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class AmendMiscellaneous extends Component {
  constructor() {
    super();

    this.state = {
      isHideVatFields: false,
      showInternationalBankNumber: false
    };

    this.handleHideVatFields = this.handleHideVatFields.bind(this);
    this.handleShowInternationalBankNumber = this.handleShowInternationalBankNumber.bind(this);
  }

  handleHideVatFields() {
    const isHideVatFields = !this.state.isHideVatFields;

    this.setState(
      {
        isHideVatFields
      },
      () => {
        const invoice = Object.assign({}, this.props.invoice);

        invoice.isHideVatFields = isHideVatFields;

        this.props.actions.invoice.update(invoice);
      }
    );
  }

  handleShowInternationalBankNumber() {
    const showInternationalBankNumber = !this.state.showInternationalBankNumber;

    this.setState(
      {
        showInternationalBankNumber
      },
      () => {
        const invoice = Object.assign({}, this.props.invoice);

        invoice.showInternationalBankNumber = showInternationalBankNumber;

        this.props.actions.invoice.update(invoice);
      }
    );
  }

  render() {
    return (
      <div className="invoice-form-amend card">
        <fieldset>
          <div className="form-group">
            <label className="control-label" htmlFor="invoicePeriodBoundaries">
              Miscellaneous
            </label>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                name="vatFields"
                checked={this.state.isHideVatFields}
                onChange={this.handleHideVatFields}
              />
              <label
                className="custom-control-label"
                htmlFor="vatFields"
                onClick={this.handleHideVatFields}
              >
                Hide VAT fields?
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                name="internationalBankNumber"
                checked={this.state.showInternationalBankNumber}
                onChange={this.handleShowInternationalBankNumber}
              />
              <label
                className="custom-control-label"
                htmlFor="internationalBankNumber"
                onClick={this.handleShowInternationalBankNumber}
              >
                <span className="control-label-limited">Show international bank account number?</span>
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    );
  }
}

AmendMiscellaneous.propTypes = {
  invoice: PropTypes.object
};

function mapStateToProps(state) {
  return {
    invoice: state.invoice,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      invoice: bindActionCreators(invoiceActions, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AmendMiscellaneous);
