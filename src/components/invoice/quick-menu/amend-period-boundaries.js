import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { bindActionCreators } from "redux";
import moment from "moment";

import DateFormatter from "../../../services/date-formatter";
import * as invoiceActions from "../../../actions/invoice-actions";

class AmendPeriodBoundaries extends Component {
  constructor() {
    super();

    this.state = {
      isWeekly: false,
      isSundayFirstDay: false
    };

    this.changeDates = this.changeDates.bind(this);
    this.changeFirstDay = this.changeFirstDay.bind(this);
    this.handlePeriodTypeChange = this.handlePeriodTypeChange.bind(this);
    this.handleFirstDayOfWeekChange = this.handleFirstDayOfWeekChange.bind(
      this
    );
  }

  changeDates(e) {
    const invoice = Object.assign({}, this.props.invoice);

    invoice.periodBoundaries = DateFormatter.getPeriodBoundaries(
      this.state.isWeekly,
      e.target.value
    );

    this.props.actions.invoice.update(invoice);
  }

  changeFirstDay() {
    const invoice = Object.assign({}, this.props.invoice);
    const value = document.getElementById("invoicePeriodBoundaries").value;
    const date = value && value !== "" ? value : moment().format("YYYY-MM-DD");

    invoice.periodBoundaries = DateFormatter.getPeriodBoundaries(
      this.state.isWeekly,
      date,
      this.state.isSundayFirstDay
    );

    this.props.actions.invoice.update(invoice);
  }

  handlePeriodTypeChange() {
    const value = document.getElementById("invoicePeriodBoundaries").value,
      date = value && value !== "" ? value : moment().format("YYYY-MM-DD");

    this.setState(
      {
        isWeekly: !this.state.isWeekly
      },
      () => {
        this.changeDates({
          target: {
            value: date
          }
        });
      }
    );
  }

  handleFirstDayOfWeekChange(value) {
    this.setState(
      {
        isSundayFirstDay: value
      },
      () => {
        this.changeFirstDay();
      }
    );
  }

  render() {
    return (
      <div className="invoice-form-amend card">
        <fieldset>
          <div className="form-group">
            <label className="control-label" htmlFor="invoicePeriodBoundaries">
              Amend invoice period boundaries
            </label>
            <input
              type="date"
              id="invoicePeriodBoundaries"
              name="invoicePeriodBoundaries"
              className="form-control"
              onChange={this.changeDates}
            />
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                name="weekly"
                checked={this.state.isWeekly}
                onChange={this.handlePeriodTypeChange}
              />
              <label
                className="custom-control-label"
                htmlFor="weekly"
                onClick={this.handlePeriodTypeChange}
              >
                Is weekly timesheet?
              </label>
            </div>
            {!!this.state.isWeekly && (
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="firstday"
                  id="firstday"
                  onClick={() => {
                    this.handleFirstDayOfWeekChange(
                      !this.state.isSundayFirstDay
                    );
                  }}
                />
                <label className="custom-control-label" htmlFor="firstday">
                  Is Sunday first day of the week?
                </label>
              </div>
            )}
          </div>
        </fieldset>
      </div>
    );
  }
}

AmendPeriodBoundaries.propTypes = {
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
)(AmendPeriodBoundaries);
