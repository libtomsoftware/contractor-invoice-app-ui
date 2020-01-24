import { PropTypes } from "prop-types";

const propTypes = {
  description: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  discountPercentage: PropTypes.number
};

export default class Service {
  constructor(data = {}) {
    this.description = data.description || "";
    this.price = parseInt(data.price, 10) || 600;
    this.quantity = parseInt(data.quantity, 10) || 5;
    this.discountPercentage = parseInt(data.discountPercentage, 10) || 0;

    this.checkTypes();
  }

  checkTypes() {
    PropTypes.checkPropTypes(propTypes, this, "prop", "ServiceModel");
  }
}
