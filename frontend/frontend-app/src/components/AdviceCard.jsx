export default function AdviceCard({ advice }) {
  return (
    <div className="advice-box">
      <h2>Conseil</h2>
      <p>{advice.conseil}</p>
    </div>
  );
}
