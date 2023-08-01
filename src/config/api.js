import { siteConfig } from "./site.consts";

async function client(url, data, method = "GET", options) {
  const apiUrl = `${siteConfig.apiUrl}${url}`;

  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  if (method === "POST" || method === "PUT") {
    requestOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(apiUrl, requestOptions);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export default client;
