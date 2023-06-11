
import EventsList from '../components/EventsList';
import React from 'react';
import {
  Await,
  defer,
  useLoaderData,
  json,
} from "react-router-dom";

function EventsPage() {
  const {events}= useLoaderData();
  return (
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
 )
}

export default EventsPage;

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

export function loader(){
  return defer({
    events:loadEvents()
  })
}