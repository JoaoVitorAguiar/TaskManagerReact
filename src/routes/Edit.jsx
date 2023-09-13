import { useState, useEffect } from "react";
import blogFetch from "../axios/config";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './Edit.css'

const Edit = () => {
    const [tarefa, setTarefa] = useState(null) // inicializa o estado com null
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('0'); // Inicializa com '0' para "Pendente"
    const { id } = useParams(); // pega o id da rota

    const getTarefa = async () => {
        try {
            const response = await blogFetch.get(`/Tarefas/${id}`);
            const data = response.data; // Obtenha os dados da resposta, não a resposta completa
            setTarefa(data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getTarefa();
    }, []);

    useEffect(() => {
        if (tarefa) { // verifica se a tarefa existe
            setTitle(tarefa.title || ''); // usa o operador OU para fornecer um valor alternativo caso tarefa.title seja indefinido
            setDescription(tarefa.description || ''); // usa o operador OU para fornecer um valor alternativo caso tarefa.description seja indefinido
            setStatus(tarefa.status || '0'); // usa o operador OU para fornecer um valor alternativo caso tarefa.status seja indefinido
        }
    }, [tarefa]); // usa a tarefa como dependência

    const putTask = async (e) => {
        e.preventDefault();
        // Converte o valor de status para um número inteiro
        const statusInt = parseInt(status, 10);
        const tarefaCreated = {
            title,
            description,
            createdDate: tarefa.createdDate,
            status: statusInt, // int
            id: tarefa.id
        };

        try {
            await blogFetch.put(`/Tarefas/${id}`, tarefaCreated); // Send the updated tarefaCreated object
            setTarefa(tarefaCreated); // Update the local state with the updated data
            alert("Tarefa atualizada!");
            navigate(`/details/${id}`);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className='new-task'>
            <h1>Editar Tarefa</h1>
            <form onSubmit={(e) => putTask(e)}>
                {tarefa ? ( // usa um operador ternário para renderizar os inputs somente se a tarefa existir
                    <>
                        <div className='form-control'>
                            <label htmlFor="title">Título da Tarefa</label>
                            <input
                                id='title'
                                type='text'
                                name='title'
                                placeholder='Informe o título'
                                value={title || ''} // usa o operador OU para fornecer um valor alternativo caso title seja indefinido
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
                                value={description || ''} // usa o operador OU para fornecer um valor alternativo caso description seja indefinido
                                onChange={(e) => setDescription(e.target.value)}

                            />
                        </div>

                        <div className='form-control'>
                            <label htmlFor="status">Status</label>
                            <select
                                name="status"
                                value={status || '0'} // usa o operador OU para fornecer um valor alternativo caso status seja indefinido
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="0">Pendente</option>
                                <option value="1">Em andamento</option>
                                <option value="2">Concluída</option>
                            </select>
                        </div>
                        <div className="buttons-edit-task">
                            <input type="submit" value="Atualizar" className='btn-atualizar' />
                            <Link to={`/`} className="btn-back">Voltar</Link>
                        </div>
                    </>
                ) : ( // caso contrário, mostra uma mensagem de carregando
                    <p>Carregando...</p>
                )}
            </form>
        </div>
    )
}

export default Edit
