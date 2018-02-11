import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  tagName: 'input',
  readonly: true,
  value: '',
  attributeBindings: ['value', 'readonly'],
  classNames: ['image-url'],
  click(e) {
    e.preventDefault();
    $(this.get('element')).select();
  }
});
