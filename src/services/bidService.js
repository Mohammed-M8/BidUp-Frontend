import api from "@/api/axios";

const getUserBids = async (user_id, page = 1, page_size = 10,status=null) => {
  const response = await api.get(`/users/${user_id}/bids`, {
    params: {
      page: page,
      page_size: page_size,
      status:status||undefined
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

const acceptBid = async (bid_id) => {
  const response = await api.post(`/bids/${bid_id}/accept`)
  return response.data
}

export { getUserBids, createBid, getAuctionBids,acceptBid }