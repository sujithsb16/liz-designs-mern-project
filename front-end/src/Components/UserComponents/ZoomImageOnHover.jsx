import { useState } from "react";

const ZoomImageOnHover = ({ src, alt }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          transition: "transform 0.3s",
          transform: isHovered ? "scale(1.2)" : "scale(1)",
          maxHeight:540,
        }}
      />
    </div>
  );
};

export default ZoomImageOnHover;
