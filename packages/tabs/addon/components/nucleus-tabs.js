import { classNames, classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import { A } from '@ember/array';
import defaultProp from '@freshworks/core/utils/default-decorator';
import Component from '@ember/component';
import { set, computed, action } from '@ember/object';
import { oneWay }from '@ember/object/computed';
import layout from "../templates/components/nucleus-tabs";

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-tabs)

  @class Nucleus Tab
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@classNames('nucleus-tabs')
@classNameBindings('variantClass')
class NucleusTabs extends Component {
  /**
  * Description : to add aria label
  *
  * @field description
  * @type string|null
  * @default null
  * @readonly
  * @public
  */
  @defaultProp
  description = null;

  /**
  * selected : default open tab 
  *
  * @field selected
  * @type string|null
  * @default null
  * @readonly
  * @public
  */
  @defaultProp
  selected = null;

  /**
  * variant: tab styles, line/background
  *
  * @field variant
  * @type string
  * @default 'line'
  * @readonly
  * @public
  */
  @defaultProp
  variant = "line";

  /**
  * tabPanels: Collection of all tab panels
  *
  * @field tabPanels
  * @type Array
  * @public
  */
  tabPanels = A([]);

  /**
  * tabListItems: Collection of all tab list items
  *
  * @field tabListItems
  * @type Array
  * @public
  */
  tabListItems = A([]);

  /**
  * default
  *
  * @field default : takes intial value from selected
  * @type string|null
  * @public
  */
  @oneWay("selected")
  default;

  /**
  * variantClass
  *
  * @field variantClass
  * @type string
  * @public
  */
  @computed('variant', function() {
    return "nucleus-tabs--" + this.variant;
  })
  variantClass;

  /**
  * registerPanel
  *
  * @method registerPanel
  * @param {Object} tab
  * @public
  *
  */
  @action
  registerPanel(tab) {
    this.get('tabPanels').pushObject(tab);
  }

  /**
  * registerTabListItem 
  *
  * @method registerTabListItem
  * @param {Object} tab
  * @public
  *
  */
  @action
  registerTabListItem(tabList) {
    this.get('tabListItems').pushObject(tabList);
  }

  /**
  * activateTab : Handler that will be called when a tab is clicked
  *
  * @method activateTab
  * @param {string} name
  * @param {any} event
  * @public
  *
  */
  @action
  activateTab(name, event) {
    set(this, 'default', name);
    if(this.onChange) {
      this.onChange(name, event);
    }
  }
}

export default NucleusTabs;
