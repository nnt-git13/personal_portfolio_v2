import { useEffect, useState } from "react";
import { navLinks } from "../constants";

const NavBar = () => {
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 ${
                scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
            }`}
        >
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-5 2xl:px-0">
                <a
                    href="#"
                    className="flex items-center gap-2"
                    onClick={(e) => {
                        e.preventDefault();
                        setActive("");
                        window.scrollTo(0, 0);
                    }}
                >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">N</span>
                    </div>
                    <p className="text-white text-[18px] font-bold cursor-pointer flex">
                        Nathan &nbsp;
                        <span className="sm:block hidden text-cyan-400">| Computer Architect</span>
                    </p>
                </a>

                <ul className="list-none hidden sm:flex flex-row gap-10">
                    {navLinks.map((link) => (
                        <li
                            key={link.id}
                            className={`${
                                active === link.title ? "text-white" : "text-gray-400"
                            } hover:text-cyan-400 text-[18px] font-medium cursor-pointer transition-colors duration-200`}
                            onClick={(e) => {
                                e.preventDefault();
                                setActive(link.title);
                                setTimeout(() => {
                                    const element = document.getElementById(link.id);
                                    if (element) {
                                        const navHeight = 80;
                                        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
                                        const offsetPosition = elementTop - navHeight;
                                        window.scrollTo({
                                            top: Math.max(0, offsetPosition),
                                            behavior: 'smooth'
                                        });
                                    }
                                }, 10);
                            }}
                        >
                            <a href={`#${link.id}`} onClick={(e) => e.preventDefault()}>{link.title}</a>
                        </li>
                    ))}
                </ul>

                <div className="sm:hidden flex flex-1 justify-end items-center">
                    <button
                        className="w-[28px] h-[28px] flex flex-col justify-center gap-1.5"
                        onClick={() => setToggle(!toggle)}
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                                toggle ? "rotate-45 translate-y-2" : ""
                            }`}
                        />
                        <span
                            className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                                toggle ? "opacity-0" : ""
                            }`}
                        />
                        <span
                            className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                                toggle ? "-rotate-45 -translate-y-2" : ""
                            }`}
                        />
                    </button>

                    <div
                        className={`${
                            !toggle ? "hidden" : "flex"
                        } p-6 bg-black/95 backdrop-blur-md absolute top-20 right-5 mx-4 my-2 min-w-[140px] z-10 rounded-xl border border-cyan-500/20`}
                    >
                        <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
                            {navLinks.map((nav) => (
                                <li
                                    key={nav.id}
                                    className={`font-medium cursor-pointer text-[16px] ${
                                        active === nav.title ? "text-cyan-400" : "text-gray-400"
                                    } hover:text-cyan-400 transition-colors`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setToggle(!toggle);
                                        setActive(nav.title);
                                        setTimeout(() => {
                                            const element = document.getElementById(nav.id);
                                            if (element) {
                                                const navHeight = 80;
                                                const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
                                                const offsetPosition = elementTop - navHeight;
                                                window.scrollTo({
                                                    top: Math.max(0, offsetPosition),
                                                    behavior: 'smooth'
                                                });
                                            }
                                        }, 10);
                                    }}
                                >
                                    <a href={`#${nav.id}`} onClick={(e) => e.preventDefault()}>{nav.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
