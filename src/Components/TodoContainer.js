import React from 'react'
import TodoList from './TodoList'
import '../Styles/TodoContainer.css'

class TodoContainer extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      todoList: [{ value: 'something-1' }, {value: 'something-2'}],
      doingList: [{ value: 'something-3' }, {value: 'something-4'},{ value: 'something-5' }],
      doneList: [{ value: 'something-6' }]
    }
  }

  handleUpdation = (data, type) => {
    this.setState({
      [`${type}List`]: data
    }, () => {
        console.log(this.state.todoList)
    })
  }

  onDrag = (event, item, type, index) => {
    event.preventDefault();
    console.log("draggedtask", item, index)
    this.setState({
      draggedTask: item,
      draggedType: type,
      draggedIndex: index
    });
  }

  onDragOver = (event) => {
    event.preventDefault();
  }
  onDrop = (event , type) => {
    const { draggedTask, draggedType, draggedIndex } = this.state;
    let draggedList = [...this.state[`${draggedType}List`]]
    draggedList.splice(draggedIndex,1)
    this.setState({
      [`${type}List`]: [...this.state[`${type}List`], draggedTask],
      [`${draggedType}List`]: draggedList,
      draggedTask: {},
      draggedType: '',
      draggedIndex: null
    });
  }

  render() {
    return (
      <div className="todo-box">
        <div 
          onDrop={event => this.onDrop(event, 'todo')}
          onDragOver={(event => this.onDragOver(event))}
        >
          <TodoList
            title="to do"
            itemList={this.state.todoList}
            isAddingAllowed={true}
            type='todo'
            onDrag={this.onDrag}
            handleUpdation={this.handleUpdation}
            />
        </div>
        <div onDrop={event => this.onDrop(event, 'doing')}
          onDragOver={(event => this.onDragOver(event))}>
          <TodoList
            title="doing"
            itemList={this.state.doingList}
            type='doing'
            onDrag={this.onDrag}
            handleUpdation={this.handleUpdation}
            />
        </div>
        <div 
          onDrop={event => this.onDrop(event, 'done')}
          onDragOver={(event => this.onDragOver(event))}
          >
          <TodoList
            title="done"
            itemList={this.state.doneList}
            isDone
            type='done'
            handleUpdation={this.handleUpdation}
            onDrag={this.onDrag}
            />
        </div>
      </div>
    )
  }

}
export default TodoContainer