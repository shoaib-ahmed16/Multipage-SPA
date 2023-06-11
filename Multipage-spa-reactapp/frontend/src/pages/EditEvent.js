import EventForm from '../components/EventForm'
import {json,redirect} from 'react-router-dom'
import { useLoaderData,useRouteLoaderData } from 'react-router-dom';
const EditEventPage =()=>{
  //  const data =useLoaderData();
  const data =useRouteLoaderData('event-detail')
  return <EventForm method='patch' event={data.event}/>
}
export default EditEventPage;
