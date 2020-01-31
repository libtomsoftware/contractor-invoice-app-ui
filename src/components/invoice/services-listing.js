import React from "react";
import Calculator from "../../services/calculator";

const ServicesListing = props => {
  const { currency, vatPercentage } = props.settings;

  const services = Calculator.computeServices(
    props.services || [],
    vatPercentage
  );

  let {
    subtotal,
    totalDiscountAmount,
    totalVatAmount,
    totalDue
  } = Calculator.computeSubtotalDiscountAndVat(services);

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
            <th>VAT %</th>
            <th>VAT amount</th>
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
                <td>{Calculator.formatToCurrency(service.price, currency)}</td>
                <td>{service.quantity}</td>
                <td>{service.discountPercentage}%</td>
                <td>{Calculator.formatToCurrency(service.net, currency)}</td>
                <td>{vatPercentage}%</td>
                <td>
                  {Calculator.formatToCurrency(service.vatAmount, currency)}
                </td>
                <td>{Calculator.formatToCurrency(service.gross, currency)}</td>
              </tr>
            ))}

          <tr className="summary summary-subtotal">
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td className="summary-data">Total discount</td>
            <td className="summary-data">
              {Calculator.formatToCurrency(totalDiscountAmount, currency)}
            </td>
          </tr>
          <tr className="summary summary-subtotal">
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td className="summary-data">Sub Total</td>
            <td className="summary-data">
              {Calculator.formatToCurrency(subtotal, currency)}
            </td>
          </tr>
          <tr className="summary summary-subtotal">
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td className="summary-data">Total VAT {vatPercentage}%</td>
            <td className="summary-data">
              {Calculator.formatToCurrency(totalVatAmount, currency)}
            </td>
          </tr>

          <tr className="summary summary-total">
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td className="summary-data">TOTAL DUE</td>
            <td className="summary-data">
              {Calculator.formatToCurrency(totalDue, currency)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ServicesListing;
