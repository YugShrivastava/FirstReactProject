import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./assets/components/Navbar";
import { v4 as uuidv4, v4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const App = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [showFinished, setshowFinished] = useState(true);

    const toggleFinished = () => {
        setshowFinished(!showFinished);
        console.log(showFinished);
    };

    useEffect(() => {
        let todosString = localStorage.getItem("todos");
        if (todosString) {
            let todos = JSON.parse(localStorage.getItem("todos"));
            setTodos(todos);
        }
    }, []);

    const saveToLs = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    const handleEdit = (e, id) => {
        let t = todos.filter((item) => {
            return item.id === id;
        });
        setTodo(t[0].todo);

        let newTodos = todos.filter((item) => {
            return item.id !== id;
        });
        setTodos(newTodos);
        saveToLs();
    };

    const handleDelete = (e, id) => {
        let newTodos = todos.filter((item) => {
            return item.id !== id;
        });
        setTodos(newTodos);
        saveToLs();
    };

    const handleAdd = () => {
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
        setTodo("");
        saveToLs();
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
        saveToLs();
    };

    return (
        <>
            <Navbar />
            <div className="mx-3 md:container md:mx-auto bg-violet-100 my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2">
                <h1 className="text-center font-bold text-2xl py-3">
                    iTask - Manage todos at one place
                </h1>
                <h2 className="text-lg font-bold">Add a ToDo</h2>
                <div className="addTodo my-5 flex justify-space-between gap-5">
                    <input
                        onChange={handleChange}
                        value={todo}
                        type="text"
                        className="w-3/4 px-5 py-1 rounded-lg "
                    />
                    <button
                        onClick={handleAdd}
                        disabled={todo.length <= 3}
                        className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white disabled:bg-violet-500 transition-all rounded-lg w-1/4"
                    >
                        Save
                    </button>
                </div>
                <input
                    className="my-3"
                    onChange={toggleFinished}
                    type="checkbox"
                    checked={showFinished}
                />{" "}
                <label className="mx-2" htmlFor="show">
                    Show Finished
                </label>
                <div className="h-[1px] bg-black opacity-20 w-[95%] mx-auto my-3"></div>
                <h2 className="text-lg font-bold">Your Todos</h2>
                <div className="todos">
                    {todos.length === 0 && (
                        <div className="m-5">No Todos to display</div>
                    )}
                    {todos.map((item) => {
                        return (
                            (showFinished || !item.isCompleted) && (
                                <div
                                    key={item.id}
                                    className="todo w-full my-3 flex justify-between"
                                >
                                    <div className="flex gap-5">
                                        <input
                                            onChange={handleCheckbox}
                                            type="checkbox"
                                            checked={item.isCompleted}
                                            name={item.id}
                                            id=""
                                        />
                                        <div
                                            className={
                                                item.isCompleted
                                                    ? "line-through"
                                                    : ""
                                            }
                                        >
                                            {item.todo}
                                        </div>
                                    </div>
                                    <div className="buttons flex h-full">
                                        <button
                                            onClick={(e) =>
                                                handleEdit(e, item.id)
                                            }
                                            className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={(e) =>
                                                handleDelete(e, item.id)
                                            }
                                            className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                                        >
                                            <AiFillDelete />
                                        </button>
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default App;
