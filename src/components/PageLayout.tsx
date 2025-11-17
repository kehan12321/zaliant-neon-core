import { ReactNode } from "react";
import BackgroundVideo from "./BackgroundVideo";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnnouncementBar from "./AnnouncementBar";

interface PageLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

const PageLayout = ({ children, showFooter = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen relative">
      {/* Universal Background Video */}
      <BackgroundVideo />
      
      {/* Announcement Bar */}
      <AnnouncementBar />
      
      {/* Content Layer */}
      <div className="relative z-10">
        <Navbar />
        <main>{children}</main>
        {showFooter && <Footer />}
      </div>
    </div>
  );
};

export default PageLayout;
