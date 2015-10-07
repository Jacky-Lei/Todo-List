var TodoForm = React.createClass({
  getInitialState: function(){
    return { title: "", body: ""};
  },

  render: function(){
    return(
      <input type="text" value={this.state.title} />
      <input type="text" value={this.state.body} />
    );
  }
});
