import React from "react";
import InvoiceEntry from "./invoice-entry";

const Invoices = props => {
  const {
    invoices,
    settings,
    viewCurrentInvoiceMethod,
    deleteInvoiceMethod
  } = props;

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">number</th>
          <th scope="col">when</th>
          <th scope="col">for</th>
          <th scope="col">total</th>
          <th scope="col">actions</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice, index) => (
          <InvoiceEntry
            entry={invoice}
            settings={settings}
            key={index}
            viewCurrentInvoiceMethod={viewCurrentInvoiceMethod}
            deleteInvoiceMethod={deleteInvoiceMethod}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Invoices;
