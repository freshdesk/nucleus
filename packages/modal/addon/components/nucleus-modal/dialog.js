import classic from 'ember-classic-decorator';
import { classNames, attributeBindings, classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import { readOnly } from '@ember/object/computed';
import Component from '@ember/component';
import { set, computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import layout from '../../templates/components/nucleus-modal/dialog';
import scroll from "../../mixins/scroll";

/**
  Dialog Usage:
  @class Dialog
  @namespace Components
  @extends Ember.Component
  @public
*/
@classic
@templateLayout(layout)
@classNames('nucleus-modal')
@classNameBindings('positionClass')
@attributeBindings('tabindex', 'aria-labelledby:ariaLabelledby', 'aria-modal:ariaModal')
class Dialog extends Component.extend(scroll) {
  ariaRole = 'dialog';

  @readOnly('titleId')
  ariaLabelledby;

  ariaModal = true;

  /**
  * tabindex
  *
  * @field tabindex
  * @type string
  * @private
  */
  tabindex = '-1';

  /**
  * animation class
  *
  * @field animationClass
  * @type string
  * @private
  */
  animationClass = 'slide-down';

  /**
  * keyboard
  *
  * @field keyboard
  * @type boolean
  * @public
  */
  keyboard = true;

  /**
  * size
  *
  * @field size
  * @type null
  * @public
  */
  size = null;

  /**
  * sizeClass
  *
  * @field sizeClass
  * @type function
  * @private
  */
  @computed('size', function() {
    let size = this.size;
    return isBlank(size) ? null : `nucleus-modal__dialog--${size}`;
  })
  sizeClass;

  /**
  * Modal position: `center`, `left` & `right`
  *
  * @property position
  * @type string
  * @default center
  * @public
  */
  position = 'center';

  /**
   * positionClass
   *
   * @field positionClass
   * @type function
   * @private
   */
  @computed('position', function() {
    let position = this.position;
    return isBlank(position) ? null : `nucleus-modal--${position}`;
  })
  positionClass;

  /**
   * The id of the `.modal-title` element
   *
   * @field titleId
   * @type string
   * @default null
   * @private
   */
  titleId = null;

  /**
   * Gets or sets the id of the title element for aria accessibility tags
   *
   * @method getSetTitleID
   * @private
   */
  getOrSetTitleId() {
    const modalNode = this.element;
    let nodeId = null;

    if (modalNode) {
      const titleNode = modalNode.querySelector('.nucleus-modal__header .title');
      if (titleNode) {
        nodeId = titleNode.id
        if (!nodeId) {
          nodeId = `${this.id}-title`;
          titleNode.id = nodeId;
        }
      }
    }
    set(this, 'titleId', nodeId);
  }

  /**
  * keyDown
  *
  * @method keyDown
  * @private
  * @param {any} e
  */
  keyDown(e) {
    let code = e.keyCode || e.which;

    if (code === 27 && this.keyboard) {
      this.onClose();
    }
  }

  scrolled() {
    const modalNode = this.element;
    if(modalNode) {
      const titleNode = modalNode.querySelector('.nucleus-modal__header');
      const contentNode = modalNode.querySelector('.nucleus-modal__body');
      if (titleNode && contentNode && contentNode.scrollTop > titleNode.offsetHeight) {
        titleNode.classList.add('sticky');
      } else {
        titleNode.classList.remove('sticky');
      }
    }
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.getOrSetTitleId();
    this.bindScrolling('.nucleus-modal__body');
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    this.unbindScrolling();
  }
}

export default Dialog;