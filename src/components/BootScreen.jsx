import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BootScreen = ({ onBootComplete }) => {
    const [logs, setLogs] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const [showLoadBar, setShowLoadBar] = useState(false);
    const [showEllipsis, setShowEllipsis] = useState(false);

    // First batch: 15 lines
    const bootLogsBatch1 = [
        '[  0.000000] Initializing system...',
        '[  0.012341] Loading kernel modules...',
        '[  0.045231] ACPI: EC: GPE storm detected, transactions will be delayed.',
        '[  0.078923] USB 1-3: new high-speed USB device number 4 using xhci_hcd',
        '[  0.112341] systemd[1]: Started Session c1 of user root.',
        '[  0.145892] GPU0: Initializing CUDA driver...',
        '[  0.178234] MLIR: Registering JIT backend...',
        '[  0.212456] Triton: Kernel optimizer loaded.',
        '[  0.245678] systemd[1]: Mounting /sys/kernel/debug...',
        '[  0.278901] ACPI: PCI Interrupt Link [LNKA] (IRQs 3 4 5 6 7 10 11 12 14 15) *0',
        '[  0.312123] pci 0000:00:1f.3: [8086:02c8] type 00 class 0x040380',
        '[  0.345456] systemd[1]: Started Load Kernel Modules.',
        '[  0.378789] systemd[1]: Started Remount Root and Kernel File Systems.',
        '[  0.412012] systemd[1]: Mounted Kernel Debug File System.',
        '[  0.445345] systemd[1]: Started Create System Users.'
    ];

    // Second batch: 10 lines
    const bootLogsBatch2 = [
        '[  0.645333] systemd[1]: Started Coldplug All udev Devices.',
        '[  0.678666] systemd[1]: Started Load/Save Random Seed.',
        '[  0.712000] systemd[1]: Started Network Time Synchronization.',
        '[  0.745333] systemd[1]: Started Network Manager.',
        '[  0.778666] systemd[1]: Started Display Manager.',
        '[  0.812000] GPU0: CUDA driver initialized successfully.',
        '[  0.845333] MLIR: JIT backend ready for compilation.',
        '[  0.878666] Triton: Kernel fusion optimizer active.',
        '[  0.912000] [  OK  ] System boot complete.',
        '[  0.945333] Starting UI renderer...'
    ];

    useEffect(() => {
        if (currentStep === 0) {
            // Initial message
            setLogs(['[  0.000000] Initializing system...']);
            setTimeout(() => setCurrentStep(1), 300);
        } else if (currentStep === 1) {
            // First batch: 20 lines
            let index = 0;
            const interval = setInterval(() => {
                if (index < bootLogsBatch1.length) {
                    setLogs((prev) => [...prev, bootLogsBatch1[index]]);
                    index++;
                } else {
                    clearInterval(interval);
                    // Show ellipsis
                    setShowEllipsis(true);
                    setTimeout(() => {
                        setShowEllipsis(false);
                        setCurrentStep(2);
                    }, 500);
                }
            }, 80);

            return () => clearInterval(interval);
        } else if (currentStep === 2) {
            // Second batch: 10 lines
            let index = 0;
            const interval = setInterval(() => {
                if (index < bootLogsBatch2.length) {
                    setLogs((prev) => [...prev, bootLogsBatch2[index]]);
                    index++;
                } else {
                    clearInterval(interval);
                    // Delay 5 seconds after ellipsis, then show loading bar
                    setTimeout(() => {
                        setShowCursor(false);
                        setShowLoadBar(true);
                        setCurrentStep(3);
                    }, 5000);
                }
            }, 80);

            return () => clearInterval(interval);
        } else if (currentStep === 3) {
            // Realistic loading bar animation - 15 seconds total
            setLoadProgress(0);
            let progress = 0;
            const startTime = Date.now();
            const totalDuration = 15000; // 15 seconds
            
            const interval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const progressRatio = elapsed / totalDuration;
                
                // Realistic progress curve:
                // Fast start (0-40% in first 4 seconds)
                // Slow middle (40-70% in next 8 seconds)
                // Medium speed (70-97% in next 6 seconds)
                // Pause at 97% (1 second)
                // Finish to 100%
                
                let targetProgress = 0;
                if (progressRatio < 0.2) {
                    // Fast start: 0-40% in first 4 seconds
                    targetProgress = (progressRatio / 0.2) * 40;
                } else if (progressRatio < 0.6) {
                    // Slow middle: 40-70% in next 8 seconds
                    const subRatio = (progressRatio - 0.2) / 0.4;
                    targetProgress = 40 + (subRatio * 30);
                } else if (progressRatio < 0.9) {
                    // Medium speed: 70-97% in next 6 seconds
                    const subRatio = (progressRatio - 0.6) / 0.3;
                    targetProgress = 70 + (subRatio * 27);
                } else if (progressRatio < 0.95) {
                    // Pause at 97% for 1 second
                    targetProgress = 97;
                } else {
                    // Finish to 100% in last 1 second
                    const subRatio = (progressRatio - 0.95) / 0.05;
                    targetProgress = 97 + (subRatio * 3);
                }
                
                // Smooth the progress updates
                if (targetProgress > progress) {
                    progress = Math.min(targetProgress, 100);
                    setLoadProgress(Math.floor(progress));
                }
                
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setCurrentStep(4);
                    }, 300);
                }
            }, 50); // Update every 50ms for smooth animation

            return () => clearInterval(interval);
        } else if (currentStep === 4) {
            // Fade out and call onBootComplete
            setTimeout(() => {
                if (onBootComplete) onBootComplete();
            }, 300);
        }
    }, [currentStep, onBootComplete]);

    // Cursor blink
    useEffect(() => {
        if (!showCursor || currentStep >= 3) return;
        const interval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 530);
        return () => clearInterval(interval);
    }, [showCursor, currentStep]);

    return (
        <AnimatePresence>
            {currentStep < 4 && (
                <motion.div
                    className="boot-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* CRT scanline effect */}
                    <div className="scanlines" />
                    
                    {/* Boot logs */}
                    <div className="boot-logs">
                        {logs.map((log, index) => {
                            if (!log) return null; // Safety check
                            const isOk = log.includes('[  OK  ]');
                            const isError = log.includes('ERROR') || log.includes('FAILED');
                            
                            return (
                                <motion.div
                                    key={index}
                                    className={`boot-log ${isOk ? 'ok' : ''} ${isError ? 'error' : ''}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.05 }}
                                >
                                    {log}
                                </motion.div>
                            );
                        })}
                        {showEllipsis && (
                            <motion.div
                                className="boot-log ellipsis"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                ...
                            </motion.div>
                        )}
                        {showCursor && currentStep < 3 && (
                            <span className="boot-cursor">_</span>
                        )}
                    </div>

                    {/* Architecture-themed loading bar */}
                    {showLoadBar && (
                        <motion.div
                            className="architecture-loadbar"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="loadbar-label">Loading system modules...</div>
                            <div className="loadbar-container">
                                <div className="loadbar-track">
                                    <motion.div
                                        className="loadbar-fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${loadProgress}%` }}
                                        transition={{ duration: 0.2, ease: "linear" }}
                                    >
                                        <div className="loadbar-pattern" />
                                    </motion.div>
                                </div>
                                <div className="loadbar-stages">
                                    {['Fetch', 'Decode', 'Execute', 'Memory', 'Writeback'].map((stage, i) => (
                                        <div
                                            key={stage}
                                            className={`loadbar-stage ${loadProgress > (i + 1) * 20 ? 'active' : ''}`}
                                        >
                                            {stage}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="loadbar-percentage">{loadProgress}%</div>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BootScreen;
