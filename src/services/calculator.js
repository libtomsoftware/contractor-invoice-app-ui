class Calculator {
  formatToCurrency(value, currency) {
    const valueFormatted = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

    return currency.symbolInFront
      ? currency.symbol + valueFormatted
      : valueFormatted + currency.symbol;
  }

  calculateVatAmount(net, vatPercentage) {
    return (net * vatPercentage) / 100;
  }

  calculateNet(service) {
    if (service.discountAmount) {
      service.price = service.price - service.discountAmount;
    }

    return service.price * service.quantity;
  }

  calculateDiscountAmount(price, discountPercentage) {
    return discountPercentage ? (price * discountPercentage) / 100 : 0;
  }

  computeServices(servicesFromProps, vatPercentage) {
    const services = servicesFromProps.map(service =>
      Object.assign({}, service)
    );

    return services.map(service => {
      service.discountAmount = this.calculateDiscountAmount(
        service.price,
        service.discountPercentage
      );
      service.net = this.calculateNet(service);
      service.vatAmount = this.calculateVatAmount(service.net, vatPercentage);
      service.gross = service.net + service.vatAmount;
      return service;
    });
  }

  computeSubtotalDiscountAndVat(services) {
    let subtotal = 0;
    let totalVatAmount = 0;
    let totalDiscountAmount = 0;

    services.forEach(service => {
      subtotal += service.net;
      totalDiscountAmount += service.discountAmount;
      totalVatAmount += service.vatAmount;
    });

    return {
      subtotal,
      totalDiscountAmount,
      totalVatAmount,
      totalDue: subtotal + totalVatAmount
    };
  }
}

export default new Calculator();
