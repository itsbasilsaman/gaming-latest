
import GameSectionOne from './about/GameSectionOne'
import GameSectionTwo from './about/GameSectionTwo'
import GameSectionThree from './about/GameSectionThree'
import GameSectionFour from './about/GameSectionfour'
import { Navbar } from './user/Navbar'
import Footer from './user/Footer'

function About() {
  return (
    <> 
       <Navbar/>
       <GameSectionOne/> 
       <GameSectionTwo/>
       <GameSectionThree/>
       <GameSectionFour/>
       <Footer/>
    </>
  )
}



export default About