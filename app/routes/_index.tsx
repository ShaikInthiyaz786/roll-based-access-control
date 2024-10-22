// app/routes/index.jsx
const NEW_FEATURE_FLAG = process.env.NEW_FEATURE === "enabled";

export default function Index() {
  return (
    <div>
      <h1>Home</h1>
      {NEW_FEATURE_FLAG ? <p>New feature enabled!</p> : <p>Old content.</p>}
    </div>
  );
}
