// Configuration object
const popupConfig = {
  excludePages: ['/', '/tags/', '/tag/*', '/a-propos/'],
  method: 'disabled', // Possible values: 'exit', 'scroll', 'time', 'disabled'
  timeOnSite: 1, // Value in seconds
  popupAfterDays: 0 // Number of days to wait before showing the popup again
};

// Usage
document.addEventListener('DOMContentLoaded', () => {
  const popup = new Popup(popupConfig);
  popup.init();
});