import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Hero = () => {
    const prefersReducedMotion = useReducedMotion();
    const heroRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { damping: 20 });
    const parallaxX = useTransform(smoothX, [0, 1], [-10, 10]);
    const parallaxY = useTransform(smoothY, [0, 1], [-10, 10]);
    
    // Terminal typing animation phrases
    const terminalPhrases = [
        "compiling kernels…",
        "loading GPU drivers…",
        "optimizing memory layout…",
        "initializing model weights…",
        "scheduling CUDA threads…",
        "tuning cache hierarchies…"
    ];
    const [currentPhrase, setCurrentPhrase] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    // Key tags
    const keyTags = [
        "Computer Architecture",
        "GPU Kernels",
        "Robotics",
        "Systems",
        "Machine Learning"
    ];

    // Mouse tracking for parallax
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                mouseX.set(x);
                mouseY.set(y);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Terminal typing effect
    useEffect(() => {
        if (prefersReducedMotion) {
            setDisplayText(terminalPhrases[0]);
            return;
        }

        const phrase = terminalPhrases[currentPhrase];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < phrase.length) {
                    setDisplayText(phrase.slice(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2500);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(phrase.slice(0, displayText.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentPhrase((prev) => (prev + 1) % terminalPhrases.length);
                }
            }
        }, isDeleting ? 30 : 80);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentPhrase, prefersReducedMotion]);

    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = '/Nathan_s_Resume.pdf';
        link.download = 'Nathan_s_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExecuteProjects = () => {
        const projectsSection = document.getElementById('projects') || document.getElementById('product-viewer');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? 0 : 0.6,
                ease: "easeOut"
            }
        }
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? 0 : 0.5
            }
        }
    };

    const photoVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: prefersReducedMotion ? 0 : 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section 
            id="hero" 
            ref={heroRef}
            className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        >
            {/* Multi-layer parallax background */}
            <div className="absolute inset-0">
                {/* Layer 1: Deep background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-cyan-950/20" />
                
                {/* Layer 2: Neural network activation grid */}
                <NeuralNetworkGrid prefersReducedMotion={prefersReducedMotion} />
                
                {/* Layer 3: GPU parallel threads */}
                <GPUThreads prefersReducedMotion={prefersReducedMotion} mouseX={smoothX} mouseY={smoothY} />
                
                {/* Layer 4: Instruction pipeline traces */}
                <InstructionPipelineTraces prefersReducedMotion={prefersReducedMotion} />
                
                {/* Layer 5: Data matrix streaming */}
                <DataMatrixStreaming prefersReducedMotion={prefersReducedMotion} />
            </div>

            {/* Main hero content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-5 2xl:px-0 py-20 lg:py-32">
                <motion.div
                    className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Left: Profile Photo */}
                    <ProfilePhotoWithParallax 
                        variants={photoVariants}
                        parallaxX={parallaxX}
                        parallaxY={parallaxY}
                    />

                    {/* Right: Text Content */}
                    <div className="flex-1 flex flex-col order-1 lg:order-2 max-w-2xl lg:max-w-none">
                        {/* Heading with staggered animation */}
                        <motion.h1 
                            className="flex items-baseline gap-3 mb-4 lg:mb-6 flex-wrap"
                            variants={containerVariants}
                        >
                            <motion.span 
                                className="text-white font-regular text-5xl lg:text-7xl 2xl:text-8xl"
                                variants={wordVariants}
                            >
                                Hello,
                            </motion.span>
                            <motion.span 
                                className="text-white font-regular text-5xl lg:text-7xl 2xl:text-8xl"
                                variants={wordVariants}
                            >
                                I'm
                            </motion.span>
                            <motion.span 
                                className="name-gradient font-bold text-6xl lg:text-8xl 2xl:text-9xl relative"
                                variants={wordVariants}
                                whileHover={{ scale: 1.05 }}
                            >
                                Nathan
                                <motion.span
                                    className="absolute inset-0 shimmer-overlay"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 3,
                                        ease: "linear"
                                    }}
                                />
                            </motion.span>
                        </motion.h1>

                        {/* Terminal typing line */}
                        <motion.div
                            className="terminal-line mb-6"
                            variants={itemVariants}
                        >
                            <span className="terminal-prompt">$</span>
                            <span className="terminal-text">
                                {displayText}
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="inline-block ml-1"
                                >
                                    |
                                </motion.span>
                            </span>
                        </motion.div>

                        {/* Description lines */}
                        <motion.div 
                            className="flex flex-col gap-3 lg:gap-4 mb-6 lg:mb-8"
                            variants={containerVariants}
                        >
                            <motion.p 
                                className="text-white/90 font-regular text-lg lg:text-xl 2xl:text-2xl leading-relaxed"
                                variants={itemVariants}
                            >
                                Undergraduate engineer focused on{" "}
                                <HighlightText>computer systems & robotics</HighlightText>.
                            </motion.p>
                            <motion.p 
                                className="text-white/90 font-regular text-lg lg:text-xl 2xl:text-2xl leading-relaxed"
                                variants={itemVariants}
                            >
                                Building{" "}
                                <HighlightText>GPU-accelerated applications</HighlightText> and high-performance software.
                            </motion.p>
                            <motion.p 
                                className="text-white/90 font-regular text-lg lg:text-xl 2xl:text-2xl leading-relaxed"
                                variants={itemVariants}
                            >
                                Exploring{" "}
                                <HighlightText>machine learning + systems co-design</HighlightText> for real-world impact.
                            </motion.p>
                        </motion.div>

                        {/* Key tags */}
                        <motion.div
                            className="flex flex-wrap gap-2 mb-8"
                            variants={containerVariants}
                        >
                            {keyTags.map((tag, index) => (
                                <motion.span
                                    key={tag}
                                    className="tag-pill"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-wrap gap-4 mb-8"
                            variants={containerVariants}
                        >
                            <PremiumTerminalCTA onClick={handleExecuteProjects} />
                            <motion.button
                                className="cta-button secondary"
                                onClick={handleDownloadResume}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Download Resume
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Premium Terminal CTA Component
const PremiumTerminalCTA = ({ onClick }) => {
    const [isExecuting, setIsExecuting] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        setIsExecuting(true);
        setTimeout(() => {
            onClick();
            setTimeout(() => {
                setIsExecuting(false);
            }, 500);
        }, 500);
    };

    return (
        <motion.button
            className="premium-terminal-cta"
            onClick={handleClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isExecuting}
        >
            <motion.div
                className="premium-terminal-cta-bg"
                animate={{
                    opacity: isHovered ? 0.1 : 0,
                    scale: isHovered ? 1.05 : 1
                }}
                transition={{ duration: 0.3 }}
            />
            <span className="premium-terminal-prompt">$</span>
            <motion.span
                className="premium-terminal-command"
                animate={{
                    x: isHovered ? [0, 2, 0] : 0
                }}
                transition={{
                    duration: 0.5,
                    repeat: isHovered ? Infinity : 0,
                    repeatType: "reverse"
                }}
            >
                {isExecuting ? "executing…" : "execute projects --gpu"}
            </motion.span>
            <motion.span
                className="premium-terminal-caret"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
            >
                |
            </motion.span>
        </motion.button>
    );
};

// Profile Photo with Parallax
const ProfilePhotoWithParallax = ({ variants, parallaxX, parallaxY }) => {
    return (
        <motion.div
            className="flex-shrink-0 order-2 lg:order-1"
            variants={variants}
            style={{
                x: parallaxX,
                y: parallaxY
            }}
        >
            <img
                src="/profile_pic.jpeg"
                alt="Nathan"
                className="profile-photo-clean"
            />
        </motion.div>
    );
};

// Highlight text component with hover effect
const HighlightText = ({ children }) => {
    return (
        <motion.span
            className="highlight-text inline-block relative"
            whileHover="hover"
            initial="rest"
        >
            <span className="relative z-10">{children}</span>
            <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                variants={{
                    rest: { scaleX: 0, originX: 0 },
                    hover: { scaleX: 1, originX: 0 }
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.span>
    );
};

// Neural Network Activation Grid
const NeuralNetworkGrid = ({ prefersReducedMotion }) => {
    if (prefersReducedMotion) return null;

    const gridSize = 20;
    const cells = Array.from({ length: gridSize * gridSize }, (_, i) => i);

    return (
        <div className="absolute inset-0 neural-grid">
            {cells.map((cell) => (
                <motion.div
                    key={cell}
                    className="neural-cell"
                    style={{
                        left: `${(cell % gridSize) * (100 / gridSize)}%`,
                        top: `${Math.floor(cell / gridSize) * (100 / gridSize)}%`
                    }}
                    animate={{
                        opacity: [0.1, 0.4, 0.1],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

// GPU Parallel Threads
const GPUThreads = ({ prefersReducedMotion, mouseX, mouseY }) => {
    if (prefersReducedMotion) return null;

    const threads = Array.from({ length: 8 }, (_, i) => i);

    return (
        <div className="absolute inset-0 gpu-threads">
            {threads.map((thread, i) => (
                <motion.div
                    key={thread}
                    className="gpu-thread-lane"
                    style={{
                        top: `${15 + i * 10}%`,
                        left: 0
                    }}
                    animate={{
                        x: ["-100%", "100%"]
                    }}
                    transition={{
                        duration: 8 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "linear"
                    }}
                >
                    {/* Work items flowing along thread */}
                    {Array.from({ length: 3 }, (_, j) => (
                        <motion.div
                            key={j}
                            className="work-item"
                            animate={{
                                x: [0, 100],
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: j * 0.7,
                                ease: "linear"
                            }}
                        />
                    ))}
                </motion.div>
            ))}
        </div>
    );
};

// Instruction Pipeline Traces
const InstructionPipelineTraces = ({ prefersReducedMotion }) => {
    if (prefersReducedMotion) return null;

    const stages = ['Fetch', 'Decode', 'Execute', 'Memory', 'Writeback'];
    const pipelines = Array.from({ length: 3 }, (_, i) => i);

    return (
        <div className="absolute inset-0 pipeline-traces">
            {pipelines.map((pipeline, pIdx) => (
                <svg
                    key={pipeline}
                    className="absolute inset-0 w-full h-full"
                    style={{ opacity: 0.3 - pIdx * 0.1 }}
                >
                    {stages.map((stage, sIdx) => (
                        <g key={stage}>
                            {/* Pipeline path */}
                            <path
                                d={`M ${20 + pIdx * 30} ${30 + sIdx * 15} L ${80 + pIdx * 30} ${30 + sIdx * 15}`}
                                stroke="rgba(0, 255, 255, 0.3)"
                                strokeWidth="1"
                                fill="none"
                            />
                            {/* Light pulse */}
                            <motion.circle
                                cx={20 + pIdx * 30}
                                cy={30 + sIdx * 15}
                                r="2"
                                fill="#00ffff"
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [1, 1.5, 1]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: sIdx * 0.4 + pIdx * 0.2,
                                    ease: "easeInOut"
                                }}
                            />
                        </g>
                    ))}
                </svg>
            ))}
        </div>
    );
};

// Data Matrix Streaming
const DataMatrixStreaming = ({ prefersReducedMotion }) => {
    if (prefersReducedMotion) return null;

    const streams = Array.from({ length: 4 }, (_, i) => i);

    return (
        <div className="absolute inset-0 data-streams">
            {streams.map((stream, i) => (
                <motion.div
                    key={stream}
                    className="data-stream"
                    style={{
                        left: `${25 + i * 15}%`,
                        top: 0,
                        width: "2px"
                    }}
                    animate={{
                        y: ["-100%", "100%"],
                        opacity: [0, 0.4, 0.4, 0]
                    }}
                    transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

export default Hero;
