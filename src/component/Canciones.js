import React from "react";
import Cancion from "./Cancion.css";

const Canciones=props=>{
  console.log(props);

  return(
    <div className="">
    <h1 className="text-center text-white ">Canciones</h1>
    {props.canciones.map((item,idx)=><div key={idx} value={item.id}>

    <div className="v container text-center"  border="1">

        <div className="ca">
            <div className="p">
                <img className="n" src={item.album.images.[0].url}>

                </img>
            </div>
            <div className="p" >
                <h6 className="h7 text-white">
                    {item.name}
                </h6>
                <p className="h7 p text-withe" >
                    {item.artists[0].name}
                </p>
                <audio className="bg" src="audio.mp4" preload="" controls>..</audio>
            </div>
        </div>
    </div>


  </div>
    )}

    </div>





  )



}

export default Canciones;
