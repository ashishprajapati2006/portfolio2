import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import { toast } from "sonner";

import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";

// Contact
export const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [honey, setHoney] = useState("");

  // handle form change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    
    // Clear field-specific error as user types
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // validate form on submit
  const validateForm = () => {
    const { name, email, message } = form;
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    // validate name
    const trimmedName = name.trim();
    if (!trimmedName) {
      newErrors.name = "Name is required.";
      isValid = false;
    } else if (trimmedName.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
      isValid = false;
    } else if (trimmedName.length > 100) {
      newErrors.name = "Name cannot exceed 100 characters.";
      isValid = false;
    }

    // validate email
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(trimmedEmail.toLowerCase())) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // validate message
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      newErrors.message = "Message is required.";
      isValid = false;
    } else if (trimmedMessage.length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
      isValid = false;
    } else if (trimmedMessage.length > 2000) {
      newErrors.message = "Message cannot exceed 2000 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // prevent default page reload
    e.preventDefault();

    // validate form
    if (!validateForm()) return;

    // show loader
    setLoading(true);

    try {
      // POST to secure backend endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          honey: honey, // hidden honeypot spam-bot field
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || "Thanks for contacting me.");
        
        // Reset states
        setForm({
          name: "",
          email: "",
          message: "",
        });
        setHoney("");
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("[CONTACT_SUBMIT_ERROR]: ", error);
      toast.error("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper idName="contact">
      <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
        >
          {/* Title */}
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-8"
          >

            {/* Name */}
            <label htmlFor="name" className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Name*</span>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                title="What's your name?"
                disabled={loading}
                aria-disabled={loading}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus:border-[#915ecc] focus:ring-1 focus:ring-[#915ecc] transition-all duration-300 font-medium disabled:bg-tertiary/20 disabled:text-white/60 disabled:cursor-not-allowed"
              />

              {/* Invalid Name */}
              <AnimatePresence>
                {errors.name && (
                  <motion.span
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-red-400 mt-2 text-sm"
                    id="name-error"
                    role="alert"
                    aria-live="assertive"
                  >
                    {errors.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </label>

            {/* Email */}
            <label htmlFor="email" className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Email*</span>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                placeholder="johndoe@email.com"
                title="What's your email?"
                disabled={loading}
                aria-disabled={loading}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus:border-[#915ecc] focus:ring-1 focus:ring-[#915ecc] transition-all duration-300 font-medium disabled:bg-tertiary/20 disabled:text-white/60 disabled:cursor-not-allowed"
              />

              {/* Invalid Email */}
              <AnimatePresence>
                {errors.email && (
                  <motion.span
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-red-400 mt-2 text-sm"
                    id="email-error"
                    role="alert"
                    aria-live="assertive"
                  >
                    {errors.email}
                  </motion.span>
                )}
              </AnimatePresence>
            </label>

            {/* Message */}
            <label htmlFor="message" className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Message*</span>
              <textarea
                rows={7}
                name="message"
                id="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Hello there!"
                title="What do you want to say?"
                disabled={loading}
                aria-disabled={loading}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus:border-[#915ecc] focus:ring-1 focus:ring-[#915ecc] transition-all duration-300 font-medium disabled:bg-tertiary/20 disabled:text-white/60 disabled:cursor-not-allowed disabled:resize-none"
              />

              {/* Invalid Message */}
              <AnimatePresence>
                {errors.message && (
                  <motion.span
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-red-400 mt-2 text-sm"
                    id="message-error"
                    role="alert"
                    aria-live="assertive"
                  >
                    {errors.message}
                  </motion.span>
                )}
              </AnimatePresence>
            </label>

            {/* Submit */}
            <motion.button
              type="submit"
              title={loading ? "Sending..." : "Send"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl disabled:bg-tertiary/40 disabled:text-white/60 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all duration-300 border border-transparent focus:border-[#915ecc] focus:ring-1 focus:ring-[#915ecc]"
              disabled={loading}
              aria-disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send</span>
              )}
            </motion.button>

            {/* Honeypot field for spam protection (hidden from humans, at bottom to avoid autofill issues) */}
            <div style={{ display: "none" }} aria-hidden="true">
              <input
                type="text"
                name="honey"
                value={honey}
                onChange={(e) => setHoney(e.target.value)}
                tabIndex={-1}
                autoComplete="new-password"
              />
            </div>
          </form>
        </motion.div>

        {/* Earth Model */}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
