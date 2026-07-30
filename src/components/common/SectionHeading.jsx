import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  copy,
  centered = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6 }}
      className={centered ? "mx-auto text-center" : ""}
    >
      <p className={centered ? "eyebrow justify-center" : "eyebrow"}>
        <span className="h-px w-6 bg-[#2F80ED]" />
        {eyebrow}
      </p>
      <h2 className="section-title">{title}</h2>
      {copy && (
        <p className={centered ? "section-copy mx-auto" : "section-copy"}>
          {copy}
        </p>
      )}
    </motion.div>
  );
}
