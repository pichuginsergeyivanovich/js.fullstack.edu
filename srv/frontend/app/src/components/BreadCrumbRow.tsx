import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useParams } from 'react-router-dom';

function BreadcrumbRow(props:any) {

    const project=props.project
    const repository=props.repository
    //let { project, repository } = useParams();
    
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/projects">Home</Breadcrumb.Item>
      {
      project?
      (
      <Breadcrumb.Item href={`/${project}/repositories`}>
        {project}
      </Breadcrumb.Item>
      )
      :<></>
      }
{
     (project && repository)?
      (<Breadcrumb.Item href={`/${project}/${repository}`}>{repository}</Breadcrumb.Item>):<></>
}   
    </Breadcrumb>
      
  );
}

export default BreadcrumbRow;