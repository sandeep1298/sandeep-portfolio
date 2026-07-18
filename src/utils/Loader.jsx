import { logo } from "../assets";


function Loader() {
  return (
   <>
    <div className="spinner_customize">
         <div className="spinning-container">
            <img src={logo} alt='Sandeep M logo' className='w-15 h-12 object-contain spinning-image' loading="lazy" />
        </div>
      </div>
   </>
  )
}

export default Loader
