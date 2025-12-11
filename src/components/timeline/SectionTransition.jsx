import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SectionTransition = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="relative h-32 lg:h-40 overflow-hidden">
            {/* Seamless background - blends with global background */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1 }}
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0.4) 70%, transparent 100%)'
                }}
            />
            
            {/* Data stream flowing from About section */}
            <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
                        style={{
                            top: `${20 + i * 15}%`,
                            width: '100%',
                            opacity: 0.4
                        }}
                        initial={{ x: '-100%' }}
                        animate={isInView ? { x: '200%' } : {}}
                        transition={{
                            duration: 3 + i * 0.3,
                            delay: i * 0.2,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                    />
                ))}
            </div>

            {/* Terminal-like transition text - more prominent */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <div className="text-center">
                    <motion.span
                        className="text-cyan-400 font-mono text-sm lg:text-base"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        [COMPILING EXECUTION TRACE...]
                    </motion.span>
                    <motion.div
                        className="mt-3 h-px w-32 bg-cyan-400/70 mx-auto"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.7, delay: 0.7 }}
                        style={{
                            boxShadow: '0 0 8px rgba(0, 255, 255, 0.4)'
                        }}
                    />
                </div>
            </motion.div>

            {/* Pipeline connection visual - grows into timeline */}
            <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-cyan-500/50 via-cyan-500/70 to-cyan-500"
                initial={{ scaleY: 0, transformOrigin: 'top' }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            />
            
            {/* Subtle grid fade-in - matches global background */}
            <motion.div
                className="absolute inset-0 architecture-grid"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.15 } : {}}
                transition={{ duration: 1.2, delay: 0.6 }}
            />
            
            {/* Micro-lights connecting sections */}
            <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-0.5 h-0.5 rounded-full bg-cyan-400"
                        style={{
                            left: `${10 + i * 12}%`,
                            top: `${30 + (i % 3) * 20}%`,
                            opacity: 0.3,
                            boxShadow: '0 0 3px rgba(0, 255, 255, 0.5)'
                        }}
                        animate={{
                            opacity: [0.2, 0.5, 0.2],
                            scale: [1, 1.3, 1]
                        }}
                        transition={{
                            duration: 2 + Math.random(),
                            repeat: Infinity,
                            delay: i * 0.2
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default SectionTransition;

