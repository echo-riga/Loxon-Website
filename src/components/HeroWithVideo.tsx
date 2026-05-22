'use client';

import Link from 'next/link';

export default function HeroWithVideo() {
  return (
    <section className="relative h-screen min-h-[700px] w-full flex items-center bg-gray-900 overflow-hidden">
      {/* Local video background – covers full area, no black bars */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-8 md:px-16 lg:px-32 animate-fade-in-up">
        <div className="max-w-5xl mx-auto md:mx-0">
          <span className="text-sky-400 text-base sm:text-lg md:text-xl font-semibold tracking-wider mb-3 sm:mb-4 block">
            ESTABLISHED 1983
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 text-white leading-tight">
            Engineering the<br />
            <span className="text-sky-400">Philippines' Future</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 md:mb-10 max-w-3xl leading-relaxed">
            Loxon Philippines Inc. delivers world-class engineering and
            construction solutions from infrastructure to industrial projects
            with unwavering quality and safety.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <Link href="/projects" className="bg-sky-600 hover:bg-sky-700 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold transition duration-300 inline-block">
              VIEW OUR WORK
            </Link>
            <Link href="/contact?type=sales" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold transition duration-300 inline-block">
              SALES INQUIRY
            </Link>
            <Link href="/contact?type=service" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold transition duration-300 inline-block">
              SERVICE REQUEST
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce-slow hidden sm:block">
        <div className="w-8 h-14 border-2 border-white rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white rounded-full mt-3 animate-pulse-slow" />
        </div>
      </div>
    </section>
  );
}