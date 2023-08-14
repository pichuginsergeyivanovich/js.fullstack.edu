import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectService from "../services/projects.service";
import Form from 'react-bootstrap/Form';


function BranchList(props:any) {

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
    <ul>
      {
          branches.map((e,i)=>
            (<li key={i}>{e.name}</li>)
          )
      }
  </ul>
  );
}

export default BranchList;