
import React, { useEffect, useState } from 'react';
import { View, Text, Switch, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const MobileToggleScreen = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    axios.get('https://yourdomain.com/api/feature-toggles/')
      .then(res => setFeatures(res.data))
      .catch(err => console.log(err));
  }, []);

  const toggleFeature = (id, currentState) => {
    axios.patch(`https://yourdomain.com/api/feature-toggles/${id}/`, { is_enabled: !currentState })
      .then(() => {
        setFeatures(features.map(f => f.id === id ? { ...f, is_enabled: !currentState } : f));
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Feature Toggles</Text>
      {features.map(feature => (
        <View key={feature.id} style={styles.row}>
          <Text>{feature.feature_name}</Text>
          <Switch
            value={feature.is_enabled}
            onValueChange={() => toggleFeature(feature.id, feature.is_enabled)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  }
});

export default MobileToggleScreen;
