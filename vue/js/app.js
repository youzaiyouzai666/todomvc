(function (exports) {
    'use strict';
    var filters = {
        all      : function (todos) {
            return todos;
        },
        active   : function (todos) {
            return todos.filter(function (todo) {
                return !todo.completed;
            })
        },
        completed: function (todos) {

            return todos.filter(function (todo) {
                return todo.completed;
            })
        }
    };

    // Your starting point. Enjoy the ride!
    exports.app = new Vue({
        el        : '.todoapp',
        data      : {
            todoList: [],
            newTodo : '',
            visibility: 'all'
        },
        directives: {
            'auto-focus': function (el, binding) {
                if (!binding.value) {
                    return;
                }
                el.focus();

            }
        },
        computed  : {
            filteredTodos: function(){
                debugger;
                return filters[this.visibility](this.todoList);
            },
            //active 剩余数量
            remaining    : function () {
                return filters.active(this.todoList).length;
            },
            remainingText: function () {
                if (this.remaining === 0 || this.remaining > 1) {
                    return this.remaining + 'items';
                } else {
                    return this.remaining + 'item';
                }
            },
            //是否显示 “Clear completed”按钮
            isCompleted  : function () {
                return filters.completed(this.todoList).length > 0;
            }
        },
        methods   : {
            addTodo        : function () {
                if (this.newTodo) {
                    var todo = this.newTodo.trim();
                    this.todoList.push({label: todo, completed: false, editing: false});
                    this.newTodo = '';
                }
            },
            removeTodo     : function (todo) {
                var index = this.todoList.indexOf(todo);
                this.todoList.splice(index, 1);
                debugger;
            },
            editTodo       : function (todo) {
                this.editingTodoOldValue = todo.label;
                todo.editing             = true;
            },
            finishEdit     : function (todo) {
                if (!todo.editing) {
                    return;
                }
                todo.editing = false;
                if (!todo.label) {
                    this.removeTodo(todo);
                }
            },
            cancelEdit     : function (todo) {
                todo.editing = false;
                todo.label   = this.editingTodoOldValue;
            },
            /**
             * 删除所有 completed
             */
            removeCompleted: function () {
                this.todoList = filters.active(this.todoList);
            }
        }
    });

})(window);
