import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as menuActions from "../../../actions/menu-actions";
import history from "../../../providers/history.js";
import "./navbar.css";

class Navbar extends Component {
  constructor() {
    super();

    this.links = [
      {
        route: "/home",
        label: "home",
        icon: "fa-home"
      },
      {
        route: "/invoice",
        label: "invoice",
        icon: "fa-file-invoice"
      },
      {
        route: "/details",
        label: "details",
        icon: "fa-id-card"
      },
      {
        route: "/services",
        label: "services",
        icon: "fa-tasks"
      },
      {
        route: "/settings",
        label: "settings",
        icon: "fa-cog"
      }
    ];
  }

  routeTo(event, path) {
    event.preventDefault();
    event.stopPropagation();
    history.push(path);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand navbar-brand-link-toggle" href="#toggle">
          toggle
        </a>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            {this.links.map((link, index) => {
              return (
                <li className="nav-item" key={index}>
                  <a
                    href={`menu-link-${link.route}`}
                    className="nav-link"
                    title={link.label}
                    onClick={event => {
                      this.routeTo(event, link.route);
                    }}
                  >
                    <i className={`fas ${link.icon}`} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  menu: PropTypes.object
};

function mapStateToProps(state) {
  return {
    menu: state.menu
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      menu: bindActionCreators(menuActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
