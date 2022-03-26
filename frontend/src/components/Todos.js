import React, { useState, useEffect, useRef } from "react";
import TodoDataService from "../services/todo.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, FormCheck } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAlert } from 'react-alert'
import Loading from "./Loading";
import TodoItem from "./Todo";
import Moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

const Todos = () => {
    const navigate = useNavigate();
    const alert = useAlert()

    const [isLoading, setIsLoading] = useState(true);
    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null);
    const [editingTodo, setEditingTodo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const todosRef = useRef();

    const [checkedState, setCheckedState] = useState(
        new Array(todos.length).fill(false)
      );

    todosRef.current = todos;

  useEffect(() => {
    retrieveTodos();
  }, []);


  useEffect(() => {
    const updateChecked =  todos.map((todo, index) => checkedState[index] = todo.isDone);
    setCheckedState(updateChecked);
  },[todos]);

  const formSubmitHandler = e => {
    e.preventDefault()
    const title = inputRef.current.value;
    if(title.trim() === ""){
        alert.show(<div style={{color:'while',textTransform: 'none'}}>Todo title can't be empty </div>)
        return;
    } else{
        inputRef.current.value = "";
        saveTodo(title);
    }
  }

  const formSubmitHandlerEdit = e => {
    e.preventDefault()
    const title = inputRef.current.value;
    if(title.trim() === ""){
        alert.show(<div style={{color:'while',textTransform: 'none'}}>Todo title can't be empty </div>)
        return;
    } else{
        inputRef.current.value = "";
        const todo = {...editingTodo, title: title};
        TodoDataService.updateTodo(editingTodo.id, todo).then((response)=>{
            if(response.status === 200){
                const result = response.data;
                if(result.statusCode === 200){
                    const newList = todos.map((oldTodo, index) => {
                        if(oldTodo.id === result.data.id){
                            const updatedItem = {
                                ...oldTodo,
                                title: result.data.title,
                              };
                              return updatedItem;
                        }
                        return oldTodo;
                    });
                    todosRef.current = newList;
                    setTodos(todosRef.current);
                    setIsEditing(false);    
                }
                alert.show(<div style={{color:'while',textTransform: 'none'}}>Todo <span style={{fontStyle:'italic'}}>{todo.title}</span> updated successfully</div>)
            }
            setIsEditing(false);
        }).catch(err => {
            console.log(err);
            setIsEditing(false);
        })
    }
  }

  const retrieveTodos = () => {
    TodoDataService.getAllTodos()
      .then((response) => {
        const todos = response.data.sort((a, b) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }).reverse();
        setTodos(todos);
        setIsLoading(false);
      }).catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTodos();
  };

  const handleChangeTodo = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const todo = todos[position];
    todo.isDone = !todo.isDone;

    TodoDataService.updateTodo(todos[position].id,todo).then(response => {
        const result = response.data;
        if(result.statusCode === 200){
            todosRef.current[position].isDone = todo.isDone;
            setTodos(todosRef.current);
            alert.show(<div style={{color:'while',textTransform: 'none'}}>Todo <span style={{fontStyle:'italic'}}>{todo.title}</span> updated successfully</div>)
        }
    }).catch(error => {
        console.log(error);
        refreshList();
    });
  }

    const editTodo = (todo) => {
        inputRef.current.value = todo.title;
        inputRef.current.focus();
        setEditingTodo(todo);
        setIsEditing(true);

    }

  const deleteTodo = (todo) => {
    TodoDataService.deleteTodoById(todo.id)
      .then((response) => {
          console.log(response);
        let newTodos = [...todos];
        newTodos = newTodos.filter(item => item.id !== todo.id);
        todosRef.current = newTodos;
        setTodos(newTodos);
        alert.show(<div style={{color:'while',textTransform: 'none'}}>Todo <span style={{fontStyle:'italic'}}>{todo.title}</span> Deleted successfully</div>)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const saveTodo = (title) => {
      console.log(`Save todo ${title}`);
    const todo = {
        id:'4836bb3e-be42-8739-f017-8d37c19e2426',
        title: title,
        isDone: false,
        createdAt: Moment().format('YYYY-MM-DD HH:mm:ss'),
    }
    TodoDataService.createTodo(todo).then(response => {
        if(response.status === 201){
            const result = response.data;
            todos = [...todos, result];
            todosRef.current = todos;
            setTodos(todosRef.current);
            alert.show(<div style={{color:'while',textTransform: 'none'}}>Todo <span style={{fontStyle:'italic'}}>{todo.title}</span> added successfully</div>);
        }
    }).catch(error => {
        console.log(error);
        refreshList();
    });
  }

  const openTodo = todo =>{
      navigate(`/${todo.id}`);
  }

  if(isLoading)
    return <Loading message={"Pleses wait some time...."} />

  return (
    <div className="vh-100">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
                <div className="card" id="list1" style={{borderRadius: ".75rem", backgroundColor: "#eff1f2"}}>
                <div className="card-body py-4 px-4 px-md-5">
                    <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                        <span>My Todos</span>
                    </p>
                    <Form onSubmit={isEditing ? formSubmitHandlerEdit : formSubmitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Todo Title</Form.Label>
                            <Form.Control ref={inputRef} type="text" placeholder="Enter title" />
                            <Form.Text className="text-muted">
                                Please enter your task.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit"><FontAwesomeIcon icon={faPlus} /> <span className="p-1">{isEditing ?'Update Todo':'Add New'}</span></Button>
                    </Form>
                </div>
                <div className="card-body py-4 px-4 px-md-5">
                        {
                            todosRef.current.map((todo, index) => {
                                return <TodoItem 
                                key={todo.id} todo={todo} 
                                checked = { checkedState[index]} 
                                toggleTodo = {()=> handleChangeTodo(index)}
                                edit = {()=> editTodo(todo)}
                                deleteTodo = {()=> deleteTodo(todo)}
                                todoItemClick = {() => openTodo(todo)}
                                />
                            })
                        }
                </div>
            </div>
            </div>
        </div>
    </div>
    </div>
    );

}

export default Todos;