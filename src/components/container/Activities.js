import React, { Component } from 'react';
import { FlatList } from 'react-native';
import moment from 'moment';
import { ActivityCard } from '../presentation';
import { fetchTasks } from '../../api/tasks';

class Scorecard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    const date = moment();
    const today = date.format('YYYY-MM-DD');

    // TODO: fetch today's scorecard instead of all tasks
    return fetchTasks()
      .then(tasks => {
        return this.setState({ tasks });
      })
      .catch(err => console.log(err));
  }

  handleToggleTask(task) {
    const { tasks } = this.state;
    const updated = tasks.map(t => {
      return t.id === task.id ? { ...t, isComplete: !t.isComplete } : t;
    });

    return this.setState({ tasks: updated });
  }

  renderActivityCard(task) {
    const { id: key } = task;

    return (
      <ActivityCard
        key={key}
        task={task}
        onToggle={this.handleToggleTask.bind(this, task)}
      />
    );
  }

  render() {
    const { tasks = [] } = this.state;

    return (
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index}
        renderItem={({ item: task }) => this.renderActivityCard(task)}
      />
    );
  }
}

export default Scorecard;
