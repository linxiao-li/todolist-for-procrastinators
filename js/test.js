$(function(){
/**Here stores the data**/

var dataSet = [];

/*cache the webix elements*/
var switchButton = $$("switchButton"),
    addButton = $$("addItem"),
    leftTodos = $$("leftTodos"),
    addInput = $$("input"),// selected with webix native selector in order to use the built in functions
    listView = $$("todoList");


/**start building functions with Backbone**/
/**Model*/
 var Item = Backbone.Model.extend({

  defaults:function(){
    return{
      todo:"something to do...",
      _id:"some id"
    }
  },

  initialize:function(){
    if(!this.get("todo")){
      this.set({"todo":this.defaults().todo})
    }
    if(!this.get("_id")){
      this.set({"_id":this.defaults()._id})
    }
  }
 });


/**Collection**/
 var List = Backbone.Collection.extend({

  model:Item,



  setId:function(){

    this.each(function(item,index,list){
      item.set("_id",index);
    })

  },

  createItem:function(item){
      
       this.add(item);
       dataSet.push(item.toJSON());
    
   },

  deleteItem:function(id){
   var selectedItem = this.where({"_id":id});
   this.remove(selectedItem);
   dataSet = dataSet.filter(function(obj) {
        if ('id' in obj && obj.id != id) {
          return true;
       }
     })
   }
 });

var Todos = new List(dataSet);



/**View**/

 var AppView = Backbone.View.extend({

  initialize:function(){
     this.render()
     
  },

  render: function() {
      Todos.setId();
      listView.sync(Todos);
      if(Todos.models.length>0){
        leftTodos.setHTML("<p>" + chText.haiyou + Todos.models.length + chText.wancheng + "</p>")
      }else{
        leftTodos.setHTML("<p>"+chText.tianjia+"</p>"+"<p>"+chText.shanchu+"</p>"+"<p>"+chText.kangfu+"</p>")
      }
      
  
  },

  createOne: function(){
      var value = addInput.getValue(),
          newItem = new Item;
      if(value!=""){
        newItem.set({"todo":value});
        Todos.createItem(newItem);
      }     
      addInput.setValue("");
      return this      

      
  },

  deleteOne:function(id,e,node){
      var selected = listView.getItem(id),
          myId = selected._id;

      Todos.deleteItem(myId);
      return this
  },

  });

 var App = new AppView;


/*select elements and attach events*/
 var addHandler = function(){
  if(Todos.models.length<3){
    App.createOne().render()
  }else{
    leftTodos.setHTML("<p>"+chText.msg+"</p>")

  }
  
 };

 var deleteHandler = function(id,e,node){
  App.deleteOne(id,e,node).render()
 };


addButton.attachEvent("onItemClick",addHandler);
switchButton.attachEvent("onItemClick",function(){
  leftTodos.setHTML("<p>"+chText.tuoyan+"</p>")
})
listView.attachEvent("onItemDblClick",deleteHandler);





});

  