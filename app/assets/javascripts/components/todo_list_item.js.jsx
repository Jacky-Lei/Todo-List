/* global React */

var TodoListItem = React.createClass({
  render: function() {
    return (
      <div>
        <div className="item-title">
          {this.props.item.title}
        </div>
        <div className="item-body">
          {this.props.item.body}
        </div>
      </div>
    );
  }
});
