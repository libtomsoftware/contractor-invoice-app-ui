import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Loader from "../components/common/loader/loader";
import Toast from "../components/common/toast/toast";
import Navbar from "../components/common/navbar/navbar";
import Footer from "../components/common/footer/footer";

import "./layout.css";

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

export default connect(mapStateToProps)(Layout);
