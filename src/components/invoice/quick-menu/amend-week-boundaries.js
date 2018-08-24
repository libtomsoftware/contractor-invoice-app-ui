import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';

import DateFormatter from '../../../services/date-formatter';
import * as invoiceActions from '../../../actions/invoice-actions';

class AmendWeekBoundaries extends Component {
    constructor() {
        super();

        this.changeDates = this.changeDates.bind(this);
    }

    changeDates(e) {
        const invoice = Object.assign({}, this.props.invoice);

        invoice.weekBoundaries = DateFormatter.getWeekBoundaries(e.target.value);

        this.props.actions.invoice.update(invoice);
    }

    render() {
        return (
            <div className="invoice-form-amend card">
                <fieldset>
                    <div
                        className="form-group"
                    >
                        <label className="control-label" htmlFor="invoiceWeekBoundaries">
                            Amend week boundaries
                        </label>
                        <input
                            type="date"
                            name="invoiceWeekBoundaries"
                            className="form-control"
                            onChange={this.changeDates}
                        />
                    </div>
                </fieldset>
            </div>
        );
    }
}

AmendWeekBoundaries.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AmendWeekBoundaries);
