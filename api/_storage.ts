import { randomUUID } from "crypto";
import type {
  Configuration,
  InsertConfiguration,
  TestDriveRequest,
  InsertTestDriveRequest,
} from "../shared/schema";

export interface IStorage {
  createConfiguration(config: InsertConfiguration): Promise<Configuration>;
  getConfiguration(id: string): Promise<Configuration | undefined>;
  getAllConfigurations(): Promise<Configuration[]>;

  createTestDriveRequest(request: InsertTestDriveRequest): Promise<TestDriveRequest>;
  getAllTestDriveRequests(): Promise<TestDriveRequest[]>;
}

class MemStorage implements IStorage {
  private configurations = new Map<string, Configuration>();
  private testDriveRequests = new Map<string, TestDriveRequest>();

  async createConfiguration(insertConfig: InsertConfiguration): Promise<Configuration> {
    const id = randomUUID();
    const shareUrl = id.replace(/-/g, "").slice(0, 8);
    const config: Configuration = {
      ...insertConfig,
      id,
      shareUrl,
      createdAt: new Date(),
    } as Configuration;
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
    } as TestDriveRequest;
    this.testDriveRequests.set(id, request);
    return request;
  }

  async getAllTestDriveRequests(): Promise<TestDriveRequest[]> {
    return Array.from(this.testDriveRequests.values());
  }
}

// Single in-memory instance per serverless runtime container (ephemeral)
export const storage: IStorage = new MemStorage();
