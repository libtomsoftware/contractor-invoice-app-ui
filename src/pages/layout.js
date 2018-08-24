import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';

import * as toastActions from '../actions/toast-actions';
import * as loaderActions from '../actions/loader-actions';

import Loader from '../components/common/loader/loader';
import Toast from '../components/common/toast/toast';
import Navbar from '../components/common/navbar/navbar';
import Footer from '../components/common/footer/footer';

import './layout.css';

class Layout extends Component {
    constructor() {
        super();

        this.state = {
            path: undefined
        };
    }

    componentWillUpdate(state) {
        this.updatePathname(state.location.pathname);
    }

    updatePathname(path) {
        if (path !== this.state.path) {
            this.setState({
                path
            });
            this.props.actions.toast.hide();
            this.props.actions.loader.hide();
        }
    }

    render() {
        return (
            <div className="layout-wrapper">
                <Loader />
                <Toast />

                <Navbar />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

Layout.propTypes = {
    config: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    settings: PropTypes.object
};

function mapStateToProps(state) {
    return {
        config: state.config,
        settings: state.settings
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            toast: bindActionCreators(toastActions, dispatch),
            loader: bindActionCreators(loaderActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
