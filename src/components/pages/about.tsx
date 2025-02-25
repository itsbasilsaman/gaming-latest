
import GameSectionOne from './about/GameSectionOne'
import GameSectionThree from './about/GameSectionThree'
import GameSectionFour from './about/GameSectionfour'
import { Navbar } from './user/Navbar'
import Footer from './user/Footer'
import { useLocation } from 'react-router-dom'

function About() {
  const location = useLocation();
  const queryParams= new URLSearchParams(location.search);
  const description= queryParams.get("description")
  const params = {
    productId: queryParams.get("productId"),
    image: queryParams.get("image")?? undefined,
    name: queryParams.get("name"),
    ServiceName: queryParams.get("ServiceName"),
  };


 








  return (
    <> 
       <Navbar/>
       < GameSectionOne {...params} /> 
       <GameSectionThree description={description}/>
       <GameSectionFour/>
       <Footer/>
    </>
  )
}
export default About