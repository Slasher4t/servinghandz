import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Text, ActivityIndicator, Button } from 'react-native-paper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import ProjectCard from '../components/ProjectCard';
import colors from '../theme/colors';

export default function HomeScreen({ navigation }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'projects'));
        setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <ActivityIndicator animating color={colors.primary} style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        style={styles.addButton}
        onPress={() => navigation.navigate('AddProject')}
      >
        + Add New Project
      </Button>
      <FlatList
        data={projects}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProjectCard
            project={item}
            onPress={() => navigation.navigate('ProjectDetails', { project: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10
  },
  addButton: {
    marginBottom: 16,
    borderRadius: 24,
    backgroundColor: colors.secondary
  }
});
