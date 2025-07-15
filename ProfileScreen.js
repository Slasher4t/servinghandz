import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Title, Button, Card, Switch } from 'react-native-paper';
import { auth, firestore } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ThemeContext } from '../context/ThemeContext';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [signedUpProjects, setSignedUpProjects] = useState([]);
  const { isDark, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const userRef = collection(firestore, 'users');
      const q = query(userRef, where('email', '==', user.email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setUserData(data);
        if (data.signedUpProjects) {
          setSignedUpProjects(data.signedUpProjects);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => navigation.replace('Login'));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Title>Profile</Title>
      <Text>Email: {userData?.email}</Text>
      <Button mode="outlined" onPress={handleLogout} style={styles.logout}>
        Logout
      </Button>

      <View style={styles.themeRow}>
        <Text>Dark Mode</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>

      <Title style={{ marginTop: 20 }}>My Signed-up Projects</Title>
      {signedUpProjects.length === 0 ? (
        <Text>No projects signed up yet.</Text>
      ) : (
        signedUpProjects.map((project, index) => (
          <Card key={index} style={styles.card}>
            <Card.Title title={project.title} />
            <Card.Content>
              <Text>{project.description}</Text>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logout: {
    marginTop: 20,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  card: {
    marginTop: 12,
  },
});

export default ProfileScreen;
