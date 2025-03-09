import { createContext, useContext } from "react";

const TodoContext = createContext({
    todos: [],
    addTodo: () => {},
    removeTodo: () => {},
    editTodo: () => {},
    toggleTodo: () => {},
});

export const useTodo = () => {
    return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
