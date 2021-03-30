import * as clientActions from "../../actions/client-actions";
import * as companyActions from "../../actions/company-actions";
import * as toastActions from "../../actions/toast-actions";

import React, { Component } from "react";

import { CONFIG } from "../../config-constants";
import DataLoader from "../../services/data-loader";
import { PropTypes } from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Details extends Component {
  constructor() {
    super();

    this.state = {
      invalidFields: {
        company: [],
        client: []
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.isFieldInvalid = this.isFieldInvalid.bind(this);
    this.check = this.check.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillMount() {
    DataLoader.load(this.props, ["company", "client"]);
  }

  componentWillUnmount() {
    this.resetInvalidFields();
  }

  get companyDetailsFields() {
    return [
      {
        id: "name",
        label: "Name"
      },
      {
        id: "address",
        label: "Address"
      },
      {
        id: "website",
        label: "Website"
      },
      {
        id: "logoWhite",
        label: "Logo white"
      },
      {
        id: "logoColor",
        label: "Logo color"
      },
      {
        id: "reg",
        label: "Registration Number"
      },
      {
        id: "vat",
        label: "VAT Reg Number"
      },
      {
        id: "name",
        label: "Representative name",
        parent: "representative"
      }
    ];
  }

  get paymentDetailsFields() {
    return [
      {
        id: "bankName",
        label: "Bank name",
        parent: "paymentDetails"
      },
      {
        id: "sortCode",
        label: "Sort code",
        parent: "paymentDetails"
      },
      {
        id: "accountNumber",
        label: "Account number",
        parent: "paymentDetails"
      },
      {
        id: "accountName",
        label: "Account name",
        parent: "paymentDetails"
      },
      {
        id: "internationalBankNumber",
        label: "International Bank Number",
        parent: "paymentDetails"
      },
      {
        id: "swift",
        label: "SWIFT",
        parent: "paymentDetails"
      },
    ];
  }

  get clientDetailsFields() {
    return [
      {
        id: "name",
        label: "Name"
      },
      {
        id: "address",
        label: "Address"
      }
    ];
  }

  resetInvalidFields() {
    this.setState({
      invalidFields: {
        company: [],
        client: []
      }
    });
  }

  addToInvalidFields(subset, id) {
    const currentInvalidFields = this.state.invalidFields[subset];

    currentInvalidFields.push(id);

    this.setState({
      invalidFields: Object.assign({}, this.state.invalidFields, {
        [subset]: currentInvalidFields
      })
    });
  }

  check(fields, subset) {
    let result = true;

    fields.forEach(field => {
      const data = this.props[subset];

      if (field.parent) {
        const value = data[field.parent][field.id];

        if (!value || value === "") {
          result = false;
          this.addToInvalidFields(subset, field.id);
        }
      } else {
        const value = data[field.id];

        if (!value || value === "") {
          result = false;
          this.addToInvalidFields(subset, field.id);
        }
      }
    });

    return result;
  }

  handleInputChange(event) {
    const target = event.target,
      value = target.type === "checkbox" ? target.checked : target.value,
      name = target.name,
      parent = target.getAttribute("parent"),
      subset = target.getAttribute("subset"),
      data = Object.assign({}, this.props[subset]);

    if (parent) {
      data[parent] = Object.assign({}, data[parent], {
        [name]: value
      });
    } else {
      data[name] = value;
    }

    this.props.actions[subset].update(data);
    this.props.actions.toast.hide();
    this.resetInvalidFields();
  }

  isFormValid() {
    const companyFieldsValid = this.check(this.companyDetailsFields, "company"),
      paymentDetailsFields = this.check(this.paymentDetailsFields, "company"),
      clientFieldsValid = this.check(this.clientDetailsFields, "client");

    return companyFieldsValid && paymentDetailsFields && clientFieldsValid;
  }

  isFieldInvalid(subset, id) {
    return this.state.invalidFields[subset].indexOf(id) !== -1;
  }

  save(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.isFormValid()) {
      this.props.actions.company.save(this.props.company);
      this.props.actions.client.save(this.props.client);
    } else {
      this.props.actions.toast.show({
        message: CONFIG.MESSAGE.ERROR.FORM_INVALID
      });
    }
  }

  render() {
    const { company, client } = this.props;

    return (
      <div className="cp-details">
        {!!company && !!client && (
          <div className="details-form">
            <div className="details-form-fields">
              <div className="card mb-3">
                <div className="card-header">Company details</div>
                <div className="card-body">
                  <div className="card-text">
                    <fieldset>
                      {this.companyDetailsFields.map((field, index) => {
                        return (
                          <div
                            className={`form-group  ${
                              this.isFieldInvalid("company", field.id)
                                ? "field-invalid"
                                : "field-valid"
                            }`}
                            key={index}
                          >
                            <label className="control-label" htmlFor={field.id}>
                              {field.label}
                            </label>
                            <input
                              className="form-control"
                              name={field.id}
                              type="text"
                              onChange={this.handleInputChange}
                              value={company[field.id]}
                              subset="company"
                            />
                          </div>
                        );
                      })}
                    </fieldset>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header">Payment details</div>
                <div className="card-body">
                  <div className="card-text">
                    <fieldset>
                      {this.paymentDetailsFields.map((field, index) => {
                        return (
                          <div
                            className={`form-group ${
                              this.isFieldInvalid("company", field.id)
                                ? "field-invalid"
                                : "field-valid"
                            }`}
                            key={index}
                          >
                            <label className="control-label" htmlFor={field.id}>
                              {field.label}
                            </label>
                            <input
                              className="form-control"
                              name={field.id}
                              type="text"
                              onChange={this.handleInputChange}
                              value={company.paymentDetails[field.id]}
                              subset="company"
                              parent={field.parent}
                            />
                          </div>
                        );
                      })}
                    </fieldset>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header">Client details</div>
                <div className="card-body">
                  <div className="card-text">
                    <fieldset>
                      {this.clientDetailsFields.map((field, index) => {
                        return (
                          <div
                            className={`form-group ${
                              this.isFieldInvalid("client", field.id)
                                ? "field-invalid"
                                : "field-valid"
                            }`}
                            key={index}
                          >
                            <label className="control-label" htmlFor={field.id}>
                              {field.label}
                            </label>
                            <input
                              className="form-control"
                              name={field.id}
                              type="text"
                              onChange={this.handleInputChange}
                              value={client[field.id]}
                              subset="client"
                            />
                          </div>
                        );
                      })}
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
      </div>
    );
  }
}

Details.propTypes = {
  client: PropTypes.object,
  company: PropTypes.object
};

function mapStateToProps(state) {
  return {
    client: state.client,
    company: state.company
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      client: bindActionCreators(clientActions, dispatch),
      company: bindActionCreators(companyActions, dispatch),
      toast: bindActionCreators(toastActions, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
