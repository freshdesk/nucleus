import Component from "@ember/component";
import { set, get, computed, observer } from "@ember/object";
import { run } from "@ember/runloop";
import layout from "../templates/components/nucleus-modal";

/**
  __Usage:__
  [Refer component page](/docs/components/nucleus-modal)

  The component yields references to the following contextual components, that you can use to further customize the output:
  * [modal.body](nucleus-modal/body)
  * [modal.header](nucleus-modal/header)
  * [modal.footer](nucleus-modal/footer)

  Furthermore references to the following actions are yielded:
  * `close`: triggers the `onClose` action and closes the modal
  * `submit`: triggers the `onSubmit` action

  @class Nucleus Modal
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,

  /**
  * Flag to open the modal
  *
  * @field open
  * @type boolean
  * @default false
  * @readonly
  * @public
  */
  open: false,

  /**
  * isOpen
  *
  * @field isOpen
  * @type function
  * @private
  */
  isOpen: computed.reads("open"),

  /**
  * Flag to show or hide the translucent backdrop.
  *
  * @field backdrop
  * @type boolean
  * @public
  */
  backdrop: true,

  /**
  * Flag to enable or disable dismiss option. `false` hides the close button and disables close on Escape.
  *
  * @field isDismissible
  * @type boolean
  * @public
  */
 isDismissible: true,

  /**
  * _showBackdrop
  *
  * @field _showBackdrop
  * @type boolean
  * @private
  */
  _showBackdrop: computed.reads("backdrop"),

  /**
  * Modal sizes: `small`, `medium` & `large`
  *
  * @property size
  * @type string|null
  * @default null
  * @public
  */
  size: null,

  /**
  * Render the Modal markup in-place (true) or in wormhole (false)
  *
  * @field renderInPlace
  * @type boolean
  * @default false
  * @public
  */
  renderInPlace: false,

  /**
  * modalId
  *
  * @field modalId
  * @type string
  * @private
  */
  modalId: computed('elementId', function() {
    return `nucleus-modal-${this.get('elementId')}`;
  }),

  /**
  * modalElement
  *
  * @field modalElement
  * @type function
  * @private
  */
  modalElement: computed("modalId", function () {
    return document.getElementById(get(this, "modalId"));
  }).volatile(),

  /**
  * backdropId
  *
  * @field backdropId
  * @type string
  * @private
  */
 backdropId: computed('elementId', function() {
  return `nucleus-modal-backdrop-${this.get('elementId')}`;
}),

  /**
  * backdropElement
  *
  * @field backdropElement
  * @type function
  * @private
  */
  backdropElement: computed("backdropId", function () {
    return document.getElementById(get(this, "backdropId"));
  }).volatile(),
  actions: {
    /**
    * close
    *
    * @method close
    * @public
    *
    */
    close() {
      if (get(this, 'onClose')) {
        get(this, 'onClose')();
      }
      this._hide();
    },

    /**
    * submit
    *
    * @method submit
    * @public
    *
    */
    submit() {
      if (get(this, 'onSubmit')) {
        get(this, 'onSubmit')()
      }
      this.send('close');
    }

  },

  /**
  * takeFocus
  *
  * @method takeFocus
  * @private
  *
  */
  _takeFocus() {
    let modalEl = get(this, "modalElement");
    let focusElement = modalEl && modalEl.querySelector("[autofocus]");

    if (!focusElement) {
      focusElement = modalEl;
    }

    if (focusElement) {
      focusElement.focus();
    }
  },

  /**
  * show
  *
  * @method show
  * @private
  *
  */
  _show() {
    document.body.classList.add("nucleus-modal--open");

    let modalEl = get(this, "modalElement");
    if (modalEl) {
      modalEl.style.display = "block";
      modalEl.scrollTop = 0;
    } 

    this.handleBackdrop(() => {
      let backdropEl = get(this, "backdropElement");
      if (backdropEl) {
        backdropEl.style.display = "block";
      }
    });
  },

  /**
  * hide
  *
  * @method hide
  * @private
  *
  */
  _hide() {
    document.body.classList.remove("nucleus-modal--open");

    let modalEl = get(this, "modalElement");
    if(modalEl) {
      // modalEl.style.display = "none";
    }

    this.handleBackdrop(() => {
      let backdropEl = get(this, "backdropElement");
      if (backdropEl) {
        // backdropEl.style.display = "none";
      }
    });
  },

  /**
  * handleBackdrop
  *
  * @method handleBackdrop
  * @private
  * @param {any} callback
  */
  handleBackdrop(callback) {
    if (get(this, "backdrop")) {
      set(this, "_showBackdrop", get(this, "isOpen"));

      if (!callback) {
        return;
      }
      callback.call(this);
    } else if (callback) {
      run.next(this, callback);
    }
  },

  /**
  * attachEventHandlers
  *
  * @method attachEventHandlers
  * @private
  *
  */
  attachEventHandlers() {
    window.addEventListener("focusin", event => this.loopFocus(event));
  },

  /**
  * removeEventHandlers
  *
  * @method removeEventHandlers
  * @private
  *
  */
  removeEventHandlers() {
    window.removeEventListener("focusin", this.loopFocus(event), false);
  },

  /**
  * loopFocus
  *
  * @method loopFocus
  * @private
  * @param {any} event
  */
  loopFocus(event) {
    let modalEl = get(this, "modalElement");

    if (event && document !== event.target && modalEl && modalEl !== event.target && !modalEl.contains(event.target)) {
      this._takeFocus();
    }
  },

  _observeOpen: observer('isOpen', function() {
    if (this.get('isOpen')) {
      this._show();
    } else {
      this._hide();
    }
  }),

  didRender() {
    this._super(...arguments);
    run.next(() => {
      this._takeFocus();
    });
  },

  didInsertElement: function() {
    this._super(...arguments);
    this.attachEventHandlers();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.removeEventHandlers();
  }

});