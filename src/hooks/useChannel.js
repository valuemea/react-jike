import { getChannelAPI } from "@/apis/article"
import { useEffect, useState } from "react"

// 封装自定义hook函数，获取频道列表数据 
// 1. 获取数据 2. 把组件中需要使用的数组return 出去
function useChannel() {
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.data.channels)
    }
    getChannelList()
  }, [])
  return { channelList }
}
export { useChannel }