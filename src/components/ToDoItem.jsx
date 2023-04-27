import React from "react"

class ToDoItem extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="to-do-item">
                <div className={this.props.item.complete ? "completed-item" : "item-name"}>{this.props.item.name}</div>
                <div className="action-buttons">
                    <input type="checkbox" onChange={() => this.props.toggleItem(this.props.item)} checked={this.props.item.complete} />
                    <button onClick={() => this.props.deleteItem(this.props.item)}>X</button>
                </div>
                
            </div>
        )
    }
}

export default ToDoItem