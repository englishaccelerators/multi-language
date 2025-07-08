// Word Suggestion UI
export default function WordRecommender({ suggestions }) {
  return <div>{suggestions.map((w, i) => <span key={i}>{w}</span>)}</div>;
}