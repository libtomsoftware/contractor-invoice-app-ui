import { CONFIG } from '../config-constants';
import DateFormatter from '../services/date-formatter';

export default {
    config: CONFIG,
    loader: false,
    toast: null,
    settings: null,
    client: null,
    company: null,
    invoice: {
        date: DateFormatter.getInvoiceDate(),
        number: DateFormatter.getInvoiceNumber(3),
        weekBoundaries: DateFormatter.getWeekBoundaries()
    },
    services: [
        {
            description: 'Web development services, Telegraph, 6300012.0',
            price: 550,
            quantity: 5,
            discountPercentage: 0
        }
    ]
};
