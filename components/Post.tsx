import styled from 'styled-components';
import {Colors} from '../theme/colors';

interface PostProps {
  post: any;
}

const PostContainer = styled.div`
  width: 40%;
  min-width: 40%;
  aspect-ratio: 1.7;
  box-sizing: border-box;
  background-color: ${Colors.GREY['0']};
  border: 2px solid ${Colors.GREY['25']};

  &:hover {
    cursor: pointer;
    border: 2px solid ${Colors.GREY['100']};
  }
`

const Post = ({post}: PostProps) => {
  return (
    <PostContainer>
    </PostContainer>
  )
}

export default Post;
