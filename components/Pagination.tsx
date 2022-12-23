import styled from 'styled-components';
import {Spacings} from '../theme/spacings';
import Link from 'next/link';
import {Colors} from '../theme/colors';

export interface PaginatedPageProps {
  currentPage?: number;
  totalPages?: number;
}

export interface PaginationProps extends PaginatedPageProps {
  rootUrl: string;
}

const Container = styled.div`
  margin-top: ${Spacings.S3};
  display: flex;
  gap: ${Spacings.S2};
  justify-content: center;
  align-items: center;
`

const Page = styled.p<{active: boolean}>`
  font-size: 16px;
  color: ${({active}) => active ? Colors.PRIMARY['500'] : Colors.GREY['500']};
  font-weight: bold;
  
  &:hover {
    cursor: pointer;
    color: ${({active}) => active ? Colors.PRIMARY['500'] : Colors.GREY['800']};
  }
`

const PrevNext = styled.p<{active: boolean}>`
  font-size: 13px;
  margin: 0 10px;
  pointer-events: ${({active}) => active ? 'all' : 'none'};
  color: ${({active}) => active ? Colors.GREY['500'] : Colors.GREY['200']};
  font-weight: bold;

  &:hover {
    cursor: pointer;
    color: ${({active}) => active ? Colors.GREY['800'] : Colors.GREY['200']};
  }
`

const Pagination = ({currentPage, totalPages, rootUrl}: PaginationProps) => {
  if (!totalPages || !currentPage || totalPages < 2) return null;

  return (
    <Container>
      <Link href={`${rootUrl}?page=${currentPage - 1}`}><PrevNext active={currentPage > 1}>Page précédente</PrevNext></Link>
      {[...Array(totalPages)].map((n, i) => (
        <Link key={`page-${i + 1}`} href={`${rootUrl}?page=${i + 1}`}><Page active={i + 1 === currentPage}>{i + 1}</Page></Link>
      ))}
      <Link href={`${rootUrl}?page=${currentPage + 1}`}><PrevNext active={currentPage < totalPages}>Page suivante</PrevNext></Link>
    </Container>
  )
}

export default Pagination;
