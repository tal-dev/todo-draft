import React from "react"
import { v4 as uuidv4 } from 'uuid';
import ToDoItem from "./ToDoItem";

class ToDoList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            inputValue: ""
        }
    }

    componentDidMount() {
        const storedTodoItems = localStorage.getItem('todoItems');
        if (storedTodoItems) {
          this.setState({
            items: JSON.parse(storedTodoItems),
          });
        }
      }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.items !== prevState.items) {
          localStorage.setItem('todoItems', JSON.stringify(this.state.items));
        }
    }
    
    handleAddItem = () => {
        if(this.state.inputValue) {
            const newItem = {
                id: uuidv4(),
                name: this.state.inputValue,
                complete: false
              };
              
            this.setState({
                items: [...this.state.items, newItem],
                inputValue: ""
            })
        }
    }

    handleInputChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    deleteItem = (toDoItem) => {
        this.setState({
            items: this.state.items.filter(item => item.id !== toDoItem.id)
        })
    }

    toggleItem = (toDoItem) => {
        const updatedItems = this.state.items.map((item) => {
            if (item.id === toDoItem.id) {
              return { ...item, complete: !toDoItem.complete };
            }
            return item;
          });
          this.setState({
            items: updatedItems
          })
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.handleInputChange} value={this.state
                .inputValue}/>
                <button onClick={this.handleAddItem}>Add</button>
                <ul>
                    {
                        this.state.items.map(item => {
                            return <ToDoItem item={item} deleteItem={this.deleteItem} toggleItem={this.toggleItem}/>
                        })
                    }
                </ul>
            </div>
            
        )
    }
}

export default ToDoList