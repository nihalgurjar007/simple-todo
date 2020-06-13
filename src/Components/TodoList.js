import React from 'react'
import TodoCard from './TodoCard'

class TodoList extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      itemList: props.itemList,
      addedValue: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("item", nextProps.itemList)
    this.setState({
      itemList: nextProps.itemList
    })
  }

  handleChange = (index, e) => {
    if (index === false) {
      this.setState({
        addedValue :  e.target.value
      })
      return
    }

    let itemList = [ ...this.props.itemList ]
    itemList[index] = {
      value: e.target.value
    }
    this.setState({
      itemList
    })
  }


  handleKeyDown = (add, e) => {
    if (e.key === 'Enter') {
      let itemList = [ ...this.state.itemList ]
      if (add === false && this.state.addedValue !== '') {
        itemList.push({
          value: this.state.addedValue
        })
        this.setState({
          addedValue: ''
        })
      }
      this.props.handleUpdation(itemList, this.props.type)
    }
  }

  handleDelete = (index) => {
    let itemList = [...this.state.itemList]
    itemList.splice(index, 1);
    this.props.handleUpdation(itemList, this.props.type)
  }

  
 

  render() {
    const { title, isAddingAllowed, isDone } = this.props
    const {itemList} = this.state
    return (
      <div className="todo-list" >
        <div className="todo-header">{title}</div>
        {isAddingAllowed &&
          <TodoCard
          isEditable={true}
          isAddedCard={true}
          item={{ value: this.state.addedValue }}
          handleChange={this.handleChange}
          handleKeyDown={this.handleKeyDown}
          placeholder={'Add Tasks'}
          isReadOnly
          />}
        {
          itemList.map((item, index) => {
            return (
              <div draggable
              onDrag={(event) => this.props.onDrag(event, item, this.props.type, index)}>
              <TodoCard
                item={item}
                handleChange={this.handleChange}
                isReadOnly
                isDone={isDone}
                handleKeyDown={this.handleKeyDown}
                index={index}
                handleDelete={this.handleDelete}
                />
                </div>
            )
          })
        }
        
      </div>
    )
  }

}
export default TodoList