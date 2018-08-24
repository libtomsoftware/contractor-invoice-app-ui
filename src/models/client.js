import { PropTypes } from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    address: PropTypes.string
};

export default class Client {
    constructor(data = {}) {
        this.name = data.name;
        this.address = data.address;

        this.checkTypes();
    }

    checkTypes() {
        PropTypes.checkPropTypes(propTypes, this, 'prop', 'ClientModel');
    }
}
