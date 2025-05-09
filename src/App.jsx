import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);
  const [userId, setUserId] = useState(null);

  // Generate or retrieve userId
  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = uuidv4();
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  // Load todos for this user
  useEffect(() => {
    if (userId) {
      const todoString = localStorage.getItem(`todos_${userId}`);
      if (todoString) {
        setTodos(JSON.parse(todoString));
      }
    }
  }, [userId]);

  const saveToLS = (items) => {
    if (userId) {
      localStorage.setItem(`todos_${userId}`, JSON.stringify(items));
    }
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  const handelEdit = (e, id) => {
    let t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handelDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handelAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLS(newTodos);
  };

  const handelChange = (e) => {
    setTodo(e.target.value);
  };

  const handelCheckbox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const alertDelete = (e, id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      handelDelete(e, id);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-2 md:container md:mx-auto my-5 rounded-xl p-5 bg-cyan-100 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-2xl text-center border-b-1">
          Stork Tasks Manager – Manage your tasks at your fingertips!
        </h1>
        <div>
          <div className="addToDo my-5">
            <h2 className="text-2xl font-bold">Add Task</h2>
            <div className="flex gap-4">
              <input
                onChange={handelChange}
                value={todo}
                type="text"
                className="border-b-2 w-full decoration-0 focus:outline-none focus:ring-0 my-2"
                placeholder="What ToDo?!"
              />
              <button
                onClick={handelAdd}
                disabled={todo.length <= 3}
                className="bg-cyan-900 text-white mx-auto px-4 py-2 hover:cursor-pointer text-sm hover:bg-cyan-900/80 disabled:bg-cyan-700 disabled:cursor-text"
              >
                Save
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-2xl">Your Todos</h2>
            <div>
              <input
                type="checkbox"
                onChange={toggleFinished}
                checked={showFinished}
              />{" "}
              Show Finished
            </div>
          </div>
          <div className="todos">
            {todos.length === 0 && (
              <div className="container text-center m-5">
                No tasks to display!
              </div>
            )}
            {todos.map((item) => {
              return (
                (showFinished || !item.isCompleted) && (
                  <div key={item.id} className="todo flex justify-between my-3">
                    <div className="flex gap-5 items-center">
                      <input
                        onChange={handelCheckbox}
                        type="checkbox"
                        checked={item.isCompleted}
                        name={item.id}
                      />
                      <div className={item.isCompleted ? "line-through" : ""}>
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons flex">
                      <button
                        onClick={(e) => handelEdit(e, item.id)}
                        className="bg-cyan-900 text-white px-4 py-2 hover:cursor-pointer hover:bg-cyan-900/80 mx-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => alertDelete(e, item.id)}
                        className="bg-cyan-900 text-white px-4 py-2 hover:cursor-pointer hover:bg-cyan-900/80"
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
