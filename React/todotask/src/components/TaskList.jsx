import "./TaskList.css";
import { getTask, deleteTask, editTask } from "../../services/services";
import { useState } from "react";
import { useSnackbar } from "notistack";

function TaskList(props) {
  const { item, heading, setTask, setLoading } = props;
  const [editing, setEditing] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  let title = item.title;
  let description = item.description;
  let id = item.id;
  let status = item.status;

  const editData = {
    id: id,
    title: title,
    description: description,
    status: status,
  };

  const [data, setData] = useState(editData);

  const handleDelete = async (e) => {
    try {
      setLoading(true);
      let res = await deleteTask(e.target.id);
      setTask(res);
      const message = "Task Deleted";
      enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 1000,
        preventDuplicate: true,
      });
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (e) => {
    setEditing(!editing);
  };

  function handleCancel() {
    setEditing(false);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res = await editTask(data);
      let change = await getTask();
      setEditing(false);
      props.setTask((prev) => {
        return change.data;
      });
      const message = "Task Saved";
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
  };

  function handleChange(e) {
    console.log(editData)
    setData((prev) => ({ ...editData, [e.target.name]: e.target.value }));
  }
  return (
    <div>
      {editing ? (
        <>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="inputEdit"
          />
          <input
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
            className="inputEdit"
          />
          <input
            type="text"
            name="status"
            value={data.status}
            onChange={handleChange}
            className="inputEdit"
          />
          <button onClick={handleSave} className="editButton">
            Save
          </button>
          <button onClick={handleCancel} className="editButton">
            Cancel
          </button>
        </>
      ) : (
        <div className="table">
          <div id="itemId">{item.id}</div>
          <div id="itemTitle">{item.title}</div>
          <div id="itemDescription">{item.description}</div>
          <div id="itemStatus">{item.status}</div>
          {heading && <div></div>}
          {!heading && (
            <div id="itemButton">
              <button onClick={handleEdit} id={item.id} className="editButton">
                Edit
              </button>
              <button
                onClick={handleDelete}
                id={item.id}
                className="editButton"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskList;
