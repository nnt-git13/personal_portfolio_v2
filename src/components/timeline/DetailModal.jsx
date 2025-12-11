import { motion, AnimatePresence } from 'framer-motion';
import { getCategoryIcon, categoryConfig, skillToOpcode } from './timelineUtils.jsx';

const DetailModal = ({ item, isOpen, onClose }) => {
    if (!item) return null;
    
    const config = categoryConfig[item.category] || categoryConfig.research;
    const color = config.color;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />
                    
                    {/* Modal */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-lg bg-black/95 backdrop-blur-xl border-l z-50 overflow-y-auto"
                        style={{ borderColor: `${color}30` }}
                    >
                        <div className="p-8">
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"/>
                                    <line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                            </button>

                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center justify-center w-12 h-12 rounded bg-black/40 border" style={{ borderColor: `${color}40` }}>
                                    {getCategoryIcon(item.category)}
                                </div>
                                <div>
                                    <span 
                                        className="text-xs font-mono font-semibold px-3 py-1 rounded block mb-1"
                                        style={{
                                            backgroundColor: `${color}15`,
                                            color: color
                                        }}
                                    >
                                        {config.label}
                                    </span>
                                    <span className="text-white/30 text-xs font-mono">{item.date}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl font-bold text-white mb-2 font-mono">{item.title}</h2>
                            <p className="text-white/60 text-base mb-6 font-mono">{item.role}</p>

                            {/* Description */}
                            <p className="text-white/80 text-base mb-8 leading-relaxed">{item.description}</p>

                            {/* Full tech stack */}
                            <div className="mb-8">
                                <h3 className="text-white/60 text-sm font-mono mb-4">INSTRUCTION SET:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {item.tech.map((tech) => {
                                        const opcode = skillToOpcode[tech] || tech.toUpperCase().replace(/\s+/g, '_');
                                        return (
                                            <span
                                                key={tech}
                                                className="text-sm px-3 py-2 rounded font-mono bg-black/40 text-cyan-300 border border-cyan-500/30"
                                                style={{ borderColor: `${color}40` }}
                                            >
                                                {opcode}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* GitHub link */}
                            {item.github && (
                                <div className="mb-4">
                                    <a
                                        href={item.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                        View Repository
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default DetailModal;

