import React, { useState } from 'react';

interface VideoCardProps {
  key?: string | number;
  video: any;
  onClick: () => void;
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  const [error, setError] = useState(false);

  return (
    <div className="group cursor-pointer flex flex-col" onClick={onClick}>
      <div className="relative w-full aspect-[9/16] bg-km-black/5 rounded-xl overflow-hidden shadow-sm border border-km-maroon/10 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-500 mb-6 flex items-center justify-center">
        {!error ? (
          <video
            src={video.file}
            poster={video.poster}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="auto"
            onError={() => setError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <img 
            src={video.poster} 
            alt={video.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      
      <div className="flex flex-col">
        <div className="inline-block bg-km-maroon/10 text-km-maroon text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider mb-2 w-max">
          Timelapse do processo
        </div>
        <h3 className="text-xl font-semibold tracking-tight group-hover:text-km-red-bright transition-colors mb-2">{video.name}</h3>
        <p className="text-sm text-km-maroon leading-relaxed">{video.description}</p>
      </div>
    </div>
  );
}
