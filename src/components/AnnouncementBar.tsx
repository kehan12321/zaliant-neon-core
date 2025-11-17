import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Megaphone } from "lucide-react";
import { Button } from "./ui/button";

const AnnouncementBar = () => {
  const [announcement, setAnnouncement] = useState<string>("");
  const [isActive, setIsActive] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const storedAnnouncement = localStorage.getItem("zaliant_announcement");
    const storedActive = localStorage.getItem("zaliant_announcement_active") === "true";
    
    if (storedAnnouncement && storedActive) {
      setAnnouncement(storedAnnouncement);
      setIsActive(true);
    }
  }, []);

  if (!isActive || !announcement || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/30"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Megaphone className="h-5 w-5 text-primary shrink-0" />
              <p className="text-sm text-foreground">{announcement}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => setIsDismissed(true)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementBar;
