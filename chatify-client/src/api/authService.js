import fetchClient from "./fetchClient";

export const getCsrfToken = async () => {
  const res = await fetch("https://chatify-api.up.railway.app/csrf", {
    method: "PATCH",
    credentials: "include",
  });
  const data = await res.json();
  return data.csrfToken;
};

export const registerUser = async (form) => {
  const csrfToken = await getCsrfToken();
  const payload = { ...form, csrfToken };

  if (!payload.avatar) {
    payload.avatar = "https://i.pravatar.cc/200";
  }

  const res = await fetchClient("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return res;
};

export const login = async (form) => {
  const csrfToken = await getCsrfToken();
  const payload = { ...form, csrfToken };

  const res = await fetchClient("/auth/token", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return res;
};
