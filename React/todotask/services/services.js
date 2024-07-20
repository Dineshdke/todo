import api from "../api";

export async function getTask() {
  try {
    let res = await api.get("/tasks");
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteTask(id) {
  try {
    let res = await api.delete(`/tasks/${id}`);
    return(res.data);
  } catch (error) {
    throw new Error(error);
  }
}

export async function editTask(final) {
  let obj = {...final};
  let id = obj['id'];
  delete obj[id];
  try {
    const data = async () => {
      await api.put(`/tasks/${id}`, obj);
    };
    data();
  } catch (error) {
    throw new Error(error);
  }
}

export async function addTask(obj) {
  try {
    const data = async () => {
      await api.post(`/tasks`, obj);
    };
    data();
  } catch (error) {
    throw new Error(error);
  }
}
