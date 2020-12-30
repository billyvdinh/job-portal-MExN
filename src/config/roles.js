const allRoles = {
  user: ['getJobs', 'getApplications', 'manageApplications'],
  admin: ['getJobs', 'manageJobs', 'getApplications', 'manageApplications', 'getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
