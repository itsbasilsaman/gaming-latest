
import CategorySectionOne from './category/CategorySectionOne'
import CategorySectionTwo from './category/CategorySectionTwo'
import Footer from './user/Footer'
import { Navbar } from './user/Navbar'

function Category() {
  return (
    <>
    <Navbar/>
     <CategorySectionOne/> 
     <CategorySectionTwo/>
     <Footer/>
    </>
  )
}

export default Category