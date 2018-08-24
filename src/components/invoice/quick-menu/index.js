import React, { Component } from 'react';
import AmendQuantity from './amend-quantity';
import AmendInvoiceDate from './amend-invoice-date';
import AmendInvoiceNumber from './amend-invoice-number';
import AmendWeekBoundaries from './amend-week-boundaries';
import './quick-menu.css';

class InvoiceQuickMenu extends Component {
    render() {
        return (
            <div className="cp-invoice-quick-menu">
                <AmendInvoiceDate />
                <AmendInvoiceNumber />
                <AmendWeekBoundaries />
                <AmendQuantity />
            </div>
        );
    }
}

export default InvoiceQuickMenu;