import { motion } from "motion/react";

export default function LoadingLPModal() {
  return (
    <motion.dialog
      className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      open={true}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p>Loading...</p>
      </div>
    </motion.dialog>
  );
}
