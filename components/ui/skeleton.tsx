import { cn } from "@/lib/client/utils"
import { AnimatePresence, motion } from "framer-motion"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div
                className={cn("animate-pulse rounded-md bg-secondary", className)}
                {...props}
            />
        </motion.div>
    </AnimatePresence>
  )
}

export { Skeleton }
