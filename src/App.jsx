import { useState, useEffect } from "react";
import NavBar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";
import KernelVisualization from "./components/KernelVisualization.jsx";
import FeatureCards from "./components/FeatureCards.jsx";
import Timeline from "./components/Timeline.jsx";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/all";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import GlobalBackground from "./components/GlobalBackground.jsx";
import BootScreen from "./components/BootScreen.jsx";

gsap.registerPlugin(ScrollTrigger)

const App = () => {
    // Browser compatibility checks
    useEffect(() => {
        // Check WebGL support (needed for Three.js)
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            console.warn('WebGL is not supported in this browser. 3D features may not work.');
        }
        
        // Log browser info for debugging
        console.log('Browser:', navigator.userAgent);
        console.log('WebGL supported:', !!gl);
    }, []);
    
    // Check localStorage synchronously to avoid flash of black screen
    // Use try-catch to handle any localStorage errors (e.g., in private browsing)
    let hasVisitedBefore = false;
    try {
        hasVisitedBefore = typeof window !== 'undefined' && 
                          window.localStorage && 
                          localStorage.getItem('portfolioHasVisited') === 'true';
    } catch (e) {
        console.warn('localStorage not available:', e);
        hasVisitedBefore = false;
    }
    
    const [bootComplete, setBootComplete] = useState(hasVisitedBefore);
    const [hasVisited, setHasVisited] = useState(hasVisitedBefore);

    const handleBootComplete = () => {
        // Mark as visited in localStorage
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem('portfolioHasVisited', 'true');
            }
        } catch (e) {
            console.warn('Could not save to localStorage:', e);
        }
        setBootComplete(true);
    };

    return (
        <>
            {/* Boot Screen - only show on first visit */}
            {!bootComplete && !hasVisited && (
                <BootScreen onBootComplete={handleBootComplete} />
            )}

            {/* Main App - show immediately if visited before, or after boot completes */}
            {bootComplete && (
                <>
                    {/* Global progressive background - tracks scroll from main */}
                    <GlobalBackground />
                    
                    <main className="relative">
                        <NavBar />
                        <Hero />
                        <KernelVisualization />
                        <About />
                        <FeatureCards />
                        <Timeline />
                        <Contact />
                        <Footer />
                    </main>
                </>
            )}
        </>
    );
}

export default App
