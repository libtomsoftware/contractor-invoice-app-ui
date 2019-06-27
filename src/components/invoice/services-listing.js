import React from "react";

function calculateNet(service) {
  if (service.discountAmount) {
    service.price = service.price - service.discountAmount;
  }

  return service.price * service.quantity;
}

function calculateDiscountAmount(price, discountPercentage) {
  return discountPercentage ? (price * discountPercentage) / 100 : 0;
}

function calculateVatAmount(net, vatPercentage) {
  return (net * vatPercentage) / 100;
}

const ServicesListing = props => {
  const { currency, vatPercentage } = props.settings;

  let subtotal = 0,
    totalVatAmount = 0,
    totalDiscountAmount = 0,
    totalDue = 0,
    services = props.services.map(service => Object.assign({}, service));

  function formatToCurrency(value) {
    const valueFormatted = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

    return currency.symbolInFront
      ? currency.symbol + valueFormatted
      : valueFormatted + currency.symbol;
  }

  services = services.map(service => {
    service.discountAmount = calculateDiscountAmount(
      service.price,
      service.discountPercentage
    );
    service.net = calculateNet(service);
    service.vatAmount = calculateVatAmount(service.net, vatPercentage);
    service.gross = service.net + service.vatAmount;
    return service;
  });

  services.forEach(service => {
    subtotal += service.net;
    totalDiscountAmount += service.discountAmount;
    totalVatAmount += service.vatAmount;
  });

  totalDue = subtotal + totalVatAmount;

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
          {services.length > 0 &&
            services.map((service, index) => (
              <tr className="cp-invoice-services-list" key={index}>
                <td>{service.description}</td>
                <td>{formatToCurrency(service.price)}</td>
                <td>{service.quantity}</td>
                <td>{service.discountPercentage}%</td>
                <td>{formatToCurrency(service.net)}</td>
                <td>{vatPercentage}%</td>
                <td>{formatToCurrency(service.vatAmount)}</td>
                <td>{formatToCurrency(service.gross)}</td>
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
              {formatToCurrency(totalDiscountAmount)}
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
            <td className="summary-data">{formatToCurrency(subtotal)}</td>
          </tr>
          <tr className="summary summary-subtotal">
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td className="summary-data">Total VAT {vatPercentage}%</td>
            <td className="summary-data">{formatToCurrency(totalVatAmount)}</td>
          </tr>

          <tr className="summary summary-total">
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td className="summary-data">TOTAL DUE</td>
            <td className="summary-data">{formatToCurrency(totalDue)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ServicesListing;
