export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, x-api-key, Authorization",
        },
      });
    }

    const path = url.pathname.replace(/^\/v1/, "") + url.search;
    const target = `https://znfojiukiplptkfujydb.supabase.co/functions/v1/api${path}`;

    const res = await fetch(target, {
      method: request.method,
      headers: request.headers,
      body: request.method !== "GET" && request.method !== "HEAD" ? request.body : null,
    });

    const newRes = new Response(res.body, res);
    newRes.headers.set("Access-Control-Allow-Origin", "*");
    return newRes;
  },
};

