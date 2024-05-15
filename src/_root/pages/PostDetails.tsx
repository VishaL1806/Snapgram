import Loader from "@/components/shared/Loader"
import PostStats from "@/components/shared/PostStats"
import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/AuthContext"
import { useDeletePostById, useGetPostById } from "@/lib/react-query/queriesAndMutations"
import { multiFormatDateString } from "@/lib/utils"
import { Link, useParams } from "react-router-dom"

const PostDetails = () => {

  const {id} = useParams()
  const {user} = useUserContext()

  const {data : post , isPending} = useGetPostById(id || "")

  const { mutate : deletePost , isPending : isDeleted} = useDeletePostById()

  const handleDeletePost = ()=>{
    deletePost({postId : post?.$id, imageId : post?.imageId})
  }
  return (
    <div className="post_details-container">
      {isPending ? <Loader />: (
        <div className="post_details-card">
          <img 
              src={post?.imageUrl} 
              alt="post" 
              className="post_details-img"/>
          <div className="post_details-info">
            <div className="flex-between w-full">
                <Link className="flex items-center gap-3" to={`profile/${post?.creator.$id}`}>
                    <img 
                    src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'} 
                    alt="creator" 
                    className="rounded-full w-8 md:h-8 lg:w-12 lg:h-12" />
               

                <div className="flex flex-col">
                    <p className="base-medium lg:body-bold text-light-1">
                        {post?.creator.name}
                    </p>
                    <div className="flex-center gap-2 text-light-3">
                        <p className="subtle-semibold lg:small-regular">
                            {multiFormatDateString(post?.$createdAt)}
                        </p>
                        -
                        <p className="subtle-semibold lg:small-regular">
                            {post?.location}
                        </p>
                    </div>
                </div>
                </Link>
                <div className="flex-center gap-4">
                <Link to={`/update-post/${post?.$id}`} className={`${user.id !== post?.creator.$id && "hidden"}`}>
                <img src="/assets/icons/edit.svg" alt="edit-post" width={20} height={20} />
            </Link>
          <Button className={`${user.id !== post?.creator.$id && "hidden"} ghost`} variant="ghost" onClick={handleDeletePost} >
            
                <img src="/assets/icons/delete.svg"  alt="edit-post" width={23} height={23} className={`${user.id !== post.creator.$id && "hidden"} cursor-pointer`} />
          </Button>
            
                </div>
            </div>
            <hr className="w-full border border-dark-4/80"/>
            <div className="flex flex-col flex-1 small-medium w-full lg:base-regular">
                <p>{post?.caption}</p>
                <ul className="flex gap-1 mt-2">
                    {post?.tags.map((tag:string)=>(
                        <li key={tag} className="text-light-3">#{tag}</li>
                    ))}
                </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
            </div>
        </div>
      )}
      </div>
  )
}

export default PostDetails