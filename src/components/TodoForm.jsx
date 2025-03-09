import React, { useState } from 'react'
import { useTodo } from '../contexts';

function TodoForm() {
    const [todo,setTodo] = useState('');    
    const {addTodo} = useTodo()

    const add = (e)=>{
        e.preventDefault();
        if(!todo) return;

        addTodo({id: Date.now(), todo, completed:false})
        setTodo('')
    }
    return (
        <form onSubmit={add} className="flex gap-2">
            <input
                type="text"
                placeholder="Add a new task..."
                value={todo}
                onChange={(e)=>setTodo(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/20 outline-none duration-150 bg-white/10 text-white placeholder:text-white/50 focus:border-purple-500/50 focus:bg-white/20"
            />
            <button type="submit" className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

