/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Brain, 
  Cloud, 
  GraduationCap, 
  Award, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowUp,
  Terminal,
  Layers,
  Send,
  Loader2,
  CheckCircle2
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Certs', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass border-b border-neutral-200/50 py-3' : 'bg-transparent py-4 md:py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl sm:text-2xl font-display font-bold text-indigo-600 tracking-tight group">
          KC.<span className="text-neutral-900 group-hover:text-indigo-600 transition-colors">Balaji</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs lg:text-sm font-medium text-neutral-600 hover:text-indigo-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-4 lg:px-6 py-2 lg:py-2.5 bg-indigo-600 text-white text-xs lg:text-sm font-bold rounded-full hover:bg-indigo-700 transition-all shadow-md hover:shadow-indigo-500/20 active:scale-95 whitespace-nowrap"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-neutral-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-neutral-100 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-neutral-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [text, setText] = useState('');
  const roles = ['Java Developer', 'Full-Stack Developer', 'Data Analyst', 'AI Engineer'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setText(currentRole.substring(0, isDeleting ? text.length - 1 : text.length + 1));
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.15, 0],
              scale: [0, 1.5, 0.5],
              x: [Math.random() * 2000 - 500, Math.random() * 2000 - 500],
              y: [Math.random() * 2000 - 500, Math.random() * 2000 - 500]
            }}
            transition={{ 
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-indigo-500 rounded-full blur-[1px]"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-10 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-display font-extrabold text-neutral-900 mb-8 leading-[1.1] tracking-tight">
            Hi, I'm <span className="text-gradient">K.C. Balaji</span>
          </h1>
          <div className="h-10 mb-8">
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-700">
              {text}<span className="animate-pulse">|</span>
            </p>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Java Full-Stack • Data Analytics • AI / ML Engineering
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a 
              href="#projects" 
              className="btn-primary"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="btn-secondary"
            >
              Get in Touch
            </a>
          </div>

          <div className="flex justify-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-indigo-600 text-[10px] font-bold uppercase tracking-widest border border-indigo-100/50">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
              Available for Hire
            </span>
          </div>
          
          <div className="flex justify-center gap-6">
            {[
              { icon: Github, href: "https://github.com/balu105" },
              { icon: Linkedin, href: "https://linkedin.com/in/" },
              { icon: Mail, href: "mailto:balajikc89@gmail.com" }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -5 }}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-neutral-100 text-neutral-600 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-400"
      >
        <div className="w-6 h-10 border-2 border-neutral-200 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-neutral-300 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const SectionHeader = ({ label, title, description }: { label: string, title: string, description?: string }) => (
  <div className="mb-8 text-center md:text-left">
    <span className="text-indigo-600 font-bold text-xs sm:text-sm uppercase tracking-widest mb-3 block">{label}</span>
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4 tracking-tight">{title}</h2>
    {description && <p className="text-neutral-500 max-w-2xl text-sm sm:text-base leading-relaxed">{description}</p>}
  </div>
);

const About = () => {
  const stats = [
    { label: 'Projects Built', value: '5+' },
    { label: 'Certifications', value: '6+' },
    { label: 'Internships', value: '2' },
    { label: 'Technologies', value: '12+' },
  ];

  return (
    <section id="about" className="py-12 max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative group"
        >
          <div className="aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-500/10 border-[12px] border-white relative z-10 transition-transform duration-700 group-hover:scale-[1.02]">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=face" 
              alt="K.C. Balaji"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-indigo-600/5 rounded-[3rem] -z-10 blur-3xl" />
          <div className="absolute -top-8 -left-8 w-48 h-48 border-2 border-indigo-100/50 rounded-[3rem] -z-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeader label="About Me" title="Who I Am" />
          <div className="space-y-6 sm:space-y-8 text-neutral-500 text-base sm:text-lg leading-relaxed font-light">
            <p>
              I'm a Computer Science & AI undergraduate at <strong className="text-neutral-900 font-bold">St. John's College of Engineering and Technology</strong> with a strong foundation across <strong className="text-indigo-600 font-bold">Java full-stack development</strong>, <strong className="text-neutral-900 font-bold">data analytics</strong>, and <strong className="text-neutral-900 font-bold">AI/ML engineering</strong>.
            </p>
            <p>
              On the backend I build with <strong>Java, Spring, Servlets & JDBC</strong>; on the frontend with <strong>React, HTML5, CSS3 & JavaScript</strong>. I apply <strong>Python, Pandas & Scikit-learn</strong> for data analysis and machine learning, and leverage <strong>AWS</strong> for cloud deployments.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16">
            {stats.map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-display font-extrabold text-indigo-600 mb-2">{stat.value}</p>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillGroups = [
    {
      title: 'Java & Backend',
      icon: Terminal,
      skills: [
        { name: 'Java', level: 85 },
        { name: 'Spring', level: 75 },
        { name: 'Servlets', level: 70 },
        { name: 'JDBC', level: 75 },
        { name: 'SQL', level: 70 },
      ]
    },
    {
      title: 'Full-Stack & Frontend',
      icon: Layers,
      skills: [
        { name: 'HTML5', level: 95 },
        { name: 'CSS3', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'React', level: 80 },
        { name: 'Django', level: 75 },
      ]
    },
    {
      title: 'Data & AI/ML',
      icon: Brain,
      skills: [
        { name: 'Python', level: 80 },
        { name: 'Pandas', level: 75 },
        { name: 'Scikit-learn', level: 70 },
        { name: 'TensorFlow', level: 70 },
        { name: 'AWS', level: 75 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader label="Expertise" title="Skills & Technologies" />
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[2.5rem] shadow-xl shadow-indigo-500/5 border border-white/40"
            >
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                  <group.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">{group.title}</h3>
              </div>
              
              <div className="space-y-8">
                {group.skills.map((skill, j) => (
                  <div key={j}>
                    <div className="flex justify-between mb-3">
                      <span className="text-sm font-bold text-neutral-800">{skill.name}</span>
                      <span className="text-xs font-mono font-bold text-indigo-600">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "circOut", delay: 0.3 + (j * 0.1) }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'Attendance Management System',
      description: 'Full-stack web app for managing student attendance with automated report generation.',
      tags: ['Python', 'Django', 'SQLite'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      link: 'https://github.com/balu105/attendance'
    },
    {
      title: 'Data Analysis Dashboard',
      description: 'Interactive data analytics dashboard with rich visualizations powered by Python.',
      tags: ['Python', 'Pandas', 'Streamlit'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&crop=right',
      link: 'https://github.com/balu105/dashboard'
    },
    {
      title: 'Voice Grammar Corrector',
      description: 'AI-powered real-time spoken grammar correction using NLP & speech recognition.',
      tags: ['Python', 'NLP', 'Flask'],
      image: 'https://images.unsplash.com/photo-1589254065909-b7086229d08c?w=800&q=80',
      link: 'https://github.com/balu105/grammer_corrector_app',
      live: 'https://grammer-corrector-app-2.onrender.com/'
    },
    {
      title: 'Personal Portfolio Website',
      description: 'Responsive portfolio with particle effects, scroll animations and modern design.',
      tags: ['React', 'Motion', 'Tailwind'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      link: 'https://github.com/balu105/Portfolio'
    },
    {
      title: 'Employee Performance Prediction',
      description: 'ML model predicting employee performance from historical data for HR decisions.',
      tags: ['Python', 'Scikit-learn', 'ML'],
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
      link: 'https://github.com/balu105/employee_performance_prediction',
      live: 'https://employee-performance-prediction-5.onrender.com/'
    }
  ];

  return (
    <section id="projects" className="py-12 max-w-7xl mx-auto px-6">
      <SectionHeader label="Portfolio" title="Featured Projects" />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group glass rounded-[2.5rem] overflow-hidden border border-white/40 hover:border-indigo-200/50 transition-all duration-500 hover:shadow-[0_32px_64px_-16px_rgba(79,70,229,0.1)]"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-indigo-900/5 group-hover:bg-indigo-900/0 transition-colors duration-500" />
              <div className="absolute top-6 right-6">
                <div className="glass p-3 rounded-2xl text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 shadow-xl">
                  <ExternalLink size={20} />
                </div>
              </div>
            </div>
            
            <div className="p-8 sm:p-10">
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, j) => (
                  <span key={j} className="px-3 py-1 bg-indigo-50/50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-indigo-100/50">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300 tracking-tight">{project.title}</h3>
              <p className="text-neutral-500 text-sm sm:text-base mb-8 leading-relaxed line-clamp-2 font-light">{project.description}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                <div className="flex gap-4">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-indigo-600 transition-all"
                  >
                    <Github size={18} /> Code
                  </a>
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:gap-3 transition-all"
                    >
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                </div>
                {!project.live && <ChevronRight size={20} className="text-neutral-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: 'AWS Cloud Internship',
      company: 'APSSDC',
      date: 'Jun 2024 – Jul 2024',
      description: 'Built a File Storage & Sharing project on AWS. Gained hands-on experience with S3, EC2, IAM and cloud architecture.',
      icon: Cloud
    },
    {
      title: 'Machine Learning Internship',
      company: 'SmartInternz',
      date: 'Aug 2025 – Oct 2025',
      description: 'Developed end-to-end ML pipelines — data preprocessing, feature engineering, model training, evaluation & deployment.',
      icon: Brain
    }
  ];

  return (
    <section id="experience" className="py-12 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-10 text-center md:text-left">
          <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-3 block">Career</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-neutral-900">Experience & Internships</h2>
        </div>
        
        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex gap-6 sm:gap-10 relative group"
            >
              <div className="hidden md:flex flex-col items-center">
                <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center text-indigo-600 shadow-xl shadow-indigo-500/5 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
                  <exp.icon size={28} />
                </div>
                {i !== experiences.length - 1 && <div className="w-px h-full bg-gradient-to-b from-indigo-100 to-transparent mt-6" />}
              </div>
              
              <div className="glass p-8 sm:p-10 rounded-[2.5rem] border border-white/50 hover:border-indigo-200/50 transition-all duration-500 flex-1 shadow-xl shadow-neutral-200/20 hover:shadow-[0_32px_64px_-16px_rgba(79,70,229,0.08)]">
                <div className="flex flex-wrap justify-between items-start gap-4 sm:gap-6 mb-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1 text-neutral-900 group-hover:text-indigo-600 transition-colors">{exp.title}</h3>
                    <p className="text-indigo-600 font-bold text-sm sm:text-base">{exp.company}</p>
                  </div>
                  <span className="px-4 py-1.5 sm:px-5 sm:py-2 glass rounded-full text-[10px] sm:text-xs font-bold text-neutral-500 border border-neutral-200 group-hover:border-indigo-200 group-hover:text-indigo-600 transition-all">
                    {exp.date}
                  </span>
                </div>
                <p className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-3xl font-light">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  const education = [
    {
      degree: 'B.Tech — CS & Artificial Intelligence',
      school: "St. John's College of Engg & Tech",
      date: 'Sep 2022 – May 2026',
      score: 'CGPA: 7.5 / 10'
    },
    {
      degree: 'Intermediate (MPC)',
      school: 'Govt Junior College, Yemmiganur',
      date: 'Jul 2020 – May 2022',
      score: 'Score: 88.1%'
    },
    {
      degree: 'Secondary Education',
      school: 'Govt High School, Yemmiganur',
      date: 'Mar 2019 – May 2020',
      score: 'CGPA: 10 / 10'
    }
  ];

  return (
    <section id="education" className="py-12 max-w-7xl mx-auto px-6">
      <SectionHeader label="Academics" title="Education" />
      
      <div className="grid md:grid-cols-3 gap-10">
          {education.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 sm:p-10 glass rounded-[2.5rem] border border-white/40 shadow-xl shadow-neutral-200/20 hover:shadow-[0_32px_64px_-16px_rgba(79,70,229,0.08)] hover:border-indigo-200/50 transition-all duration-500 group"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 glass text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-lg group-hover:scale-110 group-hover:-rotate-3">
              < GraduationCap size={28} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">{edu.degree}</h3>
            <p className="text-indigo-600 font-bold text-xs sm:text-sm mb-6">{edu.school}</p>
            <div className="flex justify-between items-center pt-6 border-t border-neutral-100">
              <span className="text-[9px] sm:text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{edu.date}</span>
              <span className="text-xs sm:text-sm font-bold text-neutral-900">{edu.score}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Certifications = () => {
  const certs = [
    {
      title: 'Python Programming',
      issuer: 'Guvi | HCL',
      description: 'Python basics, data types, control flow, and scripting projects.',
      link: 'https://github.com/balu105/Portfolio/blob/main/Guvi-python.jpg'
    },
    {
      title: 'Python',
      issuer: 'Skill India Digital Hub',
      description: 'Python fundamentals, problem-solving, and small projects.',
      link: 'https://github.com/balu105/Portfolio/blob/main/SIDH-python.jpg'
    },
    {
      title: 'Java Programming',
      issuer: 'Infosys Springboard',
      description: 'Java syntax, OOP concepts, loops, and console applications.',
      link: 'https://github.com/balu105/Portfolio/blob/main/java-Infosys.pdf'
    },
    {
      title: 'SQL',
      issuer: 'Sololearn',
      description: 'Database queries, table management, joins, and data retrieval.',
      link: 'https://github.com/balu105/Portfolio/blob/main/sololearn-SQL.jpg'
    },
    {
      title: 'JDBC',
      issuer: 'Simplilearn',
      description: 'Java database connectivity, CRUD operations, and practical examples.',
      link: 'https://github.com/balu105/Portfolio/blob/main/simplilearn-JDBC.jpg'
    },
    {
      title: 'Data Analytics',
      issuer: 'Cisco Foundation',
      description: 'Dataset analysis, visualization, and real-world analytics techniques.',
      link: 'https://github.com/balu105/Portfolio/blob/main/cisco-data%20analysis.pdf'
    }
  ];

  return (
    <section id="certifications" className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader label="Credentials" title="Certifications" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group p-8 glass rounded-3xl border border-white/40 hover:border-indigo-300 transition-all duration-500 flex flex-col shadow-lg shadow-indigo-500/5 hover:shadow-indigo-500/10"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-500">
                  <Award size={24} />
                </div>
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 glass rounded-xl text-neutral-400 hover:text-indigo-600 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-indigo-600 transition-colors">{cert.title}</h3>
              <p className="text-indigo-600 text-sm font-bold mb-4">{cert.issuer}</p>
              <p className="text-neutral-500 text-base leading-relaxed flex-1">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/xzdaqbpb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-12 max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeader label="Reach Out" title="Get In Touch" />
          <p className="text-neutral-500 text-base sm:text-lg mb-12 leading-relaxed font-light">
            Whether it's a Java backend role, a full-stack project, a data analysis task, or an AI/ML challenge — I'm excited to connect and contribute.
          </p>
          
          <div className="flex justify-start gap-6">
            {[
              { icon: Github, href: "https://github.com/balu105" },
              { icon: Linkedin, href: "https://linkedin.com/in/" },
              { icon: Mail, href: "mailto:balajikc89@gmail.com" }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -5 }}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-neutral-100 text-neutral-600 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass p-10 md:p-16 rounded-[3rem] border border-white/50 shadow-2xl shadow-indigo-500/5"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Name</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="John Doe"
                  className="input-field"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="john@example.com"
                  className="input-field"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Message</label>
              <textarea 
                rows={4} 
                name="message"
                placeholder="How can I help you?"
                className="input-field resize-none"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full py-5 text-base flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>Sending... <Loader2 className="animate-spin" size={20} /></>
              ) : status === 'success' ? (
                <>Sent Successfully! <CheckCircle2 size={20} /></>
              ) : status === 'error' ? (
                <>Error Sending. Try Again</>
              ) : (
                <>Send Message <Send size={20} /></>
              )}
            </button>
            {status === 'success' && (
              <p className="text-center text-emerald-600 text-sm font-medium animate-pulse">
                Thank you! Your message has been received.
              </p>
            )}
            {status === 'error' && (
              <p className="text-center text-rose-600 text-sm font-medium">
                Something went wrong. Please try again later.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-20 border-t border-neutral-100">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
      <div className="flex flex-col items-center md:items-start gap-4">
        <a href="#" className="text-3xl font-display font-bold text-indigo-600 tracking-tight">
          KC.<span className="text-neutral-900">Balaji</span>
        </a>
        <p className="text-neutral-400 text-sm font-medium max-w-xs text-center md:text-left">
          Building the future with Java, AI, and Data Analytics.
        </p>
      </div>
      
      <div className="flex flex-col items-center md:items-end gap-6">
        <div className="flex gap-6">
          {[
            { icon: Github, href: "https://github.com/balu105" },
            { icon: Linkedin, href: "https://linkedin.com/in/" },
            { icon: Mail, href: "mailto:balajikc89@gmail.com" }
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -5 }}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-neutral-100 text-neutral-600 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all"
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </div>
        <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          © 2025 K.C. Balaji. Crafted with passion.
        </p>
      </div>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-2xl shadow-2xl flex items-center justify-center z-50 hover:bg-indigo-700 transition-all active:scale-90"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
