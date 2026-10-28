import { logo } from "../../assets";
import { scrollToTop } from "../../utils/scroll";
import NavLinks from "./NavLinks";

const YEAR = new Date().getFullYear();

const Footer = () => (
  <footer className="px-4 pb-8 pt-6 sm:px-6">
    <div className="mx-auto max-w-7xl">
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-common_voilet_color to-transparent"
      />

      <div className="mt-8 flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <a href="#" className="flex items-center gap-2" onClick={scrollToTop}>
          <img src={logo} alt="Sandeep M logo" className="h-9 w-9 object-contain" />
          <span className="font-display text-base font-bold text-black dark:text-white">Sandeep M</span>
        </a>

        <NavLinks
          className="flex flex-wrap justify-center gap-x-6 gap-y-2"
          linkClassName="text-sm font-medium text-black/70 transition-colors hover:text-common_voilet_color dark:text-white/70 dark:hover:text-white"
        />

        {/* Social links live in the Contact section right above, so the footer doesn't repeat them */}
        <p className="font-mono text-xs font-medium uppercase tracking-wide text-text2 dark:text-secondary">
          Built with React &amp; Three.js
        </p>
      </div>

      <p className="mt-8 select-none text-center text-sm text-primary/70 dark:text-secondary">
        {YEAR} &copy; Sandeep. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
