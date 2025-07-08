// Mistake Feedback Component
export default function MistakeFeedback({ result }) {
  return result.map(([u, c, match], i) => (
    <span key={i} style={{ color: match ? 'green' : 'red' }}>{u} </span>
  ));
}