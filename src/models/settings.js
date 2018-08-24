import { PropTypes } from 'prop-types';

const propTypes = {
    currency: PropTypes.exact({
        symbol: PropTypes.string,
        symbolInFront: PropTypes.bool
    }),
    greetings: PropTypes.string,
    vatPercentage: PropTypes.number
};

export default class Settings {
    constructor(data = {}) {
        this.currency = data.currency;
        this.greetings = data.greetings;
        this.vatPercentage = parseInt(data.vatPercentage, 10);

        this.checkTypes();
    }

    checkTypes() {
        PropTypes.checkPropTypes(propTypes, this, 'prop', 'SettingsModel');
    }
}
