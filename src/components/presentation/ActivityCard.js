import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { images } from '../../config';

const TaskCard = ({ task, onToggle }) => {
  const { description, points, category, isComplete } = task;

  return (
    <View
      style={[styles.taskCardContainer, isComplete ? styles.isComplete : null]}
    >
      <View style={styles.categoryTagsContainer}>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>

      <View style={styles.activityDescriptionContainer}>
        <View style={styles.activityDescription}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>

        <TouchableOpacity activeOpacity={0.8} onPress={onToggle}>
          <View style={styles.activityCheckbox}>
            {isComplete && <Image source={images.check} />}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.activityPointsContainer}>
        <View style={styles.activityPoints}>
          <Text style={styles.pointsText}>
            {points} {points === 1 ? 'point' : 'points'}
          </Text>
        </View>

        {/*
        <View style={styles.activityPointsButton}>
        </View>
        */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskCardContainer: {
    borderRadius: 4,
    marginBottom: 8,
    marginTop: 8,
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingHorizontal: 16,
    paddingVertical: 24,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.16,
    width: '90%'
  },
  isComplete: {
    backgroundColor: '#FBF6F0',
    shadowOpacity: 0
  },
  categoryTagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 8
  },
  categoryTag: {
    backgroundColor: '#80A0C0',
    borderRadius: 4,
    minWidth: 64,
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.8,
    textAlign: 'center'
  },
  activityDescriptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  activityDescription: {
    marginRight: 8,
    width: '80%'
  },
  descriptionText: {
    letterSpacing: 1.2,
    fontSize: 18,
    fontWeight: '100'
  },
  activityCheckbox: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderColor: 'rgba(0, 0, 0, 0.16)',
    borderWidth: 0.4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48
  },
  activityPointsContainer: {},
  activityPoints: {},
  pointsText: {
    fontSize: 14,
    fontWeight: '100'
  },
  activityPointsButton: {}
});

export default TaskCard;
