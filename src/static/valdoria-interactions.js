// Valdoria Digital Garden - Interactive Features
class ValdoriaInteractions {
  constructor() {
    this.initializeDarkMode();
    this.initializeMobileMenu();
    this.initializeScrollEffects();
    this.initializeSearch();
    this.initializeTooltips();
    this.initializeImageModal();
  }

  // Dark Mode Toggle
  initializeDarkMode() {
    // Erstelle Dark Mode Button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.setAttribute('aria-label', 'Dark Mode umschalten');
    document.body.appendChild(darkModeToggle);

    // Check für gespeicherte Präferenz
    const savedMode = localStorage.getItem('valdoria-dark-mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode === 'enabled' || (!savedMode && prefersDark)) {
      document.body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '☀️';
    }

    // Toggle Funktionalität
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      
      darkModeToggle.innerHTML = isDark ? '☀️' : '🌙';
      localStorage.setItem('valdoria-dark-mode', isDark ? 'enabled' : 'disabled');
      
      // Sanfte Transition
      document.body.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
    });
  }

  // Mobile Menu Toggle
  initializeMobileMenu() {
    // Erstelle Mobile Menu Button
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.innerHTML = '📚';
    mobileToggle.setAttribute('aria-label', 'Navigation öffnen');
    document.body.appendChild(mobileToggle);

    const sidebar = document.querySelector('.left-sidebar');
    
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      const isOpen = sidebar.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '✕' : '📚';
    });

    // Schließe Menu bei Klick außerhalb
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
        sidebar.classList.remove('open');
        mobileToggle.innerHTML = '📚';
      }
    });
  }

  // Scroll Effects
  initializeScrollEffects() {
    let lastScrollTop = 0;
    const toc = document.querySelector('.right-sidebar');
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Auto-hide/show TOC beim Scrollen
      if (toc) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          toc.style.transform = 'translateX(100%)';
        } else {
          toc.style.transform = 'translateX(0)';
        }
      }
      
      lastScrollTop = scrollTop;
      
      // Parallax Effekt für Hintergrund
      const bgOffset = scrollTop * 0.5;
      document.body.style.backgroundPosition = `0 ${bgOffset}px`;
    });

    // Smooth scrolling für interne Links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Enhanced Search
  initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    // Erstelle Search Results Container
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchResults.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--bg-content);
      border: 2px solid var(--border-decorative);
      border-top: none;
      border-radius: 0 0 6px 6px;
      max-height: 300px;
      overflow-y: auto;
      z-index: 1000;
      display: none;
    `;
    
    const searchContainer = searchInput.parentElement;
    searchContainer.style.position = 'relative';
    searchContainer.appendChild(searchResults);

    // Debounced Search
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
      }
      
      searchTimeout = setTimeout(() => {
        this.performSearch(query, searchResults);
      }, 300);
    });

    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchContainer.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  }

  performSearch(query, resultsContainer) {
    // Hier würdest du normalerweise eine echte Suchfunktion implementieren
    // Für Demo-Zwecke simulieren wir Ergebnisse
    const mockResults = [
      { title: 'Session 1 - Die Schatten von Ashheart', url: '/sessions/session-1/', excerpt: 'Die heiße Sonne von Ashheart...' },
      { title: 'Coslo Valcyne', url: '/charaktere/coslo-valcyne/', excerpt: 'Ein Halbelf aus den Steppen...' },
      { title: 'Valdoria', url: '/regionen/valdoria/', excerpt: 'Ein vielfältiger Kontinent...' }
    ].filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(query.toLowerCase())
    );

    if (mockResults.length > 0) {
      resultsContainer.innerHTML = mockResults.map(result => `
        <div class="search-result-item" style="
          padding: 12px;
          border-bottom: 1px solid var(--border-decorative);
          cursor: pointer;
          transition: background 0.2s ease;
        " onmouseover="this.style.background='var(--hover-bg)'" 
           onmouseout="this.style.background='transparent'"
           onclick="window.location.href='${result.url}'">
          <div style="font-weight: 600; color: var(--accent-royal); font-size: 14px;">
            ${result.title}
          </div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
            ${result.excerpt}
          </div>
        </div>
      `).join('');
      resultsContainer.style.display = 'block';
    } else {
      resultsContainer.innerHTML = `
        <div style="padding: 12px; text-align: center; color: var(--text-secondary); font-style: italic;">
          Keine Ergebnisse für "${query}" gefunden
        </div>
      `;
      resultsContainer.style.display = 'block';
    }
  }

  // Enhanced Tooltips
  initializeTooltips() {
    // Auto-create tooltips für Abkürzungen und Begriffe
    const terms = {
      'DM': 'Dungeon Master',
      'NPC': 'Non-Player Character',
      'PC': 'Player Character',
      'TP': 'Trefferpunkte',
      'AC': 'Armor Class (Rüstungsklasse)'
    };

    Object.entries(terms).forEach(([term, definition]) => {
      const regex = new RegExp(`\\b${term}\\b`, 'g');
      document.querySelectorAll('p, li').forEach(element => {
        if (element.querySelector('a, code')) return; // Skip elements with links or code
        
        element.innerHTML = element.innerHTML.replace(regex, 
          `<span class="tooltip" data-tooltip="${definition}">${term}</span>`
        );
      });
    });
  }

  // Image Modal
  initializeImageModal() {
    // Erstelle Modal für Bilder
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      cursor: pointer;
    `;

    const modalImg = document.createElement('img');
    modalImg.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      border: 3px solid var(--border-decorative);
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    `;

    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    // Klickbare Bilder
    document.querySelectorAll('article img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        modalImg.src = img.src;
        modal.style.display = 'flex';
      });
    });

    // Modal schließen
    modal.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // ESC Key zum Schließen
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
      }
    });
  }
}

// CSS für Dark Mode
const darkModeStyles = `
  .dark-mode {
    --bg-primary: var(--dark-bg-primary) !important;
    --bg-secondary: var(--dark-bg-secondary) !important;
    --bg-tertiary: var(--dark-bg-tertiary) !important;
    --bg-content: var(--dark-bg-content) !important;
    --text-primary: var(--dark-text-primary) !important;
    --text-secondary: var(--dark-text-secondary) !important;
    --border-decorative: var(--dark-border) !important;
  }
  
  .dark-mode .explorer-item {
    background: rgba(42, 35, 25, 0.3) !important;
  }
  
  .dark-mode .search-input {
    background: rgba(42, 35, 25, 0.9) !important;
    color: var(--dark-text-primary) !important;
  }
`;

// Style Tag hinzufügen
const styleSheet = document.createElement('style');
styleSheet.textContent = darkModeStyles;
document.head.appendChild(styleSheet);

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ValdoriaInteractions());
} else {
  new ValdoriaInteractions();
}
