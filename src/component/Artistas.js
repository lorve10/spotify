import React from "react";
import Ar from "./Ar.css";

const Artistas=props=>{

  console.log(props);
  return(
    <body>
    <div>
      <h1 className="text-center text-white mt-5">Artistas Relacionados</h1>
    {props.artista.map((item,idx)=><div key={idx} value={item.id}>

    <div className="container text-center" >

        <div className="ar">
            <div className="p">
                <img className="a"
                  src={item.images.[0].url}
                  >
                </img>
            </div>
            <div className="p" >
                <h6 className="h9 text-white">
                    {item.name}
                </h6>
                <p className="p text-withe" >

                </p>
            </div>
        </div>
    </div>


  </div>
    )}

    </div>

</body>
  );


}

export default Artistas;
