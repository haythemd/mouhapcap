import {useState} from "react";
import {useLocation} from "react-router-dom";
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

    const handleFilter = async () => {

    if (destination==null) {
        const list = packetsList.filter((e) => (e.sip_info.src_ip == source))
        await setPacketsList(list);
    }
    else {
         const list = packetsList.filter((e) => (e.sip_info.src_ip == source && e.sip_info.dst_ip == destination))
        await setPacketsList(list);
    }

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
                <TextField  label={"Source"} onChange={(event) => {
    setSource(event.target.value);
  }}></TextField>

                <TextField  label={"Destination"} onChange={(event) => {
    setDestination(event.target.value);
  }}></TextField>
                <Button onClick={handleFilter} variant="outlined"> Filter</Button>
            </div>
            <br/>
            <br/><br/><br/>

<List
      sx={{ width: '100%', bgcolor: 'grey' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader sx={{marginLeft:"-150px",display:"flex",flexDirection: "row", justifyContent:"space-evenly"}}  style={{flexDirection:"row",display:"flex",justifyContent:"space-evenly", alignContent:"space-evenly"}} inset={true} component="div" id="nested-list-subheader" children={headers.map((e)=><div style={{width:"150px",display:"inline", flex:"auto"}}>{"| "+e+" "}</div>)}>
        </ListSubheader>
      }

>


    {packetsList.map((e, index)=><div><ListItemButton key={index} sx={{display:"flex",flexDirection:"row",justifyContent:"space-evenly"}} style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly"}} onClick={()=>handleClick(index)}>
        <ListItemText >{index}</ListItemText>
     <ListItemText>{dayjs.unix(e.sip_info.time).format('DD/MM/YYYY HH:mm:ss')}</ListItemText>
        <ListItemText>{e.sip_info.src_ip}</ListItemText>
      <ListItemText>{e.sip_info.dst_ip}</ListItemText>
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
                <div style={{marginLeft:"30px", marginBottom:"20px"}}>Message-Header:  </div>{e.sip_info.headers.split('\r\n').map((e)=><div style={{marginLeft:"30px"}}>{e}</div>)}
            </div>


            {e.sip_info.body!=""?<div style={{marginTop:"30px",marginBottom:"30px",display:"flex",flexDirection:"column", overflow:"", justifyContent:"start", alignItems:"start"}}>
                <div style={{marginLeft:"30px"}}>Request-Body:  </div>
                    {e.sip_info.body.split('\r\n').map((e)=><div style={{marginLeft:"30px"}}>{e}</div>)}
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