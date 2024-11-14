import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Sidebar() {

    return (
        <div className="w-80 h-screen rounded bg-gray-700 text-white">
            <Link to={'/'} className="p-5 mt-5 text-2xl font-bold">Folder</Link>
            <div className='m-2'>
                <div className="relative flex items-center w-full m">
                    <input type="text" id="searchInput" className="w-full p-2 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white" placeholder="Masukkan teks..." />

                    <button id="searchButton" className="absolute right-0 top-0 bottom-0 px-4 bg-indigo-600 text-white rounded-r-lg hover:bg-w focus:outline-none focus:ring-2 focus:ring-white">
                        Add
                    </button>
                </div>
            </div>
            <hr />
            <ul className="mt-6 space-y-1">
                <li className='m-2'>
                    <button href="#" className="flex w-full justify-between items-center border py-2 px-2 hover:bg-indigo-500 rounded-md">
                        Dashboard
                        <FaRegTrashCan />
                    </button>
                </li>
                <li className="m-2">
                    <button href="#" className="flex w-full justify-between items-center border py-2 px-2 hover:bg-indigo-500 rounded-md">
                        Dashboard
                        <FaRegTrashCan />
                    </button>
                </li>
            </ul>
        </div>
    );
};

