'use client'
import * as React from 'react';
import { useEffect } from 'react';
import { ColorButton } from '../../components/ColorButton';
import { TaskInput } from '../../components/TaskInput';
import { SaveButton } from '../../components/SaveButton';
import { Header } from '../../components/Header';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import api from 'src/app/utils/api';
import getTask from '../../utils/getTask'


const Detail: React.FC= () => {
  const [taskTitle, setTaskTitle] = React.useState('');
  const [selectedColor, setSelectedColor] = React.useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  // console.log(id);

  const loadTask = async () => {
    const task = await getTask(id!);
    // console.log(task);
    try {
      setTaskTitle(task.title);
      setSelectedColor(task.color)
    
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleBack = () => {
    router.back();
  }

  const handFormSubmition = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    const res = await api.put(`/${id}`, {
      title: taskTitle,
      color: selectedColor
    })
    // console.log(res);
    
    if(res.statusText == 'OK') {
      console.log('updated record for id: ', id);
      window.location.href = "/"
    }
  }

  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33F6',
    '#33FFF6', '#F6FF33', '#FF3333', '#33FF33', '#3333FF'
  ];

  useEffect(() => {
    loadTask();
    
  }, [])

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
         onClick={handleBack}/>
        
        <form className="flex flex-col mt-12 w-full max-md:mt-10 max-md:max-w-full" onSubmit={handFormSubmition}>
          <TaskInput value={taskTitle} onChange={setTaskTitle} />
          <div className="flex flex-col self-start mt-6 max-md:max-w-full">
            <label className="text-sm font-bold text-blue-400">Color</label>
            <div className="flex flex-wrap gap-4 items-start mt-3 max-md:max-w-full">
              {colors.map((color) => (
                <ColorButton
                  key={color}
                  color={color}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 max-md:mt-10">
            <SaveButton
              onClick={() => {handFormSubmition}}
              isDisabled={!taskTitle || !selectedColor}
            />
          </div>
        </form>
      </section>
    </main>
  );
};

export default Detail