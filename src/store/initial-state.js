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
    periodBoundaries: DateFormatter.getPeriodBoundaries(),
    isHideVatFields: false,
    showInternationalBankNumber: false
  },
  // services: [
  //   {
  //     description:
  //       "Technical Lead Engineering Consultancy - RBS London - RBS1WK00075277 (602031164)",
  //     price: 600,
  //     quantity: 5
  //   }
  // ],
  services: null
};
