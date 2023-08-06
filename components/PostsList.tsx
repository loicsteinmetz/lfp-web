import styled from 'styled-components';
import {Spacings} from '../theme/spacings';
import Post from './Post';
import ExpandedContainer from './ExpandedContainer';
import {Colors} from '../theme/colors';

interface PostsListProps {
  posts: any[];
}

const PostsListContainer = styled.div`
  display: flex;
  overflow: hidden;
  background-color: ${Colors.GREY['25']};
  padding: 0 ${Spacings.S2};
  box-sizing: border-box;
  gap: ${Spacings.S2}
`

const PostsLists = ({posts}: PostsListProps) => {
  return (
    <ExpandedContainer>
      <PostsListContainer>
        {posts.map((p, i) => (
          <Post post={p} key={`event-${i}`}/>
        ))}
      </PostsListContainer>
    </ExpandedContainer>
  )
}

export default PostsLists;
