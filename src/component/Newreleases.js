import React,{useState} from "react";
import New from "./New.css";




const Newreleases=props=>{
return(
  <div>
  <h1 className="text-center text-white mt-5 ">New Releases</h1>
  {props.releases.map((item,idx)=><div key={idx} value={item.id}>

  <div className=" container text-center mt-5" >

      <div className="ul">
          <div className="p">
              <img className="b"
                  src={item.images[0].url}
                  alt={item.name}>
              </img>
          </div>
          <div className="p" >
              <h6 className="h5 text-white">
                  {item.name}
              </h6>
              <h6 className="p text-withe" >
                  {item.artists[0].name}
              </h6>
          </div>
      </div>
  </div>


</div>
  )}

  </div>

);

    }
export default Newreleases;
