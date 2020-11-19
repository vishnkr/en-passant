import React,{useEffect,useState,useRef,createRef,RefObject} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

interface Props{
    data: string[];
    placeholder?:string;
}


const Dropdown: React.FC<Props> = (props:Props) =>{
    //const data = ["Standard","King of the Hill", "Antichess", "4-player chess"];//props.data;
    const [open,setOpen] = useState(false);
    const container: RefObject<HTMLDivElement> = createRef();
    function handleClick(){
      setOpen(!open);
    }
    return(
        <div className="dd-wrapper" ref={container}>  
        <button type="button" className="button" onClick={handleClick}>
          Select Game Mode <FontAwesomeIcon icon={faAngleDown} />
        </button>  
        { open && <div className="dropdown">
          <ul>
           {props.data.map((item) => (
             //<button ref={titleRef} onClick={(e)=>{setValue(item)}} className="dd-list-item" key={1} >{item}</button>
             <li>{item}</li>
            ))}
          </ul>
          </div>}
        </div>
      )
    }



export default Dropdown;