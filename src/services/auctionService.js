import api from "@/api/axios";

const AUCTION_URL = "/auctions"

const getAuctions = async (category_id = null, page = 1, pageSize = 12, search = null) => {

  const response = await api.get(AUCTION_URL, {
    params: {
      category_id: category_id ?? undefined,
      page,
      page_size: pageSize,
      search: search?.trim() || undefined,
    },
  })
  return response.data
}

const getUserAuctions = async (user_id, page = 1, page_size = 10) => {
  const response = await api.get(`/users/${user_id}/auctions`, {
    params: {
      page: page,
      page_size: page_size
    }
  })
  const data = response.data
  return data
}

const getAuction = async (auction_id) => {
  const response = await api.get(`${AUCTION_URL}/${auction_id}`)
  const data = response.data
  return data
}

const cancelAuction = async (auction_id, reason) => {
  const response = await api.delete(`${AUCTION_URL}/${auction_id}`, {
    data: { reason }
  })
  const data = response.data
  return data

}


export { getAuctions, getUserAuctions, getAuction, cancelAuction }