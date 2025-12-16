import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

const FeatureCards = () => {
    const prefersReducedMotion = useReducedMotion();

    const features = [
        {
            title: "GPU Systems",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
            ),
            description: "Fusing CUDA kernels, optimizing memory hierarchies, and pushing throughput for modern workloads."
        },
        {
            title: "Robotics & Control",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
            ),
            description: "Building embedded systems, sensor fusion pipelines, and control loops for autonomous machines."
        },
        {
            title: "Applied ML",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            description: "Designing models and dataflows that solve real problems in finance, robotics, and beyond."
        }
    ];

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

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: prefersReducedMotion ? 0 : 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <motion.section 
            className="feature-cards-section pt-0 pb-0"
            initial={{ 
                opacity: 0, 
                clipPath: "inset(0% 0% 100% 0%)",
                filter: "blur(10px)"
            }}
            whileInView={{
                opacity: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                filter: "blur(0px)"
            }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="container mx-auto px-5 2xl:px-0 max-w-7xl">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="feature-card"
                            variants={cardVariants}
                            whileHover={{ 
                                y: prefersReducedMotion ? 0 : -8,
                                scale: prefersReducedMotion ? 1 : 1.02
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Animated border glow */}
                            <div className="feature-card-border" />
                            
                            {/* Data packet animation */}
                            <motion.div
                                className="data-packet"
                                initial={{ x: "-100%", opacity: 0 }}
                                animate={{ 
                                    x: "400%", 
                                    opacity: [0, 1, 1, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: index * 0.5,
                                    ease: "linear"
                                }}
                            />

                            <div className="feature-card-content">
                                <div className="feature-icon">
                                    {feature.icon}
                                </div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default FeatureCards;

