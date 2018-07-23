import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { AssessmentContainer } from '../components/reflections';

class AssessmentScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assessment: null
    };
  }

  getAssessmentId() {
    const { navigation } = this.props;

    return navigation.getParam('assessmentId');
  }

  render() {
    const assessmentId = this.getAssessmentId();

    if (!assessmentId) {
      return null;
    }

    return <AssessmentContainer assessmentId={assessmentId} />;
  }
}

const styles = StyleSheet.create({});

export default AssessmentScreen;
