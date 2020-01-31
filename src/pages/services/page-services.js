import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { bindActionCreators } from "redux";

import DataLoader from "../../services/data-loader";

import * as servicesActions from "../../actions/services-actions";
import * as toastActions from "../../actions/toast-actions";

import Footer from "../../components/common/footer/footer";
import "./page-services.css";

class PageServices extends Component {
  constructor() {
    super();

    this.state = {
      newService: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.add = this.add.bind(this);
    this.onRemoveLastService = this.onRemoveLastService.bind(this);
    this.onRemoveFirstService = this.onRemoveFirstService.bind(this);
  }

  componentWillMount() {
    DataLoader.load(this.props, ["services"]);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const services = Array.from(this.props.services || []);

    this.setState({
      newService: Object.assign(
        {
          quantity: 1
        },
        services[services.length - 1],
        this.state.newService,
        {
          [name]: value
        }
      )
    });
  }

  isServiceValid(newService) {
    return !!newService;
  }

  onRemoveLastService() {
    const { newService } = this.state;

    if (newService) {
      this.setState({
        newService: null
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
        newService: null
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
        newService: null
      });
    }
  }

  triggerInputChange(elementId, value) {
    document.getElementById(elementId).value = value;
  }

  render() {
    const { services } = this.props;
    const { newService } = this.state;

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
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service, index) => (
                        <tr key={index}>
                          <td>{service.description}</td>
                          <td>{service.price}</td>
                          <td>{service.discountPercentage}%</td>
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
  services: PropTypes.array
};

function mapStateToProps(state) {
  return {
    config: state.config,
    services: state.services
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      services: bindActionCreators(servicesActions, dispatch),
      toast: bindActionCreators(toastActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageServices);
