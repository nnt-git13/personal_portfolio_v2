import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas, StarsCanvas } from "./canvas";

const Contact = () => {
  const formRef = useRef();
  const sectionRef = useRef(null);
  const terminalRef = useRef(null);
  const earthContainerRef = useRef(null);
  const [earthHeight, setEarthHeight] = useState(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const terminalInView = useInView(terminalRef, { once: false, margin: "-200px" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState({});
  
  // Terminal state
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const terminalLines = [
    "[INFO] Exporting experience logs...",
    "[INFO] Establishing secure connection...",
    "[OK] System ready for contact.",
    "",
    "$ connecting to contact.space...",
    "[SUCCESS] Connection established.",
    "",
    ">>> Entering contact space <<<"
  ];

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!terminalInView || currentLine >= terminalLines.length) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    const line = terminalLines[currentLine];
    if (!line) {
      setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setDisplayedText("");
      }, 200);
      return;
    }

    let charIndex = 0;
    setDisplayedText("");

    const typeInterval = setInterval(() => {
      if (charIndex < line.length) {
        setDisplayedText(line.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentLine(prev => prev + 1);
          setDisplayedText("");
        }, 800);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [terminalInView, currentLine]);

  // Reset when out of view
  useEffect(() => {
    if (!terminalInView && currentLine > 0) {
      const resetTimer = setTimeout(() => {
        setCurrentLine(0);
        setDisplayedText("");
      }, 1000);
      return () => clearTimeout(resetTimer);
    }
  }, [terminalInView]);

  // Lock Earth container height to prevent growth
  useEffect(() => {
    if (earthContainerRef.current && !earthHeight) {
      const height = earthContainerRef.current.offsetHeight;
      if (height > 0) {
        setEarthHeight(height);
      }
    }
  }, [earthHeight]);

  // Email validation regex
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // Clear success message when form changes
    if (success) {
      setSuccess(false);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    // Validate individual field on blur
    const newErrors = { ...errors };
    if (name === "name" && !form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (name === "name" && form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (name === "name") {
      delete newErrors.name;
    }

    if (name === "email" && !form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (name === "email" && !validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (name === "email") {
      delete newErrors.email;
    }

    if (name === "message" && !form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (name === "message" && form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (name === "message") {
      delete newErrors.message;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      message: true,
    });

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccess(false);

    // Validate environment variables
    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setLoading(false);
      console.error('EmailJS configuration missing. Please check your .env file.');
      setErrors({
        submit: "Email service is not configured. Please contact the site administrator.",
      });
      return;
    }

    // Prepare email template parameters
    const templateParams = {
      from_name: form.name.trim(),
      to_name: "Nathan",
      from_email: form.email.trim(),
      to_email: "nnt@mit.edu", // Recipient email
      reply_to: form.email.trim(), // Allows direct reply to sender
      message: form.message.trim(),
      subject: `Portfolio Contact Form: Message from ${form.name.trim()}`,
    };

    console.log('Sending email with params:', { ...templateParams, message: '[message content hidden]' });

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(
        (response) => {
          console.log('Email sent successfully!', response.status, response.text);
          setLoading(false);
          setSuccess(true);
          setErrors({});
          setTouched({});

          // Reset form
          setForm({
            name: "",
            email: "",
            message: "",
          });

          // Scroll to top of form to show success message
          if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }

          // Hide success message after 5 seconds
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        },
        (error) => {
          setLoading(false);
          console.error('EmailJS Error:', error);
          console.error('Error details:', {
            status: error.status,
            text: error.text,
            serviceId: serviceId ? 'Set' : 'Missing',
            templateId: templateId ? 'Set' : 'Missing',
            publicKey: publicKey ? 'Set' : 'Missing',
          });

          setErrors({
            submit: error.text || "Failed to send message. Please try again later.",
          });
        }
      );
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative w-full overflow-visible scroll-mt-20 pt-0 pb-12 lg:pb-16"
    >
      {/* Stars background - fades in when contact section is in view */}
      <motion.div 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <StarsCanvas />
      </motion.div>
      
      {/* Exit Terminal - part of contact section */}
      <div 
        ref={terminalRef}
        className="relative w-full min-h-[400px] lg:min-h-[450px] overflow-visible mb-0 py-8"
        style={{ marginBottom: 0, paddingBottom: 0 }}
      >
        {/* Animated grid background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animation: 'gridMove 20s linear infinite',
            willChange: 'transform'
          }}
        />

        {/* Terminal content */}
        <div className="relative z-10 flex flex-col items-center px-5">
          {/* Terminal window frame - single box with background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={terminalInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl bg-black/80 border border-cyan-500/30 rounded-lg p-6 font-mono text-sm lg:text-base relative"
            style={{
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.2), inset 0 0 20px rgba(0, 255, 255, 0.05)'
            }}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyan-500/20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <span className="text-cyan-400/60 text-xs ml-4">terminal@portfolio:~</span>
              </div>

              {/* Terminal output */}
              <div className="space-y-1 min-h-[180px]">
                {terminalLines.slice(0, currentLine).map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-cyan-400/90"
                  >
                    {line || <span className="opacity-0">.</span>}
                  </motion.div>
                ))}
                
                {isTyping && currentLine < terminalLines.length && (
                  <div className="text-cyan-400/90">
                    {displayedText}
                    <span className={showCursor ? 'opacity-100' : 'opacity-0'}>▊</span>
                  </div>
                )}

                {currentLine >= terminalLines.length && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-cyan-400 text-center mt-4"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full"
                      />
                      <span>Transitioning to contact space...</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Data stream lines - inside terminal box */}
              <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
                    style={{
                      top: `${30 + i * 20}%`,
                      width: '100%'
                    }}
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={terminalInView ? { x: '200%', opacity: [0, 0.5, 0] } : {}}
                    transition={{
                      duration: 2 + i * 0.3,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: 'linear'
                    }}
                  />
                ))}
              </div>
            </motion.div>
        </div>
      </div>
      
      {/* Content container */}
      <div className="relative z-10 container mx-auto px-5 2xl:px-0 max-w-7xl pt-8">
        <span className='hash-span' id="contact">
          &nbsp;
        </span>
        <div className="flex xl:flex-row flex-col-reverse gap-10 overflow-visible">
          {/* Form Section */}
          <div className='flex-[0.75] bg-black-100 p-8 rounded-2xl backdrop-blur-sm'>
            <p className={styles.sectionSubText}>Get in touch</p>
            <h3 className={styles.sectionHeadText}>Contact.</h3>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className='mt-12 flex flex-col gap-8'
            >
              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='bg-green-500/20 border border-green-500/50 text-green-400 py-4 px-6 rounded-lg font-medium'
                >
                  ✓ Thank you! Your message has been sent. I'll get back to you as soon as possible.
                </motion.div>
              )}

              {/* Submit Error Message */}
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='bg-red-500/20 border border-red-500/50 text-red-400 py-4 px-6 rounded-lg font-medium'
                >
                  ✗ {errors.submit}
                </motion.div>
              )}

              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>
                  Your Name <span className='text-red-400'>*</span>
                </span>
                <input
                  type='text'
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="What's your good name?"
                  required
                  className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-2 font-medium transition-colors ${
                    touched.name && errors.name
                      ? 'border-red-500/50 focus:border-red-500'
                      : touched.name && !errors.name
                      ? 'border-green-500/50 focus:border-green-500'
                      : 'border-transparent focus:border-cyan-500/50'
                  }`}
                />
                {touched.name && errors.name && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='text-red-400 text-sm mt-2'
                  >
                    {errors.name}
                  </motion.span>
                )}
              </label>

              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>
                  Your email <span className='text-red-400'>*</span>
                </span>
                <input
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="What's your web address?"
                  required
                  className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-2 font-medium transition-colors ${
                    touched.email && errors.email
                      ? 'border-red-500/50 focus:border-red-500'
                      : touched.email && !errors.email
                      ? 'border-green-500/50 focus:border-green-500'
                      : 'border-transparent focus:border-cyan-500/50'
                  }`}
                />
                {touched.email && errors.email && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='text-red-400 text-sm mt-2'
                  >
                    {errors.email}
                  </motion.span>
                )}
              </label>

              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>
                  Your Message <span className='text-red-400'>*</span>
                </span>
                <textarea
                  rows={7}
                  name='message'
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='What you want to say?'
                  required
                  className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-2 font-medium transition-colors resize-none ${
                    touched.message && errors.message
                      ? 'border-red-500/50 focus:border-red-500'
                      : touched.message && !errors.message
                      ? 'border-green-500/50 focus:border-green-500'
                      : 'border-transparent focus:border-cyan-500/50'
                  }`}
                />
                {touched.message && errors.message && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='text-red-400 text-sm mt-2'
                  >
                    {errors.message}
                  </motion.span>
                )}
                {touched.message && !errors.message && form.message.length > 0 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='text-green-400 text-sm mt-2'
                  >
                    {form.message.length} characters
                  </motion.span>
                )}
              </label>

              <button
                type='submit'
                disabled={loading || Object.keys(errors).length > 0 || !form.name.trim() || !form.email.trim() || !form.message.trim()}
                className={`py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md transition-all ${
                  loading || Object.keys(errors).length > 0 || !form.name.trim() || !form.email.trim() || !form.message.trim()
                    ? 'bg-gray-600/50 cursor-not-allowed shadow-none'
                    : 'bg-tertiary shadow-primary hover:shadow-primary/80 hover:scale-105 active:scale-95'
                }`}
              >
                {loading ? (
                  <span className='flex items-center gap-2'>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className='inline-block'
                    >
                      ⟳
                    </motion.span>
                    Sending...
                  </span>
                ) : (
                  "Send"
                )}
              </button>
            </form>
          </div>

          {/* Earth Globe Section */}
          <div 
            ref={earthContainerRef}
            className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px] min-h-[350px] relative w-full'
            style={earthHeight ? { height: `${earthHeight}px`, maxHeight: `${earthHeight}px` } : {}}
          >
            <div className="w-full h-full">
              <EarthCanvas />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
