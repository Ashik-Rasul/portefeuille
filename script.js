/* ============================================
   ASHIK RASUL — PORTFOLIO JAVASCRIPT
   Matrix Rain | Terminal | Animations | Nav
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMatrixRain();
  initNavbar();
  initTerminal();
  initScrollAnimations();
  initCurrentYear();
  initSmoothScrollLinks();
});

/* ============================================
   MATRIX RAIN EFFECT
   ============================================ */
function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, columns, drops;

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF{}[]<>/\\|;:+=*&^%$#@!~`';
  const fontSize = 14;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = new Array(columns).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Vary brightness
      const alpha = 0.5 + Math.random() * 0.5;
      ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
      ctx.fillText(char, x, y);

      // Head character (brighter)
      if (Math.random() > 0.975) {
        ctx.fillStyle = 'rgba(180, 255, 180, 0.9)';
        ctx.fillText(char, x, y);
      }

      if (y > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  resize();
  window.addEventListener('resize', resize);

  // Run at ~30fps for performance
  setInterval(draw, 33);
}

/* ============================================
   NAVBAR
   ============================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;

    // Update active nav link
    updateActiveNav();
  });

  // Mobile toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
    });
  }

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ============================================
   INTERACTIVE TERMINAL
   ============================================ */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  if (!input || !output) return;

  const commands = {
    help: () => [
      '<span class="term-cmd">[+] Available commands:</span>',
      '  help        — show this message',
      '  whoami      — about me',
      '  skills      — list my skills',
      '  projects    — view projects',
      '  education   — education history',
      '  contact     — how to reach me',
      '  clear       — clear terminal',
      '  neofetch    — system info',
      '  echo [msg]  — print a message',
      '  date        — current date/time',
      '  uname       — system information',
    ],
    whoami: () => [
      '<span class="term-cmd">[+] Ashik Rasul (ash0x)</span>',
      '  Cybersecurity Enthusiast',
      '  CTF Player | Developer',
      '  Currently pursuing B.Tech CSE',
      '  @ Sathyabama Institute of Science and Technology',
    ],
    skills: () => [
      '<span class="term-cmd">[+] Technical Skills:</span>',
      '  Offensive : Burp Suite, Nmap, sqlmap',
      '  Defensive : Wireshark, Snort',
      '  Languages : Python, Bash, Powershell',
      '  Tools     : Linux, Git, Docker, Kali, VirtualBox',
      '  Forensics : Autopsy, ExifTool, CyberChef',
    ],
    projects: () => [
      '<span class="term-cmd">[+] Projects:</span>',
      '  1. Smart Log Analyzer Intrusion Detector [ACTIVE]',
      '',
      '  → Visit <a href="#projects" style="color:#00ff41">~/projects</a> for details',
    ],
    education: () => [
      '<span class="term-cmd">[+] Education:</span>',
      '  [✓] Gurukshetra Public School — Completed',
      '  [~] Sathyabama Institute — Pursuing B.Tech CSE',
    ],
    contact: () => [
      '<span class="term-cmd">[+] Contact:</span>',
      '  GitHub   → <a href="https://github.com/Ashik-Rasul" target="_blank" style="color:#00ff41">github.com/Ashik-Rasul</a>',
      '  LinkedIn → <a href="https://www.linkedin.com/in/ashik-rasul8ash0x" target="_blank" style="color:#00ff41">linkedin.com/in/ashik-rasul8ash0x</a>',
      '  Instagram→ <a href="https://www.instagram.com/_.shehab._.official._?igsh=cDJzYW5rbGVpZGU=" target="_blank" style="color:#00ff41">instagram.com/_.shehab._.official._</a>',
    ],
    neofetch: () => [
      '  <span style="color:#00ff41">       ▄▄▄▄▄▄▄       </span>  <span class="term-cmd">ash0x@portfolio</span>',
      '  <span style="color:#00ff41">     ▄█████████▄     </span>  ─────────────────',
      '  <span style="color:#00ff41">   ▄███████████████▄  </span>  OS: HackerOS 1.0',
      '  <span style="color:#00ff41">  ████████████████████ </span>  Host: portfolio.ashik',
      '  <span style="color:#00ff41">  ████████████████████ </span>  Kernel: security-5.15',
      '  <span style="color:#00ff41">  ████████████████████ </span>  Shell: bash 5.2.21',
      '  <span style="color:#00ff41">   ▀███████████████▀  </span>  Resolution: 1920x1080',
      '  <span style="color:#00ff41">     ▀█████████▀     </span>  Theme: Matrix [Dark]',
      '  <span style="color:#00ff41">       ▀▀▀▀▀▀▀       </span>  Terminal: xterm-256',
    ],
    date: () => [
      `  ${new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })}`,
    ],
    uname: () => [
      '  HackerOS 1.0.0 portfolio x86_64 GNU/Linux',
    ],
    clear: () => 'CLEAR',
  };

  // Focus on click
  const terminalWindow = document.querySelector('.terminal-window');
  if (terminalWindow) {
    terminalWindow.addEventListener('click', () => input.focus());
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      input.value = '';

      if (!cmd) return;

      // Echo the command
      const cmdLine = document.createElement('div');
      cmdLine.className = 'terminal-line';
      cmdLine.innerHTML = `<span class="term-user">ashik@portfolio</span>:<span class="term-path">~</span>$ <span class="term-cmd">${escapeHtml(cmd)}</span>`;
      output.appendChild(cmdLine);

      // Handle echo
      if (cmd.startsWith('echo ')) {
        const msg = cmd.substring(5);
        const outLine = document.createElement('div');
        outLine.className = 'terminal-line output';
        outLine.textContent = msg;
        output.appendChild(outLine);
      }
      // Handle known commands
      else if (commands[cmd]) {
        const result = commands[cmd]();
        if (result === 'CLEAR') {
          output.innerHTML = '';
        } else {
          result.forEach(line => {
            const outLine = document.createElement('div');
            outLine.className = 'terminal-line output';
            outLine.innerHTML = line;
            output.appendChild(outLine);
          });
        }
      }
      // Unknown command
      else {
        const errLine = document.createElement('div');
        errLine.className = 'terminal-line output';
        errLine.innerHTML = `<span style="color:#ff4444">bash: ${escapeHtml(cmd)}: command not found</span>`;
        output.appendChild(errLine);
        const helpHint = document.createElement('div');
        helpHint.className = 'terminal-line output';
        helpHint.innerHTML = `<span style="color:#8b949e">Type 'help' for available commands</span>`;
        output.appendChild(helpHint);
      }

      // Scroll to bottom
      output.scrollTop = output.scrollHeight;
    }
  });

  // Move cursor indicator
  input.addEventListener('input', () => {
    const cursor = document.getElementById('cursor-display');
    if (cursor) {
      // Position cursor after text
      // Approximate by measuring input value length
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ============================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================ */
function initScrollAnimations() {
  // Add reveal classes to elements
  const revealElements = [
    '.section-header',
    '.about-card',
    '.about-education',
    '.timeline-item',
    '.skill-category',
    '.project-card',
    '.writeup-card',
    '.archive-year',
    '.archive-entry',
  ];

  revealElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal');
    });
  });

  // Add stagger to grids
  const staggerGrids = [
    '.skills-grid',
    '.projects-grid',
    '.writeups-grid',
  ];

  staggerGrids.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal-stagger');
    });
  });

  // Create observer
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    observer.observe(el);
  });
}

/* ============================================
   SMOOTH SCROLL FOR NAV LINKS
   ============================================ */
function initSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
        const targetPos = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth',
        });
      }
    });
  });
}

/* ============================================
   CURRENT YEAR
   ============================================ */
function initCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
