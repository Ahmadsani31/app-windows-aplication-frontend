import React from "react";
import ContenKosong from './ContentKosong';
import ContentFolder from './ContentFolder';
function Content({ idFolder }) {

    return (
        <>
            {idFolder ? (<ContentFolder dataFolder={idFolder} />) : (<ContenKosong />)}
        </>
    )
}

export default Content;
