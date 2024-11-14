import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFolderClosed, FaRegTrashCan } from "react-icons/fa6";
import AnimatePulse from "./AnimatePulse";
function ContentFolder({ dataFolder }) {

    const [paramData, setParamData] = useState([]);
    const [paramDataFolder, setParamDataFolder] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);

    const [form, setForm] = useState({
        nama: "",
        parent_id: dataFolder.id,
    })
    // console.log(form);


    const [errors, setErrors] = useState({});

    async function handleCreate(e) {
        e.preventDefault();
        setIsLoadingBtn(true)
        await axios({
            method: 'post',
            url: `http://api-folder.test:8000/api/v1/folder/sub/store`,
            data: form,
        }).then(function (response) {
            // console.log(response);
            setIsLoadingBtn(false)
            fetchData();
            setForm({
                nama: '',
                parent_id: dataFolder.id,
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
        setForm({
            nama: '',
            parent_id: dataFolder.id,
        })
    }, [dataFolder]);

    const fetchData = async () => {
        setIsLoading(true)
        await axios({
            method: 'get',
            url: `http://api-folder.test:8000/api/v1/folder/sub/` + dataFolder.id,

        }).then(function (response) {
            // console.log(response.data);
            setIsLoading(false)
            setParamData(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    const deleteData = async (id) => {
        const confirmEvent = confirm('Are you sure!');
        if (confirmEvent) {
            const deleteResult = await axios({
                method: 'delete',
                url: 'http://api-folder.test:8000/api/v1/folder/sub/delete/' + id,
            });
            if (deleteResult) {
                fetchData();
            }
        }
    }

    return (
        <>
            <h2 className="text-2xl font-semibold mb-4 text-center">List sub folder <span className="text-red-500"> {dataFolder.nama}</span></h2>
            <div className='m-2'>
                <form onSubmit={handleCreate}>
                    <div className="relative flex items-center w-full m">
                        <input type="text" id="searchInput"
                            name='nama'
                            onChange={handelInput}
                            value={form.nama} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tulis sub folder" />

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
            <div className="bg-white p-4 rounded-lg shadow-md">
                <table className="w-full text-sm">
                    <tbody>
                        {isLoading ? <AnimatePulse /> :
                            paramData.data?.length > 0 ?
                                paramData.data.map((item, i) => (
                                    <tr className="border">
                                        <td className="px-4 py-2 flex items-center"><FaFolderClosed className='me-2' /> {item.nama}</td>
                                        <td className="px-4 py-2 text-right">
                                            <button onClick={() => deleteData(item.id)}>
                                                <FaRegTrashCan />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                : (
                                    <tr className="border-b">

                                        <p className="text-center text-gray-500 dark:text-gray-400 italic">belum ada sub folder</p>

                                    </tr>
                                )
                        }

                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ContentFolder;
