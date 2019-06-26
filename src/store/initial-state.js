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
        "Front-End Development Consultancy - Deutsche Bank AG London - 11111 (EUR)-UK_2019_DB UK_ GM_ENTERPRISE RISK_dbPalace SA_2019 (KE012394-001)",
      price: 600,
      quantity: 5,
      discountPercentage: 0
    }
  ]
};
