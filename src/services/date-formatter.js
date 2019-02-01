import moment from 'moment';

class DateFormatter {

    getInvoiceDate(date) {
        return moment(date).format('DD/MM/YYYY');
    }

    getInvoiceNumber(number) {
        return 'LBT0' + number + moment().format('/MM/YY');
    }

    getPeriodBoundaries(isWeekly, date) {
    	const weeklyBoundaries = moment(date).startOf('isoWeek').format('DD/MM/YY') + ' - ' + moment(date).endOf('isoWeek').format('DD/MM/YY'),
    		monthlyBoundaries = moment(date).startOf('month').format('DD/MM/YY') + ' - ' + moment(date).endOf('month').format('DD/MM/YY');

        return isWeekly ? weeklyBoundaries : monthlyBoundaries;
    }

}

export default new DateFormatter();
