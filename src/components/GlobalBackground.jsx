import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

// Architecture background components (simplified versions for global use)
const ArchitectureGrid = ({ opacity }) => {
  return (
    <div 
      className="absolute inset-0 architecture-grid"
      style={{ opacity }}
    />
  );
};

const DataBusLines = ({ opacity }) => {
  return (
    <div 
      className="absolute inset-0 data-bus-lines"
      style={{ opacity }}
    />
  );
};

// Neural Network Grid (simplified)
const NeuralNetworkGrid = ({ opacity }) => {
  if (opacity <= 0) return null;
  
  const gridSize = 15;
  const cells = Array.from({ length: gridSize * gridSize }, (_, i) => i);

  return (
    <div className="absolute inset-0 neural-grid" style={{ opacity }}>
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

// GPU Threads (simplified)
const GPUThreads = ({ opacity }) => {
  if (opacity <= 0) return null;
  
  const threads = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="absolute inset-0 gpu-threads" style={{ opacity: opacity * 0.4 }}>
      {threads.map((thread, i) => (
        <motion.div
          key={thread}
          className="gpu-thread-lane"
          style={{
            top: `${15 + i * 12}%`,
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
          {Array.from({ length: 2 }, (_, j) => (
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

// Pipeline Traces (simplified)
const PipelineTraces = ({ opacity }) => {
  if (opacity <= 0) return null;
  
  const stages = ['Fetch', 'Decode', 'Execute', 'Memory', 'Writeback'];
  const pipelines = Array.from({ length: 2 }, (_, i) => i);

  return (
    <div className="absolute inset-0 pipeline-traces" style={{ opacity: opacity * 0.2 }}>
      {pipelines.map((pipeline, pIdx) => (
        <svg
          key={pipeline}
          className="absolute inset-0 w-full h-full"
        >
          {stages.map((stage, sIdx) => (
            <g key={stage}>
              <path
                d={`M ${20 + pIdx * 30} ${30 + sIdx * 15} L ${80 + pIdx * 30} ${30 + sIdx * 15}`}
                stroke="rgba(0, 255, 255, 0.3)"
                strokeWidth="1"
                fill="none"
              />
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

const CyanGlow = ({ scrollYProgress }) => {
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0]);
  const [opacity, setOpacity] = useState(0.1);

  useEffect(() => {
    const unsubscribe = glowOpacity.on("change", (latest) => {
      setOpacity(latest);
    });
    return () => unsubscribe();
  }, [glowOpacity]);

  return (
    <div
      className="absolute inset-0"
      style={{
        opacity,
        background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 70%)"
      }}
    />
  );
};

const GlobalBackground = () => {
  const { scrollYProgress } = useScroll();

  // Keep architecture theme constant throughout (no fading)
  const architectureOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const backgroundGradient = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "radial-gradient(ellipse at center, rgba(0, 255, 255, 0.05) 0%, transparent 70%)",
      "radial-gradient(ellipse at center, rgba(0, 255, 255, 0.05) 0%, transparent 70%)"
    ]
  );
  const baseGradient = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)",
      "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)"
    ]
  );

  const [archOpacity, setArchOpacity] = useState(1);
  const [bgGradient, setBgGradient] = useState("radial-gradient(ellipse at center, rgba(0, 255, 255, 0.05) 0%, transparent 70%)");
  const [baseGrad, setBaseGrad] = useState("linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)");

  useEffect(() => {
    const unsubscribeArch = architectureOpacity.on("change", (latest) => {
      setArchOpacity(latest);
    });
    const unsubscribeBg = backgroundGradient.on("change", (latest) => {
      setBgGradient(latest);
    });
    const unsubscribeBase = baseGradient.on("change", (latest) => {
      setBaseGrad(latest);
    });

    return () => {
      unsubscribeArch();
      unsubscribeBg();
      unsubscribeBase();
    };
  }, [architectureOpacity, backgroundGradient, baseGradient]);

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
    >
      {/* Base gradient layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: baseGrad
        }}
      />

      {/* Architecture-themed radial gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: bgGradient
        }}
      />

      {/* Architecture grid */}
      <ArchitectureGrid opacity={archOpacity} />

      {/* Data bus lines */}
      <DataBusLines opacity={archOpacity * 0.5} />

      {/* Neural network grid */}
      <NeuralNetworkGrid opacity={archOpacity} />

      {/* GPU threads */}
      <GPUThreads opacity={archOpacity} />

      {/* Pipeline traces */}
      <PipelineTraces opacity={archOpacity} />

      {/* Subtle cyan glow */}
      <CyanGlow scrollYProgress={scrollYProgress} />
    </div>
  );
};

export default GlobalBackground;
