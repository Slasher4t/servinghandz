import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import colors from '../theme/colors';

export default function AddProjectScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddProject = async () => {
    try {
      await addDoc(collection(db, 'projects'), {
        title,
        description,
        imageUrl
      });
      alert('Project added!');
      navigation.goBack();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title>Add New Project</Title>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        style={styles.input}
      />
      <TextInput
        label="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
        mode="outlined"
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleAddProject}
        style={styles.button}
      >
        Save Project
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background
  },
  input: {
    marginBottom: 16
  },
  button: {
    borderRadius: 24
  }
});
