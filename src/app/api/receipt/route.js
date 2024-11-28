import axios from "axios";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    const API_KEY = process.env.API_KEY;

    const tabscannerFormData = new FormData();
    tabscannerFormData.append("file", file);

    const response = await axios.post(
      "https://api.tabscanner.com/api/2/process",
      tabscannerFormData,
      {
        headers: {
          apikey: API_KEY,
          ...Object.fromEntries(tabscannerFormData.entries()),
        },
      }
    );

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error("Error processing with Tabscanner:", error);
    return new Response(
      JSON.stringify({
        error: "Error processing with Tabscanner",
        details: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
