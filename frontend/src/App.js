import { Route, Routes } from 'react-router-dom';
import React from "react";
import "./App.css";
import Todos from './components/Todos';
import TodoDetials from './components/TodoDetails';
import Error from './components/Error';

function App(){
  return (<div className='App'>
    <Routes>
      <Route exact path="/" element={<Todos />} />
      <Route exact path= "/:id" element={<TodoDetials />} />
      <Route path="*" element={<Error />} />
    </Routes>;
  </div>)
    
}
export default App;