import { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTask } from "../services/services";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);

  let heading = {
    id: "Id",
    title: "Title",
    description: "Description",
    status: "Status",
  };

  const fetchTask = async () => {
    try {
      setLoading(true);
      let res = await getTask();
      setTask(res.data);
      setLoading(false);
    } catch (error) {
      throw new Error(error);
    }
    finally{
      setLoading(false);
    }
  };

  const handleFilter = async (e) => {
    setLoading(true);
    try {
      if (e.target.value !== "default") {
        let res = await getTask();
        let filteredTask = res.data.filter(
          (item) => item.status == e.target.value
        );
        setTask(filteredTask);
      } else {
        console.log("Default");
        fetchTask();
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  function handleClear() {
    fetchTask();
  }

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <>
      <div className="parent">
        <div style={{ margin: "0.5rem" }}>Todos</div>
        <div
          style={{ border: "solid", padding: "1.5rem", borderRadius: "1rem" }}
        >
          <TaskForm task={task} setTask={setTask} setLoading={setLoading} />
        </div>
        <div className="list">
          <div style={{ margin: "0.5rem" }}>My toDos List</div>
          <div className="filter">
            <select name="filter" id="selectFilter" onChange={handleFilter}>
              <option value="default" defaultValue="true">
                Select a Filter
              </option>
              <option value="todo">Todo</option>
              <option value="inprogress">Inprogress</option>
              <option value="done">Done</option>
            </select>
            <button onClick={handleClear} id="clearButton">
              Clear Filters
            </button>
          </div>
        </div>
        {loading ? (
          <CircularProgress style={{ margin: "1rem" }} />
        ) : (
          <>
            {task.length > 0 ? (
              <div>
                {task.map((item) => {
                  return (
                    <TaskList
                      item={item}
                      setTask={setTask}
                      setLoading={setLoading}
                    />
                  );
                })}
              </div>
            ) : (
              "No task to display"
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
