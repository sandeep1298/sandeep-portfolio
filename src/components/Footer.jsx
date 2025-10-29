import { styles } from "../styles"


const Footer = () => {
  return (
    <>
        <div className="text-center  px-6  py-10  mt-0 select-none">
            <p className={`${styles.footerText} dark:text-secondary text-primary text-[17px] leading-[30px] text-center left-0 right-0 `} >
                {new Date().getFullYear()} &copy; Sandeep. All rights reserved.
            </p> 
        </div>
    </>
  );
};

export default Footer;