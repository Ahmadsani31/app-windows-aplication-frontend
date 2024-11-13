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
        <div className="p-6 border">
            <h2 className="text-2xl font-semibold">Dashboard </h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white shadow-md rounded p-4">
                    {isLoading ? (<AnimatePulseKosong />) : (
                        <>
                            <h3 className="text-xl font-semibold">Folder</h3>
                            <p>{paramData.folder} folder</p>
                        </>

                    )}

                </div>
                <div className="bg-white shadow-md rounded p-4">
                    {isLoading ? (<AnimatePulseKosong />) : (
                        <>
                            <h3 className="text-xl font-semibold">Sub Folder</h3>
                            <p>{paramData.subFolder} folder</p>
                        </>

                    )}

                </div>
            </div>
        </div>
    );
}

export default Content;
