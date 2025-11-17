const BackgroundVideo = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
      >
        <source src="/admin-bg.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Purple Gradient Overlay with subtle animation */}
      <div 
        className="absolute inset-0 animate-pulse-slow"
        style={{
          background: 'linear-gradient(rgba(20, 0, 40, 0.75), rgba(10, 0, 25, 0.85))',
          backdropFilter: 'blur(2px)',
          animation: 'subtle-pulse 8s ease-in-out infinite',
        }}
      />
      
      {/* Additional gradient for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(109, 40, 217, 0.1) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default BackgroundVideo;
