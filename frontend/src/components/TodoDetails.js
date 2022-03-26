import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import TodoDataService from "../services/todo.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faUserClock } from '@fortawesome/free-solid-svg-icons';
import Utils from '../shared/Utils';
import Loading from "./Loading";
import Error from "./Error";

const TodoDetials = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [todo, setTodo] = useState(null);
    const todoRef = useRef();
    todoRef.current = todo;

    useEffect(() => {
        console.log(id);
        if(id !== undefined){
            TodoDataService.getTodoById(id).then(response => {
            todoRef.current = response.data;
            setTodo(todoRef.current);
            setIsLoading(false);
            }).catch(error => {
                setIsLoading(false);
                navigate('/not-found');
            });
        }
    }, [id]);

    if(isLoading){
        return <Loading />
    }
    if(todo === null){
        return <Error />
    }

    return (<div className="vh-100">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
                <div className="card" id="list1" style={{borderRadius: ".75rem", backgroundColor: "#eff1f2"}}>
                <div className="card-body py-4 px-4 px-md-5">
                    <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                        <span>My Todos</span>
                    </p>
                <div className="col">
                    <button className="btn btn-primary" onClick={() => navigate('/')}> Back To List </button>
                </div>
                </div>
                <div className="card-body py-4 px-4 px-md-5">
                        <ul className="list-group list-group-horizontal rounded-0 bg-transparent">
                            <li className="list-group-item px-2 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                                <div>
                                    <p>{todoRef.current.title}</p>
                                    <p>{todoRef.current.isDone ? <span className="text-success">Todo Compeleted</span>:<span className="text-info">Todo Not Compelted</span>}</p>
                                </div>
                            </li>
                            <li className="list-group-item ps-1 pe-0 py-1 rounded-0 border-0 bg-transparent">
                                <div className="d-flex flex-row justify-content-end mb-1">
                                    <p>Todo Created At</p>
                                </div>
                            <div class="text-end text-muted">
                                <a href="/" className="text-muted" data-mdb-toggle="tooltip" title="Created date">
                                <p className="small mb-0"><FontAwesomeIcon icon={faUserClock} />{Utils.dateTimeToFormattedString(todoRef.current.createdAt)}</p></a>
                            </div>
                            </li>
                        </ul>
                </div>
            </div>
            </div>
        </div>
    </div>
    </div>
    );
}

export default TodoDetials;