import { Component } from 'react';
import Count from './Count';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { text: 'Just some demo tasks', id: crypto.randomUUID() },
        { text: 'As an example', id: crypto.randomUUID() },
      ],
      inputVal: '',
      editingTodoId: null,
      tempEditVal: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      ...state,
      todos: state.todos.concat({
        text: state.inputVal,
        id: crypto.randomUUID(),
      }),
      inputVal: '',
    }));
  }

  handleDelete(todo) {
    this.setState((state) => ({
      ...state,
      todos: state.todos.filter((cur) => cur.id !== todo.id),
      inputVal: '',
    }));
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => {
            if (this.state.editingTodoId === todo.id) {
              return (
                <li key={todo.id}>
                  <input
                    type="text"
                    name="task-edit"
                    value={this.state.tempEditVal}
                    onChange={(e) =>
                      this.setState((state) => ({
                        ...state,
                        tempEditVal: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      this.setState((state) => ({
                        ...state,
                        todos: state.todos.map((todo) =>
                          todo.id === state.editingTodoId
                            ? { text: state.tempEditVal, id: todo.id }
                            : todo,
                        ),
                        editingTodoId: null,
                        tempEditVal: '',
                      }))
                    }
                  >
                    Resubmit
                  </button>
                </li>
              );
            }
            return (
              <>
                <li key={todo.id}>{todo.text}</li>
                <button
                  type="button"
                  onClick={() =>
                    this.setState((state) => ({
                      ...state,
                      inputVal: '',
                      editingTodoId: todo.id,
                      tempEditVal: todo.text,
                    }))
                  }
                >
                  Edit
                </button>
                <button type="button" onClick={() => this.handleDelete(todo)}>
                  Delete
                </button>
              </>
            );
          })}
        </ul>
        <Count todoCount={this.state.todos.length} />
      </section>
    );
  }
}

export default ClassInput;
