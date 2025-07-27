// Valdoria D&D Campaign - Enhanced Interactions
class ValdoriaEnhanced {
  constructor() {
    this.initializeLayout();
    this.initializeMobileMenu();
    this.initializeDarkMode();
    this.initializeSearch();
    this.initializeScrollEffects();
    this.initializeTooltips();
    this.initializeSessionNavigation();
  }

  initializeLayout() {
    // Stelle sicher dass alle Layout-Elemente vorhanden sind
    if (!document.querySelector('.layout')) {
      document.body.classList.add('valdoria-enhanced');
    }
  }

  initializeMobileMenu() {
    // Mobile Menu Toggle Button erstellen
    if (!document.querySelector('.mobile-menu-toggle')) {
      const toggle = document.createElement('button');
      toggle.className = 'mobile-menu-toggle';
      toggle.innerHTML = '📚';
      toggle.setAttribute('aria-label', 'Navigation öffnen');
      document.body.appendChild(toggle);

      // Overlay erstellen
      if (!document.querySelector('.mobile-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        overlay.id = 'mobile-overlay';
        document.body.appendChild(overlay);
      }
    }

    // Event Listeners
    const toggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.left-sidebar');
    const overlay = document.querySelector('.mobile-overlay');

    if (toggle && sidebar && overlay) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        const isOpen = sidebar.classList.contains('open');
        toggle.innerHTML = isOpen ? '✕' : '📚';
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        toggle.innerHTML = '📚';
        document.body.style.overflow = '';
      });

      // Schließe bei internen Links
      sidebar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth < 768) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            toggle.innerHTML = '📚';
            document.body.style.overflow = '';
          }
        });
      });
    }
  }

  initializeDarkMode() {
    // Dark Mode Toggle Button
    if (!document.querySelector('.dark-mode-toggle')) {
      const toggle = document.createElement('button');
      toggle.className = 'dark-mode-toggle';
      toggle.innerHTML = '🌙';
      toggle.setAttribute('aria-label', 'Dark Mode umschalten');
      document.body.appendChild(toggle);
    }

    const toggle = document.querySelector('.dark-mode-toggle');
    
    // Check gespeicherte Präferenz
    const savedMode = localStorage.getItem('valdoria-dark-mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode === 'enabled' || (!savedMode && prefersDark)) {
      document.body.classList.add('dark-mode');
      toggle.innerHTML = '☀️';
    }

    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      
      toggle.innerHTML = isDark ? '☀️' : '🌙';
      localStorage.setItem('valdoria-dark-mode', isDark ? 'enabled' : 'disabled');
      
      // Smooth transition
      document.body.style.transition = 'all 0.3s ease';
      setTimeout(() => document.body.style.transition = '', 300);
    });
  }

  initializeSearch() {
    const searchInput = document.querySelector('#site-search');
    if (!searchInput) return;

    // Search Results Container
    let searchResults = document.querySelector('.search-results');
    if (!searchResults) {
      searchResults = document.createElement('div');
      searchResults.className = 'search-results';
      searchResults.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--valdoria-bg-content);
        border: 2px solid var(--valdoria-border);
        border-top: none;
        border-radius: 0 0 8px 8px;
        max-height: 400px;
        overflow-y: auto;
        z-index: 1000;
        display: none;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
      `;
      searchInput.parentElement.appendChild(searchResults);
    }

    // Debounced search
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
      }
      
      searchTimeout = setTimeout(() => {
        this.performEnhancedSearch(query, searchResults);
      }, 300);
    });

    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.parentElement.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  }

  performEnhancedSearch(query, resultsContainer) {
    // Enhanced mock search für Valdoria
    const valdoriaContent = [
      { 
        title: 'Session 1 - Die Schatten von Ashheart', 
        url: '/session-1/', 
        excerpt: 'Die heiße Sonne von Ashheart stand hoch am Himmel...',
        type: 'session',
        icon: '📖'
      },
      { 
        title: 'Session 2 - Das Blutritual', 
        url: '/session-2/', 
        excerpt: 'Die Nacht im Banditenlager war ruhig...',
        type: 'session',
        icon: '📖'
      },
      { 
        title: 'Session 3 - Die Sphinx von Kashaar', 
        url: '/session-3/', 
        excerpt: 'Die Session begann in den Ruinen...',
        type: 'session',
        icon: '📖'
      },
      { 
        title: 'Coslo Valcyne', 
        url: '/coslo-valcyne/', 
        excerpt: 'Ein Halbelf aus den Steppen von Karadun...',
        type: 'character',
        icon: '⚔️'
      },
      { 
        title: 'Thu\'veera Greenbog', 
        url: '/thuvera-greenbog/', 
        excerpt: 'Aus den düsteren Sümpfen von Morvana...',
        type: 'character',
        icon: '⚔️'
      },
      { 
        title: 'Elar Dre\'tiss', 
        url: '/elar-dretiss/', 
        excerpt: 'Der letzte Überlebende eines Drachenangriffs...',
        type: 'character',
        icon: '⚔️'
      },
      { 
        title: 'Waluigi', 
        url: '/waluigi/', 
        excerpt: 'Geboren während eines schweren Unwetters...',
        type: 'character',
        icon: '⚔️'
      },
      { 
        title: 'Al-Sahar', 
        url: '/al-sahar/', 
        excerpt: 'Die endlose Wüste mit Dünen und Ruinen...',
        type: 'region',
        icon: '🗺️'
      },
      { 
        title: 'Valdoria', 
        url: '/valdoria/', 
        excerpt: 'Ein vielfältiger Kontinent mit acht Regionen...',
        type: 'region',
        icon: '🗺️'
      },
      { 
        title: 'Die Acht Wächter', 
        url: '/die-acht-waechter/', 
        excerpt: 'Mächtige Wesen die die Regionen beschützen...',
        type: 'lore',
        icon: '⭐'
      }
    ];

    const results = valdoriaContent.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    if (results.length > 0) {
      resultsContainer.innerHTML = results.map(result => `
        <div class="search-result-item" 
             style="padding: 1rem; border-bottom: 1px solid var(--valdoria-border); cursor: pointer; transition: all 0.2s ease;"
             onmouseover="this.style.background='var(--valdoria-accent)'" 
             onmouseout="this.style.background='transparent'"
             onclick="window.location.href='${result.url}'">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.2rem;">${result.icon}</span>
            <div style="flex: 1;">
              <div style="font-weight: 600; color: var(--valdoria-secondary); font-size: 1rem; margin-bottom: 0.25rem;">
                ${result.title}
              </div>
              <div style="font-size: 0.85rem; color: var(--valdoria-text-secondary); line-height: 1.4;">
                ${result.excerpt}
              </div>
              <div style="font-size: 0.75rem; color: var(--valdoria-text-secondary); margin-top: 0.25rem; opacity: 0.8;">
                ${result.type.charAt(0).toUpperCase() + result.type.slice(1)}
              </div>
            </div>
          </div>
        </div>
      `).join('');
      resultsContainer.style.display = 'block';
    } else {
      resultsContainer.innerHTML = `
        <div style="padding: 1.5rem; text-align: center;">
          <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🔍</div>
          <div style="color: var(--valdoria-text-secondary); font-style: italic;">
            Keine Ergebnisse für "<strong>${query}</strong>" gefunden
          </div>
          <div style="font-size: 0.8rem; color: var(--valdoria-text-secondary); margin-top: 0.5rem;">
            Versuche es mit "Session", "Charakter" oder "Region"
          </div>
        </div>
      `;
      resultsContainer.style.display = 'block';
    }
  }

  initializeScrollEffects() {
    let lastScrollTop = 0;
    const toc = document.querySelector('.right-sidebar');
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      
      // Auto-highlight TOC sections
      this.highlightCurrentSection();
      
      // Smooth parallax for background
      if (window.innerWidth > 1024) {
        const bgOffset = scrollTop * 0.2;
        document.body.style.backgroundPosition = `0 ${bgOffset}px`;
      }
      
      lastScrollTop = scrollTop;
    });

    // Smooth scrolling für TOC links
    document.querySelectorAll('.toc-section a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }
      });
    });
  }

  highlightCurrentSection() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6[id]');
    const tocLinks = document.querySelectorAll('.toc-section a[href^="#"]');
    
    let current = '';
    headings.forEach(heading => {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 120) {
        current = heading.id;
      }
    });
    
    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  initializeTooltips() {
    // D&D specific terms
    const dndTerms = {
      'DM': 'Dungeon Master - Der Spielleiter',
      'NPC': 'Non-Player Character - Nicht-Spieler-Charakter',
      'PC': 'Player Character - Spieler-Charakter',
      'TP': 'Trefferpunkte - Lebenspunkte des Charakters',
      'AC': 'Armor Class - Rüstungsklasse',
      'Wächter': 'Mächtige Wesen die die acht Regionen Valdorias beschützen',
      'Herzblut': 'Die magische Essenz der Wächter',
      'Valdoria': 'Der Kontinent auf dem die Kampagne stattfindet'
    };

    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'valdoria-tooltip';
    tooltip.style.cssText = `
      position: absolute;
      background: var(--valdoria-bg-dark);
      color: var(--valdoria-text-primary);
      border: 2px solid var(--valdoria-secondary);
      border-radius: 6px;
      padding: 0.5rem 0.75rem;
      font-size: 0.8rem;
      z-index: 10000;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s ease;
      max-width: 200px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(tooltip);

    // Add tooltips to terms
    Object.entries(dndTerms).forEach(([term, definition]) => {
      const regex = new RegExp(`\\b${term}\\b`, 'g');
      document.querySelectorAll('p, li, td').forEach(element => {
        if (element.querySelector('a, code, .tooltip')) return;
        
        element.innerHTML = element.innerHTML.replace(regex, 
          `<span class="tooltip-trigger" data-tooltip="${definition}">${term}</span>`
        );
      });
    });

    // Tooltip events
    document.addEventListener('mouseover', (e) => {
      if (e.target.classList.contains('tooltip-trigger')) {
        const definition = e.target.dataset.tooltip;
        tooltip.textContent = definition;
        tooltip.style.opacity = '1';
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.bottom + 5) + 'px';
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.classList.contains('tooltip-trigger')) {
        tooltip.style.opacity = '0';
      }
    });
  }

  initializeSessionNavigation() {
    // Keyboard shortcuts für Session Navigation
    document.addEventListener('keydown', (e) => {
      if (e.altKey) {
        switch(e.key) {
          case 'ArrowLeft':
            const prevLink = document.querySelector('.session-nav-link.prev');
            if (prevLink) {
              e.preventDefault();
              window.location.href = prevLink.href;
            }
            break;
          case 'ArrowRight':
            const nextLink = document.querySelector('.session-nav-link.next');
            if (nextLink) {
              e.preventDefault();
              window.location.href = nextLink.href;
            }
            break;
          case '/':
            e.preventDefault();
            const searchInput = document.querySelector('#site-search');
            if (searchInput) {
              searchInput.focus();
            }
            break;
        }
      }
    });

    // Show keyboard shortcuts hint
    const shortcutsHint = document.createElement('div');
    shortcutsHint.className = 'keyboard-shortcuts';
    shortcutsHint.innerHTML = `
      <div style="position: fixed; bottom: 1rem; left: 1rem; background: var(--valdoria-bg-dark); 
                  border: 1px solid var(--valdoria-border); border-radius: 4px; padding: 0.5rem; 
                  font-size: 0.7rem; color: var(--valdoria-text-secondary); z-index: 50;
                  opacity: 0; transition: opacity 0.3s ease;" id="shortcuts-hint">
        <strong>Shortcuts:</strong> Alt+← Vorherige | Alt+→ Nächste | Alt+/ Suche
      </div>
    `;
    document.body.appendChild(shortcutsHint);

    // Show hint on hover over session nav
    const sessionNav = document.querySelector('.session-nav');
    if (sessionNav) {
      sessionNav.addEventListener('mouseenter', () => {
        document.getElementById('shortcuts-hint').style.opacity = '1';
      });
      sessionNav.addEventListener('mouseleave', () => {
        document.getElementById('shortcuts-hint').style.opacity = '0';
      });
    }
  }
}

// Additional CSS for tooltips and enhanced features
const enhancedStyles = `
  .tooltip-trigger {
    border-bottom: 1px dotted var(--valdoria-secondary);
    cursor: help;
    color: var(--valdoria-secondary);
  }
  
  .tooltip-trigger:hover {
    background: rgba(218, 165, 32, 0.1);
    border-radius: 2px;
  }
  
  .view-all {
    font-style: italic;
    opacity: 0.8;
  }
  
  .desktop-nav {
    display: none;
  }
  
  @media (min-width: 768px) {
    .desktop-nav {
      display: flex;
      gap: 1.5rem;
    }
    
    .desktop-nav .nav-link {
      color: var(--valdoria-text-primary);
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: all 0.3s ease;
    }
    
    .desktop-nav .nav-link:hover {
      background: rgba(218, 165, 32, 0.2);
      color: var(--valdoria-secondary);
    }
  }
`;

// Add enhanced styles
const styleElement = document.createElement('style');
styleElement.textContent = enhancedStyles;
document.head.appendChild(styleElement);

// Initialize when ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ValdoriaEnhanced());
} else {
  new ValdoriaEnhanced();
}
