// Weekly mission UI
export default function WeeklyMission({ mission }) {
  return <p>This Week: {mission.goal} - {mission.progress}/5</p>;
}