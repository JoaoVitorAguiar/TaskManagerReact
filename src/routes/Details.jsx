import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import blogFetch from "../axios/config";
import DateFormatter from "../components/DateFormatter";
import './Details.css'

const Details = () => {
    const [tarefa, setTarefa] = useState({});
    const [status, setStatus] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for the delete modal
    const { id } = useParams(); // pega o id da rota
    const navigate = useNavigate();

    const convertStatus = (stringStatus) => {
        if (stringStatus == '0') {
            return 'Pendente';
        }
        if (stringStatus == '1') {
            return 'Em andamento';
        }
        if (stringStatus == '2') {
            return 'Concluída';
        }
    }

    const getTarefa = async () => {
        try {
            const response = await blogFetch.get(`/Tarefas/${id}`);
            const data = response.data;
            setTarefa(data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getTarefa();
    }, []);

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
        document.body.classList.add('modal-open'); // Apply the modal-open class to blur the background
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        document.body.classList.remove('modal-open'); // Remove the modal-open class to unblur the background
    }


    const handleDelete = async () => {
        try {
            await blogFetch.delete(`/Tarefas/${id}`);
            // Optionally, you can navigate to another page or perform other actions after deletion.
            alert("Tarefa exluída");
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="details">
            <h1>{tarefa.title}</h1>
            <div>
                <p>{tarefa.description}</p>
                <p><DateFormatter date={tarefa.createdDate} /></p>
                <p>{convertStatus(tarefa.status)}</p>
                <div className="buttons">
                    <Link to={`/edit/${id}`} className="btn-edit">Editar</Link>
                    <button onClick={openDeleteModal} className="btn-delete">Deletar</button>
                    <Link to={`/`} className="btn-back">Voltar</Link>
                </div>
            </div>
            {isDeleteModalOpen && (
                <div className="delete-modal">
                    <p>Tem certeza de que deseja deletar esta tarefa?</p>
                    <button className="modal-btn-confirm" onClick={handleDelete}>Sim</button>
                    <button className="modal-btn-notConfirm" onClick={closeDeleteModal}>Não</button>
                </div>
            )}
        </div>
    )
}

export default Details;
