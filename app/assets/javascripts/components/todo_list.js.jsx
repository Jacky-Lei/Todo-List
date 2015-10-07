/* global React */
var TodoList = React.createClass({
  getInitialState: function(){
    return { allItems: TodoStore.all()};
  },

  componentDidMount: function(){
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },

  componentWillUnmount: function(){
    TodoStore.removeChangedHandler(this.todosChanged);
  },

  todosChanged: function(){
    this.setState({ allItems: TodoStore.all() });
  },

  render: function() {
    return (
      <div>
        {
          this.state.allItems.map(function (item) {
            return <TodoListItem key={item.id} item={item}/>
            })
        }
      </div>);
    }
});
