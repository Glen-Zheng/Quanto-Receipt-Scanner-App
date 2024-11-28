import axios from "axios";

export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return new Response(JSON.stringify({ error: "No token provided" }), {
        status: 400,
      });
    }

    const API_KEY = process.env.API_KEY;

    const response = await axios.get(
      `https://api.tabscanner.com/api/result/${token}`,
      {
        headers: {
          apikey: API_KEY,
        },
      }
    );

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error("Error fetching result from Tabscanner:", error);
    return new Response(
      JSON.stringify({
        error: "Error fetching result from Tabscanner",
        details: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
