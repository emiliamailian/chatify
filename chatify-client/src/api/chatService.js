import fetchClient from "./fetchClient";

export const getMessages = async () => {
  return await fetchClient("/messages", {
    method: "GET",
  });
};

export const createMessage = async (message) => {
  return await fetchClient("/messages", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
};

export const deleteMessage = async (id) => {
  return await fetchClient(`/messages/${id}`, {
    method: "DELETE",
  });
};
