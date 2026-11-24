
const API_BASE = "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`${response.status}: ${message}`);
  }

  return response.json();
}

export const api = {
  getProcesses: () => request("/processes"),
  getEvents: () => request("/security/events"),
  scanProcesses: () =>
    request("/security/scan", { method: "POST" }),

  getAuditResults: () => request("/audit/results"),
  runAudit: () => request("/audit/run", { method: "POST" }),

  getIncidents: () => request("/incidents"),
  updateIncident: (id, status, assigned_to = null) =>
    request(`/incidents/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status, assigned_to }),
    }),
};

