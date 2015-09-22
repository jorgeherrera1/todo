var app = app || {};

// The DOM element for a todo item...
app.TodoView = Backbone.View.extend({

  //... is a list tag.
  tagName: 'li',

  // Cache the template function for a single item.
  template: _.template($('#item-template').html()),

  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close',
    'click .toggle': 'toggleCompleted',
    'click .destroy': 'clear'
  },

  // The TodoView listens for changes to its model, re-rendering. Since there's
  // a one-to-one correspondence between a **Todo** and a **TodoView** in this
  // app, we set a direct reference on the model for convenience.
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    // remove() removes the view from the DOM and calls stopListening
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'visible', this.toggleVisible);
  },

  // re-renders the titles of the todo item
  render: function() {
    this.$el.html(this.template(this.model.attributes));

    this.$el.toggleClass('completed', this.model.get('completed'));
    this.toggleVisible();

    this.$input = this.$('.edit');

    return this;
  },

  // switch view into editing mode
  edit: function() {
    this.$el.addClass('editing');
    this.$input.focus();
  },

  // close editing mode
  close: function() {
    var value = this.$input.val().trim();

    if (value) {
      this.model.save({
        title: value
      });
    } else {
      this.clear();
    }

    this.$el.removeClass('editing');
  },

  // If you hit `enter`, we're through editing the item.
  updateOnEnter: function(evt) {
    if (evt.which === ENTER_KEY) {
      this.close();
    }
  },

  toggleCompleted: function() {
    this.model.toggle();
  },

  // remove the item
  clear: function() {
    this.model.destroy();
  },

  // toggles the visibility of an item
  toggleVisible: function() {
    this.$el.toggleClass('hidden', this.isHidden());
  },

  isHidden: function() {
    var isCompleted = this.model.get('completed');
    var hidden = (!isCompleted && app.TodoFilter === 'completed')
      || (isCompleted && app.TodoFilter === 'active');

    return hidden;
  }

});
