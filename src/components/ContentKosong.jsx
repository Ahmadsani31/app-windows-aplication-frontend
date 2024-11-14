import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimatePulseKosong from "./AnimatePulse.jsx";

function Content() {
    const [paramData, setParamData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true)
        await axios({
            method: 'get',
            url: `http://api-folder.test:8000/api/v1/folder-all/`,

        }).then(function (response) {
            // console.log(response.data);
            setIsLoading(false)
            setParamData(response.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    // console.log(paramData);


    return (
        <>
            <h2 className="text-2xl text-center font-semibold mb-4">Informasi Folder</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">

                <div className="bg-white p-6 rounded-lg shadow-md">
                    {isLoading ? (<AnimatePulseKosong />) : (
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">Folder</h3>
                            <span className="text-1xl text-indigo-600">{paramData.folder} folder</span>
                        </div>
                    )}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    {isLoading ? (<AnimatePulseKosong />) : (
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">Sub Folder</h3>
                            <span className="text-1xl text-indigo-600">{paramData.subFolder} folder</span>
                        </div>
                    )}

                </div>
            </div>
        </>

    );
}

export default Content;
