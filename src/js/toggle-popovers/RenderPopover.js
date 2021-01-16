export default class RenderPopover {
  static createPopoverElem(title, text) {
    return `
    <div class="popover">
      <div class="popover-title">${title}</div>
      <div class="popover-text">${text}</div>
    </div>
    `;
  }

  static insertPopoverElem(btn) {
    const { title, text } = btn.dataset;
    if (title && text) {
      const popover = this.createPopoverElem(title, text);
      btn.insertAdjacentHTML('afterend', popover);
    }
  }
}
