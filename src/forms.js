class Popup {
  constructor(config) {
      this.config = config;
      this.popupElement = document.getElementById('popup');
      this.closeButton = document.getElementById('close-popup');
  }

  init() {
      if (this.isExcludedPage() || !this.canShowPopup()) return;

      this.setupCloseButton();
      setTimeout(() => this.setupMethod(), this.config.timeOnSite * 1000);
  }

  isExcludedPage() {
      const currentPath = window.location.pathname;
      return this.config.excludePages.some(page => 
          page.endsWith('*') 
              ? currentPath.startsWith(page.slice(0, -1))
              : currentPath === page
      );
  }

  canShowPopup() {
      const lastShown = localStorage.getItem('popupLastShown');
      if (!lastShown) return true;
      const daysSinceLastShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
      return daysSinceLastShown >= this.config.popupAfterDays;
  }

  setLastShownDate() {
      localStorage.setItem('popupLastShown', Date.now().toString());
  }

  showPopup() {
      this.popupElement.style.display = 'flex';
      this.setLastShownDate();
  }

  setupCloseButton() {
      this.closeButton.addEventListener('click', () => {
          this.popupElement.style.display = 'none';
      });
  }

  setupMethod() {
      switch (this.config.method) {
          case 'exit':
              this.setupExitIntent();
              break;
          case 'scroll':
              this.setupScrollTrigger();
              break;
          case 'time':
              setTimeout(() => this.showPopup(), this.config.timeOnSite * 1000);
              break;
          case 'disabled':
              // Do nothing
              break;
          default:
              console.error('Invalid popup method specified');
      }
  }

  setupExitIntent() {
      document.addEventListener('mouseout', (e) => {
          if (e.clientY <= 0) this.showPopup();
      });
  }

  setupScrollTrigger() {
      window.addEventListener('scroll', () => {
          const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
          if (scrollPercentage > 80) this.showPopup();
      });
  }
}