/* global KEEP */

KEEP.initModeToggle = () => {

  KEEP.utils.modeToggle = {

    modeToggleButton_dom: document.querySelector('.tool-dark-light-toggle'),
    iconDom: document.querySelector('.tool-dark-light-toggle i'),

    enableLightMode() {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      if (document.querySelector(".logo-image img") && KEEP.theme_config.base_info.logo_img){
        document.querySelector(".logo-image img").setAttribute("src",KEEP.theme_config.base_info.logo_img);
      }
      this.iconDom.className = 'fas fa-moon';
      KEEP.styleStatus.isDark = false;
      KEEP.setStyleStatus();
    },

    enableDarkMode() {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      if (document.querySelector(".logo-image img") && KEEP.theme_config.base_info.dark_logo_img){
        document.querySelector(".logo-image img").setAttribute("src",KEEP.theme_config.base_info.dark_logo_img);
      }
      this.iconDom.className = 'fas fa-sun';
      
      KEEP.styleStatus.isDark = true;
      KEEP.setStyleStatus();
    },

    isDarkPrefersColorScheme() {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    },

    initModeStatus() {
      const styleStatus = KEEP.getStyleStatus();

      if (styleStatus) {
        styleStatus.isDark ? this.enableDarkMode() : this.enableLightMode();
      } else {
        this.isDarkPrefersColorScheme().matches ? this.enableDarkMode() : this.enableLightMode();
      }
    },

    initModeToggleButton() {
      this.modeToggleButton_dom.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        isDark ? this.enableLightMode() : this.enableDarkMode();
      });
    },

    initModeAutoTrigger() {
      const isDarkMode = this.isDarkPrefersColorScheme();
      isDarkMode.addEventListener('change', e => {
        e.matches ? this.enableDarkMode() : this.enableLightMode();
      });
    }
  }

  KEEP.utils.modeToggle.initModeStatus();
  KEEP.utils.modeToggle.initModeToggleButton();
  KEEP.utils.modeToggle.initModeAutoTrigger();
};
