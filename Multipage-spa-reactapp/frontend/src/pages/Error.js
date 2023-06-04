import {useRouteError} from 'react-router-dom'
import PageContent from '../components/PageContent'

const ErrorPage =()=>{
  const error =useRouteError();
  let title ='An Error occurred!'
  let message ='Something went wrong!'
  if(error.status===500){
    // message=JSON.parse(error.data).message
    message =error.data.message
  }else if(error.status===404){
    title='Not found!'
    message='Could not find resource or page.'
  }

  return <PageContent title={title}>
    <p>{message}</p>
  </PageContent>
}

export default ErrorPage;