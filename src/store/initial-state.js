import { CONFIG } from "../config-constants";
import DateFormatter from "../services/date-formatter";

export default {
  config: CONFIG,
  loader: false,
  toast: null,
  settings: null,
  client: null,
  company: null,
  invoices: [],
  invoice: {
    date: DateFormatter.getInvoiceDate(),
    number: DateFormatter.getInvoiceNumber(3),
    periodBoundaries: DateFormatter.getPeriodBoundaries()
  },
  services: null
};
