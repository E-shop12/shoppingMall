import { motion } from "framer-motion";

const SpinnerWithProgress = ({ message = "Loading, please wait..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 w-full bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Spinner */}
      <motion.div
        className="relative mb-6"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      >
        <div className="h-14 w-14 border-[6px] border-[#67216D] border-t-transparent rounded-full shadow-lg"></div>
        <div className="absolute top-1 left-1 h-12 w-12 rounded-full bg-[#67216D33] blur-md animate-ping" />
      </motion.div>

      {/* Loading Message */}
      <motion.p
        className="text-[#67216D] text-lg font-semibold tracking-wide mb-4"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {message}
      </motion.p>

      {/* Progress Bar */}
      <div className="relative w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#67216D]"
          initial={{ width: "0%" }}
          animate={{ width: ["0%", "100%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default SpinnerWithProgress;
