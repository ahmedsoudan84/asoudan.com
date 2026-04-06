"use client";

export default function Footer() {
  return (
    <footer className="bg-[#0d0f1a] py-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left */}
          <div>
            <h3 className="text-[28px] font-bold text-white">
              Let&apos;s work together
            </h3>
            <a
              href="mailto:ahmedsoudan@gmail.com"
              className="text-[#3D9B9B] text-[16px] mt-2 inline-block hover:text-[#91fbff] transition-colors"
            >
              ahmedsoudan@gmail.com
            </a>
            <p className="text-[14px] text-white/30 mt-1">+44 777 492 1967</p>
            <p className="text-[14px] text-white/30">London, UK</p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/ahmedsoudan/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/30 hover:text-[#3D9B9B] transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="22" height="22" fill="currentColor">
                <path d="M1.25 4.25h2s0.25 0 0.25 0.25v6.5s0 0.25 -0.25 0.25h-2s-0.25 0 -0.25 -0.25V4.5s0 -0.25 0.25 -0.25" />
                <path d="M2.24 3.25A1.25 1.25 0 1 0 1 2a1.245 1.245 0 0 0 1.24 1.25Z" />
                <path d="M9.25 11.25h1.5a0.25 0.25 0 0 0 0.25 -0.25v-4.2C11 4.915 9.935 4 8.445 4a2.11 2.11 0 0 0 -1.59 0.64 0.195 0.195 0 0 1 -0.225 0.045A0.2 0.2 0 0 1 6.5 4.5a0.25 0.25 0 0 0 -0.25 -0.25h-1.5A0.25 0.25 0 0 0 4.5 4.5v6.5a0.25 0.25 0 0 0 0.25 0.25h1.5a0.25 0.25 0 0 0 0.25 -0.25v-3.75a1.25 1.25 0 0 1 2.5 0V11a0.25 0.25 0 0 0 0.25 0.25Z" />
              </svg>
            </a>
            <a
              href="https://www.behance.net/artlabsoudan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Behance"
              className="text-white/30 hover:text-[#3D9B9B] transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="22" height="22" fill="currentColor">
                <path d="M6.476 7.49c0.866 -0.414 1.318 -1.04 1.318 -2.014 0 -1.922 -1.432 -2.39 -3.084 -2.39H0.16v9.648h4.677c1.753 0 3.4 -0.841 3.4 -2.801 0 -1.211 -0.574 -2.107 -1.761 -2.442ZM2.281 4.732h1.99c0.765 0 1.454 0.215 1.454 1.102 0 0.82 -0.536 1.149 -1.293 1.149h-2.151v-2.251Zm2.268 6.362H2.281v-2.657h2.311c0.934 0 1.524 0.39 1.524 1.377 0 0.975 -0.705 1.28 -1.568 1.28Zm9.759 -6.552H10.396v-0.95h3.912v0.95Zm1.533 4.8c0 -2.066 -1.209 -3.79 -3.4 -3.79 -2.129 0 -3.574 1.601 -3.574 3.697 0 2.175 1.369 3.667 3.574 3.667 1.669 0 2.749 -0.751 3.27 -2.35H14.016c-0.182 0.597 -0.934 0.912 -1.516 0.912 -1.124 0 -1.715 -0.659 -1.715 -1.778h5.039c0.008 -0.114 0.016 -0.237 0.016 -0.36Zm-5.052 -0.85c0.063 -0.917 0.672 -1.491 1.592 -1.491 0.964 0 1.448 0.566 1.53 1.492H10.788Z" />
              </svg>
            </a>
            <a
              href="https://dribbble.com/Soudan84"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dribbble"
              className="text-white/30 hover:text-[#3D9B9B] transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-271 273 256 256" width="22" height="22" fill="currentColor">
                <path d="M-18.7,374.8c-1.7-8.2-4.2-16.2-7.5-24c-3.2-7.6-7.2-14.8-11.8-21.6c-4.6-6.8-9.8-13-15.5-18.8 c-5.8-5.8-12.2-11.1-18.8-15.5c-6.8-4.6-14.2-8.6-21.6-11.8c-7.7-3.3-15.7-5.8-24-7.5c-8.4-1.7-17-2.6-25.7-2.6s-17.3,0.9-25.7,2.6 c-8.2,1.7-16.2,4.2-23.9,7.5c-7.6,3.2-14.8,7.2-21.6,11.8c-6.8,4.6-13.1,9.8-18.8,15.5s-11,12.2-15.5,18.8 c-4.6,6.8-8.6,14-11.8,21.6c-3.3,7.7-5.8,15.7-7.5,24c-1.7,8.4-2.6,17-2.6,25.7s0.9,17.3,2.6,25.7c1.7,8.2,4.2,16.2,7.5,23.9 c3.2,7.6,7.2,14.8,11.8,21.7c4.6,6.8,9.8,13,15.5,18.8c5.8,5.8,12.2,11,18.8,15.5c6.8,4.6,14.2,8.6,21.6,11.8 c7.7,3.3,15.7,5.8,23.9,7.5c8.4,1.7,17,2.6,25.7,2.6s17.2-0.9,25.7-2.6c8.2-1.7,16.2-4.2,24-7.5c7.6-3.2,14.8-7.2,21.6-11.8 c6.8-4.6,13.1-9.8,18.8-15.5c5.8-5.8,11-12.2,15.5-18.8c4.6-6.8,8.6-14.1,11.8-21.7c3.3-7.7,5.8-15.7,7.5-23.9 c1.7-8.4,2.6-17,2.6-25.7S-17,383.2-18.7,374.8z M-143.6,291.6c27.6,0,52.7,10.3,71.9,27.2c-0.3,0.4-15.7,24-56.9,39.4 c-18.6-34.2-39.1-61.4-40.8-63.6C-161.1,292.7-152.5,291.6-143.6,291.6z M-190.1,302c1.5,1.9,21.6,29.3,40.5,62.8c-52.3,13.8-97.7,13.3-100.5,13.2C-243.2,344.3-220.5,316.3-190.1,302z M-224.7,473.2c-17.3-19.2-27.9-44.7-27.9-72.7c0-1.2,0.1-2.3,0.1-3.4c1.9,0,55.7,1.3,111.8-15.5c3.1,6.1,6.1,12.4,8.9,18.5 c-1.4,0.4-2.9,0.8-4.3,1.3C-194.9,420.4-224.7,473.2-224.7,473.2z M-143.6,509.4c-25.4,0-48.5-8.7-67-23.1 c0.4-0.8,21.5-45.7,85.5-68c0.2-0.1,0.5-0.2,0.7-0.2c15.3,39.8,21.6,73.1,23.2,82.7C-114.2,506.3-128.6,509.4-143.6,509.4z M-82.8,490.8c-1.1-6.6-6.9-38.5-21.2-77.8c35.2-5.6,65.7,4,67.9,4.8C-40.9,448.1-58.4,474.3-82.8,490.8z M-110.6,395.8 c-0.8-1.9-1.6-3.7-2.4-5.6c-2.3-5.4-4.7-10.6-7.3-15.8c43-17.5,60.5-42.8,60.7-43.1c15.2,18.6,24.5,42.3,24.8,68.1 C-36.3,399.1-73.2,391.1-110.6,395.8z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/20">
            &copy; {new Date().getFullYear()} Ahmed Soudan. All rights reserved.
          </p>
          <p className="text-[12px] text-white/15">
            Digital Product Designer
          </p>
        </div>
      </div>
    </footer>
  );
}
