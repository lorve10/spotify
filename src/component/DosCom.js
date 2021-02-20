import React from "react";

const DosCom = props=>{
    const DosComChanged = e =>{
        props.changed(e.target.value);
    }
        return(
           <div>
               <select value={props.selectedValue} onChange={DosComChanged}>
                   {props.options.map((item,idx)=><option key={idx} value={item.id}>{item.name}</option>)}
               </select>

           </div>


        );


}
export default DosCom;
