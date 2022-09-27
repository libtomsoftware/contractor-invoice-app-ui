import "./page-services.css";

import * as servicesActions from "../../actions/services-actions";
import * as settingsActions from "../../actions/settings-actions";
import * as toastActions from "../../actions/toast-actions";

import React, { Component } from "react";

import DataLoader from "../../services/data-loader";
import Footer from "../../components/common/footer/footer";
import { PropTypes } from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class PageServices extends Component {
  constructor() {
    super();

    this.state = {
      newService: null,
      currency: {
        symbol: "£",
        symbolInFront: true,
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.add = this.add.bind(this);
    this.onRemoveLastService = this.onRemoveLastService.bind(this);
    this.onRemoveFirstService = this.onRemoveFirstService.bind(this);
  }

  componentWillMount() {
    DataLoader.load(this.props, ["settings", "services"]);
  }

  componentDidUpdate(prevProps) {
    const { settings } = this.props;

    if (prevProps.settings === null && !!settings) {
      this.setState({
        currency: settings.currency,
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const parent = target.getAttribute("parent");
    const services = Array.from(this.props.services || []);
    let currency = this.state.currency;

    if (parent && parent === "currency") {
      currency = {
        ...currency,
        ...{
          [name]: value,
        },
      };
    }

    this.setState({
      currency,
      newService: Object.assign(
        {
          quantity: 1,
        },
        services[services.length - 1],
        this.state.newService,
        {
          [name]: value,
        },
        { currency: { ...currency } }
      ),
    });
  }

  isServiceValid(newService) {
    return !!newService;
  }

  onRemoveLastService() {
    const { newService } = this.state;

    if (newService) {
      this.setState({
        newService: null,
      });

      this.triggerInputChange("description", "");
      this.triggerInputChange("price", "");
      this.triggerInputChange("discountPercentage", "");

      return;
    }

    const services = Array.from(this.props.services || []);

    if (services.length === 1) {
      window.alert("You must save at least one service!");

      return;
    }

    services.pop();
    this.props.actions.services.save(services);
  }

  onRemoveFirstService() {
    const { newService } = this.state;

    if (newService) {
      this.setState({
        newService: null,
      });

      this.triggerInputChange("description", "");
      this.triggerInputChange("price", "");
      this.triggerInputChange("discountPercentage", "");

      return;
    }

    const services = Array.from(this.props.services);

    if (services.length === 1) {
      window.alert("You must leave at least one service!");

      return;
    }

    services.shift();
    this.props.actions.services.save(services);
  }

  add(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.isServiceValid(this.state.newService)) {
      const jointServices = Array.from(this.props.services || []);

      jointServices.push(this.state.newService);
      this.props.actions.services.save(jointServices);

      this.setState({
        newService: null,
      });
    }
  }

  triggerInputChange(elementId, value) {
    document.getElementById(elementId).value = value;
  }

  render() {
    const { services, settings } = this.props;
    const { newService } = this.state;

    if (!settings) {
      return null;
    }

    return (
      <div className="page page-services">
        <div className="services-table">
          <div className="services-form-fields">
            {!!services && !!services.length && (
              <div className="card mb-3">
                <div className="card-header">Existing services</div>
                <div className="card-body">
                  <table>
                    <thead>
                      <tr>
                        <th>description</th>
                        <th>price</th>
                        <th>discount</th>
                        <th>currency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service, index) => (
                        <tr key={index}>
                          <td>{service.description}</td>
                          <td>{service.price}</td>
                          <td>{service.discountPercentage}%</td>
                          <td>
                            {service.currency
                              ? service.currency.symbol
                              : settings.currency.symbol}
                          </td>
                        </tr>
                      ))}
                      {!!this.state.newService && (
                        <tr>
                          <td>{newService.description}</td>
                          <td>{newService.price}</td>
                          <td>
                            {newService.discountPercentage}
                            {!!newService.discountPercentage ||
                            newService.discountPercentage === 0
                              ? "%"
                              : ""}
                          </td>
                          <td>{newService.currency.symbol}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="form-buttons remove-btn">
                    {!!this.props.services.length && (
                      <button
                        className="btn btn-warning"
                        onClick={this.onRemoveFirstService}
                      >
                        Remove first service
                      </button>
                    )}

                    {(!!this.state.newService ||
                      !!this.props.services.length) && (
                      <button
                        className="btn btn-danger"
                        onClick={this.onRemoveLastService}
                      >
                        Remove last service
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="card mb-3 add-new-service">
              <div className="card-header">Add new service</div>
              <div className="card-body">
                <div className="card-text">
                  <fieldset>
                    <div className="form-group">
                      <label className="control-label" htmlFor="description">
                        Description
                      </label>
                      <input
                        className="form-control"
                        name="description"
                        id="description"
                        type="text"
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor="price">
                        Price
                      </label>
                      <input
                        className="form-control"
                        name="price"
                        id="price"
                        type="text"
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor="discount">
                        Discount
                      </label>
                      <input
                        className="form-control"
                        name="discountPercentage"
                        id="discountPercentage"
                        type="text"
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor="symbol">
                        Currency
                      </label>
                      <select
                        className="custom-select"
                        onChange={this.handleInputChange}
                        name="symbol"
                        parent="currency"
                        value={this.state.currency.symbol}
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
                          checked={this.state.currency.symbolInFront}
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
                              !!!this.state.currency.symbolInFront
                            )
                          }
                        >
                          Symbol in front
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="form-buttons">
                  <button className="btn btn-primary" onClick={this.add}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

PageServices.propTypes = {
  config: PropTypes.object.isRequired,
  services: PropTypes.array,
  settings: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    config: state.config,
    services: state.services,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      settings: bindActionCreators(settingsActions, dispatch),
      services: bindActionCreators(servicesActions, dispatch),
      toast: bindActionCreators(toastActions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageServices);
