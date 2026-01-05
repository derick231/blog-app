import mountains from "../public/mountains.jpg";

const bgMap = {
  stories: {
    type: "image",
    src: mountains,
  },
  home: {
    type: "video",
    src: "https://cdn.coverr.co/videos/coverr-surfing-as-the-sunsets-7531/720p.mp4",
  },
  about: {
    type: "image",
    src: "https://images.pexels.com/photos/30362647/pexels-photo-30362647.jpeg",
  },
  mission: {
    type: "image",
    src: "https://images.unsplash.com/photo-1697490251825-0d6f7f3f7254?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  vision: {
    type: "image",
    src: "https://images.unsplash.com/photo-1484910292437-025e5d13ce87?q=80&w=1514&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  history: {
    type: "image",
    src: "https://plus.unsplash.com/premium_photo-1664392221617-503273a47786?q=80&w=1020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  resource:{
    type:"video",
    src:"https://cdn.coverr.co/videos/coverr-wind-turbines-in-the-field-7853/720p.mp4"
  }
};

const PageWrapper = ({ bg, children }) => {
  const bgItem = bgMap[bg];

  return (
    <div className="relative h-[100vh] w-full overflow-hidden wrapper text-white">
      {/* IMAGE */}
      {bgItem?.type === "image" && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgItem.src})` }}
        />
      )}

      {/* VIDEO */}
      {bgItem?.type === "video" && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={bgItem.src} type="video/mp4" />
        </video>
      )}

      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col h-full justify-center">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
