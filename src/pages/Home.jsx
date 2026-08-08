import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  Clock3,
  HeartPulse,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import SectionHeading from "../components/common/SectionHeading";
import { services, reasons } from "../data/services";
import { doctors } from "../data/doctors";
import { testimonials } from "../data/testimonials";
import { faqs } from "../data/faq";

const stats = [
  { n: 12, suffix: "+", label: "Years of experience" },
  { n: 12, suffix: "k+", label: "Happy patients" },
  { n: 98, suffix: "%", label: "Treatment success" },
  { n: 24, suffix: "/7", label: "Emergency support" },
];
const gallery = [
  "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1100&q=85",
  "https://images.unsplash.com/photo-1606265752439-1f18756aa2f5?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1581585097430-2e5f0e0d35c5?auto=format&fit=crop&w=900&q=85",
];
const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: (i || 0) * 0.07, duration: 0.55 },
  }),
};
function Counter({ n, suffix }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.65 });
  useEffect(() => {
    if (!visible) return;
    const started = performance.now();
    const duration = 1350;
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - started) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - progress, 3)) * n));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, n]);
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
function Reveal({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={rise}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#f9fcff] pb-16 pt-32 sm:pb-24 sm:pt-40"
    >
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute -right-28 top-20 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 12, 0] }}
        transition={{ duration: 11, repeat: Infinity }}
        className="absolute -left-36 bottom-0 h-72 w-72 rounded-full bg-cyan-100/60 blur-3xl"
      />
      <div className="container-site relative grid items-center gap-12 lg:grid-cols-[.96fr_1.04fr]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.12em] text-[#2F80ED]">
            <HeartPulse size={14} /> Gentle care. Brighter days.
          </div>
          <h1 className="max-w-2xl font-display text-5xl leading-[.98] tracking-[-.055em] text-slate-800 sm:text-6xl xl:text-7xl">
            A healthier smile,{" "}
            <i className="font-normal text-[#2F80ED]">beautifully</i> yours.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-slate-500 sm:text-lg">
            A calm, modern dental studio where exceptional care and everyday
            comfort come together.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="tel:+917481085256"
              className="group inline-flex items-center gap-2 rounded-full bg-[#2F80ED] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:scale-[1.03]"
            >
              Call now <Phone size={15} />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-[#2F80ED]"
            >
              Explore services <ArrowRight size={15} />
            </a>
          </div>
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[
                "https://i.pravatar.cc/80?img=47",
                "https://i.pravatar.cc/80?img=32",
                "https://i.pravatar.cc/80?img=49",
              ].map((x) => (
                <img
                  className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  src={x}
                  key={x}
                />
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 text-amber-400">
                {[1, 2, 3, 4, 5].map((x) => (
                  <Star size={13} fill="currentColor" key={x} />
                ))}
              </div>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Loved by 12,000+ patients
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="absolute inset-8 rotate-6 rounded-[3rem] bg-[#ddecff]" />
          <img
            className="relative h-110 w-full rounded-[2.5rem] object-cover shadow-soft sm:h-135"
            src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=90"
            alt="Dentist smiling in a modern clinic"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -left-3 bottom-10 rounded-2xl bg-white p-3.5 shadow-soft sm:-left-10 sm:p-4"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-[#2F80ED]">
                <ShieldCheck size={19} />
              </span>
              <p className="text-xs font-bold leading-5 text-slate-700">
                Care that feels
                <br />
                completely safe
              </p>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 4.5, repeat: Infinity }}
            className="absolute -right-2 top-10 rounded-2xl bg-slate-800 px-4 py-3 text-white shadow-xl sm:-right-7"
          >
            <p className="text-[10px] uppercase tracking-widest text-blue-200">
              Available today
            </p>
            <p className="mt-1 text-sm font-bold">
              Emergency care <span className="text-blue-300">•</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQ() {
  const [active, setActive] = useState(0);
  return (
    <section id="faq" className="bg-[#f8fbff] py-20 sm:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
        <SectionHeading
          eyebrow="Clarity, always"
          title={
            <>
              Questions, answered <i>simply.</i>
            </>
          }
          copy="Everything you may want to know before your first visit."
        />
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map(([q, a], i) => (
            <div key={q}>
              <button
                onClick={() => setActive(active === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-5 py-5 text-left text-base font-bold text-slate-700"
              >
                <span>{q}</span>
                <ChevronDown
                  className={`shrink-0 text-[#2F80ED] transition ${active === i ? "rotate-180" : ""}`}
                  size={19}
                />
              </button>
              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-5 text-sm leading-6 text-slate-500">
                      {a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <section className="border-y border-slate-100 bg-white py-8">
          <div className="container-site grid grid-cols-2 divide-x divide-slate-100 sm:grid-cols-4">
            {stats.map((s) => (
              <div className="px-3 py-3 text-center" key={s.label}>
                <p className="font-display text-3xl tracking-tight text-slate-800 sm:text-4xl">
                  <Counter n={s.n} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-[11px] font-medium text-slate-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>
        <About />
        <Services />
        <Why />
        <Doctors />
        <Gallery />
        <BeforeAfter />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <Floating />
    </>
  );
}
function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <img
            className="h-97.5 w-full rounded-4xl object-cover object-[center_10%]"
            src="src/assets/Amrita.png"
            alt="Dr. Amrita Sen, principal dentist at City Dental Care & Implant Centre"
          />
          <div className="absolute -bottom-5 right-5 max-w-52 rounded-2xl bg-white p-4 shadow-soft">
            <Award className="mb-2 text-[#2F80ED]" size={22} />
            <p className="text-sm font-bold text-slate-700">
              Principal Dentist at City Dental Care & Implant Centre
            </p>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="Meet your dentist"
            title={
              <>
                Dr. Amrita Sen,
                <br />
                <i>care you can trust.</i>
              </>
            }
            copy="Dr. Amrita Sen is the principal dentist at City Dental Care & Implant Centre. With a gentle, patient-first approach, she helps individuals and families feel informed, comfortable, and confident in every step of their dental care."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "BDS, MDS (Prosthodontist)",
              "12+ years of clinical experience",
              "Clear, personalised treatment plans",
              "Gentle care for every age",
            ].map((x) => (
              <p
                className="flex items-center gap-2 text-sm font-semibold text-slate-600"
                key={x}
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-blue-50 text-[#2F80ED]">
                  <Check size={12} />
                </span>
                {x}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function Services() {
  return (
    <section id="services" className="bg-[#f8fbff] py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Our care"
          title={
            <>
              Everything your smile needs, <i>under one roof.</i>
            </>
          }
          copy="Modern treatment, delivered with warmth and a reassuring attention to detail."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s, i) => {
            const { image } = s;
            return (
              <motion.article
                custom={i}
                variants={rise}
                whileHover={{ y: -7 }}
                className="group rounded-3xl border border-white bg-white p-7 shadow-[0_10px_30px_rgba(44,101,150,.06)] transition"
                key={s.title}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EFF6FF] transition-all duration-300 group-hover:bg-[#2F80ED] group-hover:shadow-lg">
                  <img
                    src={image}
                    alt={s.title}
                    className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </span>
                <h3 className="mt-6 text-lg font-bold tracking-tight text-slate-700">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {s.text}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#2F80ED] opacity-0 transition group-hover:opacity-100">
                  Learn more <ArrowRight size={14} />
                </span>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
function Why() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          centered
          eyebrow="Why City Dental Care & Implant Centre"
          title={
            <>
              Care shaped around <i>you.</i>
            </>
          }
          copy="Our practice is designed to make every step of your dental care feel clear, calm, and personal."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-4xl border border-slate-100 bg-slate-100 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(([t, d], i) => (
            <Reveal className="bg-white p-7 sm:p-8" key={t}>
              <span className="text-xs font-bold text-blue-300">0{i + 1}</span>
              <h3 className="mt-5 text-base font-bold text-slate-700">{t}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
function Doctors() {
  return (
    <section id="doctors" className="bg-slate-800 py-20 sm:py-28">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-blue-300">
              <span className="h-px w-6 bg-blue-300" />
              Other departments
            </p>
            <h2 className="section-title text-white">
              Care that supports
              <br />
              <i className="text-blue-300">the whole family.</i>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-300">
            Alongside dental care, City Dental Care & Implant Centre hosts
            trusted visiting consultants in orthopaedics and paediatrics.
          </p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {doctors.map((d) => {
            const overview = d.specialty.includes("Orthopaedic")
              ? "Known for calm guidance and practical treatment plans for joint, bone, and movement-related concerns."
              : "Known for gentle, reassuring care that helps children feel comfortable and supported.";

            return (
              <Reveal key={d.name}>
                <motion.article
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.24 }}
                  className="group overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
                >
                  <div className="grid overflow-hidden md:grid-cols-[0.95fr_1.05fr]">
                    <div className="relative overflow-hidden bg-slate-100">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.28 }}
                        className="h-full min-h-72 w-full object-cover"
                        src={d.image}
                        alt={d.name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
                      <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-700 backdrop-blur">
                        Specialist
                      </div>
                    </div>
                    <div className="flex flex-col justify-between p-6 sm:p-7">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2F80ED]">
                          {d.qualification}
                        </p>
                        <h3 className="mt-3 text-xl font-bold text-slate-800">
                          {d.name}
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-slate-500">
                          {d.specialty}
                        </p>
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                          {overview}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-sm font-semibold text-slate-600">
                          {d.experience}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2F80ED]">
                          Meet doctor <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function Gallery() {
  return (
    <section id="gallery" className="py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Our space"
          title={
            <>
              A clinic designed for <i>calm.</i>
            </>
          }
          copy="Light-filled, quietly modern, and made to put you at ease from the moment you walk in."
        />
        <div className="mt-12 grid h-155 grid-cols-2 grid-rows-2 gap-4 sm:h-130 sm:grid-cols-4">
          {gallery.map((g, i) => (
            <div
              className={`${i === 0 ? "col-span-2 row-span-2" : ""} group relative overflow-hidden rounded-3xl`}
              key={g}
            >
              <img
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                src={g}
                alt="City Dental Care clinic"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function BeforeAfter() {
  return (
    <section className="bg-[#eaf4ff] py-20 sm:py-28">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Real transformations"
            title={
              <>
                A subtle change.
                <br />
                <i>A renewed confidence.</i>
              </>
            }
            copy="See what considered, restorative dentistry can do. Every plan is unique; every smile stays yours."
          />
          <a
            href="#contact"
            className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#2F80ED]"
          >
            Explore treatment stories <ArrowRight size={16} />
          </a>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              className="h-64 w-full object-cover grayscale"
              src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=600&q=85"
              alt="Before treatment"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              Before
            </span>
          </div>
          <ArrowRight className="text-[#2F80ED]" />
          <div className="relative overflow-hidden rounded-3xl">
            <img
              className="h-64 w-full object-cover"
              src="https://images.unsplash.com/photo-1606265752439-1f18756aa2f5?auto=format&fit=crop&w=600&q=85"
              alt="After treatment"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              After
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          centered
          eyebrow="Patient stories"
          title={
            <>
              Kind words from our <i>community.</i>
            </>
          }
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Reveal key={t.name}>
              <article className="h-full rounded-3xl border border-slate-100 p-7 shadow-[0_10px_35px_rgba(44,101,150,.06)]">
                <div className="flex gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((x) => (
                    <Star key={x} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-5 font-display text-xl leading-7 text-slate-700">
                  “{t.quote}”
                </p>
                <div className="mt-7">
                  <p className="text-sm font-bold text-slate-700">{t.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{t.treatment}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="container-site grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Visit City Dental Care & Implant Centre"
            title={
              <>
                Come in. Exhale.
                <br />
                <i>We’ll take it from here.</i>
              </>
            }
            copy="Find us in the heart of the city, with a little more time built into every visit."
          />
          <div className="mt-8 space-y-4">
            {[
              [
                MapPin,
                "Saxena More, Above Canara Bank, Bodh Gaya, Bihar 824231",
              ],
              [Clock3, "Mon–Sat · 9:00 AM to 8:00 PM"],
              [Phone, "+91 7481085256"],
              [Mail, "hello@lumadental.in"],
            ].map(([I, t]) => {
              let Icon = I;
              return (
                <p
                  className="flex items-center gap-3 text-sm font-medium text-slate-600"
                  key={t}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-[#2F80ED]">
                    <Icon size={17} />
                  </span>
                  {t}
                </p>
              );
            })}
          </div>
        </div>
        <div className="relative min-h-80 overflow-hidden rounded-4xl bg-slate-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.9155330727203!2d84.9783957!3d24.6954302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f32d1b4fd23641%3A0x5e6abedf95416c27!2sCity%20Dental%20Care%20%26%20Implant%20Centre!5e0!3m2!1sen!2sin!4v1786085025147!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="City Dental Care & Implant Centre Location"
          />
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="bg-slate-800 py-12 text-slate-300">
      <div className="container-site">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-white leading-tight">
              City<span className="text-blue-300"> Dental Care</span>
              <span className="block text-sm font-normal text-white mt-1">
                & Implant Centre
              </span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
              Modern dentistry, made more human.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
              Quick links
            </p>
            <div className="mt-4 grid gap-2 text-sm">
              {["About", "Services", "Doctors", "Contact"].map((x) => (
                <a
                  href={`#${x.toLowerCase()}`}
                  className="hover:text-white"
                  key={x}
                >
                  {x}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
              Our care
            </p>
            <div className="mt-4 grid gap-2 text-sm">
              {["Implants", "Whitening", "Aligners", "Kids dentistry"].map(
                (x) => (
                  <a href="#services" className="hover:text-white" key={x}>
                    {x}
                  </a>
                ),
              )}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
              Stay connected
            </p>
            <div className="mt-4 flex gap-2">
              {[HeartPulse, Award, MessageCircle].map((I, i) => (
                <a
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-[#2F80ED]"
                  key={i}
                >
                  <I size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
          © 2026 City Dental Care & Implant Centre. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
function Floating() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2">
      <a
        href="https://wa.me/917481085256"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
        aria-label="WhatsApp"
      >
        <MessageCircle size={21} />
      </a>
      <a
        href="tel:+917481085256"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#2F80ED] text-white shadow-lg transition hover:scale-105"
        aria-label="Call now"
      >
        <Phone size={20} />
      </a>
    </div>
  );
}
