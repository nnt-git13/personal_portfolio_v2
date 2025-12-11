import { useState } from "react";
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
    const [bootComplete, setBootComplete] = useState(false);

    return (
        <>
            {/* Boot Screen */}
            {!bootComplete && (
                <BootScreen onBootComplete={() => setBootComplete(true)} />
            )}

            {/* Main App - only show after boot */}
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
    )
}

export default App
