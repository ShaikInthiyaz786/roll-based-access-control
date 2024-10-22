// app/routes/dashboard.jsx
import { useLoaderData } from "@remix-run/react";
import useFeatureFlags from "../stores/useFeatureFlags";
import { hasAccessToFeature, roleHierarchy } from "../utils/roles";
import { getUserFromRequest } from "../utils/auth";
// app/routes/dashboard.jsx
import "../styles/dashboard.css";

export const loader = async ({ request }) => {
  const user = await getUserFromRequest(request); // Fetch the logged-in user
  return { user };
};

export default function Dashboard() {
  const { user } = useLoaderData();
  const { flags, toggleFlag, assignPermission } = useFeatureFlags();

  const availableRoles = roleHierarchy[user.role] || [];
  const roleFlags = flags[user.role] || {};

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">{user.role} Dashboard</h1>
      <p className="welcome-text">
        Hello, {user.role}! Manage your features below.
      </p>

      <section className="features-section">
        <h2>Your Features</h2>
        <div className="feature-cards">
          {Object.entries(roleFlags).map(([feature, isEnabled]) => (
            <div
              className={`feature-card ${isEnabled ? "enabled" : "disabled"}`}
              key={feature}
            >
              <h3>{feature}</h3>
              <button
                className="toggle-btn"
                onClick={() => toggleFlag(user.role, feature)}
              >
                {isEnabled ? "Disable" : "Enable"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {availableRoles.length > 0 && (
        <section className="roles-management">
          <h2>Manage Subordinate Roles</h2>
          {availableRoles.map((role) => (
            <div className="role-card" key={role}>
              <h3>{role} Features</h3>
              <ul>
                {Object.entries(flags[role] || {}).map(
                  ([feature, isEnabled]) => (
                    <li key={feature}>
                      <span>
                        {feature}: {isEnabled ? "Enabled" : "Disabled"}
                      </span>
                      <button
                        className="toggle-btn"
                        onClick={() =>
                          assignPermission(role, feature, !isEnabled)
                        }
                      >
                        {isEnabled ? "Revoke" : "Grant"}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
