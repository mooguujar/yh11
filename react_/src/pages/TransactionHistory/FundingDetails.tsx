import { RuleSet, css, styled } from 'styled-components';
import { Column, Row } from '@/components/flex';

const FundingDetailsContainer = styled(Row)`
  width: 100%;
  padding: 0 30rem;
`;

const FundingDetails = () => {
  return (
    <FundingDetailsContainer>
      <div>资金明细</div>
    </FundingDetailsContainer>
  );
};

export default FundingDetails;
