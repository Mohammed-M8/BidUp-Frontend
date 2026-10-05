import api from "@/api/axios";

const getUserBids=async (user_id,page=1,page_size=10)=>{
    const response=await api.get(`/users/${user_id}/bids`,{
      params:{
        page:page,
        page_size:page_size
      }
    })
    const data=response.data
    return data
}


export {getUserBids}