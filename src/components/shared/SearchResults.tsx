import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type searchResultProps = {
  isSearchFetching : boolean;
  searchedPosts : Models.Document[];
}

const SearchResults = ({isSearchFetching ,searchedPosts} : searchResultProps) => {
  if(isSearchFetching){
    return ( <Loader />)
  }
  if(searchedPosts && searchedPosts.documents.length > 0){
    return (
    <GridPostList posts={searchedPosts.documents} />
    )
  }
  return (
    <p className="text-light-4 mt-10 w-full text-center"> No Results Found </p>
  )
}

export default SearchResults