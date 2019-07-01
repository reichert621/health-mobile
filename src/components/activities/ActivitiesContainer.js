import React, { Component } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import moment from 'moment';
import ActivityCard from './ActivityCard';
import { findOrCreateByDate, toggleScorecardTask } from '../../api/scorecards';

class ActivitiesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      scorecard: null,
      tasks: []
    };
  }

  componentDidMount() {
    return this.fetchCurrentScorecard().catch(err => console.log(err));
  }

  fetchCurrentScorecard() {
    const date = moment();
    const today = date.format('YYYY-MM-DD');

    return findOrCreateByDate(today).then(scorecard => {
      const { tasks = [] } = scorecard;

      return this.setState({ scorecard, tasks, refreshing: false });
    });
  }

  handleRefresh() {
    this.setState({ refreshing: true });

    return this.fetchCurrentScorecard()
      .then(() => {
        return this.setState({ refreshing: false });
      })
      .catch(err => console.log(err));
  }

  handleToggleTask(task) {
    const { scorecard, tasks = [] } = this.state;
    const { id: scorecardId } = scorecard;
    const { id: taskId, isComplete: wasComplete } = task;
    const isComplete = !wasComplete;

    return toggleScorecardTask(scorecardId, taskId, isComplete)
      .then(res => {
        const updated = tasks.map(t => {
          return t.id === taskId ? { ...t, isComplete: !t.isComplete } : t;
        });

        return this.setState({ tasks: updated });
      })
      .catch(err => console.log('Error toggling task!', err));
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
    const { tasks = [], refreshing } = this.state;

    return (
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index}
        renderItem={({ item: task }) => this.renderActivityCard(task)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => this.handleRefresh()}
          />
        }
      />
    );
  }
}

export default ActivitiesContainer;
