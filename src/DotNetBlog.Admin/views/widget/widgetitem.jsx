var React = require("react")
var {sortable} = require("react-sortable")

var WidgetItem = React.createClass({
    displayName: 'WidgetItem',
    render: function() {
        return (
            <li {...this.props}>
                {this.props.children.widget.config.title}
                <span className="item-buttons">
                    <button title={"edit".L()} onClick={this.props.children.onEdit}><i className="fa fa-pencil"></i></button>
                    <button title={"remove".L()} onClick={this.props.children.onRemove}><i className="fa fa-trash"></i></button>
                </span>
            </li>
        )
    }
})

module.exports = sortable(WidgetItem)