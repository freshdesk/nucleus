// import { run } from '@ember/runloop';
import { defer } from 'rsvp';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, click, settled, waitUntil, waitFor } from '@ember/test-helpers';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import backstop from 'ember-backstop/test-support/backstop';

module('Integration | Component | nucleus-button', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it has correct markup', async function(assert) {
    await render(hbs`{{nucleus-button label="Test"}}`);

    assert.dom('button').hasClass('nucleus-button', 'button has nucleus-button class');
    assert.dom('button').hasClass('nucleus-button--primary', 'button has default primary variant class');
  });

  test('it has correct size', async function(assert) {
    await render(hbs`{{#nucleus-button size="mini"}}Test{{/nucleus-button}}`);

    assert.dom('button').hasClass('nucleus-button--mini', 'button has correct size class');
  });

  test('it has correct variant', async function(assert) {
    await render(hbs`{{#nucleus-button variant="secondary"}}Test{{/nucleus-button}}`);

    assert.dom('button').hasClass('nucleus-button', 'button has nucleus-button class');
    assert.dom('button').hasClass('nucleus-button--secondary', 'button has appropriate variant class');
    assert.dom('button').doesNotHaveClass('nucleus-button--primary', 'button does not have primary class');
  });

  test('it can be block', async function(assert) {
    await render(hbs`{{#nucleus-button block=true}}Test{{/nucleus-button}}`);

    assert.dom('button').hasClass('nucleus-button--block', 'button has block class');
  });

  test('it has HTML attributes', async function(assert) {
    await render(hbs`{{#nucleus-button id="test" disabled=true}}Test{{/nucleus-button}}`);

    assert.equal(this.element.querySelector('button').getAttribute('id'), 'test');
    assert.equal(this.element.querySelector('button').getAttribute('disabled'), '');
  });

  test('it has default label', async function(assert) {
    await render(hbs`{{nucleus-button label="test"}}`);
    assert.dom('button').hasText('test');
  });

  test('it has default type "button"', async function(assert) {
    await render(hbs`{{nucleus-button}}`);
    assert.equal(this.element.querySelector('button').type, 'button');
  });

  test('it with icon property shows icon', async function(assert) {
    await render(hbs`{{nucleus-button icon="nucleus-cross"}}`);

    assert.dom('button svg').hasClass('nucleus-icon', 'svg icon is rendered');
  });

  test('it sends onClick action with "args" property as a parameter', async function(assert) {
    let action = this.spy();
    this.actions.testAction = action;
    await render(hbs`{{nucleus-button onClick=(action "testAction") args="foo"}}`);

    await click('button');
    assert.ok(action.calledWith('foo'), 'onClick action has been called with button arguments');
  });

  test('it changes text according to button state', async function(assert) {
    let deferredClickAction = defer();
    this.set('clickAction', () => {
      return deferredClickAction.promise;
    });

    await render(
      hbs`{{nucleus-button
      label="default text"
      pendingLabel="text for pending state"
      fulfilledLabel="text for fulfilled state"
      rejectedLabel="text for rejected state"
      onClick=clickAction
    }}`);
    assert.dom('button').hasText('default text');

    click('button');
    await waitUntil(() => {
      return find('button').textContent.trim() === 'text for pending state';
    });
    assert.dom('button').hasText('text for pending state');
    deferredClickAction.resolve();
    await waitUntil(() => {
      return find('button').textContent.trim() === 'text for fulfilled state';
    });
    assert.dom('button').hasText('text for fulfilled state');
    await settled();
    assert.dom('button').hasText('default text');

    deferredClickAction = defer();
    click('button');
    await waitUntil(() => {
      return find('button').textContent.trim() === 'text for pending state';
    });
    deferredClickAction.reject();
    await waitUntil(() => {
      return find('button').textContent.trim() === 'text for rejected state';
    });
    assert.dom('button').hasText('text for rejected state');
    await settled();
    assert.dom('button').hasText('default text');
  });

  test('it displays the loading animation when undefined', async function (assert) {
    let deferredClickAction = defer();
    this.set('clickAction', () => {
      return deferredClickAction.promise;
    });

    await render(
      hbs`{{nucleus-button
      label="default text"
      onClick=clickAction
    }}`);
    assert.dom('button').hasText('default text');

    click('button');
    await waitFor('[data-test-button-loader]');

    deferredClickAction.resolve();
    await settled();
    assert.dom('button').hasText('default text');

    deferredClickAction = defer();
    click('button');
    await waitFor('[data-test-button-loader]');

    deferredClickAction.reject();
    await settled();
    assert.dom('button').hasText('default text');
  });

  test('it is disabled while in pending state', async function(assert) {
    let deferredClickAction = defer();
    this.set('clickAction', () => {
      return deferredClickAction.promise;
    });

    await render(hbs`{{nucleus-button label="Test" onClick=clickAction}}`);
    assert.dom('button').isNotDisabled();

    await click('button');
    assert.dom('button').isDisabled();

    deferredClickAction.resolve();
    await settled();
    assert.dom('button').isNotDisabled();
  });

  test('it prevents event to bubble up', async function(assert) {
    let buttonClick = this.spy();
    this.actions.buttonClick = buttonClick;
    let parentClick = this.spy();
    this.actions.parentClick = parentClick;

    await render(
      hbs`<div {{action "parentClick"}}>{{#nucleus-button onClick=(action "buttonClick")}}Button{{/nucleus-button}}</div>`
    );

    await click('button');
    assert.ok(buttonClick.called);
    assert.notOk(parentClick.called);
  });

  test('it prevents onClick action to be fired concurrently', async function(assert) {
    let deferredClickAction = defer();
    let clickActionHasBeenExecuted = false;
    this.set('clickAction', () => {
      clickActionHasBeenExecuted = true;
      return deferredClickAction.promise;
    });

    await render(hbs`{{nucleus-button label="Test" onClick=clickAction}}`);
    click('button');
    await waitUntil(() => clickActionHasBeenExecuted);

    this.set('clickAction', () => {
      assert.ok(false, 'onClick action is not executed concurrently');
    });
    await click('button');

    deferredClickAction.resolve();
    await settled();

    this.set('clickAction', () => {
      assert.step('onClick action');
    });
    await click('button');
    assert.verifySteps(['onClick action'], 'onClick action is fired again after pending click action is settled');
  });

  test('it passes a11y tests', async function(assert) {
    await render(hbs`{{nucleus-button label="Test"}}`);
   
    return a11yAudit(this.element).then(() => {
      assert.ok(true, 'no a11y errors found!');
    });
  });

  test('buttons pass visual regression tests', async function(assert) {
    await render(hbs`{{nucleus-button label="LabelButton"}} {{#nucleus-button}}Button{{/nucleus-button}} {{#nucleus-button size="mini"}}Mini{{/nucleus-button}} {{#nucleus-button size="small"}}Small{{/nucleus-button}} {{#nucleus-button variant="secondary"}}Secondary{{/nucleus-button}} {{#nucleus-button variant="danger"}}Danger{{/nucleus-button}} {{#nucleus-button variant="link"}}Link{{/nucleus-button}} {{#nucleus-button variant="text"}}Text{{/nucleus-button}} {{#nucleus-button block=true}}Block Button{{/nucleus-button}} {{#nucleus-button disabled=true}}Secondary{{/nucleus-button}} {{nucleus-button icon="nucleus-circle-check" iconOnly=true variant="secondary"}} {{nucleus-button icon="nucleus-circle-check" iconOnly=true size="small" variant="secondary"}} {{nucleus-button icon="nucleus-circle-check" iconOnly=true size="mini" variant="secondary"}}`);
    await backstop(assert,{scenario: {misMatchThreshold: 0.1}});
  });

  test('hovered buttons pass visual regression tests', async function(assert){
    await render(hbs`{{nucleus-button class="link-button" variant="link" label="Label button"}}`)
    await backstop(assert,{scenario: {hoverSelector:".link-button",misMatchThreshold: 0.1}})
  });

  test('clicked buttons pass visual regression tests', async function(assert){
    await render(hbs`{{nucleus-button class="text-button" variant="text" label="Label button"}}`)
    await backstop(assert, {scenario: {clickSelectors: ".text-button",misMatchThreshold: 0.1}})
  });
});
