import { get, post } from './http';

export const AssessmentType = {
  DEPRESSION: 'depression',
  ANXIETY: 'anxiety',
  WELL_BEING: 'wellbeing'
};

export const fetchAssessmentsByDate = date => {
  return get(`/api/assessments/date/${date}`).then(res => res.assessments);
};

export const fetchAssessment = id => {
  return get(`/api/assessments/${id}`).then(res => res.assessment);
};

export const createAssessment = params => {
  return post('/api/assessments', params).then(res => res.assessment);
};

export const fetchWellBeingQuestions = () => {
  return get('/api/assessments/well-being').then(res => res.questions);
};

export const updateAssessmentScore = (id, questionId, score) => {
  const endpoint = `/api/assessments/${id}/questions/${questionId}/score`;

  return post(endpoint, { score }).then(res => res.assessmentScore);
};
