import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { isNumber } from 'lodash';
import AssessmentQuestion from './AssessmentQuestion';
import { fetchAssessment, updateAssessmentScore } from '../../api/assessments';

class AssessmentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      assessmentId: null,
      questions: []
    };
  }

  componentDidMount() {
    const { assessmentId } = this.props;

    if (!assessmentId) {
      const err = 'An assessment id is required!';
      alert(err);
      throw new Error(err);
    }

    return fetchAssessment(assessmentId)
      .then(assessment => {
        const { id: assessmentId, questions = [] } = assessment;
        const current = questions.reduce((result, q, index) => {
          if (!isNumber(result) && !isNumber(q.score)) {
            return index;
          }

          return result;
        }, null);

        return this.setState({ assessmentId, questions, current });
      })
      .catch(err => {
        console.log('Error fetching assessment!', err);

        alert(JSON.stringify(err));
      });
  }

  handleScoreChange(question, score) {
    const { assessmentId, questions = [] } = this.state;
    const { id: questionId } = question;
    const updates = questions.map(q => {
      return q.id === question.id ? { ...q, score } : q;
    });

    return updateAssessmentScore(assessmentId, questionId, score)
      .then(result => {
        return this.setState({ questions: updates });
      })
      .catch(err => {
        console.log('Error selecting score!', err);

        alert(JSON.stringify(err));
      });
  }

  render() {
    const { current, questions = [] } = this.state;
    const question = questions[current];

    if (!question) {
      return null;
    }

    const isFirst = current === 0;
    const isLast = current === questions.length - 1;

    return (
      <AssessmentQuestion
        question={question}
        onSelectOption={this.handleScoreChange.bind(this, question)}
        isFirst={isFirst}
        isLast={isLast}
        onPressPrevious={() =>
          this.setState({ current: isFirst ? current : current - 1 })
        }
        onPressNext={() =>
          this.setState({
            current: isLast ? current : current + 1
          })
        }
        onPressDone={() => alert('Done!')}
      />
    );
  }
}

const styles = StyleSheet.create({});

export default AssessmentContainer;
