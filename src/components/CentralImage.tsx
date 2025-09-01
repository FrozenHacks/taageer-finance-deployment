const CentralImage = ({ image }: { image: string }) => {
  return (
    <div className="relative flex items-center justify-center mb-16">
      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border-2 border-primary/20 animate-pulse-ring"></div>
        <div
          className="absolute w-24 h-24 rounded-full border-2 border-accent/30 animate-pulse-ring"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute w-40 h-40 rounded-full border border-primary/10 animate-pulse-ring"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
      {/* Central image container */}
      <div className="relative z-10 w-20 h-20 bg-card rounded-2xl shadow-elegant flex items-center justify-center animate-float">
        <img
          src={image}
          alt="logo image "
          className="w-20 h-20 object-contain"
        />
      </div>
    </div>
  );
};

export default CentralImage;
