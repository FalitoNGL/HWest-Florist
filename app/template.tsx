"use client";

import { motion } from "framer-motion";

const variants = {
    hidden: { opacity: 0, y: 10 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{
                ease: [0.22, 1, 0.36, 1],
                duration: 0.3
            }}
        >
            {children}
        </motion.div>
    );
}


