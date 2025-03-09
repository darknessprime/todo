import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const { editTodo, removeTodo, toggleTodo } = useTodo(); // useTodo should be called

    const updateTodo = () => {
        editTodo(todo.id, { ...todo, todo: todoMsg });
        setIsTodoEditable(false);
    };

    const toggleCompleted = () => {
        toggleTodo(todo.id);
    };

    return (
        <div
            className={`flex items-center border-2 rounded-xl px-4 py-3 gap-4 shadow-lg transition-all duration-300 ease-in-out ${
                todo.completed 
                ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30" 
                : "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-white/20 hover:border-purple-500/30"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer w-6 h-6 accent-purple-500 rounded-lg"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg transition-all duration-300 text-white text-lg ${
                    isTodoEditable ? "border-white/20 px-3 py-1" : "border-transparent"
                } ${todo.completed ? "line-through text-white/50" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            <button
                className="inline-flex w-12 h-12 rounded-xl text-lg border-2 border-white/20 justify-center items-center bg-white/10 hover:bg-white/20 transition duration-300 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                    if (todo.completed) return;
                    if (isTodoEditable) {
                        updateTodo();
                    } else {
                        setIsTodoEditable((prev) => !prev);
                    }
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "💾" : "✏️"}
            </button>
            <button
                className="inline-flex w-12 h-12 rounded-xl text-lg border-2 border-white/20 justify-center items-center bg-white/10 hover:bg-red-500/30 transition duration-300 shrink-0"
                onClick={() => removeTodo(todo.id)}
            >
                🗑️
            </button>
        </div>
    );
}

export default TodoItem;
