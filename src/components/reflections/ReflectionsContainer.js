import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import AssessmentCard from './AssessmentCard';
import {
  AssessmentType,
  fetchAssessmentsByDate,
  createAssessment
} from '../../api/assessments';

class ReflectionsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
      assessments: {}
    };
  }

  componentDidMount() {
    const today = moment().format('YYYY-MM-DD');

    return fetchAssessmentsByDate(today)
      .then(assessments => {
        return this.setState({ assessments, date: today });
      })
      .catch(err => {
        console.log('Error fetching assessments!', err);

        return alert(JSON.stringify(err));
      });
  }

  findOrCreateByType(type) {
    const {
      date = moment().format('YYYY-MM-DD'),
      assessments = {}
    } = this.state;
    const existing = assessments[type];

    if (existing && existing.id) {
      return Promise.resolve(existing);
    } else {
      return createAssessment({ date, type });
    }
  }

  navigate(type) {
    const { navigation } = this.props;

    return this.findOrCreateByType(type)
      .then(({ id: assessmentId }) => {
        return navigation.navigate('assessment', { assessmentId });
      })
      .catch(err => {
        console.log('Error creating assessment!', err);

        alert(JSON.stringify(err));
      });
  }

  render() {
    const { assessments } = this.state;
    const { DEPRESSION, ANXIETY, WELL_BEING } = AssessmentType;
    const depression = assessments[DEPRESSION];
    const anxiety = assessments[ANXIETY];
    const wellness = assessments[WELL_BEING];

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Container</Text>

        <AssessmentCard
          title="Well-being"
          assessment={wellness}
          onSelect={() => this.navigate(WELL_BEING)}
        />

        <AssessmentCard
          title="Anxiety"
          assessment={anxiety}
          onSelect={() => this.navigate(ANXIETY)}
        />

        <AssessmentCard
          title="Depression"
          assessment={depression}
          onSelect={() => this.navigate(DEPRESSION)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#595557',
    fontSize: 24,
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center'
  },
  container: {
    backgroundColor: '#fff',
    height: '100%',
    paddingTop: 40
  }
});

export default ReflectionsContainer;
