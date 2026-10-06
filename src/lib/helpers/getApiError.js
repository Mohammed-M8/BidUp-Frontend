export const getApiError = (error) => {
  return error.response?.data?.detail || "Something went wrong"
}