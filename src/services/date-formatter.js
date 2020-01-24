import moment from "moment";

class DateFormatter {
  getInvoiceDate(date) {
    return moment(date).format("DD/MM/YYYY");
  }

  getInvoiceNumber(number) {
    return "LBT0" + number + moment().format("/MM/YY");
  }

  getPeriodBoundaries(isWeekly, date, isSundayFirstDay) {
    const startOfTheWeek = moment(date)
      .startOf(isSundayFirstDay ? "week" : "isoWeek")
      .format("DD/MM/YY");
    const endOfTheWeek = moment(date)
      .endOf(isSundayFirstDay ? "week" : "isoWeek")
      .format("DD/MM/YY");
    const weeklyBoundaries = startOfTheWeek + " - " + endOfTheWeek;
    const monthlyBoundaries =
      moment(date)
        .startOf("month")
        .format("DD/MM/YY") +
      " - " +
      moment(date)
        .endOf("month")
        .format("DD/MM/YY");

    return isWeekly ? weeklyBoundaries : monthlyBoundaries;
  }
}

export default new DateFormatter();
