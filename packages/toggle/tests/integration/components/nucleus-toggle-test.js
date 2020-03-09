import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
// import backstop from 'ember-backstop/test-support/backstop';

module('Integration | Component | nucleus-toggle', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it has correct markup', async function(assert) {
    await render(hbs`{{nucleus-toggle}}`);

    assert.dom('.nucleus-toggle').exists({ count: 1 }, 'Toggle wrap exists.');
    assert.dom('#nucleus-toggle').exists({ count: 1 }, 'Toggle checkbox exists.');
  });

  test('Rendes ', async function(assert) {
    await render(hbs`{{nucleus-toggle size="small"}}`);

    assert.dom('.nucleus-toggle--small').exists({ count: 1 }, 'Toggle has correct size');

    await render(hbs`{{nucleus-toggle}}`);
  });

  test('it has correct size', async function(assert) {
    await render(hbs`{{nucleus-toggle size="small"}}`);

    assert.dom('.nucleus-toggle--small').exists({ count: 1 }, 'Toggle has correct size');

    await render(hbs`{{nucleus-toggle}}`);
  });

  test('it has HTML attributes', async function(assert) {
    await render(hbs`{{nucleus-toggle id="test" disabled=true}}`);

    assert.equal(this.element.querySelector('.nucleus-toggle').getAttribute('id'), 'test');
    assert.equal(this.element.querySelector('.nucleus-toggle').getAttribute('disabled'), '');
  });

  test('it must render toggle state based icon', async function(assert) {
    await render(hbs`{{nucleus-toggle}}`);

    assert.dom('.nucleus-toggle svg').hasClass('slider__circle--icon', 'svg icon is rendered');
  });

  // test('it sends onClick action with "args" property as a parameter', async function(assert) {
  //   let action = this.spy();
  //   this.actions.testAction = action;
  //   await render(hbs`{{nucleus-toggle onClick=(action "testAction") args="foo"}}`);

  //   await click('button');
  //   assert.ok(action.calledWith('foo'), 'onClick action has been called with button arguments');
  // });

  // test('it prevents event to bubble up', async function(assert) {
  //   let buttonClick = this.spy();
  //   this.actions.buttonClick = buttonClick;
  //   let parentClick = this.spy();
  //   this.actions.parentClick = parentClick;

  //   await render(
  //     hbs`<div {{action "parentClick"}}>{{#nucleus-toggle onClick=(action "buttonClick")}}Button{{/nucleus-toggle}}</div>`
  //   );

  //   await click('button');
  //   assert.ok(buttonClick.called);
  //   assert.notOk(parentClick.called);
  // });

  // test('buttons pass visual regression tests', async function(assert) {
  //   await render(hbs`
  //     {{nucleus-toggle label="LabelButton"}}
  //     {{#nucleus-toggle}}Button{{/nucleus-toggle}}
  //     {{#nucleus-toggle size="mini"}}Mini{{/nucleus-toggle}}
  //     {{#nucleus-toggle size="small"}}Small{{/nucleus-toggle}}
  //     {{#nucleus-toggle variant="secondary"}}Secondary{{/nucleus-toggle}}
  //     {{#nucleus-toggle variant="danger"}}Danger{{/nucleus-toggle}}
  //     {{#nucleus-toggle variant="link"}}Link{{/nucleus-toggle}}
  //     {{#nucleus-toggle variant="text"}}Text{{/nucleus-toggle}}
  //     {{#nucleus-toggle block=true}}Block Button{{/nucleus-toggle}}
  //     {{#nucleus-toggle disabled=true}}Secondary{{/nucleus-toggle}}
  //     {{nucleus-toggle icon="nucleus-circle-check" iconOnly=true variant="secondary"}}
  //     {{nucleus-toggle icon="nucleus-circle-check" iconOnly=true size="small" variant="secondary"}}
  //     {{nucleus-toggle icon="nucleus-circle-check" iconOnly=true size="mini" variant="secondary"}}`);
  //   await backstop(assert,{scenario: {misMatchThreshold: 0.1}});
  // });
});