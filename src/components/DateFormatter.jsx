import React from 'react';
import './DateFormater.css'

const DateFormatter = ({ date }) => {
    const formattedDate = formatDate(date);

    return <span>{formattedDate}</span>;
};

const formatDate = (dateString) => {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };

    // Obter a data formatada no formato "dd/mm/yyyy hh:mm AM/PM"
    const formattedDate = new Date(dateString).toLocaleString('pt-br', options);

    return formattedDate;
};

export default DateFormatter;
