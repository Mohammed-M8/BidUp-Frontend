import api from "@/api/axios";

const getUserBids = async (user_id, page = 1, page_size = 10) => {
  const response = await api.get(`/users/${user_id}/bids`, {
    params: {
      page: page,
      page_size: page_size
    }
  })
  const data = response.data
  return data
}

const createBid = async (auction_id, price) => {
  const response = await api.post(`/auctions/${auction_id}/bids`, {
    price
  })

  const data = response.data

  return data
}

const getAuctionBids = async (auction_id) => {
  const response = await api.get(`/auctions/${auction_id}/bids`)
  const data = response.data

  return data
}


export { getUserBids, createBid, getAuctionBids }