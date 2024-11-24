import { Dispatch, SetStateAction } from "react";
import api from "../utils/api";
export async function getData(setData: { (value: SetStateAction<any[]>): void; (value: SetStateAction<any[]>): void; (arg0: any): void; }, setNumber: Dispatch<SetStateAction<number>> | undefined, setCompletedCount: Dispatch<SetStateAction<number>> | undefined) {
    const data = await api.get('/');
    const tempTask = await data.data;
    let counter = 0;

    const getCompleted = () => {
        for(const completed in tempTask) {
            const value = tempTask[completed].completed;
            // console.log(value)
            if(value == true) {
                counter++;
            }
        }
        
        console.log('counter here ', counter)
        return counter
    }
    const count = await getCompleted()
    setData(tempTask);
    setNumber!(tempTask.length)   
    // console.log(counter)
    console.log('counter here ----> ', count)
    setCompletedCount!(() => count);
    console.log(tempTask);

    return tempTask

}
