import React, {useState, useEffect} from 'react';
import publicIp from "public-ip";

function GetMyIP() {
    const [loaded,setloaded] = useState(false);
    const [ip,setip] = useState();
    
    useEffect(()=>{
        const run = async ()=>{
         let response =  await publicIp.v4();
         setip(response);
         setloaded(true);
        }
        run();
    },[])
    if (loaded) {
        return (<p>{ip}</p>);
    }
    else{
        return (<p>Loading</p>);
    }
}

export default GetMyIP;