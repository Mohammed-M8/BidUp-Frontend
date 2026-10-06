export const getApiError = (error) => {
  const detail = error.response?.data?.detail

  if (Array.isArray(detail)) {
    return detail[0]?.msg || "Something went wrong"
  }

  return detail || "Something went wrong"
}