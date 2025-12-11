import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import GPUCanvas from "./canvas/GPUModel";

const tabs = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "classes", label: "Classes" },
  { id: "positions", label: "Positions & Projects" }
];

const aboutContent = {
  about: {
    title: "About Me",
    content: (
      <div className="space-y-4">
        <p className="text-white/80 leading-relaxed">
          Hi, I'm Nathan! I'm an undergraduate student at the Massachusetts Institute of Technology (MIT) 
          studying Electrical Engineering w/ Computing and Mathematics. I'm passionate about computer systems, 
          GPU acceleration, and robotics. I build high-performance applications that bridge the gap between hardware 
          and software, focusing on optimization, real-time systems, and machine learning/ reinforcement learning and 
          deep learning infrastructure.
        </p>
        <p className="text-white/80 leading-relaxed">
          My work spans from reinforcement learning of electromagnetic swarm dynamics to GPU kernel optimization, compiler research, 
          and autonomous robotics systems. I'm driven by the challenge of making algorithms run faster 
          and more efficiently on modern hardware, and I'm always looking for new challenges and opportunities to learn.
        </p>
        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-cyan-400 font-semibold mb-3">Current Focus</h4>
          <ul className="space-y-2 text-white/70">
            <li>• Reinforcement learning of swarm dynamics</li>
            <li>• GPU kernel optimization with CUDA and Triton</li>
            <li>• Compiler infrastructure (MLIR/LLVM)</li>
            <li>• Backend webdevelopment with JS and Django</li>
            <li>• Autonomous robotics and sensor fusion</li>
          </ul>
        </div>
      </div>
    )
  },
  skills: {
    title: "Technical Skills",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="text-cyan-400 font-semibold mb-3">Languages</h4>
          <div className="flex flex-wrap gap-2">
            {["Python", "C/C++", "CUDA", "JavaScript", "TypeScript", "Verilog", "Assembly"].map((skill) => (
              <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-cyan-400/30 text-white/80 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-cyan-400 font-semibold mb-3">Frameworks & Tools</h4>
          <div className="flex flex-wrap gap-2">
            {["PyTorch", "TensorFlow", "ROS2", "React", "Docker", "Git", "MLIR", "LLVM", "Triton"].map((skill) => (
              <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-cyan-400/30 text-white/80 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-cyan-400 font-semibold mb-3">Hardware & Systems</h4>
          <div className="flex flex-wrap gap-2">
            {["FPGA", "RISC-V", "PCB Design", "Embedded Systems", "RTOS", "Control Systems"].map((skill) => (
              <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-cyan-400/30 text-white/80 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  },
  classes: {
    title: "Classes",
    content: null // Will be handled by ClassesContent component
  },
  positions: {
    title: "Positions & Projects",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <h4 className="text-cyan-400 font-semibold mb-2">Research Positions</h4>
          <p className="text-white/70 text-sm">Undergraduate Researcher - MIT AeroAstro, MIT Siegel Family Quest for Intelligence</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <h4 className="text-cyan-400 font-semibold mb-2">Teaching</h4>
          <p className="text-white/70 text-sm">Teaching Assistant - MIT Physics Department (Classical Mechanics)</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <h4 className="text-cyan-400 font-semibold mb-2">Projects</h4>
          <p className="text-white/70 text-sm">GPU Kernel Optimization, Autonomous Robotics Platform, Arbitra Backtesting Engine</p>
        </div>
      </div>
    )
  }
};

// Classes component with filters and pagination
const ClassesContent = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  const categories = ["All", "ML & Robotics", "Software", "Math", "Hardware"];

  // Courses from academic planner (excluding 18.01, Biology, and English classes)
  const allCourses = [
    // Prior Credit
    { code: "18.06", title: "Linear Algebra", category: "Math" },
    { code: "18.03", title: "Differential Equations", category: "Math" },
    
    
    { code: "18.02", title: "Multivariable Calculus", category: "Math" },
    { code: "6.1010", title: "Fundamentals of Programming", category: "Software" },
    { code: "6.1200", title: "Discrete Mathematics", category: "Math" },
    
    // Sophomore Fall '25
    { code: "6.1210", title: "Introduction to Algorithms", category: "Software" },
    { code: "6.2000", title: "Electrical Circuits: Modeling and Design of Physical Systems", category: "Hardware" },
    { code: "6.3900", title: "Introduction to Machine Learning", category: "ML & Robotics" },
    { code: "18.600", title: "Probability and Random Variables", category: "Math" },
    { code: "16.632A", title: "Introduction to Autonomous Machines I", category: "ML & Robotics" },
    
    // Sophomore Spring '26
    { code: "6.1910", title: "Computation Structures", category: "Hardware" },
    { code: "6.2080", title: "Semiconductor Electronic Circuits", category: "Hardware" },
    { code: "6.1903", title: "Introduction to Low-level Programming in C and Assembly", category: "Hardware" },
    { code: "16.632B", title: "Introduction to Autonomous Machines II", category: "ML & Robotics" },
    { code: "6.1020", title: "Software Construction", category: "Software" },
    { code: "18.650", title: "Fundamentals of Statistics", category: "Math" },
    
    // // Junior Fall '26 (commented - uncomment as completed)
    // { code: "18.615", title: "Introduction to Stochastic Processes (G)", category: "Math" },
    // { code: "6.2050", title: "Digital Systems Laboratory", category: "Hardware" },
    // { code: "6.5900", title: "Computer System Architecture (G)", category: "Hardware" },
    // { code: "18.100A", title: "Real Analysis", category: "Math" },
    
    // // Junior Spring '27 (commented - uncomment as completed)
    // { code: "6.3100", title: "Dynamical System Modeling and Control Design", category: "Hardware" },
    // { code: "6.1060", title: "Software Performance Engineering", category: "Software" },
    // { code: "6.1800", title: "Computer Systems Engineering", category: "Software" },
    // { code: "6.4200", title: "Robotics: Science and Systems", category: "ML & Robotics" },
    
    // // Senior Fall '27 (commented - uncomment as completed)
    // // { code: "16.634", title: "NEET Senior Seminar: Autonomous Machines", category: "ML & Robotics" },
    // { code: "6.S894", title: "Accelerated Computing (G)", category: "Software" },
    // { code: "6.S965", title: "Digital Systems Laboratory II (G)", category: "Hardware" },
    // { code: "18.701", title: "Algebra I", category: "Math" },
    // { code: "6.5810", title: "Operating System Engineering (G)", category: "Hardware" },
    
    // // Senior Spring '28 (commented - uncomment as completed)
    // { code: "16.84", title: "Advanced Autonomous Robotic Systems", category: "ML & Robotics" },
    // { code: "6.6220", title: "Power Electronics (G)", category: "Hardware" },
    // { code: "18.704", title: "Seminar in Algebra", category: "Math" },
    // { code: "18.784", title: "Seminar in Number Theory", category: "Math" },
  ];

  // Filter courses by category
  let filteredCourses = activeCategory === "All" 
    ? allCourses 
    : allCourses.filter(course => course.category === activeCategory);

  // Sort: graduate classes (with "(G)") first for all categories
  filteredCourses = [...filteredCourses].sort((a, b) => {
    const aIsGrad = a.title.includes("(G)");
    const bIsGrad = b.title.includes("(G)");
    if (aIsGrad && !bIsGrad) return -1;
    if (!aIsGrad && bIsGrad) return 1;
    return 0; // Keep original order for same type
  });

  // Paginate courses
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

  // Split into two columns
  const leftColumn = paginatedCourses.filter((_, index) => index % 2 === 0);
  const rightColumn = paginatedCourses.filter((_, index) => index % 2 === 1);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setCurrentPage(1); // Reset to first page when changing category
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? "bg-cyan-400 text-black"
                : "bg-white/5 text-white/80 hover:bg-white/10"
            }`}
          >
            {category}
          </button>
        ))}
        <span className="text-white/50 text-xs ml-auto">
          *G indicates graduate class
        </span>
      </div>

      {/* Course Grid */}
      {paginatedCourses.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {/* Left Column */}
          <div className="space-y-3">
            {leftColumn.map((course, index) => (
              <motion.div
                key={`left-${course.code}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <p className="text-white text-sm font-medium">
                  {course.code} {course.title}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            {rightColumn.map((course, index) => (
              <motion.div
                key={`right-${course.code}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <p className="text-white text-sm font-medium">
                  {course.code} {course.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-white/60">
          <p>No courses to display. Add courses to the allCourses array.</p>
        </div>
      )}

      {/* Pagination - Always show */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <span className="text-white/60 text-sm">
          {totalPages > 0 ? `${currentPage}/${totalPages}` : "0/0"}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || totalPages === 0}
            className={`p-2 rounded-lg transition-all ${
              currentPage === 1 || totalPages === 0
                ? "bg-white/5 text-white/30 cursor-not-allowed"
                : "bg-white/5 text-white/80 hover:bg-white/10"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`p-2 rounded-lg transition-all ${
              currentPage === totalPages || totalPages === 0
                ? "bg-white/5 text-white/30 cursor-not-allowed"
                : "bg-white/5 text-white/80 hover:bg-white/10"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const [activeTab, setActiveTab] = useState("about");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={containerRef} className="about-section py-12 lg:py-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 188, 212, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 188, 212, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-5 2xl:px-0 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-cyan-400 text-sm uppercase tracking-wider mb-4">
            Introduction
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            About Me.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                    activeTab === tab.id
                      ? "text-cyan-400 bg-cyan-400/10"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 min-h-[400px]"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  {aboutContent[activeTab].title}
                </h3>
                {activeTab === "classes" ? (
                  <ClassesContent />
                ) : (
                  aboutContent[activeTab].content
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Column - GPU Model */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-black/40 backdrop-blur-sm border border-white/10"
          >
            {/* GPU Platform/Vignette - neutral dark vignette */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.4) 100%)"
              }}
            />
            
            {/* GPU Canvas */}
            <div className="w-full h-full">
              <GPUCanvas />
            </div>

            {/* Label */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white/60 text-xs font-mono">
                NVIDIA GPU Architecture
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

