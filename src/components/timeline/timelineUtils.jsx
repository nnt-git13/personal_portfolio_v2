// Skill to opcode mapping
export const skillToOpcode = {
    'CUDA': 'LDG.ST',
    'Triton': 'TRITON_JIT',
    'Python': 'PY_EXEC',
    'MLIR': 'DYN_DIALECT',
    'LLVM': 'LLVM_IR',
    'ROS2': 'MOTION_CTRL',
    'C++': 'CPP_COMPILE',
    'Embedded Systems': 'EMBED_RT',
    'Control Systems': 'CTRL_LOOP',
    'Quantitative Finance': 'QUANT_SIG',
    'Data Analysis': 'DATA_PROC',
    'Backtesting': 'BACKTEST',
    'Compiler Design': 'COMPILER',
    'JIT': 'JIT_EXEC',
    'FPGA': 'RTL_SYNTH',
    'Verilog': 'HDL_VER',
    'RISC-V': 'RV32I',
    'Hardware Design': 'HW_DESIGN',
    'PCB Design': 'PCB_LAYOUT',
    'KiCad': 'KICAD_PCB',
    'Electronics': 'ELEC_CIRC',
    'CAD': 'CAD_MODEL',
    'Computer Architecture': 'ARCH_ISA',
    'Systems Programming': 'SYS_PROG',
    'Teaching': 'EDU_INST',
    'Embedded C': 'C_EMBED',
    'Microcontrollers': 'MCU_CTRL',
    'Firmware': 'FW_BOOT',
    'Real-time Systems': 'RT_SCHED',
    'C/C++': 'CPP_COMPILE',
    'Soldering': 'HW_ASSEMBLE',
    'Django': 'DJANGO_WEB',
    'JavaScript': 'JS_EXEC',
    'AG Grid': 'GRID_UI',
    'Backend Development': 'BACKEND_API'
};

// Category configuration
export const categoryConfig = {
    research: {
        color: '#00bcd4',
        icon: 'Oscilloscope',
        label: 'RESEARCH'
    },
    robotics: {
        color: '#00ff88',
        icon: 'Manipulator',
        label: 'ROBOTICS'
    },
    hardware: {
        color: '#ffa500',
        icon: 'FPGA',
        label: 'HARDWARE'
    },
    finance: {
        color: '#ff6b6b',
        icon: 'Candlestick',
        label: 'FINANCE'
    },
    systems: {
        color: '#9d4edd',
        icon: 'CPU',
        label: 'SYSTEMS'
    },
    education: {
        color: '#4dabf7',
        icon: 'CPU',
        label: 'EDUCATION'
    },
    embedded: {
        color: '#4dabf7',
        icon: 'MCU',
        label: 'EMBEDDED'
    }
};

// Circuit icon components (lightweight SVGs)
const OscilloscopeIcon = ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 10L4 8L6 10L8 6L10 10L12 8L14 10L16 4L18 10" stroke={color} strokeWidth="1.5" fill="none"/>
        <rect x="1" y="15" width="18" height="2" fill={color} opacity="0.3"/>
    </svg>
);

const ManipulatorIcon = ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="5" r="2" fill={color}/>
        <line x1="10" y1="7" x2="10" y2="10" stroke={color} strokeWidth="1.5"/>
        <line x1="10" y1="10" x2="6" y2="14" stroke={color} strokeWidth="1.5"/>
        <line x1="10" y1="10" x2="14" y2="14" stroke={color} strokeWidth="1.5"/>
        <circle cx="6" cy="14" r="1.5" fill={color}/>
        <circle cx="14" cy="14" r="1.5" fill={color}/>
    </svg>
);

const FPGAIcon = ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="14" height="14" stroke={color} strokeWidth="1.5" fill="none"/>
        <circle cx="7" cy="7" r="1" fill={color}/>
        <circle cx="13" cy="7" r="1" fill={color}/>
        <circle cx="7" cy="13" r="1" fill={color}/>
        <circle cx="13" cy="13" r="1" fill={color}/>
        <line x1="7" y1="7" x2="13" y2="13" stroke={color} strokeWidth="0.5" opacity="0.5"/>
        <line x1="13" y1="7" x2="7" y2="13" stroke={color} strokeWidth="0.5" opacity="0.5"/>
    </svg>
);

const CandlestickIcon = ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="5" y1="3" x2="5" y2="17" stroke={color} strokeWidth="1"/>
        <rect x="3" y="8" width="4" height="4" fill={color}/>
        <line x1="10" y1="5" x2="10" y2="17" stroke={color} strokeWidth="1"/>
        <rect x="8" y="5" width="4" height="6" fill={color}/>
        <line x1="15" y1="7" x2="15" y2="17" stroke={color} strokeWidth="1"/>
        <rect x="13" y="7" width="4" height="5" fill={color}/>
    </svg>
);

const CPUIcon = ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="12" height="12" stroke={color} strokeWidth="1.5" fill="none"/>
        <rect x="6" y="6" width="8" height="8" fill={color} opacity="0.2"/>
        <circle cx="8" cy="8" r="0.5" fill={color}/>
        <circle cx="12" cy="8" r="0.5" fill={color}/>
        <circle cx="8" cy="12" r="0.5" fill={color}/>
        <circle cx="12" cy="12" r="0.5" fill={color}/>
    </svg>
);

const MCUIcon = ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="14" height="10" stroke={color} strokeWidth="1.5" fill="none" rx="1"/>
        <circle cx="7" cy="10" r="1" fill={color}/>
        <circle cx="13" cy="10" r="1" fill={color}/>
        <line x1="3" y1="8" x2="1" y2="8" stroke={color} strokeWidth="1"/>
        <line x1="3" y1="12" x2="1" y2="12" stroke={color} strokeWidth="1"/>
        <line x1="17" y1="8" x2="19" y2="8" stroke={color} strokeWidth="1"/>
        <line x1="17" y1="12" x2="19" y2="12" stroke={color} strokeWidth="1"/>
    </svg>
);

export const getCategoryIcon = (category) => {
    const config = categoryConfig[category] || categoryConfig.research;
    const color = config.color;
    
    switch (config.icon) {
        case 'Oscilloscope':
            return <OscilloscopeIcon color={color} />;
        case 'Manipulator':
            return <ManipulatorIcon color={color} />;
        case 'FPGA':
            return <FPGAIcon color={color} />;
        case 'Candlestick':
            return <CandlestickIcon color={color} />;
        case 'MCU':
            return <MCUIcon color={color} />;
        default:
            return <CPUIcon color={color} />;
    }
};

