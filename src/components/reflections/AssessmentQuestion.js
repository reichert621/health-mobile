import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { times } from 'lodash';

const getScoreDescription = score => {
  return (
    [
      'disagree',
      'somewhat agree',
      'agree',
      'strongly agree',
      'very strongly agree'
    ][score] || 'unanswered'
  );
};

const AssessmentButton = ({ text, onPress, isDisabled }) => {
  return (
    <TouchableOpacity
      style={[styles.assessmentBtn, isDisabled ? styles.btnDisabled : null]}
      activeOpacity={isDisabled ? 1.0 : 0.4}
      onPress={onPress}
    >
      <Text
        style={[
          styles.assessmentBtnText,
          isDisabled ? styles.btnDisabledText : null
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const AssessmentSelector = ({ selected, onSelect }) => {
  return (
    <View style={styles.assessmentSelector}>
      {times(5).map(n => {
        const description = getScoreDescription(n);
        const isSelected = n === selected;

        return (
          <TouchableOpacity
            key={n}
            style={styles.selectorItemContainer}
            onPress={() => onSelect(n)}
          >
            <View
              style={[
                styles.selectorItem,
                isSelected ? styles.selectedItem : null
              ]}
            />
            <Text
              style={[
                styles.selectorText,
                isSelected ? styles.selectedText : null
              ]}
            >
              {description}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const AssessmentQuestion = ({
  question,
  onSelectOption,
  isFirst,
  isLast,
  onPressPrevious,
  onPressNext,
  onPressDone
}) => {
  const { text, score } = question;

  return (
    <View style={styles.container}>
      <View style={styles.questionTextContainer}>
        <Text style={styles.questionText}>{text}</Text>
      </View>

      <AssessmentSelector selected={score} onSelect={onSelectOption} />

      <View style={styles.assessmentBtnsContainer}>
        <AssessmentButton
          isDisabled={isFirst}
          text="Previous"
          onPress={onPressPrevious}
        />

        <AssessmentButton
          text={isLast ? 'Done' : 'Next'}
          onPress={isLast ? onPressDone : onPressNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(251, 246, 240, 0.4)',
    width: '100%',
    height: '100%',
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 32,
    justifyContent: 'space-between'
  },
  questionNumberContainer: {},
  questionNumberText: {
    fontSize: 12,
    fontWeight: '100'
  },
  questionTextContainer: {
    height: 48
  },
  questionText: {
    color: '#595557',
    fontSize: 18,
    fontWeight: '500'
  },
  assessmentSelector: {
    marginBottom: 40
  },
  selectorItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  selectorItem: {
    backgroundColor: 'rgba(184, 140, 90, 0.0001)',
    height: 48,
    width: 48,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: 'rgba(184, 140, 90, 0.48)',
    marginRight: 24
  },
  selectedItem: {
    backgroundColor: '#E6AF70',
    borderColor: '#E6AF70'
  },
  selectorText: {
    color: '#B88C5A'
  },
  selectedText: {
    color: '#E6AF70'
  },
  assessmentBtnsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  assessmentBtn: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    borderBottomWidth: 4,
    borderColor: '#E6AF70'
  },
  btnDisabled: {
    borderColor: '#F4E6DB'
  },
  btnDisabledText: {
    color: '#F4E6DB'
  },
  assessmentBtnText: {
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1.6,
    color: '#E6AF70'
  }
});

export default AssessmentQuestion;
