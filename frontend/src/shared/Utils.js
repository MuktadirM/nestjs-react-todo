import Moment from 'moment';

class Utils {
    
    dateTimeToFormattedString(dateTime,locale = 'en') {
        Moment.locale(locale);
        return Moment(dateTime).format('MMM Do YYYY, h:mm:ss a');
    }
}

export default new Utils();