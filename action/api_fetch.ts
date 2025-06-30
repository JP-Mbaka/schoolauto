export const postData = async (url: string, data: unknown) => {
  const { BACKEND_API_BASE_URL: baseURL } = process.env;
  const res = await fetch(baseURL + "/" + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    //Check error for 200, 202, 201, 300, 400, Ivalid request and so far
    throw new Error(`${data} Error: Network response was not ok`);
  }
  return res.json();
};
