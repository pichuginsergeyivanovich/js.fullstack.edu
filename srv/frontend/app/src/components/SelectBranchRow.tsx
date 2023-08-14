import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectService from "../services/projects.service";
import Form from 'react-bootstrap/Form';


function SelectBranchRow(props:any) {

  let { project, repository } = useParams();

  const d:Array<any>=[];
  
  const [branches, setBranches] = useState(d);
  
  const [selectedBranch, setSelectedBranch] = useState(null);

  console.log("SelectBranchRow-before useEffect")

  useEffect(

    ()=>{

      setSelectedBranch(props.SelectedBranch)
    
      console.log("SelectBranchRow - useEffect begin")

    ProjectService.getRepositoryBranches(project!, repository!, "master")

     .then(data=>{

      console.log("SelectBranchRow - useEffectthen - then")

      var list:any[]=[...data] as any[];

      setBranches(list);


    console.log("branches=",list)
        
     })
    },[])


  return (
    <Form.Select aria-label="Default select example" onChange={props.OnBranchChange}>
      {
          branches.map((e,i)=>
            (<option key={i} selected={e.name===selectedBranch} value={e.name} >{e.name}</option>)
          )
      }
  </Form.Select>
  );
}

export default SelectBranchRow;