import Component from '@ember/component';
import { inject } from '@ember/service';
import { get } from '@ember/object'

export default Component.extend({
  flashMessages: inject(),
  actions: {
    foo() {
      debugger;
      const flashMessages = get(this, 'flashMessages');
      flashMessages.success('Successfully saved!', {
        timeout: 2000,
        sticky: true,
        priority: 100,
        showProgress: true
      });
    }
  }
});