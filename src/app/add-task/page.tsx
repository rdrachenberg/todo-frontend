'use client'
import * as React from 'react';
import { ColorButton } from '../components/ColorButton';
import { TaskInput } from '../components/TaskInput';
import { AddTaskButton } from '../components/AddTaskButton';
import { Header } from '../components/Header';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '../utils/api';

const AddTask: React.FC = () => {
  const [taskTitle, setTaskTitle] = React.useState('');
  const [selectedColor, setSelectedColor] = React.useState('');
  const router = useRouter();

  const handleBack = () => {
    
    router.back();
  }

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('clicked handle form')
    const res = await api.post('/', {
      title: taskTitle,
      color: selectedColor
    })
    console.log(res);

    if(res.statusText === 'Created'){
      window.location.href = "/"
    }
  }

  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33F6',
    '#33FFF6', '#F6FF33', '#FF3333', '#33FF33', '#3333FF'
  ];

  return (
    <main className="flex overflow-hidden flex-col pb-96 bg-zinc-900 max-md:pb-24">
      <Header />
      <section className="flex flex-col self-center mt-24 max-w-full w-[736px] max-md:mt-10">
        <Image
          width={100}
          height={100}
          src="/left_arrow_icon.png"
          className="object-contain w-4 aspect-square"
          alt=""
          onClick={handleBack}
         />
        
        <form className="flex flex-col mt-12 w-full max-md:mt-10 max-md:max-w-full" onSubmit={handleForm}>
          <TaskInput value={taskTitle} onChange={setTaskTitle} />
          
          <div className="flex flex-col self-start mt-6 max-md:max-w-full">
            <label className="text-sm font-bold text-blue-400">Color</label>
            <div className="flex flex-wrap gap-4 items-start mt-3 max-md:max-w-full">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={()=> setSelectedColor(color)}
                  className="w-8 h-8 rounded-full cursor-pointer focus:ring-2 focus:ring-offset-2"
                  style={{ backgroundColor: color }}
                  aria-label={`Select ${color} color`}
                  value={`${color}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-12 max-md:mt-10">
            <AddTaskButton
              onClick={() => handleForm}
              isDisabled={!taskTitle || !selectedColor}
            />
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddTask