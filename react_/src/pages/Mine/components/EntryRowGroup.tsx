import { styled } from 'styled-components';

const EntryRowContainer = styled.div`
  .entry-class-title {
    margin-top: 22rem;
    margin-bottom: 11rem;
    font-size: 22rem;
    color: #787f8c;
    text-align: left;
  }
`;

const EntryRow = (props: {
    title: string
    children: any
}) => {
  return (
    <EntryRowContainer>
      <div className="entry-class-title">{ props.title }</div>
      {
        props.children
      }
    </EntryRowContainer>
  );
};

export default EntryRow;
