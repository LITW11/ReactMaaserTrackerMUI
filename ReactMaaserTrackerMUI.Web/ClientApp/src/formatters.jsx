import dayjs from 'dayjs';

const formatDate = date => {
    return dayjs(date).format('YYYY-MM-DD');
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const formatCurrency = value => {
    return formatter.format(value);
}

export { formatDate, formatCurrency };