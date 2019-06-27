import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { bindActionCreators } from "redux";

import DataLoader from "../../services/data-loader";

import * as settingsActions from "../../actions/settings-actions";
import * as toastActions from "../../actions/toast-actions";

import Footer from "../../components/common/footer/footer";
import "./page-settings.css";

class PageSettings extends Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillMount() {
    DataLoader.load(this.props, ["settings"]);
  }

  handleInputChange(event) {
    const target = event.target,
      value = target.type === "checkbox" ? target.checked : target.value,
      name = target.name,
      parent = target.getAttribute("parent"),
      settings = Object.assign({}, this.props.settings);

    if (parent) {
      settings[parent] = Object.assign({}, settings[parent], {
        [name]: value
      });
    } else {
      settings[name] = value;
    }

    this.props.actions.settings.update(settings);
    this.props.actions.toast.hide();
  }

  isFormValid() {
    let result = true;

    [
      {
        id: "greetings"
      },
      {
        id: "symbol",
        parent: "currency"
      }
    ].forEach(field => {
      const settings = this.props.settings;

      if (field.parent) {
        if (!settings[field.parent][field.id]) {
          result = false;
        }
      } else {
        if (!settings[field.id]) {
          result = false;
        }
      }
    });

    return result;
  }

  save(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.isFormValid()) {
      this.props.actions.settings.save(this.props.settings);
    }
  }

  triggerInputChange(elementId, value) {
    document.getElementById(elementId).value = value;
  }

  render() {
    const { settings } = this.props;

    return (
      <div className="page page-settings">
        {!!settings && (
          <div className="settings-form">
            <div className="settings-form-fields">
              <div className="card mb-3">
                <div className="card-header">General</div>
                <div className="card-body">
                  <div className="card-text">
                    <fieldset>
                      <div className="form-group">
                        <label className="control-label" htmlFor="greetings">
                          Greetings
                        </label>
                        <input
                          className="form-control"
                          name="greetings"
                          type="text"
                          onChange={this.handleInputChange}
                          value={settings.greetings}
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header">Currency</div>
                <div className="card-body">
                  <div className="card-text">
                    <fieldset>
                      <div className="form-group">
                        <label className="control-label" htmlFor="symbol">
                          Symbol
                        </label>
                        <select
                          className="custom-select"
                          onChange={this.handleInputChange}
                          name="symbol"
                          value={settings.currency.symbol}
                          parent="currency"
                        >
                          <option value="£">£</option>
                          <option value="$">$</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            name="symbolInFront"
                            checked={settings.currency.symbolInFront}
                            onChange={this.handleInputChange}
                            parent="currency"
                            id="symbolInFront"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="symbolInFront"
                            onClick={() =>
                              this.triggerInputChange(
                                "symbolInFront",
                                !!!settings.currency.symbolInFront
                              )
                            }
                          >
                            Symbol in front
                          </label>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="control-label" htmlFor="price">
                          Price
                        </label>
                        <input
                          className="form-control"
                          name="price"
                          type="text"
                          onChange={this.handleInputChange}
                          value={settings.price}
                        />
                      </div>

                      <div className="form-group">
                        <label
                          className="control-label"
                          htmlFor="vatPercentage"
                        >
                          VAT percentage
                        </label>
                        <input
                          className="form-control"
                          name="vatPercentage"
                          type="text"
                          onChange={this.handleInputChange}
                          value={settings.vatPercentage}
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-buttons">
              <button className="btn btn-primary" onClick={this.save}>
                Save
              </button>
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

PageSettings.propTypes = {
  config: PropTypes.object.isRequired,
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
      settings: bindActionCreators(settingsActions, dispatch),
      toast: bindActionCreators(toastActions, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageSettings);
