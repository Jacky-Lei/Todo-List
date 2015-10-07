(function(root) {
  'use strict';
  if (typeof root.TodoStore === "undefined"){
    root.TodoStore = {};
  }
  var _todos =  [];
  var _callbacks = [];

  root.TodoStore = {
    all: function(){
      return _todos.slice();
    },
    fetch: function(){

      $.ajax({
        url: "api/todos",
        dataType: "json",
        success: function(todos){
          _todos = todos;
          root.TodoStore.changed();
        }
      });
    },
    create: function(todo){
      $.ajax({
        url: "api/todos",
        type: "post",
        data: {todo: todo},
        dataType: "json",
        success: function(todo){
          _todos.push(todo);
          root.TodoStore.changed();
        }
      });
    },
    destroy: function(id){
      var deleteId = root.TodoStore.find(id).id;
      if(deleteId){
        $.ajax({
          url: "api/todos/"+id,
          type: "delete",
          data: {id: deleteId},
          success: function () {
          _todos.splice(deleteId, 1);
          },
        });
      }
      root.TodoStore.changed();
    },
    toggleDone: function(id){
      var todo = root.TodoStore.find(id);

      $.ajax({
        url: "api/todos/"+id,
        type: "patch",
        data: {todo: {done: !todo.done}},
        success: function(){
          todo.done = !todo.done;
        }
      });
      root.TodoStore.changed();
    }
  };

  root.TodoStore.find = function(id) {
    for (var i = 0; i < _todos.length; i++) {
      if(_todos[i].id === id){
        return _todos[i];
      }
    }
  };

  root.TodoStore.changed = function() {
    _callbacks.forEach(function(callback){
        callback();
    });
  };

  root.TodoStore.addChangedHandler = function(callback){
    _callbacks.push(callback);
  };

  root.TodoStore.removeChangedHandler = function(callback){
    var idx = _callbacks.indexOf(callback);
    _callbacks.splice(idx, 1);
  };

}(this));
