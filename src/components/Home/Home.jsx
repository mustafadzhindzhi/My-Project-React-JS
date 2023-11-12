import Actual from "./Actual.jsx";
import Headerb from "./Headerb.jsx";
import Hero from "./Hero.jsx"
import Welcome from "./Welcome.jsx";

import "/src/css/index.css";

function Home() {

  return (
    <div>
      <Hero/>
      <Headerb/>
      <Welcome/>
      <Actual/>
    </div>
   
  )
}

export default Home
