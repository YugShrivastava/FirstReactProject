import "./App.css";
import { useState } from "react";
import Navbar from "./assets/components/Navbar";
import { v4 as uuidv4, v4 } from "uuid";

const App = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    const handleEdit = () => {};

    const handleDelete = () => {};

    const handleAdd = () => {
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
        setTodo("");
        console.log();
    };

    const handleChange = (e) => {
        setTodo(e.target.value);
    };

    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = todos.findIndex((item) => {
            return item.id === id;
        });
        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto bg-violet-100 my-5 rounded-xl p-5 min-h-[80vh]">
                <div className="addTodo my-5">
                    <h2 className="text-lg font-bold">Add a ToDo</h2>
                    <input
                        onChange={handleChange}
                        value={todo}
                        type="text"
                        className="w-80"
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6"
                    >
                        Add
                    </button>
                </div>
                <h2 className="text-lg font-bold">Your Todos</h2>
                <div className="todos">
                    {todos.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className="todo w-1/4 my-3 flex justify-between"
                            >
                                <input
                                    onChange={handleCheckbox}
                                    type="checkbox"
                                    value={item.isCompleted}
                                    name={item.id}
                                    id=""
                                />
                                <div
                                    className={
                                        item.isCompleted ? "line-through" : ""
                                    }
                                >
                                    {item.todo}
                                </div>
                                <div className="buttons">
                                    <button
                                        onClick={handleEdit}
                                        className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default App;
