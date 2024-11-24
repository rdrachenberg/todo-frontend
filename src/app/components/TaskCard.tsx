'use client'
import { ImageProps, TaskCardProps } from '../types';
import Image from 'next/image';
import { useState } from 'react';
import api from '../utils/api';
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from './Modal';


const NotificationImage: React.FC<ImageProps> = ({ src, alt, className }) => (
    <Image
        width={24}
        height={24}
        loading="lazy"
        src={src}
        alt={alt}
        className={`object-contain shrink-0 w-[24px] aspect-square ${className || ''}`}
    />
);
  
  const TaskCard: React.FC<TaskCardProps> = ({message, startIcon, endIcon, id, completed}) => {
   
    const [isChecked, setIsChecked] = useState<boolean>(completed);
    const [show, setShow] = useState<boolean>(false)
    const searchParams = useSearchParams()
    

    const router = useRouter();

    const handleModalToggle = () => {
        setShow(!show)
    }

    const handleCheckClick = async () => {
        setIsChecked(!isChecked);
        console.log('id: ', id)
        const res = await api.put(`/${id}`, {completed: !completed});
        console.log(res)
            console.log('record updated')
            if(res.statusText == "OK"){
                 console.log('everything ok with the record update');
                 router.refresh();
                 window.location.replace('/')
            }
    }

    const handleDeleteClick = async () => {
        console.log('Delete was clicked. Need to open model for DELETE ')
        router.push(`/?id=${id}&show=true`);
        const getParam = searchParams.get('show');
        // console.log(getParam)
        setShow(true);
    }

    return (
        <div>
            {!isChecked ? (
                <section className="flex text-sm leading-5 text-zinc-100" role="alert">
                <article className="flex flex-wrap gap-3 items-start p-4 h-full rounded-lg border border-solid shadow-sm bg-neutral-800 border-zinc-800 w-[736px] max-md:max-w-full">
                    <div onClick={handleCheckClick}>
                        <NotificationImage
                            src={startIcon}
                            alt="Notification start icon"
                        />
                    </div>
                    <div className='flex-1 shrink basis-0 max-md:max-w-full' onClick={()=> router.push(`/detail/${id}?id=${id}`)}>
                        <p className="flex-1 shrink basis-0">
                            {message}
                        </p>
                    </div>
                    <div className='hover:bg-red-700 rounded-full' onClick={handleDeleteClick}>
                        <NotificationImage 
                            src={endIcon}
                            alt="Notification action" 
                        />
                    </div>
                </article>
            </section>
            ) : (
                <section 
                    role="alert" 
                    aria-live="polite" 
                    className="flex text-sm leading-5 text-zinc-500"
                >
                    <article className="flex flex-wrap gap-3 items-start p-4 h-full rounded-lg border border-solid bg-neutral-800 border-neutral-800 w-[736px] max-md:max-w-full">
                        <div onClick={handleCheckClick}>
                            <NotificationImage 
                                src={'/checked.png'} 
                                alt="Notification start indicator" 
                                className='w-6 outline outline-4 -outline-offset-4 outline-violet-600 rounded-full'
                            />
                        </div>
                        <p className={`flex-1 shrink basis-0 max-md:max-w-full ${isChecked ? "line-through" : ''}`}>
                            {message}
                        </p>
                        <div className='hover:bg-red-700 rounded-full' onClick={handleDeleteClick}>
                            <NotificationImage 
                                src={endIcon}
                                alt="Notification action" 
                            />
                        </div>    
                    </article>
                </section>
            )}
            <div>
                {show && <Modal handleModalToggle={handleModalToggle}/>}
            </div>
            
      </div>
    );
  };
  
  export default TaskCard;