import blogFetch from '../axios/config'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'; // Importa a biblioteca Luxon para manipulação de datas
import './NewTask.css'

const NewTask = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('0'); // Inicializa com '0' para "Pendente"

    const createTask = async (e) => {
        e.preventDefault();
        const brasiliaTime = DateTime.now().setZone('America/Sao_Paulo'); // Obtém a hora atual de Brasília
        const createdDate = brasiliaTime.toISO(); // Converte a hora de Brasília para o formato ISO
        // Converte o valor de status para um número inteiro
        const statusInt = parseInt(status, 10);
        const tarefa = {
            title,
            description,
            createdDate,
            status: statusInt, // int
            id: 0
        };

        try {
            await blogFetch.post("/Tarefas", tarefa);
            alert("Tarefa cadastrada!");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='new-task'>
            <h1>Nova Tarefa</h1>
            <form onSubmit={(e) => createTask(e)}>
                <div className='form-control'>
                    <label htmlFor="title">Título da Tarefa</label>
                    <input
                        id='title'
                        type='text'
                        name='title'
                        placeholder='Informe o título'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                        name="descricao"
                        id="descricao"
                        placeholder='Informe a descrição'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className='form-control'>
                    <label htmlFor="status">Status</label>
                    <select
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="0">Pendente</option>
                        <option value="1">Em andamento</option>
                        <option value="2">Concluída</option>
                    </select>
                </div>
                <div className='buttons-new-task'>
                    <input type="submit" value="Cadastrar" className='btn-cadastrar' />
                    <Link to={`/`} className="btn-back">Voltar</Link>
                </div>
            </form>
        </div>
    )
}

export default NewTask;
