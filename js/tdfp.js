alert("loading")
$(document).ready(function(){
        //Item model

  alert("loaded");
  var Item = Backbone.Model.extend({
    defaults:{
    	content: "I have something to do",
    	done: false,
    	order: List.next()
    },

    initialize: function() {
      if (!this.get("title")) {
        this.set({"title": this.defaults().title});
      }
    },

    toggle: function() {
      this.save({done: !this.get("done")});
    }

  })；

  //List is the the collection of Items
  var List = Backbone.Collection.extend({

    model: Todo,

    localStorage: new Backbone.LocalStorage("todos-backbone"),

    done: function() {
      return this.filter(function(todo){ return todo.get('done'); });
    },

    remaining: function() {
      return this.without.apply(this, this.done());
    },

    next: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    comparator: function(todo) {
      return todo.get('order');
    }

  });


  var TodoList = new List;
  console.log(TodoList);
});











