import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { bindActionCreators } from "redux";

import DateFormatter from "../../../services/date-formatter";
import * as invoiceActions from "../../../actions/invoice-actions";

class AmendInvoiceNumber extends Component {
  constructor() {
    super();

    this.increaseNumber = this.increaseNumber.bind(this);
    this.decreaseNumber = this.decreaseNumber.bind(this);
  }

  increaseNumber() {
    const invoice = Object.assign({}, this.props.invoice),
      current = parseInt(invoice.number[4], 10),
      number = DateFormatter.getInvoiceNumber(current + 1);

    this.props.actions.invoice.update(
      Object.assign({}, invoice, {
        number
      })
    );
  }

  decreaseNumber() {
    const invoice = Object.assign({}, this.props.invoice),
      current = parseInt(invoice.number[4], 10);
    let number;

    if (current >= 1) {
      number = DateFormatter.getInvoiceNumber(current - 1);
      this.props.actions.invoice.update(
        Object.assign({}, invoice, {
          number
        })
      );
    }
  }

  render() {
    return (
      <div className="invoice-form-amend card">
        <fieldset>
          <div className="form-group">
            <label className="control-label" htmlFor="invoiceNumber">
              Change invoice number
            </label>
            <div>
              <button className="btn btn-primary" onClick={this.increaseNumber}>
                +
              </button>
              <button
                className="btn btn-secondary"
                onClick={this.decreaseNumber}
              >
                -
              </button>
            </div>
          </div>
        </fieldset>
      </div>
    );
  }
}

AmendInvoiceNumber.propTypes = {
  invoice: PropTypes.object
};

function mapStateToProps(state) {
  return {
    invoice: state.invoice
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
)(AmendInvoiceNumber);
