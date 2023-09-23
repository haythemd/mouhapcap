import {useLocation} from "react-router-dom";
import {Button, List} from "@mui/material";
import {ArrowBackSharp, ArrowLeft, ArrowLeftSharp, ArrowRight, ArrowRightSharp} from "@mui/icons-material";
import {useEffect, useState} from "react";

export const GraphPage = () => {



    const { state } = useLocation();


    const [idList, setIdList] = useState([])

    const [graphShown, setGraphShown] = useState(false);

    const [selectedList, setSelectedList] = useState([])


const filterList = ()=>{

    const list = []
    const curatedList =[]
    state.forEach((e)=>{

        list.push(e.sip_info.headers.slice(e.sip_info.headers.indexOf("Call-ID: ")+9, e.sip_info.headers.indexOf("CSeq: ")).split('\r\n')[0])

    })

    list.forEach((e)=>{
        if (!curatedList.includes(e)){
            curatedList.push(e)

        }
    })

    setIdList(curatedList)

}
useEffect(filterList,[])



const handleClick =(i)=>{


    setGraphShown(true)

    const list = state


  const filteredList =  list.filter((e,index)=>e.sip_info.headers.includes(idList[i]))

    setSelectedList(filteredList)

    console.log(selectedList)
}
    return (
        <div >

            <List >
                {idList.map((e,index)=><Button onClick={()=>handleClick(index)}>{e}</Button>)}
            </List>

            <div style={{width:"50%", display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center", alignContent:"center"}}>
                <div>Source</div>
                <div>Method</div>
                <div>Destination</div>
            </div>
            {graphShown?<div >

                {selectedList.map((e,index)=> {

                    console.log(e)

                  return  <div style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        alignContent: "center"
                    }}>

                        <div style={{height:"60px"}}>{e.sip_info.src_ip === selectedList[0].sip_info.src_ip ? e.sip_info.src_ip : e.sip_info.dst_ip}</div>
                       <div style={{display:"flex", flexDirection:"column"}}>
                           <div>{e.sip_info.method}</div>
                           {e.sip_info.src_ip == selectedList[0].sip_info.src_ip ?
                            <ArrowRight style={{height:"60px",width:"200px"}} width={200}></ArrowRight> :
                            <ArrowLeft style={{height:"60px"}} width={200}></ArrowLeft>}</div>
                        <div style={{height:"60px"}}>{e.sip_info.src_ip == selectedList[0].sip_info.src_ip ? e.sip_info.dst_ip : e.sip_info.src_ip}</div>
                    </div>
                })}
            </div>:<div></div>}



        </div>
    )
}