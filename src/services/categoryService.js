import api from "@/api/axios"

const getCategories = async () => {
  const response = await api.get("/categories")
  return response.data
}

export { getCategories }