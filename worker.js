/**
 * KV-Assistent Tiefbau – Proxy-Worker für die Spracheingabe (gemeinsamer OpenAI-Key).
 * Hält den OpenAI-API-Key serverseitig geheim; das Tool im Browser sendet nur
 * { model, messages } und bekommt die Antwort zurück, ohne den Key je zu sehen.
 *
 * Einrichtung: Secret "OPENAI_API_KEY" im Worker setzen (Settings -> Variables and Secrets).
 */
const ALLOWED_MODELS = ["gpt-4o-mini", "gpt-4.1-mini", "gpt-4o"];
const MAX_INPUT_CHARS = 6000;
const MAX_TOKENS = 800;

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: cors });

    let body;
    try { body = await request.json(); } catch (e) {
      return new Response(JSON.stringify({ error: "invalid_json" }), { status: 400, headers: cors });
    }

    const model = ALLOWED_MODELS.includes(body.model) ? body.model : "gpt-4o-mini";
    const messages = Array.isArray(body.messages) ? body.messages : null;
    if (!messages) return new Response(JSON.stringify({ error: "missing_messages" }), { status: 400, headers: cors });

    const totalLen = messages.reduce((s, m) => s + String(m.content || "").length, 0);
    if (totalLen > MAX_INPUT_CHARS) {
      return new Response(JSON.stringify({ error: "input_too_long" }), { status: 413, headers: cors });
    }

    if (!env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: "server_not_configured" }), { status: 500, headers: cors });
    }

    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + env.OPENAI_API_KEY },
      body: JSON.stringify({ model, messages, temperature: 0, max_tokens: MAX_TOKENS, response_format: { type: "json_object" } })
    });
    const text = await upstream.text();
    return new Response(text, { status: upstream.status, headers: { ...cors, "Content-Type": "application/json" } });
  }
};
