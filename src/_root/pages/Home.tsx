import Loader from '@/components/shared/Loader';
import PostCard from '@/components/shared/PostCard';
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';


const Home = () => {
  const {data : posts , isPending : isPostLoading , isError : isErrorPosts} = useGetRecentPosts() 
  console.log(posts);
  
  return (
    <div className='flex flex-1'>
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold text-left md:h2-bold w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ):(
            <ul className='flex flex-col flex-1 gap-9 w-full'>
              {posts?.documents.map((post : Models.Document)=>(
               <PostCard post={post} key={post.$id} />
              ))}

            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home