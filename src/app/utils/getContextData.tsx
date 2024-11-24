import api from "../utils/api";
export async function getContextData() {
    const data = await api.get('/');
    const tempTask = await data.data;
    const dataResolved = await (new Promise((resolve, reject) => {
        if(tempTask) {
            resolve(tempTask)
        } else {
            reject('Error occored in the getContextData file');
        }
    }));
    // console.log(dataResolved);
    return dataResolved

}
