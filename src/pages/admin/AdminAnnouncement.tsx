import { useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AdminAnnouncement = () => {
  const [announcement, setAnnouncement] = useState(
    localStorage.getItem("zaliant_announcement") || ""
  );
  const [isActive, setIsActive] = useState(
    localStorage.getItem("zaliant_announcement_active") === "true"
  );

  const handleSave = () => {
    localStorage.setItem("zaliant_announcement", announcement);
    localStorage.setItem("zaliant_announcement_active", isActive.toString());
    toast.success("Announcement saved successfully!");
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-gradient">Announcement Management</h1>

        <Card className="glass border-border/50 max-w-3xl">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="active" className="text-lg font-semibold">
                    Display Announcement
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Show this announcement across all pages
                  </p>
                </div>
                <Switch
                  id="active"
                  checked={isActive}
                  onCheckedChange={setIsActive}
                />
              </div>

              <div>
                <Label htmlFor="announcement" className="text-lg font-semibold">
                  Announcement Text
                </Label>
                <Textarea
                  id="announcement"
                  placeholder="Enter your announcement here..."
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  className="mt-2 min-h-[200px]"
                />
              </div>

              <Button
                onClick={handleSave}
                className="w-full neon-glow"
                size="lg"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Announcement
              </Button>

              {isActive && announcement && (
                <div className="mt-6">
                  <Label className="text-sm font-semibold mb-2 block">Preview:</Label>
                  <div className="p-4 rounded-lg bg-primary/20 border border-primary/50">
                    <p className="text-sm">{announcement}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminAnnouncement;
