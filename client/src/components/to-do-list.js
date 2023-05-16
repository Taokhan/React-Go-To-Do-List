import React, { Component } from "react";
import axios from "axios";
import { Card, Header,Button } from "semantic-ui-react";
import NoteForm from "./form/to-do-list-form";

let endpoint = "http://localhost:9000";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
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
        this.setState({
          items: res.data.map((item) => {
            let borderColor;
            let textDecoration;
            switch (item.status) {
              case "completed":
                borderColor = "green";
                textDecoration = "line-through";
                break;
              case "inProgress":
                borderColor = "orange";
                textDecoration = "none";
                break;
              case "pending":
                borderColor = "red";
                textDecoration = "none";
                break;
              default:
                borderColor = "black";
                textDecoration = "none";
            }
            let style = {
              wordWrap: "break-word",
              textDecoration: textDecoration,
              border: `2px solid ${borderColor}`,
              borderRadius: "5px",
              padding: "10px",
              margin: "0 500px"
            };
            let noteStyle = {
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                marginTop: "10px",
                backgroundColor: "#f9f9f9",
              };
  
            return (
              <div key={item._id} style={style}>
                <div style={{ fontWeight: "bold", textDecoration: "underline" }}>
                  {item.title}
                </div>
                <div style={noteStyle}>{item.note}</div>
                <select
                  value={item.status}
                  onChange={(event) => this.updateTaskStatus(item._id, event.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="inProgress">In Progress</option>
                </select>
                <button onClick={() => this.deleteTask(item._id)}>Delete</button>
              </div>
            );
          }),
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
  
  updateTaskStatus = (id,status) => {
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
    console.log(id)
    axios
      .delete(endpoint + `/api/taskDelete` + id, {
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
                {this.state.isFormVisible ? "Hide Create Note" : "Show Create Note"}
            </Button>
            {this.state.isFormVisible && (
              <NoteForm onPostRequest={this.handlePostRequest} />
            )}
          </div>
          <div className="row"style={{ marginTop: "20px" }}>
            <Card.Group>{this.state.items}</Card.Group>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
