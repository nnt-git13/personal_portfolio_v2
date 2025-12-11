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

    // Simulated kernel execution logs
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

    // Reset when section comes into view (allows it to restart if scrolled to again)
    useEffect(() => {
        if (isInView && !hasStarted) {
            // Start animation if not started yet
            setHasStarted(true);
            setIsTyping(true);
        }
    }, [isInView, hasStarted]);

    // Typewriter effect for logs
    useEffect(() => {
        if (!hasStarted || !isTyping) return;
        
        if (prefersReducedMotion) {
            setDisplayedText(kernelLogs[0]);
            return;
        }

        const log = kernelLogs[currentLog];
        if (!log) return;
        
        let charIndex = 0;
        setDisplayedText("");
        
        const typeInterval = setInterval(() => {
            if (charIndex < log.length) {
                setDisplayedText(log.slice(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    if (currentLog < kernelLogs.length - 1) {
                        // Move to next log
                        setCurrentLog((prev) => prev + 1);
                        setDisplayedText("");
                    } else {
                        // All logs complete, keep terminal visible
                        setIsTyping(false);
                    }
                }, 2000);
            }
        }, 30);

        return () => clearInterval(typeInterval);
    }, [currentLog, prefersReducedMotion, kernelLogs, hasStarted, isTyping]);

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
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    height: "auto"
                }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut"
                }}
            >
                <div className="container mx-auto px-5 2xl:px-0 max-w-6xl">
                    <motion.div
                        className="kernel-terminal"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {/* Terminal header */}
                        <motion.div className="terminal-header" variants={itemVariants}>
                            <div className="terminal-dots">
                                <span className="dot dot-red"></span>
                                <span className="dot dot-yellow"></span>
                                <span className="dot dot-green"></span>
                            </div>
                            <span className="terminal-title">kernel_execution.log</span>
                        </motion.div>

                        {/* Terminal content */}
                        <div className="terminal-content">
                            {/* Log display */}
                            <div className="terminal-logs">
                                {kernelLogs.slice(0, currentLog + 1).map((log, index) => (
                                    <div key={index} className="terminal-log-line">
                                        {index === currentLog ? (
                                            <>
                                                {displayedText}
                                                <motion.span
                                                    animate={{ opacity: [1, 0] }}
                                                    transition={{ duration: 0.8, repeat: Infinity }}
                                                    className="cursor"
                                                >
                                                    |
                                                </motion.span>
                                            </>
                                        ) : (
                                            log
                                        )}
                                    </div>
                                ))}
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

                            {/* Benchmark bars */}
                            <motion.div
                                className="benchmark-bars"
                                variants={itemVariants}
                            >
                                {[85, 92, 78, 95].map((value, index) => (
                                    <motion.div
                                        key={index}
                                        className="benchmark-bar-container"
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        animate={{ opacity: 1, scaleX: 1 }}
                                        transition={{
                            duration: 0.5,
                            delay: index * 0.1
                        }}
                                    >
                                        <motion.div
                                            className="benchmark-bar"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${value}%` }}
                                            transition={{
                            duration: 1,
                            delay: index * 0.1 + 0.3,
                            ease: "easeOut"
                        }}
                                        />
                                    </motion.div>
                                ))}
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
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </>
    );
};

export default KernelVisualization;
