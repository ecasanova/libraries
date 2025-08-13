import { motion } from "framer-motion";

export default function FadeIn() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      Hola mundo
    </motion.div>
  );
}
