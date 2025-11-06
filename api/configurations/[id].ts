import { storage } from "../_storage";

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");
  if (req.method !== "GET") {
    return res.status(405).send(JSON.stringify({ error: "Method Not Allowed" }));
  }

  try {
    const { id } = req.query as { id?: string };
    if (!id) return res.status(400).send(JSON.stringify({ error: "Missing id" }));

    const configuration = await storage.getConfiguration(id);
    if (!configuration) {
      return res.status(404).send(JSON.stringify({ error: "Configuration not found" }));
    }
    return res.status(200).send(JSON.stringify(configuration));
  } catch (error: any) {
    const message = error?.message || "Internal Server Error";
    res.status(500).send(JSON.stringify({ error: message }));
  }
}
