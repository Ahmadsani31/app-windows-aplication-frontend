import { useEffect, useState } from 'react'
import './App.css'

import Content from "./components/Content";
import { FaFolderClosed, FaRegTrashCan, FaSquarePlus } from "react-icons/fa6";
import axios from 'axios';
import AnimatePulse from './components/AnimatePulse';

function App() {

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
    <div className="flex h-screen w-full">
      <aside id="sidebar" className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 hidden w-64 h-full font-normal duration-75 lg:flex transition-width" aria-label="Sidebar">
        <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-gray-400 border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 space-y-1 bg-gray-400 divide-y text-white divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              <ul className="pb-2 space-y-2">
                <li>
                  <form onSubmit={handleCreate}>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">

                      </div>
                      <input
                        type="text"
                        id="search"
                        name='nama'
                        value={form.nama}
                        className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tulis Folder"
                        onChange={handelInput}
                      />
                      <button
                        type="submit"
                        className="flex items-center text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        {isLoadingBtn ? (
                          <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                          </svg>
                        ) : null}

                        <FaSquarePlus size={20} />
                      </button>
                    </div>
                  </form>

                </li>
              </ul>

              <div className=" pt-2 space-y-2">


                <div className='relative  overflow-auto'>

                  {isLoading ? <AnimatePulse /> :
                    paramData.data?.map((item, i) => (
                      <div className="inline-flex rounded-md shadow-sm w-full" role="group" key={i}>
                        <button type="button" className="flex items-center w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          onClick={() => setParamDataFolder(item)}
                        >
                          <FaFolderClosed className='mr-2' size={'2em'} /> {item.nama}
                        </button>
                        <button type="button" className="text-sm font-medium bg-white p-1  me-2 mb-2 text-gray-900 bg-transparent border rounded flex items-center" onClick={() => deleteData(item.id)}>
                          <FaRegTrashCan />
                        </button>
                      </div>

                    ))
                  }

                </div>



              </div>
            </div>
          </div>

        </div>
      </aside>
      <div className="flex-1 flex flex-col w-full">
        <Content idFolder={paramDataFolder} />
      </div>
    </div>
  )
}

export default App
