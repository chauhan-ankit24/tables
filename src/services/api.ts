import { DirectoryMonitorRow } from "../constants/table";

const BASE_URL = "http://localhost:5000/tests";

// Get all tests
export const getTests = async (): Promise<DirectoryMonitorRow[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch tests");
  return res.json();
};

// Get test by id
export const getTestById = async (id: string): Promise<DirectoryMonitorRow> => {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error(`Test with id ${id} not found`);
  return res.json();
};

// Add new test
export const addTest = async (
  test: DirectoryMonitorRow
): Promise<DirectoryMonitorRow> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(test),
  });
  if (!res.ok) throw new Error("Failed to add test");
  return res.json();
};

// Update test (replace full object)
export const updateTest = async (
  id: string,
  updated: DirectoryMonitorRow
): Promise<DirectoryMonitorRow> => {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...updated, id }), // ensure id is kept
  });
  if (!res.ok) throw new Error("Failed to update test");
  return res.json();
};

// Delete test
export const deleteTest = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete test");
};
