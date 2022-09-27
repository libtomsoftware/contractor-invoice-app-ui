import Calculator from "../../services/calculator";
import React from "react";

const ServicesListing = (props) => {
  const { invoice } = props;
  const { currency, vatPercentage } = props.settings;

  const services = Calculator.computeServices(
    props.services || [],
    vatPercentage
  );

  let { subtotal, totalDiscountAmount, totalVatAmount, totalDue } =
    Calculator.computeSubtotalDiscountAndVat(services);

  let derivedInvoiceCurrency =
    services && services[0] ? services[0].currency : currency;

  if (!derivedInvoiceCurrency) {
    derivedInvoiceCurrency = currency;
  }

  return (
    <div className="cp-invoice-services">
      <table cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>Item description</th>
            <th>Price per unit</th>
            <th>Quantity</th>
            <th>Discount %</th>
            <th>Total (Net)</th>
            {!invoice.isHideVatFields && <th>VAT %</th>}
            {!invoice.isHideVatFields && <th>VAT amount</th>}
            <th>Gross</th>
          </tr>
        </thead>
        <tbody>
          {!services ||
            (!services.length && (
              <tr className="cp-invoice-no-services">
                <td>
                  <span className="alert alert-danger">
                    No services available!
                  </span>
                </td>
              </tr>
            ))}
          {services.length > 0 &&
            services.map((service, index) => (
              <tr className="cp-invoice-services-list" key={index}>
                <td>{service.description}</td>
                <td>
                  {Calculator.formatToCurrency(
                    service.price,
                    service.currency || currency
                  )}
                </td>
                <td>{service.quantity}</td>
                <td>{service.discountPercentage}%</td>
                <td>
                  {Calculator.formatToCurrency(
                    service.net,
                    service.currency || currency
                  )}
                </td>
                {!invoice.isHideVatFields && <td>{vatPercentage}%</td>}
                {!invoice.isHideVatFields && (
                  <td>
                    {Calculator.formatToCurrency(
                      service.vatAmount,
                      service.currency || currency
                    )}
                  </td>
                )}
                <td>
                  {Calculator.formatToCurrency(
                    service.gross,
                    service.currency || currency
                  )}
                </td>
              </tr>
            ))}

          <tr className="summary summary-subtotal">
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            {!invoice.isHideVatFields && <td>&nbsp;</td>}
            {!invoice.isHideVatFields && <td>&nbsp;</td>}
            <td className="summary-data">Total discount</td>
            <td className="summary-data">
              {Calculator.formatToCurrency(
                totalDiscountAmount,
                derivedInvoiceCurrency
              )}
            </td>
          </tr>
          <tr className="summary summary-subtotal">
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            {!invoice.isHideVatFields && <td>&nbsp;</td>}
            {!invoice.isHideVatFields && <td>&nbsp;</td>}
            <td className="summary-data">Sub Total</td>
            <td className="summary-data">
              {Calculator.formatToCurrency(subtotal, derivedInvoiceCurrency)}
            </td>
          </tr>
          {!invoice.isHideVatFields && (
            <tr className="summary summary-subtotal">
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td className="summary-data">Total VAT {vatPercentage}%</td>
              <td className="summary-data">
                {Calculator.formatToCurrency(
                  totalVatAmount,
                  derivedInvoiceCurrency
                )}
              </td>
            </tr>
          )}

          <tr className="summary summary-total">
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            {!invoice.isHideVatFields && <td>&nbsp;</td>}
            {!invoice.isHideVatFields && <td>&nbsp;</td>}
            <td className="summary-data">TOTAL DUE</td>
            <td className="summary-data">
              {Calculator.formatToCurrency(totalDue, derivedInvoiceCurrency)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ServicesListing;
