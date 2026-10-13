const STORAGE_KEY = "jobflow-applications";

export async function fetchApplications() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const storedApplications = localStorage.getItem(STORAGE_KEY);

  return storedApplications
    ? JSON.parse(storedApplications)
    : [];
}

export async function addApplication(newApplication) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const storedApplications = localStorage.getItem(STORAGE_KEY);

  const applications = storedApplications
    ? JSON.parse(storedApplications)
    : [];

  const application = {
    id: Date.now(),
    ...newApplication,
  };

  const updatedApplications = [
    ...applications,
    application,
  ];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedApplications)
  );

  return application;
}

export async function updateApplicationStatus(id, newStatus) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const storedApplications = localStorage.getItem(STORAGE_KEY);

  const applications = storedApplications
    ? JSON.parse(storedApplications)
    : [];

  const updatedApplications = applications.map((application) =>
    application.id === id
      ? { ...application, status: newStatus }
      : application
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedApplications)
  );

  return updatedApplications.find(
    (application) => application.id === id
  );
}

export async function deleteApplication(id) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const storedApplications = localStorage.getItem(STORAGE_KEY);

  const applications = storedApplications
    ? JSON.parse(storedApplications)
    : [];

  const updatedApplications = applications.filter(
    (application) => application.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedApplications)
  );

  return id;
}

