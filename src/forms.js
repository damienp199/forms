
  (function() {
    // Insert popup template into the body
    document.body.insertAdjacentHTML('beforeend', config.popupTemplate);

    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');
    let popupShown = false;

    // Function to show the popup with the form specified in the config
    function showPopup() {
      if (!popupShown) {
        const lastShown = localStorage.getItem('popupLastShown');
        const now = new Date();
        if (lastShown) {
          const lastShownDate = new Date(lastShown);
          const daysDifference = Math.floor((now - lastShownDate) / (1000 * 60 * 60 * 24));
          if (daysDifference < config.popupAfterDays) {
            return; // Exit if the popup was shown within the last X days
          }
        }
        const formId = config.popupFormID;
        if (config.forms[formId]) {
          popupContent.innerHTML = config.forms[formId];
          popup.style.display = 'flex';
          popupShown = true;
          localStorage.setItem('popupLastShown', now.toISOString());
          localStorage.setItem('timeSpent', '0'); // Reset the timeSpent in localStorage
          timeSpent = 0; // Reset the local timeSpent variable
        } else {
          console.warn(`No form found for formId "${formId}"`);
        }
      }
    }

    // Check if the current page is excluded
    function isPageExcluded() {
      const path = window.location.pathname;
      return config.excludePages.some(pattern => {
        if (pattern.includes('*')) {
          // Convert wildcard pattern to regex
          const regex = new RegExp('^' + pattern.replace('*', '.*'));
          return regex.test(path);
        }
        return pattern === path;
      });
    }

    if (isPageExcluded()) {
      return; // Exit if the current page is excluded
    }

    // Track time on site across pages
    let timeSpent = parseInt(localStorage.getItem('timeSpent') || '0', 10);
    const startTime = Date.now();

    function updateTimeSpent() {
      const now = Date.now();
      const timeDiff = Math.round((now - startTime) / 1000);
      localStorage.setItem('timeSpent', timeSpent + timeDiff);
    }

    setInterval(() => {
      timeSpent++;
      localStorage.setItem('timeSpent', timeSpent);
      checkPopupConditions();
    }, 1000);

    window.addEventListener('beforeunload', updateTimeSpent);

    function checkPopupConditions() {
      if (timeSpent >= config.timeOnSite) {
        if (config.method === 'exit') {
          document.addEventListener('mouseleave', () => {
            showPopup();
          }, { once: true });
        } else if (config.method === 'scroll') {
          window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) / document.body.scrollHeight >= 0.8) {
              showPopup();
            }
          });
        } else if (config.method === 'time') {
          showPopup(); // Show popup immediately if time condition is met
        }
      }
    }

    document.getElementById('close-popup').addEventListener('click', () => {
      popup.style.display = 'none';
    });

    // Initial check to start conditions
    checkPopupConditions();
  })();



// inline form

    document.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll('.activecampaign-form').forEach(function(el) {
            var formId = el.getAttribute('data-form-id') || 'wfo'; // Default ID if not provided
            
            if (config.forms[formId]) {
                el.innerHTML = config.forms[formId];
            } else {
                console.warn(`No form found for data-form-id "${formId}"`);
            }
        });
    });


// Email format validation on forms

document.addEventListener("DOMContentLoaded", function() {
  function validateEmailForms() {
    const forms = document.querySelectorAll('.subscribe-form');
  
    forms.forEach(form => {
      form.addEventListener('submit', function(event) {
        const emailInput = form.querySelector('.email-input').value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorMessage = form.querySelector('.error-message');
        
        if (!emailPattern.test(emailInput)) {
          errorMessage.style.display = 'block';
          event.preventDefault();
        } else {
          errorMessage.style.display = 'none';
        }
      });
    });
  }

  // Call the validation function initially
  validateEmailForms();

  // Observe the DOM for dynamically added forms
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        validateEmailForms();
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});