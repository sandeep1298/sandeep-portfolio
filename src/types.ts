import type { IconType } from "react-icons";

export interface NavLink {
  id: string;
  title: string;
}

export interface Technology {
  name: string;
  icon: string;
  /** Optional variant shown in dark mode (e.g. a white logo). */
  darkIcon?: string;
}

export interface Experience {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
  /** Tech used in this role, shown as tags under the points. */
  skills?: string[];
}

export interface Project {
  name: string;
  description: string;
  /** Featured projects get a wide card in the bento grid. */
  featured?: boolean;
}

/** A live site built and shipped independently, shown below the company projects. */
export interface IndependentBuild {
  name: string;
  description: string;
  /** Short proof point shown as a chip, e.g. "400+ guests". */
  highlight: string;
  stack: string[];
  href: string;
  image: string;
  imageAlt: string;
}

export interface SocialLink {
  name: string;
  /** Accessible label for icon-only links. */
  label: string;
  href: string;
  icon: IconType;
  /** Tailwind colour classes for the icon. */
  className: string;
}
