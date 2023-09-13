import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import blogFetch from '../axios/config'
import Tarefa from '../components/Tarefa'
import "./Home.css"


const Home = () => {
    const [tarefas, setTarefas] = useState([]) // array de tarefas

    const getTarefas = async () => {
        try {
            const response = await blogFetch.get('/Tarefas');
            const data = response.data; // Obtenha os dados da resposta, não a resposta completa
            setTarefas(data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getTarefas();
    }, []);


    return (
        <div className='home'>
            <h1>Últimas tarefas</h1>
            {tarefas.length == 0 ? (<p>Carregando...</p>) : (
                tarefas.map((tarefa) => (
                    <Link to={`/details/${tarefa.id}`} key={tarefa.id}>
                        <Tarefa tarefa={tarefa} />
                    </Link>
                ))
            )}
        </div>
    )
}

export default Home