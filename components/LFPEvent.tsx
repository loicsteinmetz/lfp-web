import styled from 'styled-components';
import {Colors} from '../theme/colors';
import typos from '../theme/typos';
import {Spacings} from '../theme/spacings';

const LFPEventContainer = styled.div`
  height: 100%;
  min-width: fit-content;
  box-sizing: border-box;
  background-color: ${Colors.GREY['0']};
  padding: ${Spacings.S2};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.p`
  ${typos.OVERLINE1};
  font-size: 18px;
  color: ${Colors.GREY['800']};
  text-align: center;
`

const InfosContainer = styled.div`
  margin-top: ${Spacings.S1};
  display: flex;
  justify-content: center;
  gap: ${Spacings.S1};
`

const Date = styled.p`
  ${typos.OVERLINE1};
  font-size: 14px;
  color: ${Colors.GREY['0']};
  text-align: center;
  padding: ${Spacings.S1} ${Spacings.S2};
  background-color: ${Colors.PRIMARY['500']};
  display: inline-flex;
  align-items: center;
`

const MoreInfos = styled.p`
  ${typos.OVERLINE1};
  font-size: 14px;
  color: ${Colors.PRIMARY['500']};
  text-align: center;
  padding: ${Spacings.S1} ${Spacings.S2} calc(${Spacings.S1} - 1px) calc(${Spacings.S2} - 1px);
  background-color: ${Colors.GREY['0']};
  display: inline-block;
  border: 2px solid ${Colors.PRIMARY['500']};
  
  &:hover {
    cursor: pointer;
    background-color: ${Colors.PRIMARY['500']};
    color: ${Colors.GREY['0']};
  }
`

const LFPEvent = () => {
  return (
    <LFPEventContainer>
      <Title>Les apéros de La Fabrique</Title>
      <InfosContainer>
        <Date>Mardi 19 janvier 2023, 18h30</Date>
        <MoreInfos>i</MoreInfos>
      </InfosContainer>
    </LFPEventContainer>
  )
}

export default LFPEvent;
