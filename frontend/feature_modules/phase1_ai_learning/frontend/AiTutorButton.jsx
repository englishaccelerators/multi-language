// AI Tutor Trigger Button
export default function AiTutorButton({ question, userAnswer }) {
  const explain = () => alert('This is why it’s wrong... (GPT simulated)');
  return <button onClick={explain}>Why is this wrong?</button>;
}