/* global KEEP */
function initTOC() {
  const tocNavDoms = document.querySelectorAll('.post-toc-wrap .post-toc li')
  const postPageContainerDom = document.querySelectorAll('.post-page-container')
  const tocContentContainer = document.querySelectorAll('.toc-content-container')

  if (tocNavDoms.length > 0) {

    KEEP.utils = {

      ...KEEP.utils,

      findActiveIndexByTOC() {
        if (!Array.isArray(KEEP.utils.sections)) return;
        let index = KEEP.utils.sections.findIndex(element => {
          return element && element.getBoundingClientRect().top - 20 > 0;
        });
        if (index === -1) {
          index = KEEP.utils.sections.length - 1;
        } else if (index > 0) {
          index--;
        }
        this.activateNavByIndex(index);
      },

      registerSidebarTOC() {
        KEEP.utils.sections = [...document.querySelectorAll('.post-toc li a.nav-link')].map(element => {
          const target = document.getElementById(decodeURI(element.getAttribute('href')).replace('#', ''));
          element.addEventListener('click', event => {
            event.preventDefault();
            const offset = target.getBoundingClientRect().top + window.scrollY;
            window.anime({
              targets: document.scrollingElement,
              duration: 500,
              easing: 'linear',
              scrollTop: offset - 10,
              complete: function () {
                setTimeout(() => {
                  KEEP.utils.pageTop_dom.classList.add('hide');
                }, 100)
              }
            });
          });
          return target;
        });
      },

      activateNavByIndex(index) {
        const target = document.querySelectorAll('.post-toc li a.nav-link')[index];
        if (!target || target.classList.contains('active-current')) return;

        document.querySelectorAll('.post-toc .active').forEach(element => {
          element.classList.remove('active', 'active-current');
        });
        target.classList.add('active', 'active-current');
        let parent = target.parentNode;
        while (!parent.matches('.post-toc')) {
          if (parent.matches('li')) parent.classList.add('active');
          parent = parent.parentNode;
        }
        // Scrolling to center active TOC element if TOC content is taller then viewport.
        const tocElement = document.querySelector('.post-toc-wrap');
        window.anime({
          targets: tocElement,
          duration: 200,
          easing: 'linear',
          scrollTop: tocElement.scrollTop - (tocElement.offsetHeight / 2) + target.getBoundingClientRect().top - tocElement.getBoundingClientRect().top
        });
      },

      handleShowWhenHasToc() {

        const openHandle = () => {
          const styleStatus = KEEP.getStyleStatus();
          const key = 'isShowToc';
          if (styleStatus && styleStatus.hasOwnProperty(key)) {
            KEEP.utils.toggleShowTocHandler.hasToc(styleStatus[key]);
          } else {
            KEEP.utils.toggleShowTocHandler.hasToc(true);
          }
        }

        const initOpenKey = 'init_open';

        if (KEEP.theme_config.toc.hasOwnProperty(initOpenKey)) {
          KEEP.theme_config.toc[initOpenKey] ? openHandle() : KEEP.utils.toggleShowTocHandler.hasToc(false);

        } else {
          openHandle();
        }

      }
    }

    KEEP.utils.handleShowWhenHasToc();
    KEEP.utils.registerSidebarTOC();

  }
}

if (KEEP.theme_config.pjax.enable === true && KEEP.utils) {
  initTOC();
} else {
  window.addEventListener('DOMContentLoaded', initTOC);
}
