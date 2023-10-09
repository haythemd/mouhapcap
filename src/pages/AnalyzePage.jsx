import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
    Button,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    TextField
} from "@mui/material";
import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
export const AnalyzePage = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const list = state.map((e)=>false)
    const [buttonsMap, setButtonsMap] = useState(list);

console.log(state)
    const [open, setOpen] = useState(true);
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [packetsList,setPacketsList] = useState(state)
    const headers = ["No","Time","Source","Destination","Protocol","Length","Sequence Number","Info"];
    const dayjs = require('dayjs')


    // useEffect(()=>{
    //
    //     state.map((e,i)=>{
    //         buttonsMap.set(i,false)
    //     });
    //     console.log(buttonsMap)
    // })

 const handleFilter = () => {





      if (destination ===""){


          const list = packetsList.filter((e) => e.sip_info.from.includes(source));
          setPacketsList(list);

      }
      else if (source ===""){

           const list = packetsList.filter((e) => e.sip_info.to.includes(destination));
           setPacketsList(list);

      }
      else{


          const list = packetsList.filter((e) => e.sip_info.from.includes(source) && e.sip_info.to.includes(destination));
          setPacketsList(list);

      }


    console.log(packetsList)
  console.log(source);
      console.log(destination)
    }



const handleNav = ()=>{


        navigate("/graph",{state:packetsList, replace:true})

    }



  const handleClick = (i) => {

        const list = buttonsMap
        list.fill(false);
        list[i]=true;
        setButtonsMap(list);
        setOpen(!open)
        console.log(buttonsMap)
  };

    return (
        <div>
            <div style={{width:"100%",display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center"}}>
                <TextField style={{width:"260px", height:"50px"}} variant={"outlined"} label={"From"} onChange={(event) => {
    setSource(event.target.value);
  }}></TextField>

                <TextField style={{width:"260px", height:"50px"}}  label={"To"} onChange={(event) => {
    setDestination(event.target.value);
  }}></TextField>
                <Button onClick={handleFilter} variant="contained"  style={{backgroundColor:"black", width:"260px", height:"50px"}}> Filter</Button>
            </div>
            <br/>
            {(source!="" || destination!="")?<Button onClick={handleNav}> Trace Graph</Button>:<div></div>}
            <br/><br/><br/>

<List dense={true}

      sx={{ width: '100%', bgcolor: 'white' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader  sx={{marginLeft:"-150px",display:"flex",flexDirection: "row", justifyContent:"space-evenly"}}  style={{flexDirection:"row",display:"flex",justifyContent:"space-evenly", alignContent:"space-evenly", backgroundColor:"grey"}} inset={true} component="div" id="nested-list-subheader" children={headers.map((e)=><div style={{width:"150px",display:"inline", flex:"auto", fontWeight:"bold"}}>{"| "+e+" "}</div>)}>
        </ListSubheader>
      }
>

    {packetsList.map((e, index)=><div><ListItemButton dense={true} key={index} divider={true} sx={{display:"flex",flexDirection:"row",justifyContent:"space-evenly"}} style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly"}} onClick={()=>handleClick(index)}>
        <ListItemText >{index}</ListItemText>
     <ListItemText>{dayjs.unix(e.sip_info.time).format('DD/MM/YYYY HH:mm:ss')}</ListItemText>
        <ListItemText>{e.sip_info.src_ip.trim()}</ListItemText>
      <ListItemText>{e.sip_info.dst_ip.trim()}</ListItemText>
         <ListItemText>SIP/SDP</ListItemText>
          <ListItemText>{e.sip_info.body.length}</ListItemText>
                  <ListItemText>seq_number</ListItemText>

         <ListItemText>{e.sip_info.summary.split(",")[0]}</ListItemText>

         {buttonsMap[index] && open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
    <Collapse in={buttonsMap[index] == true && open} timeout="auto" children={

        <List component="div" disablePadding style={{backgroundColor:"white"}}>
        <div style={{marginTop:"30px",marginBottom:"30px",display:"flex",flexDirection:"row"}}>
            <div style={{marginLeft:"30px"}}>Request-Line:  </div>{e.sip_info.summary.split(',').map((e)=><div style={{marginLeft:"30px"}}>{e}</div>)}
        </div>

            <div style={{marginTop:"30px",marginBottom:"30px",display:"flex",flexDirection:"column", overflow:"", justifyContent:"start", alignItems:"start"}}>
                <div style={{marginLeft:"30px", marginBottom:"20px"}}>Message-Header:  </div>{e.sip_info.headers.split('\r\n').map((e)=><div style={{marginLeft:"30px"}}>{e.trim()}</div>)}
            </div>


            {e.sip_info.body!=""?<div style={{marginTop:"30px",marginBottom:"30px",display:"flex",flexDirection:"column", overflow:"", justifyContent:"start", alignItems:"start"}}>
                <div style={{marginLeft:"30px"}}>Request-Body:  </div>
                    {e.sip_info.body.split('\r\n').map((e)=><div style={{marginLeft:"30px"}}>{e.trim()}</div>)}
            </div>:
                <div></div>}
        </List>} >

      </Collapse>
    </div>

    )}

</List>
    </div>
        )
}