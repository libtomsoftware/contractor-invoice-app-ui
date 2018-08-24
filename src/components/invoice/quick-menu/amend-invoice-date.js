import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';

import DateFormatter from '../../../services/date-formatter';
import * as invoiceActions from '../../../actions/invoice-actions';


class AmendInvoiceDate extends Component {
    constructor() {
        super();

        this.changeDate = this.changeDate.bind(this);
    }

    changeDate(e) {
        const invoice = Object.assign({}, this.props.invoice);

        invoice.date = DateFormatter.getInvoiceDate(e.target.value);

        this.props.actions.invoice.update(invoice);
    }

    render() {
        return (
            <div className="invoice-form-amend card">
                <fieldset>
                    <div
                        className="form-group"
                    >
                        <label className="control-label" htmlFor="invoiceDate">
                            Change invoice date
                        </label>
                        <input
                            type="date"
                            name="invoiceDate"
                            className="form-control"
                            onChange={this.changeDate}
                        />
                    </div>
                </fieldset>
            </div>
        );
    }
}

AmendInvoiceDate.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AmendInvoiceDate);
