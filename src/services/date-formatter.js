import moment from 'moment';

class DateFormatter {

    getInvoiceDate(date) {
        return moment(date).format('DD/MM/YYYY');
    }

    getInvoiceNumber(number) {
        return 'LBT0' + number + moment().format('/MM/YY');
    }

    getWeekBoundaries(date) {
        return moment(date).startOf('isoWeek').format('DD/MM/YY') + ' - ' + moment(date).endOf('isoWeek').format('DD/MM/YY');
    }

}

export default new DateFormatter();
