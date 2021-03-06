import { make } from './ui';
import bgIcon from './svg/background.svg';
import borderIcon from './svg/border.svg';
import stretchedIcon from './svg/stretched.svg';
import rotate90 from './svg/rotate90.svg';
import rotate180 from './svg/rotate180.svg';
import rotate270 from './svg/rotate270.svg';

/**
 * Working with Block Tunes
 */
export default class Tunes {
  /**
   * @param {object} api - Editor API
   * @param {function} onChange - tune toggling callback
   */
  constructor({ api, onChange }) {
    this.api = api;
    this.onChange = onChange;
    this.buttons = [];
  }

  /**
   * Available Image tunes
   */
  static get tunes() {
    return [
      {
        name: 'withBorder',
        icon: borderIcon,
        title: 'With border'
      },
      {
        name: 'stretched',
        icon: stretchedIcon,
        title: 'Stretch image'
      },
      {
        name: 'withBackground',
        icon: bgIcon,
        title: 'With background'
      },
      {
        name: 'rotate-90',
        icon: rotate90,
        title: 'Rotate 90 degrees'
      },
      {
        name: 'rotate-180',
        icon: rotate180,
        title: 'Rotate 180 degrees'
      },
      {
        name: 'rotate-270',
        icon: rotate270,
        title: 'Rotate 270 degrees'
      }
    ];
  }

  /**
   * Styles
   * @return {{wrapper: string, buttonBase: *, button: string, buttonActive: *}}
   */
  get CSS() {
    return {
      wrapper: '',
      buttonBase: this.api.styles.settingsButton,
      button: 'image-tool__tune',
      buttonActive: this.api.styles.settingsButtonActive
    };
  }

  /**
   * Makes buttons with tunes: add background, add border, stretch image
   * @param {ImageToolData} toolData
   * @return {Element}
   */
  render(toolData) {
    const wrapper = make('div', this.CSS.wrapper);

    this.buttons = [];

    Tunes.tunes.forEach(tune => {
      const el = make('div', [this.CSS.buttonBase, this.CSS.button], {
        innerHTML: tune.icon,
        title: tune.title
      });

      el.addEventListener('click', () => {
        this.tuneClicked(tune.name);
      });

      el.dataset.tune = tune.name;
      el.classList.toggle(this.CSS.buttonActive, toolData[tune.name]);

      this.buttons.push(el);

      wrapper.appendChild(el);
    });

    return wrapper;
  }

  /**
   * Clicks to one of the tunes
   * @param {string} tuneName - clicked tune name
   */
  tuneClicked(tuneName) {
    const button = this.buttons.find(el => el.dataset.tune === tuneName);

    if (tuneName.includes('rotate')) {
      button.parentNode.childNodes.forEach((b) => {
        if (b.dataset.tune.includes('rotate') && b.dataset.tune !== tuneName) {
          b.classList.toggle(this.CSS.buttonActive, false);
        }
      });
    }

    button.classList.toggle(this.CSS.buttonActive, !button.classList.contains(this.CSS.buttonActive));

    this.onChange(tuneName);
  }
}
