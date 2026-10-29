import { lazy, Suspense, useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import { FaCheck, FaDownload, FaPaperPlane } from "react-icons/fa";
import { resume } from "../../constants";
import { slideIn } from "../../utils/motion";
import { useInViewport } from "../../hooks/useInViewport";
import Section from "../layout/Section";
import Button from "../ui/Button";
import FormField from "../ui/FormField";
import GradientText from "../ui/GradientText";
import SocialLinks from "../ui/SocialLinks";
import LazyCanvas from "../canvas/LazyCanvas";

const EarthCanvas = lazy(() => import("../canvas/Earth"));

const EMAILJS = {
  serviceId: import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
};

const EMPTY_FORM = { name: "", email: "", message: "" };
const FORM_VARIANTS = slideIn("left", "tween", 0.2, 1);
const MODEL_VARIANTS = slideIn("right", "tween", 0.2, 1);
const SENT_MESSAGE_MS = 2000;

type SubmitStatus = "idle" | "sending" | "sent";

function SubmitLabel({ status }: { status: SubmitStatus }) {
  if (status === "sending") {
    return (
      <>
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
        />
        Sending...
      </>
    );
  }
  if (status === "sent") {
    return (
      <>
        <FaCheck aria-hidden="true" /> Sent!
      </>
    );
  }
  return (
    <>
      Send message <FaPaperPlane aria-hidden="true" className="text-sm" />
    </>
  );
}

const Contact = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  // The rotating gradient border only animates while the panel is on screen
  const { ref: panelRef, isVisible } = useInViewport({ threshold: 0 });

  useEffect(() => {
    if (status !== "sent") return undefined;
    const timeoutId = window.setTimeout(() => setStatus("idle"), SENT_MESSAGE_MS);
    return () => window.clearTimeout(timeoutId);
  }, [status]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) {
      console.error("EmailJS environment variables are missing (see .env.example).");
      toast.error("Something went wrong. Please try again.");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: form.name,
          to_name: "Sandeep M",
          from_email: form.email,
          to_email: "sandeep.1rn15cs094@gmail.com",
          message: form.message,
        },
        EMAILJS.publicKey,
      );
      toast.success("Thank you. I will get back to you as soon as possible.");
      setForm(EMPTY_FORM);
      setStatus("sent");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <Section id="contact">
      <div className="relative z-0 flex flex-col items-center gap-10 lg:flex-row lg:items-center">
        <motion.div variants={FORM_VARIANTS} className="w-full max-w-xl lg:flex-[0.75]">
          <div
            ref={panelRef}
            data-paused={isVisible ? undefined : "true"}
            className="gradient-border rounded-3xl p-px shadow-[0_20px_50px_-20px_rgba(145,94,255,0.45)]"
          >
            <div className="relative rounded-[calc(1.5rem-1px)] bg-white p-6 sm:p-8 dark:bg-tertiary">
              <GradientText as="h2" className="text-[32px] sm:text-[39px]">
                Get in touch
              </GradientText>

              <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
                <FormField
                  label="Your name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Your email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Your message"
                  as="textarea"
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                />

                <Button
                  as="button"
                  type="submit"
                  disabled={status === "sending"}
                  aria-live="polite"
                  className="mt-1 w-full sm:w-fit"
                >
                  <SubmitLabel status={status} />
                </Button>
              </form>

              <div className="mt-8 border-t border-black/10 pt-6 dark:border-white/10">
                <p className="text-sm font-medium text-text2 dark:text-secondary">
                  Or reach me directly
                </p>
                <SocialLinks variant="pill" className="mt-3" />
                <Button href={resume.href} download={resume.fileName} variant="outline" className="mt-3 w-full">
                  <FaDownload aria-hidden="true" className="text-sm" /> Download Resume
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={MODEL_VARIANTS} className="hidden w-full md:block lg:flex-1">
          <LazyCanvas className="h-[350px] w-full lg:h-[600px]" nearMargin="900px 0px">
            {({ visible }) => (
              <Suspense fallback={null}>
                <EarthCanvas visible={visible} />
              </Suspense>
            )}
          </LazyCanvas>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
