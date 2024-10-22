// app/utils/roles.js
export const roleHierarchy = {
  admin: ["manager", "principal", "faculty"],
  manager: ["principal", "faculty"],
  principal: ["faculty"],
  faculty: [],
};

export const hasAccessToFeature = (role, feature) => {
  const rolesPermissions = {
    admin: ["newDashboard", "reports"],
    manager: ["studentModule", "attendance"],
    principal: ["attendance"],
    faculty: ["attendance"],
  };
  return rolesPermissions[role]?.includes(feature);
};
