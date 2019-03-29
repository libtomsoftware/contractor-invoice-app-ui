import { CONFIG } from "../config-constants";
import DateFormatter from "../services/date-formatter";

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
    periodBoundaries: DateFormatter.getPeriodBoundaries()
  },
  services: [
    {
      description:
        "Software development consultancy, Purchase Order 4500216768",
      price: 600,
      quantity: 5,
      discountPercentage: 0
    }
  ]
};
