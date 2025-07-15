import React from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { Title, Paragraph, Button } from 'react-native-paper';
import colors from '../theme/colors';
import { auth, db } from '../config/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function ProjectDetailsScreen({ route }) {
  const { project } = route.params;

  const handleSignUp = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await updateDoc(doc(db, 'users', user.uid), {
        signedUpProjects: arrayUnion(project.id)
      });

      alert('You have signed up!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {project.imageUrl && (
        <Image source={{ uri: project.imageUrl }} style={styles.image} />
      )}
      <Title style={styles.title}>{project.title}</Title>
      <Paragraph style={styles.description}>{project.description}</Paragraph>
      <Button
        mode="contained"
        onPress={handleSignUp}
        style={styles.button}
      >
        Sign Up
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 20
  },
  title: {
    fontSize: 26,
    color: colors.primary,
    marginBottom: 12
  },
  description: {
    fontSize: 16,
    marginBottom: 20
  },
  button: {
    borderRadius: 24,
    backgroundColor: colors.primary
  }
});
