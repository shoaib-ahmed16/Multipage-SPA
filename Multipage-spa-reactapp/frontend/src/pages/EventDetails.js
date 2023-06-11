import { useLoaderData,useRouteLoaderData,json, redirect,defer,Await } from "react-router-dom";
import React from 'react'
import EventItem from "../components/EventItem";
import EventsList from '../components/EventsList';

const EventDetailsPage =()=>{
  const {event,events} =useRouteLoaderData('event-detail')

  return (
    <>
    <React.Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
      <Await
          resolve={event}
          errorElement={
            <div>Could not load Event</div>
          }
          children={(resolvedEvent) => (
            <EventItem event={resolvedEvent} />
          )}
        />
    </React.Suspense>
    <React.Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
         <Await
          resolve={events}
          errorElement={
            <div>Could not load Events</div>
          }
          children={(resolvedEvents) => (
            <EventsList events={resolvedEvents} />
          )}
        />
    </React.Suspense>
    </>
  )
  
}
export default EventDetailsPage;

//All events Loading
async function loadEvents(){
   const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
    //  return {isError :true,message:'could not fetch events.'}
    // throw new Response(JSON.stringify({message:'Could not fetch events.'}),{status:500})
     return json({message:'Could not fetch events.'},{status:500})
    } 
    const resData=await response.json()
    return resData.events;
}
// Fetch event by id
async function loadEvent(id){
  const response =await  fetch('http://localhost:8080/events/'+id);
  if(!response.ok){
    throw json({message:'Could not fetch details for selected event.'},{status:500})
  }else{
    const data =await response.json();
    return data.event;
  }
}

// fetch detail by event id
export async function loader({request,params}){
 const id=params.eventId;
 return defer({
  events:await loadEvents(),
  event:loadEvent(id)
 })
}

// Delete actions
export async function action({params,request}){
  const eventDeleteId =params.eventId;
  const response=await fetch('http://localhost:8080/events/'+eventDeleteId,{
  method:request.method
 });
  if(!response.ok){
    throw json({message:'Failed to Delete the Event.'},{status:500})
  }
  return redirect('/events')
}