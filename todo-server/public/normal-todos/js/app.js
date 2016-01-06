$(function() {
  "use strict";

  var Todos = function(key) {
    this.key = key;
    this.todos = [];
    this.url = "/api/todo";
    this.$mainWrap = $("#mainWrap");
    this.$template = $("#mainWrapTemplate");
    this.hashStatus = 'All';

    this.init();
  };

  Todos.prototype = {
    constructor: Todos,
    init: function() {
      var self = this;

      //get data from database.
      this.getData();

      //bind keypress event for header input.
      $('.header>input').keypress(function(e) {
        if (e.keyCode === 13) {
          var value = $(this).val();
          if (value) {
            self.addTodo({
              title: value,
              completed: false
            });

            $(this).val('');
          }
        }
      });

      //bind click event to A tag in footer.
      $('body').delegate('.filters a', 'click', function(e) {
       var status = $(this).data('status');
       self.hashStatus = status;
       self.render(self.todos);
      });

      //bind change event to checkbox input of todo item.
      $('body').delegate('.view .toggle', 'change', function(e) {
       var completed = !$(this).attr('checked') ? true : false,
           todo = $(this).parents('li').data('cache');

       todo.completed = completed;
       self.updateById(todo._id, todo);//pay attention: it is '_id', not 'id' in mongodb.
      });

      //bind click event to the button which is for deleting item.
      $('body').delegate('.todo-list .destroy', 'click', function(e) {
       var todo = $(this).parents('li').data('cache');
       self.deleteTodo(todo);
      });

      //bind dbclick event to the input which is for editting item.
      $('body').delegate('.todo-label', 'dblclick', function(e) {
       var $li = $(this).parents('li'),
           edit = $li.find('.edit');

       $li.addClass('editing');
       $(edit).focus();
       if (edit.setSelectionRange) {
         var len = $(edit).val().length * 2;
         edit.setSelectionRange(len, len);
       } else {
         $(edit).val($(edit).val());
       }
      });

      $('body').delegate('.clear-completed', 'click', function(e) {
       self.todos.map(function(todo) {
        if(todo.completed) {
         self.deleteTodo(todo);
        }
       });

       self.getData();
      });

      $('body').delegate('.todo-list .edit', 'blur', function(e) {
       submitEditing(this);
      });

      $('body').delegate('.todo-list .edit', 'keypress', function(e) {
       if(e.keyCode == 13) {
         submitEditing(this);
       }
      });

      function submitEditing(that) {
       var todo = $(that).parents('li').data('cache'),
           value = $(that).val();

       $(that).parents('li').removeClass('editing');

       if(value && value != todo.title) {
         todo.title = value;
         self.updateById(todo._id, todo);
       }
      }
    },
    getData: function() {
     var self = this;
     this.request(this.url, 'GET').done(function(data) {
      self.todos = data;
      self.render(data);
     });
    },
    render: function(data) {
     //add hash status to data, which will be used for changing completed status in footer.
     data.hashStatus = this.hashStatus;

     var template = _.template(this.$template.html());
     this.$mainWrap.html(template({
       data: data
     }));
    },
    addTodo: function(todo) {
      var self = this;
      this.request(this.url, 'post', todo).done(function(data) {
       self.getData();
      });
    },
    deleteTodo: function(todo) {
     var self = this;
     this.request(this.url+'/'+todo._id, 'delete').done(function(data) {
      self.getData();
     });
    },
    updateById: function(id, data) {
     var self = this;
     this.request(this.url+'/'+id, 'put', data).done(function(data) {
      self.getData();
     });
    },
    request: function(url, type, data) {
      var sendObj = {
        url: url,
        type: type
      };

      if (data) sendObj['data'] = data;

      return $.ajax(sendObj);
    }
  };

  new Todos('normal-todos');
});
