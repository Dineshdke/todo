import { useState } from "react";
import { getTask, addTask } from "../../services/services";
import "../components/TaskForm.css";
import { useSnackbar } from "notistack";

function TaskForm(props) {
  const { setLoading } = props;
  const [value, setValue] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  let defaultObj = {
    "title":'',
    "description":'',
    "value":'',
  }

  function handleChange(e) {
    let val;
    setValue((prev) => {
      if (e.target.name == "status") {
        val = e.target.value.toLowerCase();
      } else {
        val = e.target.value;
      }
      return { ...prev, [e.target.name]: val };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { status } = value;
    if (status == "inprogress" || status == "todo" || status == "done") {
      try {
        setLoading(true);
        let res = await addTask(value);
        let change = await getTask();
        props.setTask((prev) => change.data);
        setValue({defaultObj});
        const message = "Task added";
        enqueueSnackbar(message, {
          variant: "success",
          autoHideDuration: 1000,
          preventDuplicate: true,
        });
      } catch (error) {
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    } else {
      const message = "Please enter the correct status";
      enqueueSnackbar(message, {
        variant: "warning",
        autoHideDuration: 2000,
        preventDuplicate: true,
      });
    }
  };

  return (
    <>
      <div className="top" style={{ display: "flex", width: "100%" }}>
        <form action="submit" onSubmit={handleSubmit}>
          <div className="title">
            <div>Enter your title of task</div>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              onChange={handleChange}
              value={value.title}
              className="input"
              required
            />
          </div>
          <div className="description">
            <div>Describe your task</div>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              onChange={handleChange}
              value={value.description}
              className="input"
              required
            />
          </div>
          <div className="status">
            <div>What is the status? - Enter todo or inprogess or done</div>
            <input
              type="text"
              name="status"
              id="status"
              placeholder="Todo or Inprogess or Done"
              onChange={handleChange}
              value={value.status}
              className="input"
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="button">Add Task</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TaskForm;
