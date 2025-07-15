import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import colors from '../theme/colors';

export default function ProjectCard({ project, onPress }) {
  return (
    <Card style={styles.card} onPress={onPress}>
      {project.imageUrl && (
        <Card.Cover source={{ uri: project.imageUrl }} style={styles.cover} />
      )}
      <Card.Content>
        <Title>{project.title}</Title>
        <Paragraph numberOfLines={2}>{project.description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={onPress} style={styles.button}>
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: colors.cardBackground
  },
  cover: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  button: {
    borderRadius: 24,
    backgroundColor: colors.primary
  }
});
