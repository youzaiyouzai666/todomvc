/**
 * Created by CAOYI on 2018/1/8.
 */
(function (exports){
    var STORAGE_KEY = 'todos-vue';
    exports.todoStorage = {
        fetch: function(){
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        },
        save: function(todos){
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        }
    }
})(window);