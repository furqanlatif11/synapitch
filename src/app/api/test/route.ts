import OpenAI from "openai";

export async function GET() {
  console.log("Testing OpenAI connection...");

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const res = await client.models.list();
  console.log("✅ Connection successful. Models count:", res.data.length);

  return new Response("OK");
}
