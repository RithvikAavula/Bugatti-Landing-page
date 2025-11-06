import { storage } from "./_storage";
import { insertConfigurationSchema } from "../shared/schema";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");
  try {
    if (req.method === "GET") {
      const all = await storage.getAllConfigurations();
      return res.status(200).send(JSON.stringify(all));
    }

    if (req.method === "POST") {
      const body = (req.body ?? {}) as unknown;
      const validated = insertConfigurationSchema.parse(body);
      const created = await storage.createConfiguration(validated);
      return res.status(200).send(JSON.stringify(created));
    }

    res.status(405).send(JSON.stringify({ error: "Method Not Allowed" }));
  } catch (error: any) {
    const message = error?.message || "Bad Request";
    res.status(400).send(JSON.stringify({ error: message }));
  }
}
