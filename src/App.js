import './App.css';
import { Routes, Route } from 'react-router-dom';
import {AnalyzePage} from "./pages/AnalyzePage";
import {UploadPage} from "./pages/UploadPage";
import {GraphPage} from "./pages/GraphPage";



function App() {
  return (

     <div className="App">
         <header><img style={{display: "flex",flexDirection:"row",justifyContent:"space-between", alignItems:"center", justifyItems:"center"}} src={"https://i.ibb.co/vZXCBxn/368558567-236796635999343-3212075310249196059-n.png"} width={"100px"} height={"50px"}/><div style={{display: "inline", fontSize:"48px"}}>Packet Analyzer</div></header>
     <br/><br/><br/><br/>

      <Routes>
        <Route path="/" element={<UploadPage />} />
          <Route path="analyze" element={<AnalyzePage/>} render={(props) => <AnalyzePage {...props}/>}/>
        <Route path="graph" element={<GraphPage />} />
      </Routes>
    </div>
  );
}

export default App;
