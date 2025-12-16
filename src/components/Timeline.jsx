import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { timelineData } from './timeline/timelineData';
import DetailModal from './timeline/DetailModal';
import { getCategoryIcon } from './timeline/timelineUtils';

const Timeline = () => {
    const [expandedId, setExpandedId] = useState(null);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-50px" });

    const selectedItem = timelineData.find(item => item.id === expandedId);

    return (
        <>
            {/* Section Transition - flows from previous section */}
            <motion.div 
                className="relative h-24 lg:h-32 overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={isInView ? { opacity: 1, height: "auto" } : {}}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.span 
                        className="text-cyan-400 font-mono text-sm lg:text-base"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        [COMPILING EXECUTION TRACE...]
                    </motion.span>
                </motion.div>
                
                {/* Data stream lines */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
                        style={{ top: `${30 + i * 20}%`, width: '100%' }}
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={isInView ? { x: '200%', opacity: [0, 0.6, 0] } : {}}
                        transition={{
                            duration: 2 + i * 0.3,
                            delay: 0.5 + i * 0.2,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: 'linear'
                        }}
                    />
                ))}
            </motion.div>
            
            <motion.section 
                ref={containerRef}
                className="compute-timeline-section pt-0 pb-12 lg:pb-16 relative overflow-hidden"
                id="timeline"
                initial={{ 
                    opacity: 0, 
                    clipPath: "inset(0% 100% 0% 0%)",
                    filter: "blur(10px)"
                }}
                animate={isInView ? {
                    opacity: 1,
                    clipPath: "inset(0% 0% 0% 0%)",
                    filter: "blur(0px)"
                } : {
                    opacity: 0.3,
                    clipPath: "inset(0% 50% 0% 0%)",
                    filter: "blur(5px)"
                }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Split background: 50% architecture (top), 50% stars (bottom) */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Smooth gradient transition from previous section */}
                    <div 
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 10%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.5) 90%, transparent 100%)'
                        }}
                    />
                    
                    {/* Top half - Architecture background elements */}
                    <div className="absolute inset-0" style={{ clipPath: 'inset(0 0 50% 0)' }}>
                        <div 
                            className="absolute inset-0 architecture-grid"
                            style={{ 
                                opacity: 0.4,
                                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.3) 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.3) 100%)'
                            }}
                        />
                    </div>
                    
                    {/* Bottom half - Stars background */}
                    <div className="absolute inset-0" style={{ clipPath: 'inset(50% 0 0 0)', overflow: 'hidden' }}>
                        <div 
                            style={{ 
                                opacity: 0.4, 
                                height: '200%', 
                                width: '100%', 
                                transform: 'translateY(-50%)',
                                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.7) 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.7) 100%)'
                            }}
                        >
                            {/* Simple star particles instead of full canvas for performance */}
                            {Array.from({ length: 50 }, (_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-0.5 h-0.5 rounded-full bg-white"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${50 + Math.random() * 50}%`,
                                        opacity: Math.random() * 0.5 + 0.2,
                                    }}
                                    animate={{
                                        opacity: [0.2, 0.6, 0.2],
                                        scale: [1, 1.5, 1]
                                    }}
                                    transition={{
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 3
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-5 2xl:px-0 max-w-7xl relative z-10" style={{ marginBottom: 0, paddingBottom: 0 }}>
                    {/* Compact Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-6 lg:mb-8"
                    >
                        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-1 font-mono">
                            EXECUTION_TRACE
                        </h2>
                        <p className="text-white/60 text-xs lg:text-sm max-w-2xl mx-auto font-mono">
                            Projects, research, and engineering contributions.
                        </p>
                    </motion.div>

                    {/* Compact Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6" style={{ marginBottom: 0, paddingBottom: 0 }}>
                        {timelineData.map((item, index) => {
                            const itemRef = useRef(null);
                            const itemInView = useInView(itemRef, { once: true, margin: "-50px" });
                            const categoryIcon = getCategoryIcon(item.category);

                            return (
                                <motion.div
                                    key={item.id}
                                    ref={itemRef}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={itemInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="group relative"
                                >
                                    <div
                                        onClick={() => setExpandedId(item.id)}
                                        className="relative bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 lg:p-5 cursor-pointer hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                                    >
                                        {/* Category Icon */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-4 h-4 flex items-center justify-center">
                                                {categoryIcon}
                                            </div>
                                            <span className="text-cyan-400 text-xs font-mono uppercase tracking-wider">
                                                {item.category}
                                            </span>
                                        </div>

                                        {/* Date */}
                                        <div className="text-gray-400 text-xs font-mono mb-2">
                                            {item.date}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-white font-semibold text-sm lg:text-base mb-1 line-clamp-2">
                                            {item.title}
                                        </h3>

                                        {/* Role */}
                                        <p className="text-cyan-400/80 text-xs lg:text-sm font-mono mb-3">
                                            {item.role}
                                        </p>

                                        {/* Description */}
                                        <p className="text-gray-300 text-xs line-clamp-2 mb-3">
                                            {item.description}
                                        </p>

                                        {/* Tech Tags */}
                                        {item.tech && Array.isArray(item.tech) && item.tech.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {item.tech.slice(0, 3).map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-xs font-mono rounded border border-cyan-500/20"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {item.tech.length > 3 && (
                                                    <span className="px-2 py-0.5 text-gray-400 text-xs font-mono">
                                                        +{item.tech.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Hover Glow Effect */}
                                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Detail Modal */}
                {selectedItem && (
                    <DetailModal 
                        item={selectedItem} 
                        isOpen={!!selectedItem} 
                        onClose={() => setExpandedId(null)} 
                    />
                )}
            </motion.section>
        </>
    );
};

export default Timeline;
