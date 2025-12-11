import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ExperienceToContactTransition = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-200px" });
    const [currentLine, setCurrentLine] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    const terminalLines = [
        "[INFO] Execution trace compilation complete.",
        "[INFO] Exporting experience logs...",
        "[INFO] Establishing secure connection...",
        "[INFO] Preparing contact interface...",
        "[INFO] Initializing communication protocols...",
        "[OK] System ready for contact.",
        "",
        "$ connecting to contact.space...",
        "$ establishing handshake...",
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
        if (!isInView || currentLine >= terminalLines.length) {
            setIsTyping(false);
            return;
        }

        setIsTyping(true);
        const line = terminalLines[currentLine];
        if (!line) {
            // Empty line - move to next immediately
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
                // Wait before moving to next line
                setTimeout(() => {
                    setCurrentLine(prev => prev + 1);
                    setDisplayedText("");
                }, 800);
            }
        }, 30);

        return () => clearInterval(typeInterval);
    }, [isInView, currentLine]);

    // Reset when out of view
    useEffect(() => {
        if (!isInView && currentLine > 0) {
            const resetTimer = setTimeout(() => {
                setCurrentLine(0);
                setDisplayedText("");
            }, 1000);
            return () => clearTimeout(resetTimer);
        }
    }, [isInView]);

    return (
        <div 
            ref={ref}
            className="relative w-full h-64 lg:h-80 overflow-hidden"
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
            <div className="relative z-10 h-full flex flex-col justify-center items-center px-5">
                <div className="w-full max-w-4xl">
                    {/* Terminal window frame */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-black/80 border border-cyan-500/30 rounded-lg p-6 font-mono text-sm lg:text-base"
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
                        <div className="space-y-1 min-h-[120px]">
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
                    </motion.div>

                    {/* Data stream lines */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
                                style={{
                                    top: `${30 + i * 20}%`,
                                    width: '100%'
                                }}
                                initial={{ x: '-100%', opacity: 0 }}
                                animate={isInView ? { x: '200%', opacity: [0, 0.5, 0] } : {}}
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
                </div>
            </div>

        </div>
    );
};

export default ExperienceToContactTransition;

