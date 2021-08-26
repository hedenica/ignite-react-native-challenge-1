import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { Task, TasksListProps } from '../components/TasksList'

import trashIcon from '../assets/icons/trash/trash.png'
import pencilIcon from '../assets/icons/pencil.png'

interface TaskItemProps extends Omit<TasksListProps, 'tasks'> {
  item: Task;
  index: number;
}

export function TaskItem({ item, index, editTask, removeTask, toggleTaskDone }: TaskItemProps) {
  const [isEditing, setEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(item.title)

  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setEditing(true)
  }

  function handleCancelEditing() {
    setEditedValue(item.title)
    setEditing(false)
  }

  function handleSubmitEditing() {
    editTask(item.id, editedValue)
    setEditing(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus()
      } else {
        textInputRef.current.blur()
      }
    } 
  }, [isEditing])

  return (
    <>
      <View>
      <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(item.id)}
      >
        <View 
          testID={`marker-${index}`}
          style={item.done ? styles.taskMarkerDone : styles.taskMarker}
        >
          { item.done && (
            <Icon 
              name="check"
              size={12}
              color="#FFF"
            />
          )}
        </View>

        <TextInput 
          ref={textInputRef}
          style={item.done ? styles.taskTextDone : styles.taskText}
          value={editedValue}
          editable={isEditing}
          onChangeText={setEditedValue}
          onSubmitEditing={handleSubmitEditing}
        />
      </TouchableOpacity>
    </View>
  
    <View style={styles.iconsContainer}>
      {isEditing ? (
        <TouchableOpacity onPress={handleCancelEditing}>
            <Icon 
              name="x"
              size={24}
              color="#b2b2b2"
            />
        </TouchableOpacity>
      ): (
        <TouchableOpacity onPress={handleStartEditing}>
          <Image source={pencilIcon} />
        </TouchableOpacity>
      )}
      <View style={styles.iconsDivider} />
      <TouchableOpacity
        testID={`trash-${index}`}
        onPress={() => removeTask(item.id)}
        disabled={isEditing}
      >
        <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1}} />
      </TouchableOpacity>
    </View>
  </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  iconsDivider: {
    width: 1,
    height: 24,
    marginHorizontal: 10,
    backgroundColor: 'rgba(196, 196, 196, 0.24)'
  }
})