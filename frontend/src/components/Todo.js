import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormCheck } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { faTrashAlt,faPencilAlt,faInfoCircle,faEye } from '@fortawesome/free-solid-svg-icons';
import Utils from '../shared/Utils';

const TodoItem = ({ todo, checked, toggleTodo, edit, deleteTodo,todoItemClick}) => {

    return <div className={checked ? 'card bg-light p-1':'card bg-white p-1'}>
        <ul className="list-group list-group-horizontal rounded-0 bg-transparent ">
            <li className="list-group-item d-flex align-items-center ps-0 pe-1 py-1 rounded-0 border-0 bg-transparent">
                <div className="form-check">
                    <FormCheck className='px-1' checked={checked} onChange={toggleTodo} />
                    </div>
            </li>
            <li className="list-group-item px-2 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                <p className="lead fw-normal mb-0"><span className={todo.isDone?'text-decoration-line-through':''}> {todo.title}</span></p>
            </li>

            <li className="list-group-item ps-1 pe-0 py-1 rounded-0 border-0 bg-transparent">
                <div className="d-flex flex-row justify-content-end mb-1">
                    <div  onClick={todoItemClick} className="text-secondary p-1" data-mdb-toggle="tooltip" title="View Details Todo"><FontAwesomeIcon icon={faEye} /></div>
                    <div  onClick={edit} className="text-info p-1" data-mdb-toggle="tooltip" title="Edit todo"><FontAwesomeIcon icon={faPencilAlt} /></div>
                    <div  onClick={deleteTodo} className="text-danger p-1" data-mdb-toggle="tooltip" title="Delete todo"><FontAwesomeIcon icon={faTrashAlt} /></div>
                </div>
                <div class="text-end text-muted">
                    <a className="text-muted" data-mdb-toggle="tooltip" title="Created date">
                    <p className="small mb-0"><FontAwesomeIcon icon={faInfoCircle} />{Utils.dateTimeToFormattedString(todo.createdAt)}</p></a>
                </div>
            </li>
        </ul>
    </div>
}

export default TodoItem;