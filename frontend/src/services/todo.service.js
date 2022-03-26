import http from '../shared/api/todo.js';

class TodoDataService{
    getAllTodos(){
        return http.get('/todos');
    }
    
    getTodoById(id){
        return http.get('/todos/'+id);
    }

    updateTodo(id, todo){
        return http.patch('/todos/'+id, todo);
    }
    deleteTodoById(id){
        return http.delete('/todos/'+id);
    }
    createTodo(todo){
        return http.post('/todos/create', todo);
    }
}

export default new TodoDataService();