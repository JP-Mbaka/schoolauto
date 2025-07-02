"use server";
const { BACKEND_API_BASE_URL: baseURL } = process.env;

export const postData = async (url: string, data: unknown) => {
  console.log(`WEFGHJKIUYTREWSQ\n ${baseURL} QWERTYUIOIUYTREWQ`);
  const res = await fetch(baseURL + "/" + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    //Check error for 200, 202, 201, 300, 400, Invalid request and so far
    throw new Error(`${res.status}: ${res.body} ${baseURL + "/" + url}`);
  }
  return res.json();
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

  return res.json();
};
