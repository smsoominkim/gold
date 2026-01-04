import React from 'react';

const SplineBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-[#050505]">
      {/* 
        Using iframe as requested. 
        Added pointer-events-none to the overlay container in App.tsx to allow interaction with the 3D model,
        but we keep the iframe here.
      */}
      <iframe 
        src='https://my.spline.design/goldblob-XeT0crvgnejcIk7ilpD0aKJl/' 
        frameBorder='0' 
        width='100%' 
        height='100%'
        className="w-full h-full"
        title="3D Gold Liquid"
      ></iframe>
      
      {/* Gradient overlay to ensure text legibility at the top/bottom while keeping the center immersive */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/80" />
    </div>
  );
};

export default SplineBackground;