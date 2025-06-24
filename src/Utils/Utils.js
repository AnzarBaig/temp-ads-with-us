import moment from "moment";

export const getFormattedDate = (UNIX_timestamp, types, symbol = '-', timeFormat = '24', monthName = false, includeDay = true) => {
    if (!types || !Array.isArray(types) || types.length === 0) {
        return 'Invalid types';
    }

    UNIX_timestamp = parseInt(UNIX_timestamp);
    var a = new Date(UNIX_timestamp);
    var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var day = includeDay ? days[a.getDay()] + ' ' : '';
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var month = monthName ? months[a.getMonth()] : ('0' + (a.getMonth() + 1)).slice(-2);
    var year = a.getFullYear();
    var date = a.getDate() > 9 ? a.getDate() : '0' + a.getDate();
    var hour = timeFormat === '12' ? a.getHours() % 12 || 12 : a.getHours(); // Convert to 12-hour format if specified
    var minute = a.getMinutes() > 9 ? a.getMinutes() : '0' + a.getMinutes();
    var second = a.getSeconds();
    var period = timeFormat === '12' ? (a.getHours() < 12 ? 'am' : 'pm') : ''; // Determine AM or PM only in 12-hour format

    let result = '';
    types.forEach((type, index) => {
        if (type === 'day') {
            result += `${day}`;
        } else if (type === 'date') {
            result += `${date}`;
        } else if (type === 'month') {
            result += `${month}`;
        } else if (type === 'year') {
            result += `${year}`;
        } else if (type === 'hour') {
            result += `${hour}`;
        } else if (type === 'minute') {
            if (minute !== '00') {
                result += `${minute}`;
            } else {
                result += '00';
            }
        } else if (type === 'second') {
            result += `${second}`;
        } else if (type === 'period' && period) { // Add period only if it exists
            result += ` ${period}`; // Include space before period
        } else {
            // Handle invalid type
            result += 'Invalid type';
        }
        // Add the symbol if it's not the last element and there are more elements to concatenate
        if (index !== types.length - 1 && (index !== types.length - 2 || types[index + 1] !== 'period')) {
            result += symbol;
        }
    });

    return result;
}

export const ConvertTime = (value) =>{
    var temp = moment(value).utc().format('YYYY-MM-DD')
    var UNIX_timestamp = new Date(temp).getTime()
    return UNIX_timestamp
}