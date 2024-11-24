'use client'
import { useRouter, useSearchParams } from "next/navigation"
import api from "../utils/api";

const Modal = ({handleModalToggle}: any) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleBack = () => {
        router.push('/');
        router.refresh();
        handleModalToggle();
    }

    const handleDelete = async () => {
        const id = searchParams.get('id');
        console.log(id);

        const res = await api.delete(`/${id}`);

        console.log(res);

        if(res.status === 204){
            console.log('Deleted successfully');
            handleModalToggle();
            window.location.replace('/')
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">Confirm Remove Task</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-lg text-gray-500">Click Delete to remove</p>
          </div>
          <div className="flex justify-between mt-4">

            {/* Using useRouter to dismiss modal*/}
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Back to safety
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Delete
            </button>

          </div>
        </div>
      </div>
    </div>
    )

}

export default Modal