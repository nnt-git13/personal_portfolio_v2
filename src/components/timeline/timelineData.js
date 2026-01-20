// Timeline data - structured from resume information
export const timelineData = [
    {
        id: 1,
        date: 'June 2025 - Current',
        title: 'Software Engineering Undergraduate Researcher',
        role: 'MIT Siegel Family Quest for Intelligence',
        description: 'Redesigned the Brain-Score model leaderboard (Python, Django, AG Grid) to support timestamp-based filtering, multi-index score aggregation, and cross-model comparison, dramatically reducing load times and enhancing user experience. Developed dynamic Wayback Slider linking dual-date controls to Score metadata and backend APIs.',
        tech: ['Python', 'Django', 'JavaScript', 'AG Grid', 'Backend Development'],
        category: 'research',
        github: null // Internal project
    },
    {
        id: 2,
        date: 'June 2025 - August 2025',
        title: 'Electrical Engineering Intern',
        role: 'Abbvie',
        description: 'Engineered and programmed a linear-actuated lift system automating protein purification via magnetic bead separation, enhancing process efficiency and reducing manual labor by 40%. Integrated actuators, position sensors, and microcontroller logic to automate purification cycles.',
        tech: ['Embedded Systems', 'Microcontrollers', 'CAD'],
        category: 'hardware',
        github: null // Proprietary
    },
    {
        id: 3,
        date: 'November 2025 - Current',
        title: 'Robotics Undergraduate Researcher',
        role: 'MIT AeroAstro',
        description: 'Beginning work on reinforcement learning of electromagnetic swarm dynamics. Work involves parallelizing a GPU-based RL environment and training a policy for optimal dipole inversion of swarms.',
        tech: ['Python', 'Reinforcement Learning', 'Robotics', 'Control Systems', 'Simulation'],
        category: 'robotics',
        github: null // Research project
    },
    {
        id: 4,
        date: 'September 2025 - Current',
        title: 'XGenius: Machine Learning & Data Platform for Fantasy Premier League',
        role: 'Personal Project',
        description: 'Designed and deployed a production Python-based backend (FastAPI) for automated data ingestion, validation, and analysis, integrating multiple external APIs with asynchronous I/O and enforcing rate limits, retries, and schema checks. Developed and productionized machine learning models (Ridge Regression, Random Forest, Gradient Boosting, Neural Networks, Transformer architectures) for player performance prediction, implementing comprehensive feature engineering pipelines that extract 50+ features from season performance, form trends, fixture difficulty, and contextual factors. Implemented probabilistic prediction systems with uncertainty quantification, providing confidence intervals, risk scores, and percentile estimates. Optimized backend performance through connection pooling, query profiling, and caching strategies, reducing end-to-end latency and improving system stability under concurrent load.',
        tech: ['Python', 'FastAPI', 'Machine Learning', 'Neural Networks', 'Transformers', 'Data Engineering', 'Backend Development'],
        category: 'project',
        github: 'https://github.com/nnt-git13/XGenius'
    },
    {
        id: 5,
        date: 'January 2025',
        title: 'Autonomous Robotics Platform',
        role: 'Mechanical Engineer',
        description: 'Built real-time navigation and control systems for autonomous robots. Implemented sensor fusion pipelines, control loops, and embedded firmware for robotic applications.',
        tech: ['ROS2', 'C++', 'Python', 'Embedded Systems', 'Control Systems'],
        category: 'robotics',
        github: null // Placeholder - update with actual repo
    },
    {
        id: 6,
        date: 'October 2025 - Ongoing',
        title: '(Building) FPGA & RISC-V Hardware Project',
        role: 'Personal Project',
        description: 'Designed and implemented FPGA-based systems and RISC-V processor components. Worked on hardware-software co-design for embedded applications.',
        tech: ['FPGA', 'Verilog', 'RISC-V', 'Hardware Design', 'PCB Design'],
        category: 'project',
        github: 'https://github.com/nnt-git13/riscv_quant.accel' // Placeholder - update with actual repo
    },
    {
        id: 7,
        date: 'Fall 2025',
        title: 'Teaching Assistant - Classical Mechanics',
        role: 'MIT Physics Department',
        description: 'Taught classical mechanics courses. Helped students understand classical mechanics, physics, and performance optimization.',
        tech: ['Physics', 'Classical Mechanics', 'Teaching'],
        category: 'education',
        github: null
    }
];

