import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas, StarsCanvas } from "./canvas";

const Contact = () => {
  const formRef = useRef();
  const sectionRef = useRef(null);
  const terminalRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const terminalInView = useInView(terminalRef, { once: false, margin: "-200px" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  
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

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Nathan",
          from_email: form.email,
          to_email: "nathan@example.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
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
              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>Your Name</span>
                <input
                  type='text'
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your good name?"
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                />
              </label>
              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>Your email</span>
                <input
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your web address?"
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                />
              </label>
              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>Your Message</span>
                <textarea
                  rows={7}
                  name='message'
                  value={form.message}
                  onChange={handleChange}
                  placeholder='What you want to say?'
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                />
              </label>

              <button
                type='submit'
                className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>

          {/* Earth Globe Section */}
          <div className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px] min-h-[350px] relative w-full'>
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
