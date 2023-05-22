import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
interface iNotification  {
  type: string,
  description: string,
  duration: number
}
export default function Notification({ type, description, duration }: iNotification) {
  const containerClassNames =
    type === "default"
      ? "bg-slate-100 opacity-100 border-gray-800"
      : type === "Success"
      ? "bg-green-100 border-green-600"
      : type === "Error"
      ? "bg-red-100 border-red-600"
      : "";

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  useEffect(() => {
    if (description) setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [description, duration]);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={"notification"}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className={`flex z-10 fixed right-4 bottom-4 mb-4 p-2 w-3/4 md:w-1/3 border rounded justify-between text-xs align-center ${containerClassNames}
            `}
        >
          <p className="text-gray-900 font-thin tracking-wide">{description}</p>

          <button className="" onClick={toggleVisibility}>
            <RxCross1 className="text-black hover:text-amber-600" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
