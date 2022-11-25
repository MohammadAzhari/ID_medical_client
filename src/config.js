export const baseURL = "https://id-medical.herokuapp.com"; //before deploing "http://localhost:3333"

export const basicConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const authConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
