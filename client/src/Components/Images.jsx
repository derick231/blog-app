import { Image, buildSrc } from "@imagekit/react";
import { useState, useCallback } from "react";

const Images = ({ src, className, w, h, alt }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const hidePlaceholder = () => setShowPlaceholder(false);

  const imgRef = useCallback((img) => {
    if (!img) return;
    if (img.complete) hidePlaceholder();
  }, []);

  return (
    <Image
      src={src}
      className={className}
      alt={alt}
      width={w}
      height={h}
      loading="eager"
      ref={imgRef}
      transformation={[
        {
          width:w,
          height:h
        }
      ]}
      style={
        showPlaceholder
          ? {
              backgroundImage: `url(${buildSrc({
                
                transformation: [
                  {
                    quality: 10,
                    blur: 90,
                  },
                ],
              })})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }
          : {}
      }
    />
  );
};

export default Images;
