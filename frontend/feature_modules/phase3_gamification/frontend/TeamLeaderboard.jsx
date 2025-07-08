// Team leaderboard display
export default function TeamLeaderboard({ scores }) {
  return <ul>{Object.entries(scores).map(([team, score]) => <li key={team}>{team}: {score}</li>)}</ul>;
}