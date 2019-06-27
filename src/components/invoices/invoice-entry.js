import React from "react";
import Calculator from "../../services/calculator";

const InvoiceEntry = props => {
  const { entry, settings, viewCurrentInvoiceMethod } = props;
  const { currency, vatPercentage } = settings;

  const services = Calculator.computeServices(entry.services, vatPercentage);

  let { totalDue } = Calculator.computeSubtotalDiscountAndVat(services);

  return (
    <tr className="table-active">
      <td>{entry.invoice.number}</td>
      <td>{entry.invoice.date}</td>
      <td>{entry.client.name}</td>
      <td>{Calculator.formatToCurrency(totalDue, currency)}</td>
      <td className="invoice-action">
        <a
          href="menu-link-invoice"
          className="fas fa-file-invoice"
          title="view"
          onClick={event => {
            viewCurrentInvoiceMethod(event, entry);
          }}
        >
          <i className="fas fa-file-invoice">view</i>
        </a>
      </td>
    </tr>
  );
};

export default InvoiceEntry;
