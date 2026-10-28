import { logo } from "../../assets";

/** Spinning logo shown while a lazily loaded section is on its way. */
function PageLoader() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <div className="spinning-container">
        <img src={logo} alt="Loading" className="h-12 w-12 object-contain" />
      </div>
    </div>
  );
}

export default PageLoader;
