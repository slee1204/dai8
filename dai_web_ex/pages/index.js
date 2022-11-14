import Head from 'next/head'
import Image from 'next/image'
import Lottie from "lottie-react";
import LoadingAnimation from '../public/loading.json';
import { useEffect, useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);

  // pretend it's taking time to connect and retrieve data from a server/api
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);
    }, 1000);
  },[])

  if (loading){
    return <Lottie style={{width:100, height:100}} animationData={LoadingAnimation} loop={true} />
  }

  return (
    <div >
      Your page is loaded!

    </div>
  )
}
