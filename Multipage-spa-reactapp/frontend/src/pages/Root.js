import React from 'react'
import {Outlet,useLoaderData,useNavigation} from 'react-router-dom'
import MainNavigation from '../components/MainNavigation';
const RootLayout =()=>{
  // we cannot get data using useLoaderData in higher level route paths like here as we can get the useLoaderData only in events and lower than events route
  //const data =useLoaderData();
  //console.log(data);
 // const navigation= useNavigation();
 

  return <React.Fragment>
    <MainNavigation/>
    <main>
      {/* {navigation.state==='loading' && <p>Loading...</p>} */}
      <Outlet/>
    </main>
  </React.Fragment>
}

export default RootLayout;