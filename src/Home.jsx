import { useEffect, useState } from 'react'

import axios from 'axios';
import AnimatePulse from './components/AnimatePulse';
import { FaRegTrashCan, FaFolderClosed } from "react-icons/fa6";

import ContentKosong from './components/ContentKosong';
import ContentFolder from './components/ContentFolder';
import { Link } from 'react-router-dom';

export default function Home() {

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [paramData, setParamData] = useState([]);
    const [paramDataFolder, setParamDataFolder] = useState(null);

    const [form, setForm] = useState({
        nama: "",
        parent_id: 0,
    })
    // console.log(form);


    async function handleCreate(e) {
        e.preventDefault();
        setIsLoadingBtn(true)
        await axios({
            method: 'post',
            url: `http://api-folder.test:8000/api/v1/folder/store`,
            data: form,
        }).then(function (response) {
            // console.log(response);
            setIsLoadingBtn(false)
            fetchData();
            setForm({
                nama: '',
                parent_id: 0,
            })
        }).catch((err) => {
            setIsLoadingBtn(false)
            // console.log(err.response.data.errors);
            setErrors(err.response.data.errors);
        });

    }

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        // console.log(name, value)
        setForm({ ...form, [name]: value });
    }


    useEffect(() => {
        fetchData();

    }, []);

    const fetchData = async () => {
        setIsLoading(true)
        await axios({
            method: 'get',
            url: `http://api-folder.test:8000/api/v1/folder`,

        }).then(function (response) {
            // console.log(response.data);
            setIsLoading(false)
            setParamData(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }
    // console.log(paramData);

    const deleteData = async (id) => {
        const confirmEvent = confirm('Are you sure!');
        if (confirmEvent) {
            const deleteResult = await axios({
                method: 'delete',
                url: 'http://api-folder.test:8000/api/v1/folder/delete/' + id,
            });
            if (deleteResult) {
                fetchData();
                setParamDataFolder(null);
            }
        }
    }

    return (
        <div className="flex">
            <div className="w-64 h-screen rounded bg-gray-700 text-white">
                <div className='m-2 mb-5 mt-5'>
                    <Link onClick={() => setParamDataFolder(null)} className="p-5 mt-5 text-2xl font-bold">Folder</Link>

                </div>
                <div className='m-2'>
                    <form onSubmit={handleCreate}>
                        <div className="relative flex items-center w-full m">
                            <input type="text" id="searchInput"
                                name='nama'
                                onChange={handelInput}
                                value={form.nama} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tulis folder" />

                            <button type='submit' id="searchButton" className="absolute right-0 top-0 bottom-0 px-4 bg-indigo-600 text-white rounded-r-lg hover:bg-w focus:outline-none focus:ring-2 focus:ring-white">
                                {isLoadingBtn ? (
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                    </svg>
                                ) : null}
                                Add
                            </button>
                        </div>
                    </form>
                </div>
                <hr />
                <ul className="mt-6 space-y-1">
                    <div className='h-96 overflow-y-auto'>
                        {isLoading ? <AnimatePulse /> :
                            paramData.data?.map((item, i) => (
                                <li className='m-2' key={i}>
                                    <div className="flex w-full justify-between items-center border py-2 px-2 hover:bg-indigo-500 rounded-md">
                                        <button className='flex items-center w-full text-left' onClick={() => setParamDataFolder(item)}>
                                            <FaFolderClosed className='me-2' /> {item.nama}
                                        </button>
                                        <button onClick={() => deleteData(item.id)}>
                                            <FaRegTrashCan />
                                        </button>
                                    </div>
                                </li>
                            ))
                        }
                    </div>

                </ul>
            </div>

            <div className="flex-1 p-6">
                {/* <ContentKosong /> */}
                <div className="mt-8">
                    {paramDataFolder ? (<ContentFolder dataFolder={paramDataFolder} />) : (<ContentKosong />)}
                </div>
            </div>
        </div>
    );
};

