import MyImg from '@/components/MyImg';
import { Row } from '@/components/flex';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

interface SearchViewProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>
}
const SearchContainer = styled(Row)`
  width: 100%;
  height:155rem;
  padding: 47rem 28rem 0 28rem;
  .cancel{
    font-size: 26rem;
    line-height: 22rem;
    color: #0b75ff;
    margin-left:28rem;
  }
`;
const SearchInputView = styled(Row)`
  width: 605rem;
  height: 70rem;
  background-color: #ebf1f6;
  border-radius: 7rem;
  padding:0 17rem;
  .icon {
    width:33rem;
    height:33rem;
    margin-right:22rem;
  }
  input {
    border: none;
    height: 100%;
    width: 100%;
    background-color: transparent;
    font-size: 25rem;

  }
`;
const SearchView: React.FC<SearchViewProps> = ({ setSearch }) => {
  const nav = useNavigate();
  const loc = useLocation();
  const formPath = loc.state?.formPath;
  const handleClick = () => {
    nav(formPath, {
      replace: true
    });
  };

  return (
    <SearchContainer>
      <SearchInputView >
        <div className="icon">
          <MyImg src='/files/auth/icon/search.png' alt='search' loading={false} />
        </div>
        <input type="text" maxLength={10} placeholder="请输入关键字搜索" onChange={(e) => { setSearch(e.target.value); }} />
       
      </SearchInputView>
      <div className="cancel" onClick={handleClick}>
          取消
      </div>
    </SearchContainer>
  );
};

export default SearchView;
