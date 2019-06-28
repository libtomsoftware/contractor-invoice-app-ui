import React from "react";

const InvoiceActions = props => {
  const {
    viewAllInvoices,
    saveInvoice,
    printExistingInvoice,
    createNewInvoice,
    isExisting
  } = props;

  return (
    <div className="invoice-actions">
      <button className="btn btn-secondary" onClick={viewAllInvoices}>
        View All
      </button>
      <button className="btn btn-success" onClick={printExistingInvoice}>
        Print
      </button>
      {!isExisting && (
        <button className="btn btn-danger" onClick={saveInvoice}>
          Save
        </button>
      )}
      {isExisting && (
        <button className="btn btn-info" onClick={createNewInvoice}>
          Create new
        </button>
      )}
    </div>
  );
};

export default InvoiceActions;
