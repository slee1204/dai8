//import {...} from '../styles/globals'
//use framer motion
//https://ghibliapi.herokuapp.com/
//https://github.com/public-apis/public-apis

import { motion } from 'framer-motion';
import { useState } from 'react';
import Toast from '../comps/Toast';


export default function AnimationPage(){

  const [showDiv, setShowDiv] = useState(0);

  const GetGhibliMovies = async () => {
    location.href = "https://ghibliapi.herokuapp.com/films"
  }

  const [toast, popToast] = useState(false);
  



  return <>

    <div>
      <button onClick={()=>setShowDiv(showDiv + 1 > 3 ? 1 : showDiv + 1)}>Click to see div</button>
      {showDiv >= 1 && <motion.div
        style={{textAlign: "center", marginTop: 100}}
        initial={{ opacity: 0, scale: 0, x: -1000 }}
        animate={{ opacity: 1, scale: showDiv > 1 ? 1 : 5, x:0 }}
        transition={{ duration: 3 }}
      >
        Animation 1
      </motion.div>}

      {showDiv >= 2 && <motion.div
        style={{textAlign: "center", marginTop: 100}}
        initial={{ opacity: 0, scale: 0, y:-1000}}
        animate={{ opacity: 1, scale: showDiv > 2 ? 1 : 5, y:0 }}
        transition={{ duration: 3 }}
      >
        Animation2
      </motion.div>}

      {showDiv >= 3 && <motion.div
        style={{textAlign: "center", marginTop: 100}}
        initial={{ opacity: 0, scale: 0, rotate: 360 }}
        animate={{ opacity: 1, scale: showDiv > 3 ? 1 : 5, rotate: 0 }}
        transition={{ duration: 3 }}
      >
        Animation3
      </motion.div>}
    </div>
    <div>
      <button onClick={()=>popToast(true)}> click to see toast </button>
            {toast && <Toast header="Surprise" content="I'm a toast"/>}
    
    </div>

    </>   
}