import React from 'react';
import './Tarefa.css'
import DateFormatter from './DateFormatter';

const Tarefa = ({ tarefa }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 0:
                return '#E17B7B'; // Cor para tarefas pendentes
            case 1:
                return '#E1E17B'; // Cor para tarefas em andamento
            case 2:
                return '#7BE17B'; // Cor para tarefas concluídas
            default:
                return 'white'; // Cor padrão para outros casos
        }
    };

    const backgroundColor = getStatusColor(tarefa.status);

    return (
        <div className="tarefa" style={{ backgroundColor }}>
            <h2>{tarefa.title}</h2>
            <p>{tarefa.description}</p>
            <p><DateFormatter date={tarefa.createdDate} /></p>
        </div>
    );
};

export default Tarefa;
