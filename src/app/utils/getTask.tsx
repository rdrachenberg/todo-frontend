import api from "./api";
export default async function getTasks(id: string) {
    const data = await api.get(`/?id=${id}`);
    const oneTask = await data.data;
    const findTask = oneTask.find((task: { id: string; }) => `${task.id}`.includes(id) )
    
    // console.log(oneTask)
    // console.log(findTask)
    return findTask
}