"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "@/components/Icon";

// Full details for all 7 team members
const TEAM_MEMBERS = [
  {
    name: "Sabnis Akshat Shailesh",
    role: "Founder & CEO",
    bio: "Akshat is the visionary founder of Kaamao, leading corporate strategy, business development, and key growth partnerships. He is focused on bridging the gap between local talent and economic opportunities.",
    initials: "AS",
    image: "/assets/teams/Akshat.png",
    skills: [
      "Corporate Strategy",
      "Venture Capital",
      "Growth Hacking",
      "Leadership",
      "Business Ops",
      "Partnerships",
    ],
    socials: {
      github: "https://github.com/dontknowhowtocode69",
      linkedin: "https://www.linkedin.com/in/akshat-sabnis-84a139336/",
      email: "mailto:sabnisakshat5@gmail.com",
    },
  },
  {
    name: "Pathinenchil Indresh Suresh",
    role: "Co-Founder & CTO",
    bio: "Indresh is a passionate engineer specializing in full-stack architecture, database design, and cloud deployments. He drives the technical vision, focusing on building high-performance, accessible, and secure platform architectures.",
    initials: "IS",
    image: "/assets/teams/indresh.jpeg",
    skills: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "System Architecture",
      "Cloud Deployments",
    ],
    socials: {
      github: "https://github.com/indresh404",
      linkedin: "https://www.linkedin.com/in/indresh-suresh-093646399",
      email: "mailto:indreshsuresh95@gmail.com",
    },
  },
  {
    name: "Sharma Monish Mukesh",
    role: "Co-Founder & Product Lead",
    bio: "Monish leads the product strategy and user experience design at Kaamao. With a background in user research and agile growth, he ensures the platform remains incredibly intuitive for all community members.",
    initials: "MS",
    image: "/assets/teams/Monish.png",
    skills: [
      "Product Strategy",
      "UX Design",
      "Wireframing",
      "User Research",
      "Product Analytics",
      "Agile PM",
    ],
    socials: {
      github: "https://github.com/MonishSharma01",
      linkedin: "https://www.linkedin.com/in/monish-sharma-16799b3b5/",
      email: "mailto:monishsharma0107@gmail.com",
    },
  },
  {
    name: "Sharma Shashank Rajesh",
    role: "Marketing & Operations",
    bio: "Shashank manages marketing strategy, public relations, and operational workflows. He focuses on scaling user acquisition, building community trust, and running localized outreach campaigns.",
    initials: "SS",
    image: "/assets/teams/Shashank.png",
    skills: [
      "Growth Marketing",
      "Public Relations",
      "Brand Strategy",
      "Community Ops",
      "Content Marketing",
      "SEO",
    ],
    socials: {
      github: "https://github.com/shashsharmaa",
      linkedin: "https://www.linkedin.com/in/shashank-sharma-2376993b8/",
      email: "mailto:shashanksharmatech2476@gmail.com",
    },
  },
  {
    name: "Pandey Utkarsh Ramesh",
    role: "Software Developer",
    bio: "Utkarsh is a software developer focusing on frontend features, interactive user interfaces, and state management. He ensures a smooth, highly responsive, and accessible user experience across all devices.",
    initials: "UP",
    image: "/assets/teams/Utkarsh.png",
    skills: [
      "React",
      "Tailwind CSS",
      "Frontend Architecture",
      "State Management",
      "UI/UX",
      "Framer Motion",
    ],
    socials: {
      github: "https://github.com/utkarshpan",
      linkedin: "https://www.linkedin.com/in/utkarsh-pandey-95507631b/",
      email: "mailto:pandeyutkarsh870@gmail.com",
    },
  },
  {
    name: "Sharma Divya Gurudev",
    role: "Developer & Community Lead",
    bio: "Divya specializes in backend services, API integrations, and database performance. Divya works on optimizing search algorithms and queries to keep local discoverability fast and reliable.",
    initials: "DS",
    image: "/assets/teams/divya.png",
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "REST APIs",
      "Query Optimization",
    ],
    socials: {
      github: "https://github.com/divyagsharma2006-blip",
      linkedin: "https://www.linkedin.com/in/divya-sharma-57673536b/",
      email: "mailto:divyagsharma2006@gmail.com",
    },
  },
  {
    name: "Rajbhar Ankita Ganesh",
    role: "Software Developer",
    bio: "Ankita is a software developer focused on frontend implementation, API integrations, and quality assurance. Ankita ensures code reliability and consistent UI across core flows.",
    initials: "AR",
    image: "/assets/teams/Ankita.png",
    skills: [
      "React",
      "TypeScript",
      "Vitest",
      "Playwright",
      "API Integration",
      "Git Workflows",
    ],
    socials: {
      github: "https://github.com/Ankita0325",
      linkedin: "https://www.linkedin.com/in/ankita-rajbhar-303a01307/",
      email: "mailto:ankitar1979@gmail.com",
    },
  },
];

// Reusable Image component that handles load error gracefully and shows a fallback icon
function TeamMemberImage({
  src,
  name,
  initials,
}: {
  src: string;
  name: string;
  initials: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 select-none">
        <Icon
          name="person"
          className="text-6xl text-slate-350 dark:text-slate-600 group-hover:scale-110 transition-transform duration-500"
          fill
        />
        <span className="text-[11px] font-extrabold tracking-wider uppercase mt-1 text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-700/60 px-2.5 py-0.5 rounded group-hover:scale-105 transition-transform duration-500">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setHasError(true)}
      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
    />
  );
}

// Reusable Card Component with clean hover interactions and interactive spotlight effect
function TeamMemberCard({ member }: { member: (typeof TEAM_MEMBERS)[0] }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-[300px] sm:w-[300px] h-[470px] bg-slate-100 dark:bg-slate-800/60 p-[1.5px] rounded-[28px] overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-950/80 transition-all duration-300 mx-auto relative cursor-default"
      style={{
        background: isHovered
          ? `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, var(--color-brand-primary, #2563eb), transparent 80%)`
          : undefined,
      }}
    >
      <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[27px] flex flex-col justify-between overflow-hidden relative z-10 transition-colors duration-300">
        {/* Premium Sweep Shimmer Reflection Overlay on Card Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-20">
          <div className="w-full h-full bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.06)_40%,rgba(255,255,255,0.06)_50%,transparent_60%)] -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        </div>

        {/* Ambient background glow inside card that tracks mouse */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: `radial-gradient(180px circle at ${coords.x}px ${coords.y}px, rgba(37, 99, 235, 0.04), transparent 80%)`,
          }}
        />

        {/* Circular Profile Image Container with interactive gradient glow outline */}
        <div className="relative w-[136px] h-[136px] mt-10 mx-auto rounded-full p-0.5 bg-slate-100 dark:bg-slate-800 group-hover:bg-gradient-to-tr group-hover:from-brand-primary group-hover:to-brand-teal transition-all duration-500 shrink-0 z-10">
          <div className="w-full h-full rounded-full border-4 border-white dark:border-slate-900 overflow-hidden bg-white dark:bg-slate-900">
            <TeamMemberImage
              src={member.image}
              name={member.name}
              initials={member.initials}
            />
          </div>
        </div>

        {/* Info Content */}
        <div className="flex-grow flex flex-col pt-6 px-6 pb-2 justify-start overflow-hidden relative z-10">
          <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100 tracking-tight text-center line-clamp-1 group-hover:text-brand-primary dark:group-hover:text-brand-teal transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-[10px] font-bold text-brand-primary dark:text-brand-teal uppercase tracking-widest mt-1.5 text-center select-none bg-brand-primary-light/40 dark:bg-brand-primary-dark/20 px-3 py-1 rounded-full w-fit mx-auto border border-brand-primary/10 transition-colors duration-300">
            {member.role}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-[13px] leading-relaxed mt-4 text-center line-clamp-4 px-2">
            {member.bio}
          </p>
        </div>

        {/* Connect Bar */}
        <div className="bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between gap-4 shrink-0 relative z-10">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider select-none">
            Connect
          </span>
          <div className="flex items-center gap-2">
            {/* GitHub Link */}
            <a
              href={member.socials.github}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 hover:-translate-y-1 hover:scale-110 transition-all duration-200 shadow-sm"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>

            {/* LinkedIn Link */}
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-[#0077b5] dark:hover:bg-[#0077b5] hover:text-white dark:hover:text-slate-950 hover:-translate-y-1 hover:scale-110 transition-all duration-200 shadow-sm"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Email Link */}
            <a
              href={member.socials.email}
              className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-brand-primary dark:hover:bg-brand-teal hover:text-white dark:hover:text-slate-900 hover:-translate-y-1 hover:scale-110 transition-all duration-200 shadow-sm"
              aria-label="Email Member"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const topThree = TEAM_MEMBERS.slice(0, 3);
  const bottomFour = TEAM_MEMBERS.slice(3, 7);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkTheme = document.documentElement.classList.contains("dark");
    const timer = setTimeout(() => {
      setIsDark(isDarkTheme);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      setIsDark(false);
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      setIsDark(true);
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-[Manrope,sans-serif] text-slate-800 dark:text-slate-100 selection:bg-brand-primary-light selection:text-brand-primary-dark relative overflow-hidden transition-colors duration-300">
      {/* Tech Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/20 dark:bg-blue-900/10 rounded-full filter blur-3xl -z-10 animate-pulse-subtle" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-100/20 dark:bg-indigo-900/10 rounded-full filter blur-3xl -z-10 animate-pulse-subtle" />

      {/* Sticky Header widened to max-w-[1400px] */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-900 transition-colors duration-300">
        <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 group font-extrabold text-slate-900 dark:text-white text-lg"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary text-white">
              <Icon name="check" fill className="text-xs text-white" />
            </div>
            Kaamao
          </Link>
          <div className="flex items-center gap-4">
            {/* Interactive Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-brand-bg-light dark:hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
              title="Toggle Dark Mode"
            >
              <Icon
                name={isDark ? "light_mode" : "dark_mode"}
                className="text-xl"
                fill
              />
            </button>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary-light transition-all group"
            >
              <Icon
                name="arrow_back"
                className="text-base group-hover:-translate-x-1 transition-transform"
              />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Page container widened to max-w-[1400px] to allow 4 bottom cards to remain same size as 3 top cards */}
      <main className="mx-auto max-w-[1400px] px-6 py-16">
        {/* Hero title */}
        <div className="text-center max-w-[680px] mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-primary font-bold text-xs uppercase tracking-widest bg-brand-primary-light dark:bg-brand-primary-dark/20 px-3.5 py-1.5 rounded-full inline-block mb-4">
              Our Creators
            </span>
            <h1 className="text-[clamp(2.2rem,5vw,3.2rem)] font-extrabold text-slate-900 dark:text-white leading-tight mb-4 tracking-tight">
              Meet the Team behind <br />
              <span className="text-brand-primary relative">
                Kaamao
                <span className="absolute left-0 bottom-1.5 w-full h-[5px] bg-brand-primary-light/60 dark:bg-brand-primary-dark/40 -z-10 rounded-full" />
              </span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
              We started with a simple belief: every community has hidden
              expertise. Our mission is to unlock these talents, build trust
              locally, and create economic opportunities right in your
              neighborhood.
            </p>
          </motion.div>
        </div>

        {/* Aligned 3 Up, 4 Below Centered Flex Layout with zero squeezing and identical sizing */}
        <div className="space-y-12 max-w-[1400px] mx-auto flex flex-col items-center">
          {/* Row 1: 3 cards up */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-10 w-full">
            {topThree.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
              >
                <TeamMemberCard member={member} />
              </motion.div>
            ))}
          </div>

          {/* Row 2: 4 cards below (expands beautifully within max-w-[1400px] main container) */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-10 w-full">
            {bottomFour.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx + 3) * 0.05 }}
              >
                <TeamMemberCard member={member} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Company Vision Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-[32px] p-8 md:p-12 text-center max-w-[860px] mx-auto mt-24 relative overflow-hidden shadow-2xl border border-slate-800 dark:border-slate-850"
        >
          <div className="absolute top-0 left-0 w-48 h-48 bg-brand-primary/10 rounded-full filter blur-xl -translate-x-1/2 -translate-y-1/2" />
          <Icon
            name="groups"
            className="text-4xl text-brand-primary-muted mb-6"
            fill
          />
          <h3 className="text-lg font-bold mb-3 uppercase tracking-wider text-brand-primary-light">
            Our Mission
          </h3>
          <p className="text-sm md:text-base leading-relaxed max-w-[600px] mx-auto text-slate-300">
            &ldquo;Kaamao transforms skills into opportunities and local talent
            into sustainable income, bringing neighborhoods closer together
            through trusted professional networks.&rdquo;
          </p>
        </motion.div>
      </main>
    </div>
  );
}
