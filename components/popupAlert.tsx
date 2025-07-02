"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";

type NotificationContextType = {
  //   title?: string;
  //   message: string;
  //   show: boolean;
  showNotification: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationPopUp");
  }
  return context;
};

export default function NotificationPopup({
  children,
}: {
  children: ReactNode;
}) {
  const [message, setMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000); // Auto-close after 3 seconds
  };

  return (
    <NotificationContext value={{ showNotification }}>
      {children}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-5 right-5 bg-white shadow-lg rounded-xl p-4 flex items-center gap-3 border border-gray-200 flex-col"
          >
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 3, ease: "linear" }}
              className="h-1 w-full bg-emerald-800 mt-2 origin-left"
            />
            <span className="text-gray-700">{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </NotificationContext>
  );
}

{
  /* <div className="relative flex flex-col items-center justify-center min-h-screen p-4">*/
}
{
  /* <Button
        onClick={() => setShow(true)}
        className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
      >
        {notify.title && "Notification!"}
      </Button> */
}

{
  /* </div> */
}
