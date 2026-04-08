"use client";

const socials = [
  {
    href: "https://www.linkedin.com/in/ahmedsoudan/",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://www.behance.net/artlabsoudan",
    label: "Behance",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M16.969 16.927c-2.395 0-2.554-2.097-2.554-2.097h6.997c0-3.075-1.617-5.851-4.444-5.851-2.85 0-4.929 1.998-4.929 5.087 0 3.144 1.95 5.012 5.069 5.012 2.808 0 4.244-1.927 4.244-1.927l-1.292-1.39s-1.123 1.166-3.091 1.166zm-.18-6.072c1.852 0 1.989 1.738 1.989 1.738h-4.236c-.001-.001.181-1.738 2.247-1.738zM6.347 8.456H.075v11.34h6.5c4.704 0 5.961-2.892 5.961-2.892C13.526 14.43 11.93 12.93 11.93 12.93s.781-1.092.781-2.692c0-1.84-1.405-3.39-3.687-3.39H6.347zm-.108 9.293H2.453V14.49h3.706s2.166-.002 2.166 1.605c-.001 1.638-2.086 1.654-2.086 1.654zm.123-5.42H2.453V8.957h3.81s1.952.072 1.952 1.61c0 1.62-1.853 1.762-1.853 1.762zm9.875-3.872h5.71V6.875h-5.71v1.482z" />
      </svg>
    ),
  },
  {
    href: "https://dribbble.com/Soudan84",
    label: "Dribbble",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.017-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.073c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.176zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
      </svg>
    ),
  },
];

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

          {/* Socials — uniform 40×40 circle containers keep all icons pixel-aligned */}
          <div className="flex items-center gap-3">
            {socials.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/30 hover:text-[#3D9B9B] hover:border-[#3D9B9B]/40 transition-all duration-300"
              >
                {icon}
              </a>
            ))}
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
