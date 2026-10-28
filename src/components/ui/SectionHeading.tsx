import { memo } from "react";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { textVariant } from "../../utils/motion";

const HEADING_VARIANTS = textVariant();

/** Eyebrow pill, large title and a short gradient underline. */
interface SectionHeadingProps {
  subtitle: string;
  title: string;
}

function SectionHeading({ subtitle, title }: SectionHeadingProps) {
  return (
    <motion.div variants={HEADING_VARIANTS} className="flex flex-col items-center text-center">
      <p className={styles.sectionSubText}>
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-teal-500 to-orange-500"
        />
        {subtitle}
      </p>
      <h2 className={`${styles.sectionHeadText} mt-4`}>{title}</h2>
      <span
        aria-hidden="true"
        className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500"
      />
    </motion.div>
  );
}

export default memo(SectionHeading);
