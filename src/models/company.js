import { PropTypes } from "prop-types";

const propTypes = {
  name: PropTypes.string,
  logoColor: PropTypes.string,
  logoWhite: PropTypes.string,
  address: PropTypes.string,
  website: PropTypes.string,
  reg: PropTypes.string,
  vat: PropTypes.string,
  paymentDetails: PropTypes.exact({
    internationalBankNumber: PropTypes.string,
    bankName: PropTypes.string,
    sortCode: PropTypes.string,
    accountNumber: PropTypes.string,
    accountName: PropTypes.string
  }),
  representative: PropTypes.exact({
    name: PropTypes.string,
    function: PropTypes.string
  })
};

export default class Company {
  constructor(data = {}) {
    this.name = data.name;
    this.logoColor = data.logoColor;
    this.logoWhite = data.logoWhite;
    this.address = data.address;
    this.website = data.website;
    this.reg = data.reg;
    this.vat = data.vat;
    this.paymentDetails = data.paymentDetails;
    this.representative = data.representative;

    this.checkTypes();
  }

  checkTypes() {
    PropTypes.checkPropTypes(propTypes, this, "prop", "CompanyModel");
  }
}
