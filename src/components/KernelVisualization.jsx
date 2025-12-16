import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

const KernelVisualization = () => {
    const prefersReducedMotion = useReducedMotion();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
    const [currentLog, setCurrentLog] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [currentCommand, setCurrentCommand] = useState(0);
    const [commandText, setCommandText] = useState("");
    const [isTypingCommand, setIsTypingCommand] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const charIndexRef = useRef(0);
    const commandCharIndexRef = useRef(0);
    const intervalRef = useRef(null);
    const commandIntervalRef = useRef(null);

    // Simulated kernel execution logs (cyan/blue)
    const kernelLogs = [
        "[INFO] Compiling CUDA kernel: matrix_multiply_v2",
        "[INFO] Launch parameters: <<<256, 1024>>>",
        "[INFO] Memory transfer: Host → Device (2048 MB)",
        "[INFO] Kernel execution: 0.0234s",
        "[INFO] Memory transfer: Device → Host (2048 MB)",
        "[INFO] Throughput: 87.4 GFLOPS",
        "[INFO] GPU utilization: 94.2%",
        "[INFO] Model forward pass: 12.3ms",
        "[INFO] Model backward pass: 18.7ms",
        "[INFO] Optimizer step: 2.1ms",
        "[INFO] Session complete. Loading profile...",
        "[INFO] Compiling experience logs..."
    ];

    // Additional command execution logs (green)
    const commandLogs = [
        { text: "$ ls -la projects/", isGreen: true },
        { text: "flashflow/  riscv_quant.accel/  arbitra/", isGreen: true },
        { text: "$ cd flashflow && make", isGreen: true },
        { text: "Compiling CUDA kernels...", isGreen: false },
        { text: "[OK] Build complete", isGreen: true },
        { text: "$ python train.py --gpu 0", isGreen: true },
        { text: "Training model on GPU...", isGreen: false }
    ];

    // Reset when section comes into view (allows it to restart if scrolled to again)
    useEffect(() => {
        if (isInView && !hasStarted) {
            // Start animation if not started yet
            setIsClosing(false);
            setHasStarted(true);
            setIsTyping(true);
            setCurrentLog(0);
            setDisplayedText("");
            setCurrentCommand(0);
            setCommandText("");
            charIndexRef.current = 0;
            commandCharIndexRef.current = 0;
        } else if (!isInView && hasStarted && currentLog >= kernelLogs.length) {
            // Close animation when scrolling away after completion
            setIsClosing(true);
        }
    }, [isInView, hasStarted, currentLog, kernelLogs.length]);

    // Typewriter effect for logs
    useEffect(() => {
        // Cleanup function
        const cleanup = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        if (!hasStarted || !isTyping) {
            cleanup();
            return cleanup;
        }
        
        if (prefersReducedMotion) {
            setDisplayedText(kernelLogs.join('\n'));
            return cleanup;
        }

        const log = kernelLogs[currentLog];
        if (!log) {
            setIsTyping(false);
            return cleanup;
        }
        
        // Reset character index when moving to a new log
        charIndexRef.current = 0;
        setDisplayedText("");
        
        // Clear any existing interval
        cleanup();
        
        // Start typing the current log
        intervalRef.current = setInterval(() => {
            if (charIndexRef.current < log.length) {
                setDisplayedText(log.slice(0, charIndexRef.current + 1));
                charIndexRef.current++;
            } else {
                cleanup();
                
                // Wait before moving to next log
                setTimeout(() => {
                    if (currentLog < kernelLogs.length - 1) {
                        // Move to next log
                        setCurrentLog((prev) => prev + 1);
                    } else {
                        // All logs complete, keep terminal visible
                        setIsTyping(false);
                    }
                }, 2000);
            }
        }, 30);

        return cleanup;
    }, [currentLog, prefersReducedMotion, kernelLogs.length, hasStarted, isTyping]);

    // Command execution typing effect (starts after kernel logs complete)
    useEffect(() => {
        const cleanup = () => {
            if (commandIntervalRef.current) {
                clearInterval(commandIntervalRef.current);
                commandIntervalRef.current = null;
            }
        };

        // Only start commands after all kernel logs are done
        if (!hasStarted || isTyping || currentLog < kernelLogs.length) {
            cleanup();
            return cleanup;
        }

        if (prefersReducedMotion) {
            setCommandText(commandLogs.map(c => c.text).join('\n'));
            return cleanup;
        }

        const command = commandLogs[currentCommand];
        if (!command) {
            setIsTypingCommand(false);
            return cleanup;
        }

        // Reset character index when moving to a new command
        commandCharIndexRef.current = 0;
        setCommandText("");
        setIsTypingCommand(true);

        cleanup();

        // Start typing the current command
        commandIntervalRef.current = setInterval(() => {
            if (commandCharIndexRef.current < command.text.length) {
                setCommandText(command.text.slice(0, commandCharIndexRef.current + 1));
                commandCharIndexRef.current++;
            } else {
                cleanup();
                setIsTypingCommand(false);

                // Wait before moving to next command
                setTimeout(() => {
                    if (currentCommand < commandLogs.length - 1) {
                        setCurrentCommand((prev) => prev + 1);
                    }
                }, 1500);
            }
        }, 40);

        return cleanup;
    }, [currentCommand, prefersReducedMotion, commandLogs.length, hasStarted, isTyping, currentLog, kernelLogs.length]);

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? 0 : 0.8,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: prefersReducedMotion ? 0 : 0.5 }
        }
    };

    return (
        <>
            <motion.section 
                ref={sectionRef}
                id="kernel-terminal" 
                className="kernel-visualization-section py-12 lg:py-16"
                initial={{ 
                    opacity: 0, 
                    y: 100, 
                    scale: 0.8,
                    filter: "blur(20px)",
                    clipPath: "inset(50% 50% 50% 50%)"
                }}
                animate={isClosing ? {
                    opacity: 0,
                    y: -80,
                    scale: 0.75,
                    filter: "blur(20px)",
                    clipPath: "inset(50% 50% 50% 50%)",
                    height: 0
                } : isInView ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    clipPath: "inset(0% 0% 0% 0%)",
                    height: "auto"
                } : {
                    opacity: 0.2,
                    y: 30,
                    scale: 0.9,
                    filter: "blur(8px)",
                    clipPath: "inset(20% 20% 20% 20%)"
                }}
                transition={{
                    duration: isClosing ? 0.8 : 1.2,
                    ease: isClosing ? "easeIn" : [0.16, 1, 0.3, 1],
                    opacity: { duration: 0.6 },
                    clipPath: { duration: 1.0 }
                }}
            >
                <div className="container mx-auto px-5 2xl:px-0 max-w-6xl">
                    <motion.div
                        className="kernel-terminal"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-100px" }}
                        style={{
                            transformOrigin: "center center",
                            transformStyle: "preserve-3d"
                        }}
                        animate={isClosing ? {
                            rotateX: -20,
                            scale: 0.9,
                            opacity: 0.4
                        } : {
                            rotateX: 0,
                            scale: 1,
                            opacity: 1
                        }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Terminal header */}
                        <motion.div 
                            className="terminal-header" 
                            variants={itemVariants}
                            initial={{ scaleX: 0, opacity: 0, y: -20 }}
                            animate={isInView && !isClosing ? { 
                                scaleX: 1, 
                                opacity: 1, 
                                y: 0 
                            } : { 
                                scaleX: 0.7, 
                                opacity: 0.2, 
                                y: -15 
                            }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            style={{ transformOrigin: "left center" }}
                        >
                            <div className="terminal-dots">
                                <span className="dot dot-red"></span>
                                <span className="dot dot-yellow"></span>
                                <span className="dot dot-green"></span>
                            </div>
                            <span className="terminal-title">kernel_execution.log</span>
                        </motion.div>

                        {/* Terminal content */}
                        <motion.div 
                            className="terminal-content"
                            initial={{ height: 0, opacity: 0, y: 20 }}
                            animate={isInView && !isClosing ? { 
                                height: "auto", 
                                opacity: 1, 
                                y: 0 
                            } : { 
                                height: 0, 
                                opacity: 0, 
                                y: 10 
                            }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            style={{ overflow: "hidden" }}
                        >
                            {/* Log display */}
                            <div className="terminal-logs">
                                {/* Kernel logs (cyan/blue) */}
                                {kernelLogs.slice(0, currentLog).map((log, index) => (
                                    <div key={index} className="terminal-log-line">
                                        {log}
                                    </div>
                                ))}
                                {currentLog < kernelLogs.length && (
                                    <div className="terminal-log-line">
                                        {displayedText}
                                        {isTyping && (
                                            <motion.span
                                                animate={{ opacity: [1, 0] }}
                                                transition={{ duration: 0.8, repeat: Infinity }}
                                                className="cursor"
                                            >
                                                |
                                            </motion.span>
                                        )}
                                    </div>
                                )}

                                {/* Command execution logs (green) - appear after kernel logs */}
                                {currentLog >= kernelLogs.length && (
                                    <>
                                        {commandLogs.slice(0, currentCommand).map((cmd, index) => (
                                            <div key={`cmd-${index}`} className={`terminal-log-line ${cmd.isGreen ? 'green' : ''}`}>
                                                {cmd.text}
                                            </div>
                                        ))}
                                        {currentCommand < commandLogs.length && (
                                            <div className={`terminal-log-line ${commandLogs[currentCommand]?.isGreen ? 'green' : ''}`}>
                                                {commandText}
                                                {isTypingCommand && (
                                                    <motion.span
                                                        animate={{ opacity: [1, 0] }}
                                                        transition={{ duration: 0.8, repeat: Infinity }}
                                                        className="cursor"
                                                    >
                                                        |
                                                    </motion.span>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Performance metrics */}
                            <motion.div
                                className="performance-metrics"
                                variants={itemVariants}
                            >
                                <div className="metric">
                                    <span className="metric-label">FPS:</span>
                                    <motion.span
                                        className="metric-value"
                                        animate={{
                            opacity: [0.7, 1, 0.7]
                        }}
                                        transition={{
                            duration: 2,
                            repeat: Infinity
                        }}
                                    >
                                        124.3
                                    </motion.span>
                                </div>
                                <div className="metric">
                                    <span className="metric-label">GFLOPS:</span>
                                    <motion.span
                                        className="metric-value"
                                        animate={{
                            opacity: [0.7, 1, 0.7]
                        }}
                                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.3
                        }}
                                    >
                                        87.4
                                    </motion.span>
                                </div>
                                <div className="metric">
                                    <span className="metric-label">GPU:</span>
                                    <motion.span
                                        className="metric-value"
                                        animate={{
                            opacity: [0.7, 1, 0.7]
                        }}
                                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.6
                        }}
                                    >
                                        94.2%
                                    </motion.span>
                                </div>
                            </motion.div>


                            {/* GPU thread sparks */}
                            {!prefersReducedMotion && (
                                <div className="gpu-sparks">
                                    {[...Array(8)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="spark"
                                            initial={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                            opacity: 0
                        }}
                                            animate={{
                            x: [
                                Math.random() * 100 + "%",
                                Math.random() * 100 + "%"
                            ],
                            y: [
                                Math.random() * 100 + "%",
                                Math.random() * 100 + "%"
                            ],
                            opacity: [0, 1, 0]
                        }}
                                            transition={{
                            duration: 2 + Math.random(),
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>
        </>
    );
};

export default KernelVisualization;
