import MyImg from '@/components/MyImg';
import { Row } from '@/components/flex';
import { useMemo, useState } from 'react';
import styled, { RuleSet } from 'styled-components';
interface MyButtonViewProps {
  loading?: boolean
  css?: RuleSet<object>
}
const MyButtonView = styled(Row) <MyButtonViewProps>`
  width:100%;
  height: 100%;
  background-color: rgb(15,90,254);
  border-radius:4rem;
  color:#fff;
  position: relative;
  opacity: ${({ loading }) => loading ? 0.5 : 1};
  transition: opacity .5s ease-in-out;
  .loadingIcon{
  ${({ loading }) => {
    if (loading) return 'display:block;';

    return 'display:none;';
  }}
  /* 旋转 */
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
    /* width:70%; */
    height:40%;
    position: absolute;
    right:10%;
    animation: rotate 1s linear infinite;
  }
  ${({ css }) => css}
`;
const CancelView = styled(Row) <MyButtonViewProps>`
  width: 100%;
  height: 100%;
  border-radius:4rem;
  background: #181C27;
  mix-blend-mode: normal;
  border: 1rem solid #F6E0B0;
  color:#fff;
  ${({ css }) => css}
`;

interface Props {
  name: string
  onClick?: () => Promise<void> | void
  cancel?: boolean
  loading?: boolean
  css?: RuleSet<object>
  className?: string
  noNeedLoading?: boolean
}

const MyBtn = ({ name, noNeedLoading, onClick, cancel, loading, css, className }: Props) => {
  const poropsLoading = useMemo(() => typeof loading === 'boolean', [loading]);
  const [iloading, setLoading] = useState(false);
  const getLoading = useMemo(() => {
    if (poropsLoading) return loading;

    return iloading;
  }, [loading,
    iloading,
    poropsLoading]);
  const propsLoadingClick = async () => {
    onClick && onClick();
  };
  const handleClick = async () => {
    if (getLoading) return;
    if (poropsLoading) return propsLoadingClick();

    setLoading(true);
    onClick && await onClick();
    setLoading(false);
  };
  const MyButtonProps: {
    css?: RuleSet<object>
    className?: string
    onClick: () => Promise<void> | void
  } = {
    onClick: handleClick
  };

  if (css) {
    MyButtonProps.css = css;
  }
  if (className) {
    MyButtonProps.className = className;
  }
  if (cancel) {
    return <CancelView justify='center' {...MyButtonProps}>{name}</CancelView>;
  }

  return (
    <MyButtonView loading={getLoading} justify='center' {...MyButtonProps}>
      {name}
      {
        !noNeedLoading &&
        <div className="loadingIcon">
          <MyImg src={'/files/auth/icon/icn_loading.png'} loading={false} />
        </div>
      }
    </MyButtonView>
  );
};

export default MyBtn;
