import './App.css'
import { SocialIcon } from 'react-social-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import bronxImage from './assets/BRONX.jpg'

function App() {
  // State to control intro visibility
  const [showIntro, setShowIntro] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  // Hide intro after animation completes
  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true); // Start exit animation
    }, 2300); // Start exit slightly before hide

    const hideTimer = setTimeout(() => {
      setShowIntro(false);
    }, 2500); // Hide after 4 seconds (after name animation completes)

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty('--scroll-progress', scrollPercent.toFixed(4));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEmailClick = () => {
    window.location.href = 'mailto:tyrellakkeem@gmail.com';
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/adonisja', '_blank', 'noopener,noreferrer');
  };

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/akkeem-tyrell', '_blank', 'noopener,noreferrer');
  };

  const handleViewWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetInTouch = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation variants for scroll-triggered animations
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Special name reveal animation variants
  const nameReveal = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.5,
        delayChildren: 0.3
      }
    }
  };

  const slideInLeft = {
    initial: { x: -150, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300,
        duration: 0.8,
        delay: 1.2 // Start after slash appears
      }
    }
  };

  const slideInRight = {
    initial: { x: 150, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300,
        duration: 0.8,
        delay: 1.2 // Same timing as left - simultaneous snap
      }
    }
  };

  const slashFadeIn = {
    initial: { y: 30, opacity: 0, scale: 0.8 },
    animate: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 400,
        delay: 0.5, // Appears first
        duration: 0.6
      }
    }
  };

  // Full-screen intro overlay animation
  const introOverlay = {
    initial: { opacity: 1, scale: 1, rotate: 0 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { 
      opacity: 0,
      scale: 0.05,
      rotate: 1080, // Three full rotations for dramatic spiral
      transition: {
        duration: 1.2,
        ease: "easeInOut" as const,
        scale: { 
          ease: [0.25, 0.46, 0.45, 0.94], // Custom bezier for smooth acceleration
          duration: 1.2 
        },
        rotate: { 
          ease: "easeOut" as const,
          duration: 1.2 
        },
        opacity: { 
          ease: "easeInOut" as const,
          duration: 0.6,
          delay: 0.6 // Start fading in the last half
        }
      }
    }
  };

  // Main portfolio content animation
  const portfolioContent = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 1,
        delay: showIntro ? 0 : 0.5, // Delay only when intro is gone
        ease: "easeInOut" as const
      }
    }
  };
  return (
    <div className="portfolio">
      {/* Full-Screen Intro Overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="intro-overlay"
            data-exiting={isExiting}
            variants={introOverlay}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div 
              className="name-reveal"
              variants={nameReveal}
              initial="initial"
              animate="animate"
            >
              <motion.span 
                className="name-part first-name"
                variants={slideInLeft}
              >
                Akkeem
              </motion.span>
              <motion.span 
                className="name-slash"
                variants={slashFadeIn}
              >
                /
              </motion.span>
              <motion.span 
                className="name-part last-name"
                variants={slideInRight}
              >
                Tyrell
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Portfolio Content */}
      <motion.div
        className="portfolio-main"
        variants={portfolioContent}
        initial="initial"
        animate={!showIntro ? "animate" : "initial"}
      >
        <header className="header">
          <div className="container-full">
            <nav className="nav">
              <h1 className="logo">Cybersecurity Analyst in the Making</h1>
              <ul className="nav-links">
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <main>
          <section id="hero" className="hero">
            <div className="hero-container">
              <div className="hero-content">
                <div className="hero-text">
                  <h2 className="hero-title">
                    <span className="title-line">Akkeem</span>
                    <span className="title-line">Tyrell</span>
                  </h2>
                  <div className="hero-subtitle">
                    <span className="subtitle-accent">Cybersecurity Analyst</span>
                    <span className="subtitle-main">in the Making</span>
                  </div>
                  <p className="hero-description">
                    I'm a student developer passionate about crafting new experiences.
                    I love exploring new technologies, tools, and strategies
                    with the aim to offer innovative and user-friendly solutions.
                  </p>
                  <div className="hero-cta">
                    <button className="cta-primary" onClick={handleViewWork}>View My Work</button>
                    <button className="cta-secondary" onClick={handleGetInTouch}>Get In Touch</button>
                  </div>
                </div>
                <div className="hero-image">
                  <div className="image-container">
                    <img src={bronxImage} alt="Bronx skyline" className="bronx-image" />
                    <div className="image-overlay"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>        <motion.section 
          id="about" 
          className="about"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInLeft}
        >
          <div className="container-narrow">
            <motion.h2 variants={fadeInUp}>About Me</motion.h2>
            <motion.p variants={fadeInUp}>
              I'm a passionate developer with experience in modern web technologies. 
              I love building applications that solve real-world problems and provide 
              great user experiences.
            </motion.p>
          </div>
        </motion.section>

        <motion.section 
          id="projects" 
          className="projects"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInRight}
        >
          <div className="container-full">
            <motion.h2 variants={fadeInUp}>My Projects</motion.h2>
            <motion.div 
              className="projects-grid"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Keynote Project - Diabeto */}
              <motion.div className="project-card keynote-project" variants={fadeInUp}>
                <div className="project-content">
                  <div className="keynote-badge">
                    <span>🏆 Keynote Project</span>
                  </div>
                  <h3>Diabeto - Comprehensive Diabetes Management Platform</h3>
                  <div className="project-subtitle">Full-Stack React Native Mobile Application</div>
                
                <div className="project-highlights">
                  <div className="highlight-item">
                    <span className="highlight-icon">🎯</span>
                    <span>Healthcare Technology Solution</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">🔒</span>
                    <span>HIPAA-Compliant Security</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">📱</span>
                    <span>Cross-Platform Mobile App</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">⚡</span>
                    <span>Real-time Data Sync</span>
                  </div>
                </div>

                <p className="project-description">
                  Introductory Diabetes Care platform connecting patients, caregivers, and healthcare providers through 
                  intelligent monitoring, secure communication, and collaborative healthcare features. Built with React Native, 
                  TypeScript, and Firebase with enterprise-grade security and compliance standards.
                </p>

                <div className="tech-stack">
                  <span className="tech-tag">React Native</span>
                  <span className="tech-tag">TypeScript</span>
                  <span className="tech-tag">Firebase</span>
                  <span className="tech-tag">Expo SDK</span>
                  <span className="tech-tag">OAuth 2.0</span>
                  <span className="tech-tag">Firestore</span>
                </div>

                <div className="project-achievements">
                  <h4>Key Achievements:</h4>
                  <ul>
                    <li>Multi-tenant architecture with role-based access control</li>
                    <li>Native authentication with Google OAuth integration</li>
                    <li>Real-time monitoring and emergency alert system</li>
                    <li>100% TypeScript coverage with production-ready codebase</li>
                  </ul>
                </div>

                <div className="project-links">
                  <a href="#" target="_blank" rel="noopener noreferrer">📱 Demo Video</a>
                  <a href="https://github.com/adonisja/Diabeto" target="_blank" rel="noopener noreferrer">📋 See Code</a>
                  <a href="#" target="_blank" rel="noopener noreferrer">📄 Case Study</a>
                </div>
                </div> {/* Close project-content */}
              </motion.div>
              
              <motion.div className="project-card" variants={fadeInUp}>
                <div className="project-content">
                  <h3>IMDB Query Hub</h3>
                  <div className="project-subtitle">React Native Mobile Application</div>
                  
                  <div className="project-highlights">
                    <div className="highlight-item">
                      <span className="highlight-icon">🎬</span>
                      <span>Movie Database Explorer</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">🔍</span>
                      <span>Smart Search Engine</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">📱</span>
                      <span>Netflix-Inspired Design</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">💾</span>
                      <span>SQLite Integration</span>
                    </div>
                  </div>
                  
                  <p className="project-description">
                    A comprehensive mobile application that provides users with an intuitive interface to explore and search movie databases. 
                    Features a Netflix-inspired dark theme design with advanced querying capabilities for discovering movies, directors, and actors. 
                    Includes smart search functionality, dynamic movie discovery with trending carousels, and interactive director cards with 
                    collapsible profiles and detailed filmography.
                  </p>

                  <div className="tech-stack">
                    <span className="tech-tag">React Native</span>
                    <span className="tech-tag">Expo</span>
                    <span className="tech-tag">SQLite</span>
                    <span className="tech-tag">JavaScript</span>
                    <span className="tech-tag">React Navigation</span>
                    <span className="tech-tag">FlatList</span>
                  </div>

                  <div className="project-achievements">
                    <h4>Key Features:</h4>
                    <ul>
                      <li>Free-text search across movie titles, directors, and actors with real-time suggestions</li>
                      <li>Dynamic movie discovery with trending movies carousel and poster displays</li>
                      <li>Category-based browsing with directors, top-rated movies, and popular actors</li>
                      <li>Interactive director cards with collapsible profiles and movie count</li>
                      <li>Performance optimization with FlatList for smooth scrolling and memory efficiency</li>
                    </ul>
                  </div>

                  <div className="project-links">
                    <a href="#" target="_blank" rel="noopener noreferrer">🎬 Demo Video</a>
                    <a href="https://github.com/adonisja/CS355-Finals" target="_blank" rel="noopener noreferrer">📋 GitHub Code</a>
                  </div>
                </div>
              </motion.div>
              
              <motion.div className="project-card" variants={fadeInUp}>
                <div className="project-content">
                  <h3>TikTok Reviews Sentiment Analysis</h3>
                  <div className="project-subtitle">Data Science & Machine Learning Project</div>
                  
                  <div className="project-highlights">
                    <div className="highlight-item">
                      <span className="highlight-icon">📊</span>
                      <span>Exploratory Data Analysis</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">🤖</span>
                      <span>Sentiment Classification Models</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">💬</span>
                      <span>Natural Language Processing (NLP)</span>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">📈</span>
                      <span>Insightful Visualizations</span>
                    </div>
                  </div>
                  
                  <p className="project-description">
                    This project leverages data science and machine learning techniques to analyze user sentiment in TikTok app reviews. 
                    Using a dataset of real user feedback, the workflow includes data cleaning, exploratory data analysis, and the application 
                    of sentiment analysis models to classify reviews as positive, negative, or neutral. The project demonstrates skills in data 
                    preprocessing, natural language processing (NLP), and visualization, providing actionable insights into user perceptions and 
                    trends related to TikTok’s features and updates.
                  </p>

                  <div className="tech-stack">
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">Pandas</span>
                    <span className="tech-tag">NumPy</span>
                    <span className="tech-tag">NLTK</span>
                    <span className="tech-tag">scikit-learn</span>
                    <span className="tech-tag">Matplotlib</span>
                    <span className="tech-tag">Seaborn</span>
                  </div>

                  <div className="project-achievements">
                    <h4>Key Steps & Features:</h4>
                    <ul>
                      <li>Data cleaning and preprocessing of real TikTok user reviews</li>
                      <li>Exploratory data analysis to uncover trends and patterns</li>
                      <li>Sentiment analysis using machine learning models</li>
                      <li>Classification of reviews as positive, negative, or neutral</li>
                      <li>Visualization of sentiment trends and feature-based insights</li>
                    </ul>
                  </div>

                  <div className="project-links">
                    <a href="#" target="_blank" rel="noopener noreferrer">📊 Project Report</a>
                    <a href="#" target="_blank" rel="noopener noreferrer">📋 GitHub Code</a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="skills" 
          className="skills"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInLeft}
        >
          <div className="container-wide">
            <motion.h2 variants={fadeInUp}>Skills & Technologies</motion.h2>
            
            {/* Frontend Skills Conveyor */}
            <div className="conveyor-container">
              <div className="conveyor-belt frontend-belt">
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                  <span>React</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" />
                  <span>TypeScript</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
                  <span>JavaScript</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" />
                  <span>HTML5</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" />
                  <span>CSS3</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" />
                  <span>Next.js</span>
                </div>
                {/* Second set for seamless loop */}
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                  <span>React</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" />
                  <span>TypeScript</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
                  <span>JavaScript</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" />
                  <span>HTML5</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" />
                  <span>CSS3</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" />
                  <span>Next.js</span>
                </div>
                {/* Third set for extra seamlessness */}
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                  <span>React</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" />
                  <span>TypeScript</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
                  <span>JavaScript</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" />
                  <span>HTML5</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" />
                  <span>CSS3</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" />
                  <span>Next.js</span>
                </div>
              </div>
            </div>

            {/* Backend Skills Conveyor */}
            <div className="conveyor-container">
              <div className="conveyor-belt backend-belt">
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
                  <span>Python</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" />
                  <span>C++</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
                  <span>Node.js</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" />
                  <span>Express</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" />
                  <span>MySQL</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
                  <span>MongoDB</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" />
                  <span>PostgreSQL</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" />
                  <span>Firebase</span>
                </div>
                {/* Second set for seamless loop */}
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
                  <span>Python</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" />
                  <span>C++</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
                  <span>Node.js</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" />
                  <span>Express</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" />
                  <span>MySQL</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
                  <span>MongoDB</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" />
                  <span>PostgreSQL</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" />
                  <span>Firebase</span>
                </div>
              </div>
            </div>

            {/* Tools & Cybersecurity Conveyor */}
            <div className="conveyor-container">
              <div className="conveyor-belt tools-belt">
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" />
                  <span>Git</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
                  <span>GitHub</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" alt="Jupyter" />
                  <span>Jupyter</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" alt="Postman" />
                  <span>Postman</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" />
                  <span>VS Code</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" />
                  <span>Docker</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" />
                  <span>Linux</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" alt="Bash" />
                  <span>Bash</span>
                </div>
                <div className="skill-item">
                  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS" />
                  <span>AWS</span>
                </div>
                {/* Second set for seamless loop */}
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" />
                  <span>Git</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
                  <span>GitHub</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" alt="Jupyter" />
                  <span>Jupyter</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" alt="Postman" />
                  <span>Postman</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" />
                  <span>VS Code</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" />
                  <span>Docker</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" />
                  <span>Linux</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" alt="Bash" />
                  <span>Bash</span>
                </div>
                <div className="skill-item">
                  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS" />
                  <span>AWS</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="contact" 
          className="contact"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="container-narrow">
            <motion.h2 variants={fadeInUp}>Get In Touch</motion.h2>
            <motion.p variants={fadeInUp}>I'm always open to discussing new opportunities and interesting projects.</motion.p>
            <motion.div 
              className="contact-links"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div className="social-button-group" onClick={handleEmailClick} variants={fadeInUp}>
                <SocialIcon 
                  url="mailto:tyrellakkeem@gmail.com" 
                  className="social-icon"
                  style={{ height: 60, width: 60 }}
                />
                <span className="social-label">Email</span>
              </motion.div>
              
              <motion.div className="social-button-group" onClick={handleGitHubClick} variants={fadeInUp}>
                <SocialIcon 
                  url="https://github.com/adonisja" 
                  target="_blank"
                  className="social-icon"
                  style={{ height: 60, width: 60 }}
                />
                <span className="social-label">GitHub</span>
              </motion.div>
              
              <motion.div className="social-button-group" onClick={handleLinkedInClick} variants={fadeInUp}>
                <SocialIcon 
                  url="https://www.linkedin.com/in/akkeem-tyrell" 
                  target="_blank"
                  className="social-icon"
                  style={{ height: 60, width: 60 }}
                />
                <span className="social-label">LinkedIn</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <footer className="footer">
        <div className="container-narrow">
          <p>&copy; 2025 Akkeem Tyrell. All rights reserved.</p>
        </div>
      </footer>
      </motion.div>
    </div>
  )
}

export default App
