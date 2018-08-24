import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';

import * as servicesActions from '../../../actions/services-actions';

class AmendQuantity extends Component {
    constructor() {
        super();
        this.increaseQuantity = this.increaseQuantity.bind(this);
        this.decreaseQuantity = this.decreaseQuantity.bind(this);
    }
    //TODO for multiple services
    increaseQuantity() {
        const service = Object.assign({}, this.props.services[0]);

        service.quantity += 1;

        this.props.actions.services.update([service]);
    }

    //TODO for multiple services
    decreaseQuantity() {
        const service = Object.assign({}, this.props.services[0]);

        if (service.quantity >= 1) {
            service.quantity -= 1;
        }

        this.props.actions.services.update([service]);
    }

    render() {
        return (
            <div className="invoice-form-amend card">
                <fieldset>
                    <div
                        className="form-group"
                    >
                        <label className="control-label" htmlFor="invoiceDate">
                            Amend quantity
                        </label>
                        <div>
                            <button
                                className="btn btn-primary"
                                onClick={this.increaseQuantity}
                            >
                                +
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={this.decreaseQuantity}
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

AmendQuantity.propTypes = {
    services: PropTypes.array
};

function mapStateToProps(state) {
    return {
        services: state.services
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            services: bindActionCreators(servicesActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AmendQuantity);
