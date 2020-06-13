import React from 'react'
import '../Styles/TodoCard.css'

class TodoCard extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      isReadOnly: props.isReadOnly
    }
  }


  handleAction = (action, index) => {
    if (action === 'edit' || action === 'add') {
      this.setState({
        isReadOnly: false
      })
    }
    if (action === 'delete') {
      this.props.handleDelete(index)
    }
  }

  handleKeyDown = (type, e) => {
    if (e.key === 'Enter') {
      this.setState({
        isReadOnly: true
      })
      this.props.handleKeyDown(type, e)
    }
  }



  render() {
    const { isAddedCard, item, isDone, index, placeholder = '' } = this.props
    const { isReadOnly } = this.state
    const type = isAddedCard ? false : index
    return (
      <div className="todo-card">
        <div className="todo-item" style={{ background: isDone ? 'lightgreen' : 'white'}}>
          {isAddedCard && <div onClick={this.handleAction.bind(this,'add')} className="add-btn"> + </div>}
          <input type="text"
            style={{outline : isReadOnly ? 'none' : '1px solid black', background: isDone ? 'lightgreen' : 'white'}}
            className="todo-input"
            value={item.value}
            onKeyDown={this.handleKeyDown.bind(this,type)}
            onChange={this.props.handleChange.bind(this, type)}
            readOnly={isReadOnly}
            placeholder={placeholder}
          />
          {!isAddedCard && !isDone &&
            <React.Fragment>
              <div className="edit-btn" onClick={this.handleAction.bind(this, 'edit')}>
                Edit
              </div>
              <div className="del-btn" onClick={this.handleAction.bind(this, 'delete', index)}>
                Delete
              </div>
            </React.Fragment>
          }
        </div>
      </div>
    )
  }
}

export default TodoCard