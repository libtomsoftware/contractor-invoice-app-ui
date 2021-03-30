import "./quick-menu.css";

import React, { Component } from "react";

import AmendInvoiceDate from "./amend-invoice-date";
import AmendInvoiceNumber from "./amend-invoice-number";
import AmendMiscellaneous from "./amend-miscellaneous";
import AmendPeriodBoundaries from "./amend-period-boundaries";
import AmendQuantity from "./amend-quantity";

class InvoiceQuickMenu extends Component {
  render() {
    return (
      <div className="cp-invoice-quick-menu">
        <AmendInvoiceDate />
        <AmendInvoiceNumber />
        <AmendPeriodBoundaries />
        <AmendQuantity />
        <AmendMiscellaneous />
      </div>
    );
  }
}

export default InvoiceQuickMenu;
