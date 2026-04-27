"use client";

import { motion } from "framer-motion";

const socials = [
  {
    href: "https://www.linkedin.com/in/ahmedsoudan/",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 12 12" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M1.25 4.25h2s0.25 0 0.25 0.25v6.5s0 0.25 -0.25 0.25h-2s-0.25 0 -0.25 -0.25V4.5s0 -0.25 0.25 -0.25" />
        <path d="M2.24 3.25A1.25 1.25 0 1 0 1 2a1.245 1.245 0 0 0 1.24 1.25Z" />
        <path d="M9.25 11.25h1.5a0.25 0.25 0 0 0 0.25 -0.25v-4.2C11 4.915 9.935 4 8.445 4a2.11 2.11 0 0 0 -1.59 0.64 0.195 0.195 0 0 1 -0.225 0.045A0.2 0.2 0 0 1 6.5 4.5a0.25 0.25 0 0 0 -0.25 -0.25h-1.5A0.25 0.25 0 0 0 4.5 4.5v6.5a0.25 0.25 0 0 0 0.25 0.25h1.5a0.25 0.25 0 0 0 0.25 -0.25v-3.75a1.25 1.25 0 0 1 2.5 0V11a0.25 0.25 0 0 0 0.25 0.25Z" />
      </svg>
    ),
  },
  {
    href: "https://www.behance.net/artlabsoudan",
    label: "Behance",
    icon: (
      <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M6.475555555555555 7.489583333333333c0.8656666666666667 -0.4137777777777778 1.3175555555555556 -1.0398888888888889 1.3175555555555556 -2.014444444444444 0 -1.9218888888888888 -1.4318888888888888 -2.390111111111111 -3.084277777777778 -2.390111111111111H0.15999999999999998v9.647555555555556h4.676777777777778c1.753111111111111 0 3.4000555555555554 -0.8411666666666666 3.4000555555555554 -2.8011666666666666 0 -1.2113888888888888 -0.5743888888888888 -2.107 -1.7612777777777777 -2.4418333333333333ZM2.280611111111111 4.731972222222222h1.9899444444444445c0.7649444444444444 0 1.4536666666666667 0.21505555555555556 1.4536666666666667 1.1024999999999998 0 0.8193888888888888 -0.5362777777777777 1.1487777777777777 -1.2930555555555554 1.1487777777777777h-2.1505555555555556v-2.2512777777777777Zm2.267611111111111 6.361833333333333H2.280611111111111v-2.6568888888888886h2.3111666666666664c0.9337222222222221 0 1.5244444444444445 0.3892777777777777 1.5244444444444445 1.3774444444444445 0 0.9745555555555556 -0.7050555555555555 1.2794444444444444 -1.5679999999999998 1.2794444444444444Zm9.759166666666665 -6.552388888888888H10.395555555555555v-0.9500555555555554h3.911833333333333v0.9500555555555554Zm1.532611111111111 4.799277777777777c0 -2.0661666666666667 -1.2086666666666666 -3.789333333333333 -3.4000555555555554 -3.789333333333333 -2.1287777777777777 0 -3.5742777777777777 1.6006666666666667 -3.5742777777777777 3.6967777777777777 0 2.1750555555555557 1.3692777777777776 3.666833333333333 3.5742777777777777 3.666833333333333 1.668722222222222 0 2.7494444444444444 -0.7513333333333333 3.2693888888888885 -2.3492777777777776H14.01611111111111c-0.18238888888888888 0.5961666666666666 -0.9337222222222221 0.9119444444444443 -1.5162777777777776 0.9119444444444443 -1.1242777777777777 0 -1.7149999999999999 -0.6587777777777778 -1.7149999999999999 -1.777611111111111h5.038833333333333c0.008166666666666666 -0.11433333333333331 0.01633333333333333 -0.2368333333333333 0.01633333333333333 -0.35933333333333334Zm-5.052444444444444 -0.8493333333333333c0.0626111111111111 -0.9173888888888889 0.6723888888888888 -1.4917777777777776 1.5924999999999998 -1.4917777777777776 0.9636666666666667 0 1.4482222222222223 0.5662222222222222 1.5298888888888889 1.4917777777777776H10.787555555555555Z" />
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
    <footer className="py-16" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left */}
          <div>
            <h3 className="text-[28px] font-bold relative inline-block cursor-pointer group" style={{ color: "var(--fg)" }}>
              <span className="relative z-10 group-hover:text-[var(--accent)] transition-colors duration-300">Let&apos;s work together</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden">
                <motion.span
                  className="absolute bottom-0 left-0 h-full w-full origin-left"
                  style={{ background: "var(--accent)" }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </span>
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{ textShadow: "0 0 28px rgba(var(--accent-rgb), 0.18)" }}
                whileHover={{ opacity: 1 }}
                initial={{ opacity: 0 }}
              />
            </h3>
            <a
              href="mailto:ahmedsoudan@gmail.com"
              className="text-[16px] mt-2 flex w-fit items-center gap-2 hover:opacity-80 transition-opacity group"
              style={{ color: "var(--accent)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="22 4 12 13 2 4" />
              </svg>
              <span className="border-b border-current/30 group-hover:border-current transition-colors">
                ahmedsoudan@gmail.com
              </span>
            </a>
            <a
              href="tel:+447774921967"
              className="text-[15px] mt-3 flex w-fit items-center gap-2 hover:opacity-80 transition-opacity group"
              style={{ color: "var(--accent)" }}
              aria-label="Call +44 777 492 1967"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span className="border-b border-current/30 group-hover:border-current transition-colors">
                +44 777 492 1967
              </span>
            </a>
            <p className="text-[14px] mt-3" style={{ color: "var(--fg-50)" }}>London, UK</p>
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
                className="group w-11 h-11 flex items-center justify-center rounded-full transition-all duration-150 hover:-translate-y-1 hover:scale-110 hover:text-[#3D9B9B] hover:border-[#3D9B9B]/70 hover:bg-[#3D9B9B]/12 hover:shadow-[0_0_22px_rgba(61,155,155,0.55)]"
                style={{ border: "1px solid var(--border-card)", color: "var(--fg-60)" }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <p className="text-[12px]" style={{ color: "var(--fg-40)" }}>
            &copy; {new Date().getFullYear()} Ahmed Soudan. All rights reserved.
          </p>
          <p className="text-[12px]" style={{ color: "var(--fg-30)" }}>
            Digital Product Designer
          </p>
        </div>
      </div>
    </footer>
  );
}
