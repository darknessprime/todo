import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

const STORAGE_KEY = "taskmaster_todos_v1";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const storedTodos = localStorage.getItem(STORAGE_KEY);
      const parsedTodos = storedTodos ? JSON.parse(storedTodos) : [];
      return Array.isArray(parsedTodos) ? parsedTodos : [];
    } catch (error) {
      console.error("Failed to load todos:", error);
      return [];
    }
  });

  const addTodo = (todo) => {
    setTodos((prev)=>[...prev,todo])
  }

  const editTodo =(id,todo)=>{
    setTodos((prev)=>prev.map((prevTodo) => prevTodo.id === id ? todo : prevTodo))
  }

  const removeTodo =(id)=>{
    setTodos((prev)=> prev.filter((prevTodo)=> prevTodo.id !== id))
  }

  const toggleTodo =(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=> prevTodo.id === id ?{...prevTodo, completed:!prevTodo.completed} : prevTodo))
  }

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos:", error);
    }
  }, [todos]);

  return (
    <TodoProvider value={{todos,addTodo ,removeTodo ,editTodo, toggleTodo}}>
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-start">
            <h1 className="text-5xl font-extrabold text-center mb-12 mt-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              ✨ Task Master
            </h1>
            <div className="w-full max-w-3xl backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="mb-6">
                <TodoForm />
              </div>
              <div className="flex flex-col gap-4">
                {todos.map((todo) => (
                  <div key={todo.id} className="w-full">
                    <TodoItem todo={todo} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
