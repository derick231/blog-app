import React from 'react'
import PostList from '../Components/PostList'
import { useState } from 'react'
import SideMenu from '../Components/SideMenu'

const PostListPage = () => {
  const [open,setOpen] = useState(false)
  return (
    <div>
      <h1 className='mb-8 text-2xl md:text-4xl'>Blogs</h1>
      <button onClick={()=>setOpen((prev)=>!prev)} className='mb-6 lg:hidden bg-transparent hover:bg-black hover:text-white border rounded-full px-3 py-2 duration-300 ease-in-out shadow-lg w-36'>{open ? "close" : "Filter or Search"}</button>
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        <PostList/>
        <div className={`${open ? "block": "hidden"} lg:block`}>
        <SideMenu/>
        
        </div>

      </div>
    </div>
  )
}

export default PostListPage