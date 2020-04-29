import {
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';
import defaultProp from '@freshworks/core/utils/default-decorator';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import layout from "../templates/components/nucleus-table";

/**
  __Usage:__

  [Refer component page](/docs/components/nucleus-table)

  @class Nucleus Table
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
@tagName('')
class NucleusTable extends Component {

  /**
  * The ember array of columns in the table 
  *
  * @field columns
  * @type array
  * @public
  */
  @defaultProp
  columns;

  /**
  * The ember array of objects that represent the rows in the table 
  *
  * @field rows
  * @type array
  * @public
  */
  @defaultProp
  rows;

  /**
  * The number of rows displayed per page of the table. Defaults to 30 
  *
  * @field pageSize
  * @type number
  * @default 30
  * @public
  */
  @defaultProp
  pageSize = 30;

  /**
  * Show or Hide the option to Filter Columns in the table 
  *
  * @field canFilter
  * @type boolean
  * @default true
  * @public
  */
  @defaultProp
  canFilter = true;

  /**
  * Display the mini Paginator as the main Paginator for table   
  *
  * @field isMini
  * @type boolean
  * @default false
  * @public
  */
  @defaultProp
  isMini = false;

  /**
  * Accessibility Description for the table   
  *
  * @field tableCaption
  * @type string
  * @public
  */
  @defaultProp
  tableCaption;

  /**
  * Title for the Filter Dialog   
  *
  * @field filterTitle
  * @type localisation string
  * @public
  */
  @defaultProp
  filterTitle = "Customise Columns";

  /**
  * Title for the List of Columns   
  *
  * @field columnsTitle
  * @type localisation string
  * @public
  */
  @defaultProp
  columnsTitle = "Choose Columns";

  /**
  * Title for the Selected List of Columns   
  *
  * @field selectedColumnsTitle
  * @type localisation string
  * @public
  */
  @defaultProp
  selectedColumnsTitle = "Selected Columns";


  @defaultProp
  height;

  /**
  * Boolean to select all rows in the current page   
  *
  * @field selectAll
  * @type boolean
  * @default false
  * @public
  */
  selectAll;
}

export default NucleusTable;
