import api from "@/api/axios";

const AUCTION_URL="/auctions"

const getAuctions=async (category_id=null,page=1,pageSize=12)=>{
try {
      const response=await api.get(AUCTION_URL,{
    params:{
        category_id:category_id,
        page:page,
        page_size:pageSize
    }
  })

  const data=response.data

  return data
} catch (err) {
        throw new Error(err, { cause: err });

}
}

const getUserAuctions=async (user_id)=>{
  try {
    const response=await api.get(`/users/${user_id}/auctions`)
    const data=response.data
    return data
  } catch (error) {
    throw new Error(error,{cause:error})
  }
}


export {getAuctions,getUserAuctions}