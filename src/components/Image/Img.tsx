import React from "react";

interface ImgProps extends React.HTMLAttributes<HTMLImageElement> {
  children: React.ReactNode;
  caption?: string;
  width?: number;
  height?: number;
}

const Img = ({ children, caption, width, height }: ImgProps) => {
  return (
    <figure className="flex flex-col items-center justify-center">
      <div
        style={{ width, height }}
        className="-mt-8 max-w-full overflow-hidden"
      >
        {children}
      </div>
      {caption && (
        <figcaption className="-mt-6 text-center text-xs text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default Img;
