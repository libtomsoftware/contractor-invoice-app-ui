import { PropTypes } from "prop-types";

const propTypes = {
  currency: PropTypes.exact({
    symbol: PropTypes.string,
    symbolInFront: PropTypes.bool
  }),
  greetings: PropTypes.string,
  price: PropTypes.number,
  vatPercentage: PropTypes.number
};

export default class Settings {
  constructor(data = {}) {
    this.currency = data.currency;
    this.greetings = data.greetings;
    this.price = parseInt(data.price, 10) || 0;
    this.vatPercentage = parseInt(data.vatPercentage, 10);

    this.checkTypes();
  }

  checkTypes() {
    PropTypes.checkPropTypes(propTypes, this, "prop", "SettingsModel");
  }
}
