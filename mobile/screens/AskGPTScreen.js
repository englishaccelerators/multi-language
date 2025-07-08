
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

export default function AskGPTScreen() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const askChatGPT = async () => {
    setResponse('Loading...');
    try {
      const res = await fetch('http://localhost:8000/api/debug/analyze/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ log: input })
      });
      const data = await res.json();
      setResponse(data.suggestion || data.error || 'No response.');
    } catch (err) {
      setResponse('Error contacting server.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ask ChatGPT</Text>
      <TextInput
        style={styles.input}
        multiline
        value={input}
        onChangeText={setInput}
        placeholder="Type your grammar or vocabulary question..."
      />
      <Button title="Ask" onPress={askChatGPT} />
      <Text style={styles.response}>{response}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, minHeight: 100 },
  response: { marginTop: 20, fontSize: 16, color: '#333' },
});
