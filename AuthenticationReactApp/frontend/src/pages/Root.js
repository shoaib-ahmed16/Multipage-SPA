import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import {getTokenDuration} from '../Util/auth.js'
function RootLayout() {
  // const navigation = useNavigation();
  const token =useLoaderData();
  const sumbit=useSubmit()
  useEffect(()=>{
    if(!token){
      return;
    }

    if(token ==='EXPIRED'){
      sumbit(null,{action:'/logout',method:'post'})
    }

    const tokenDuration =getTokenDuration();
    
    setTimeout(() => {
      sumbit(null,{action:'/logout',method:'post'})
    }, tokenDuration);

  },[token,sumbit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
