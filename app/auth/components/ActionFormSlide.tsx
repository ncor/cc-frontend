import { ContainerProps } from "@/lib/client/types";
import { motion } from "framer-motion";


export default function ActionFormSlide({ children }: ContainerProps) {
    return <motion.div animate={{
        opacity: [0, 1]
    }} transition={{
        duration: 0.4
    }} className="grid gap-6">
        { children }
    </motion.div>
}
