import { 
  type Configuration, 
  type InsertConfiguration,
  type TestDriveRequest,
  type InsertTestDriveRequest,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createConfiguration(config: InsertConfiguration): Promise<Configuration>;
  getConfiguration(id: string): Promise<Configuration | undefined>;
  getAllConfigurations(): Promise<Configuration[]>;
  
  createTestDriveRequest(request: InsertTestDriveRequest): Promise<TestDriveRequest>;
  getAllTestDriveRequests(): Promise<TestDriveRequest[]>;
}

export class MemStorage implements IStorage {
  private configurations: Map<string, Configuration>;
  private testDriveRequests: Map<string, TestDriveRequest>;

  constructor() {
    this.configurations = new Map();
    this.testDriveRequests = new Map();
  }

  async createConfiguration(insertConfig: InsertConfiguration): Promise<Configuration> {
    const id = randomUUID();
    const shareUrl = `${id.substr(0, 8)}`;
    const config: Configuration = { 
      ...insertConfig, 
      id,
      shareUrl,
      createdAt: new Date(),
    };
    this.configurations.set(id, config);
    return config;
  }

  async getConfiguration(id: string): Promise<Configuration | undefined> {
    return this.configurations.get(id);
  }

  async getAllConfigurations(): Promise<Configuration[]> {
    return Array.from(this.configurations.values());
  }

  async createTestDriveRequest(insertRequest: InsertTestDriveRequest): Promise<TestDriveRequest> {
    const id = randomUUID();
    const request: TestDriveRequest = {
      ...insertRequest,
      id,
      createdAt: new Date(),
    };
    this.testDriveRequests.set(id, request);
    return request;
  }

  async getAllTestDriveRequests(): Promise<TestDriveRequest[]> {
    return Array.from(this.testDriveRequests.values());
  }
}

export const storage = new MemStorage();
