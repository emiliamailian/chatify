const BASE_URL = "https://chatify-api.up.railway.app";

const fetchClient = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const config = {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  };

  try {
    const res = await fetch(BASE_URL + url, config);
    const data = await res.json();

    if (res.ok) {
      return { success: true, data };
    }
    return { success: false, message: data.error || "Unknown error" };
  } catch (err) {
    console.error("fetchClient error:", err);
    return { success: false, message: err.message };
  }
};

export default fetchClient;
