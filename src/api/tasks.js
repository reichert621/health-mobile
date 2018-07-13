import { get } from './http';

export const fetchTasks = () => {
  return get('/api/tasks').then(res => res.tasks);
};
