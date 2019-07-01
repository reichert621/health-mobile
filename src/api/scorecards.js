import { post, del } from './http';

export const findOrCreateByDate = date => {
  return post('/api/scorecards/date', { date }).then(res => res.scorecard);
};

export const selectScorecardTask = (id, taskId) => {
  const endpoint = `/api/scorecards/${id}/select-task/${taskId}`;

  return post(endpoint).then(res => res.success);
};

export const deselectScorecardTask = (id, taskId) => {
  const endpoint = `/api/scorecards/${id}/deselect-task/${taskId}`;

  return del(endpoint).then(res => res.success);
};

export const toggleScorecardTask = (id, taskId, isComplete) => {
  return isComplete
    ? selectScorecardTask(id, taskId)
    : deselectScorecardTask(id, taskId);
};
