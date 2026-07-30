import { Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import logoIcon from "../../assets/logo_icon.png";

const links = [
  "Home",
  "About",
  "Services",
  "Doctors",
  "Gallery",
  "Testimonials",
  "FAQ",
  "Contact",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-slate-100 bg-white/88 py-2.5 shadow-[0_4px_24px_rgba(15,55,90,.05)] backdrop-blur-xl" : "py-3.5"}`}
    >
      <div className="container-site flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <img
            src={logoIcon}
            alt="City Dental Care Logo"
            className="h-9 w-9 object-contain"
          />

          <div className="leading-tight">
            <h1 className="text-[16px] font-bold tracking-[-0.04em] text-slate-800">
              CITY <span className="text-[#2F80ED]">DENTAL CARE</span>
            </h1>

            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-800">
              & Implant Centre
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 xl:flex">
          {links.map((link) => (
            <a
              className="text-sm font-semibold text-slate-500 transition hover:text-[#2F80ED]"
              href={`#${link.toLowerCase()}`}
              key={link}
            >
              {link}
            </a>
          ))}
        </nav>

        <a
          href="tel:+919876543210"
          className="hidden items-center gap-2 rounded-full bg-slate-800 px-5 py-3 text-sm font-bold text-white transition hover:scale-[1.03] sm:flex"
        >
          <Phone size={16} /> Call now
        </a>
        <button
          className="grid h-10 w-10 place-items-center rounded-full bg-white text-slate-700 shadow-sm xl:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={19} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-100 bg-white xl:hidden"
          >
            <nav className="container-site grid grid-cols-2 gap-1 py-5">
              {links.map((link) => (
                <a
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-blue-50"
                  href={`#${link.toLowerCase()}`}
                  key={link}
                >
                  {link}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
