// This will contain the index page for Regulatory Authorities

import React, { useEffect, useState } from "react";
import CollectionCards from "./CollectionCards";
import Points from "./Points";
import axios from "axios";

function RaIndex(props){

    const [ point, setPoint ] = useState(0);

    function fetch(){
        axios.post("http://localhost:8000/individual")
        .then((response)=>{
            setPoint(response.data);
            console.log("Points Displayed!!");
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    useEffect(()=>{
        fetch();
    }, [])

    return (<div>
        <br />
        <Points points={point}/>
        <CollectionCards />
    </div>
    )
}

export default RaIndex;