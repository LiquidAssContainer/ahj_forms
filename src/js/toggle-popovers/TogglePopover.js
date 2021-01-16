import RenderPopover from './RenderPopover';

export default class TogglePopover {
  addEventListeners() {
    document.addEventListener('click', (e) => {
      const { target } = e;

      if (target.classList.contains('popover-toggle')) {
        this.togglePopover(target);
        return;
      }

      if (!target.closest('.popover')) {
        this.removeActivePopover();
      }
    });
  }

  togglePopover(btn) {
    const parentElem = btn.closest('.popover-container');
    const popover = parentElem.getElementsByClassName('popover')[0];

    if (popover) {
      popover.remove();
    } else {
      this.removeActivePopover();
      RenderPopover.insertPopoverElem(btn);
    }
  }

  removeActivePopover() {
    const activePopover = document.getElementsByClassName('popover')[0];
    activePopover?.remove();
  }
}
