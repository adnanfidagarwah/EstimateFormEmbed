// Storage interface for potential future use
// Currently, all data is sent via email and not persisted

export interface IStorage {
  // Add storage methods here if needed in the future
}

export class MemStorage implements IStorage {
  constructor() {
    // No storage needed for email-only form
  }
}

export const storage = new MemStorage();
