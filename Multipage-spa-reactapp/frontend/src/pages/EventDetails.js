import { useLoaderData,useRouteLoaderData,json } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailsPage =()=>{
  // const data =useLoaderData();
  const data =useRouteLoaderData('event-detail')
  return <EventItem event={data.event}/>

}
export default EventDetailsPage;

export async function eventLoader({request,params}){
 const id=params.eventId;
 const response =await  fetch('http://localhost:8080/events/'+id)
 if(!response.ok){
  throw json({message:'Could not fetch details for selected event.'},{status:500})
 }else{
  return response;
 }
}