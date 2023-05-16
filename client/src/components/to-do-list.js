import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Button } from "semantic-ui-react";
import NoteForm from "./form/to-do-list-form";
import TodoItem from "./item/to-do-item";

let endpoint = "http://localhost:9000";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isFormVisible: false,
    };
  }

  componentDidMount() {
    this.getTask();
  }

  handleChange = (event) => {
    this.setState({
      task: {
        title: event.target.value,
        status: false,
      },
    });
  };

  onSubmit = (event) => {
    let task = this.state.task;
    console.log(task);
    console.log(event, "event");
  };

  getTask = () => {
    axios.get(endpoint + "/api/task").then((res) => {
      if (res.data) {
        console.log(res.data);
        const list = res.data.map((item) => {
          return {
            _id: item._id,
            title: item.title,
            note: item.note,
            status: item.status,
            isEditable: false,
          };
        });
        this.setState({
          items: list,
        });
      } else {
        this.setState({
          items: [],
        });
        console.log("No data found");
      }
    });
  };

  handlePostRequest = (value) => {
    this.getTask();
  };

  updateTaskStatus = (id, status) => {
    axios
      .put(endpoint + `/api/taskUpdate`, {
        Headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        _id: id,
        status: status,
      })
      .then(() => {
        this.getTask();
      });
  };

  deleteTask = (id) => {
    console.log(id);
    axios
      .delete(endpoint + "/api/taskDelete" + id, {
        Headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(() => {
        this.getTask();
      })
      .catch((err) => console.log(err));
  };

  handleToggleForm = () => {
    this.setState((prevState) => ({
      isFormVisible: !prevState.isFormVisible,
    }));
  };

  render() {
    return (
      <div>
        <div className="row">
          <Header className="header" as="h2">
            Todo List
          </Header>
        </div>
        <div className="row">
          <div>
            <Button onClick={this.handleToggleForm}>
              {this.state.isFormVisible
                ? "Hide Create Note"
                : "Show Create Note"}
            </Button>
            {this.state.isFormVisible && (
              <NoteForm onPostRequest={this.handlePostRequest} />
            )}
          </div>
          <div className="row" style={{ marginTop: "20px" }}>
            <Card.Group>
              {this.state.items.map((item) => (
                <TodoItem
                  key={item._id}
                  item={item}
                  updateTaskStatus={this.updateTaskStatus}
                  deleteTask={this.deleteTask}
                />
              ))}
            </Card.Group>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
