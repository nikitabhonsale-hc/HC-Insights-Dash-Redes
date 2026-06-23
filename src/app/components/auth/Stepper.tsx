import { Check } from "lucide-react";
import { cn } from "../ui/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("flex w-full items-center justify-center", className)}>
      <div className="flex items-center">
        <AnimatePresence>
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isActive = stepNumber === currentStep;

            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.8, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: "auto" }}
                exit={{ opacity: 0, scale: 0.8, width: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center"
              >
                {/* Connecting Line (before the step) */}
                {index > 0 && (
                  <div
                    className={cn(
                      "mx-4 h-[2px] w-12 shrink-0 transition-colors duration-200",
                      currentStep > index ? "bg-emerald-600" : "bg-slate-300"
                    )}
                  />
                )}
                {/* Step Item */}
                <div className="relative flex flex-col items-center shrink-0">
                  <div
                    style={{ borderRadius: 9999 }}
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center text-lg font-semibold transition-colors duration-200",
                      isActive && "bg-primary text-primary-foreground",
                      isCompleted && "bg-emerald-600 text-white",
                      !isActive && !isCompleted && "border-2 border-slate-300 bg-white text-slate-600"
                    )}
                  >
                    {isCompleted ? <Check className="size-6 stroke-[3]" /> : stepNumber}
                  </div>
                  <span
                    className={cn(
                      "absolute top-14 w-24 text-center text-xs font-semibold leading-tight",
                      isActive ? "text-primary" : "text-slate-500"
                    )}
                  >
                    {step}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
