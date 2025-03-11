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

  const saveToLS = (parms) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const handelEdit = (e, id) => {
    let t = todos.filter((i) => i.id == id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
    saveToLS();
  };

  const handelDelete = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
    saveToLS();
  };

  const handelAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handelChange = (e) => {
    setTodo(e.target.value);
  };

  const handelCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };
  const alertDelete = (e, id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (isConfirmed) {
      handelDelete(e, id);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-2 md:container md:mx-auto my-5 rounded-xl p-5 bg-cyan-100 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-2xl text-center border-b-1">
          Stork Tasks Manger Manage your task at your finger tips!!
        </h1>
        <div className="">
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
                        checked={todo.isCompleted}
                        name={item.id}
                      />
                      <div className={item.isCompleted ? "line-through" : ""}>
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons flex">
                      <button
                        onClick={(e) => handelEdit(e, item.id)}
                        className="bg-cyan-900 text-white px-4 py-2 hover:cursor-pointer  hover:bg-cyan-900/80 mx-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => alertDelete(e, item.id)}
                        className="bg-cyan-900 text-white px-4 py-2 hover:cursor-pointer hover:bg-cyan-900/80 "
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
