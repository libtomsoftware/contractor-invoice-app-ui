import React, { useState } from "react";

import Calculator from "../../services/calculator";

const InvoiceEntry = props => {
  const {
    entry,
    settings,
    viewCurrentInvoiceMethod,
    deleteInvoiceMethod
  } = props;
  const { currency, vatPercentage } = settings;
  const [showDelete, setShowDelete] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const services = Calculator.computeServices(
    entry.services || [],
    vatPercentage
  );

  let { totalDue } = Calculator.computeSubtotalDiscountAndVat(services);

  function toggleShowDelete(event, entry) {
    event.preventDefault();
    event.stopPropagation();

    setShowDelete(!showDelete);
    setInvoiceToDelete(entry._id);
  }

  function deleteInvoice() {
    setShowDelete(false);
    if (invoiceToDelete) {
      deleteInvoiceMethod(invoiceToDelete);
    }
  }

  const derivedInvoiceCurrency = services && services[0] && services[0].currency ? services[0].currency : currency;

  return (
    <tr className="table-active">
      <td>{entry.invoice.number}</td>
      <td>{entry.invoice.date}</td>
      <td>{entry.client.name}</td>
      <td>{Calculator.formatToCurrency(totalDue, derivedInvoiceCurrency)}</td>
      <td className="invoice-action">
        <a
          href="menu-link-invoice"
          className="fas fa-file-invoice text-info"
          title="view"
          onClick={event => {
            viewCurrentInvoiceMethod(event, entry);
          }}
        >
          <i className="fas fa-file-invoice">view</i>
        </a>
        {!showDelete && (
          <a
            href="menu-link-invoice"
            className="fas fa-trash-alt text-danger"
            title="show delete button"
            onClick={event => {
              toggleShowDelete(event, entry);
            }}
          >
            <i className="fas fa-trash-alt">show delete</i>
          </a>
        )}
        {showDelete && (
          <button
            href="menu-link-invoice"
            className="btn btn-danger"
            title="delete invoice"
            onClick={deleteInvoice}
          >
            delete
          </button>
        )}
        {showDelete && (
          <button
            href="menu-link-invoice"
            className="btn btn-link text-warning"
            title="cancel delete invoice"
            onClick={() => {
              setShowDelete(false);
            }}
          >
            cancel
          </button>
        )}
      </td>
    </tr>
  );
};

export default InvoiceEntry;
