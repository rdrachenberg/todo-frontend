'use client'
import Image from 'next/image'
import { TaskCreateButton } from '../components/TaskCreateButton';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export const Header = () => {
    const [url, setUrl] = useState<string>('')
    const router = useRouter();
    const pathname = usePathname();

    const handleCreateTask = () => {
        router.push('/add-task')
    };

    useEffect(() => {
        setUrl(`${pathname}`);
        // if(url != '/') console.log(url);

    }, [pathname, url]);

    return (
        <header className="flex flex-col items-center px-20 pt-20 w-full bg-stone-950 max-md:px-5 max-md:max-w-full">
          <div className="flex z-10 flex-col mb-0 max-w-full w-[736px] max-md:mb-2.5">
            <div className="flex gap-3 self-center ml-12 max-w-full text-4xl font-black text-yellow-600 w-[226px]">
              <Image width={200} height={200} src='/rocket.png' className='object-contain shrink-0 self-start mt-1.5 aspect-[0.61] w-[22px]' alt='rocket'/>
              <h1 className="grow shrink w-[188px]">
                <span className="text-[#4EA8DE]">Todo </span>
                <span className="text-[#5E60CE]">App</span>
              </h1>
            </div>
            <div className="flex gap-2 items-center mt-14 text-sm font-bold leading-snug text-zinc-100 max-md:mt-10">
             {pathname == '/' ? (
                <TaskCreateButton onClick={handleCreateTask} />
             ) : (
                <div></div>
             )}
            </div>
          </div>
        </header>
    )
}