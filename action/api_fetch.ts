"use server";
const { BACKEND_API_BASE_URL: baseURL } = process.env;

export const postData = async (url: string, data: unknown) => {
  console.log(`WEFGHJKIUYTREWSQ\n ${baseURL} QWERTYUIOIUYTREWQ`);
  try {
    const res = await fetch(baseURL + "/" + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      let message = res.statusText;
      try {
        const text = await res.text();
        const json = JSON.parse(text);
        message = json.message || JSON.stringify(json);
      } catch (e) {
        // Ignore parse errors and keep fallback message
        console.log(e);
      }
      throw new Error(`Error ${res.status}: ${message}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throw so caller can handle
  }
};

export const putData = async (url: string, data: unknown) => {
  console.log(`PUT Request => ${baseURL}/${url}`);
  const res = await fetch(baseURL + "/" + url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText} ${baseURL}/${url}`);
  }

  return res.json();
};

export const deleteData = async (url: string) => {
  console.log(`DELETE Request => ${baseURL}/${url}`);
  const res = await fetch(baseURL + "/" + url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText} ${baseURL}/${url}`);
  }

  return res.json();
};

export const getData = async (url: string, token?: string) => {
  console.log("Execution started in getData");

  const fullUrl = `${baseURL}/${url}`;
  console.log(`GET Request => ${fullUrl}`);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(fullUrl, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText} ${fullUrl}`);
  }

  return await res.json();
};
