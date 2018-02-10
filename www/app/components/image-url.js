import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  tagName: 'input',
  readonly: true,
  value: '',
  attributeBindings: ['value', 'readonly'],
  click(e) {
    e.preventDefault();
    $(this.get('element')).select();
  }
});
