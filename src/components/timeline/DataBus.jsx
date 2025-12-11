import { motion } from 'framer-motion';

// Data bus pulse component
const DataPulse = ({ delay, index }) => {
    return (
        <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400"
            style={{
                boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)'
            }}
            initial={{ top: '0%', opacity: 0, scale: 0 }}
            animate={{ 
                top: '100%', 
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0]
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                delay: delay,
                ease: "linear"
            }}
        />
    );
};

const DataBus = ({ isInView, itemCount }) => {
    return (
        <>
            {/* Desktop spine */}
            <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full hidden lg:block"
                initial={{ scaleY: 0, transformOrigin: 'top' }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500 via-cyan-400 to-cyan-500" />
                
                {/* Clock ticks */}
                {Array.from({ length: itemCount }).map((_, index) => (
                    <motion.div
                        key={index}
                        className="absolute left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400"
                        style={{
                            top: `${(index + 1) * (100 / (itemCount + 1))}%`,
                            boxShadow: '0 0 8px rgba(0, 255, 255, 0.6)'
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.4 + index * 0.08, duration: 0.3 }}
                    />
                ))}

                {/* Traveling data pulses */}
                {[...Array(2)].map((_, i) => (
                    <DataPulse key={i} delay={i * 1.2} index={i} />
                ))}
            </motion.div>
            
            {/* Mobile spine */}
            <motion.div 
                className="absolute left-8 w-0.5 h-full lg:hidden"
                initial={{ scaleY: 0, transformOrigin: 'top' }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500 via-cyan-400 to-cyan-500" />
                {Array.from({ length: itemCount }).map((_, index) => (
                    <motion.div
                        key={index}
                        className="absolute left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400"
                        style={{
                            top: `${(index + 1) * (100 / (itemCount + 1))}%`,
                            boxShadow: '0 0 8px rgba(0, 255, 255, 0.6)'
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.4 + index * 0.08, duration: 0.3 }}
                    />
                ))}
            </motion.div>
        </>
    );
};

export default DataBus;

