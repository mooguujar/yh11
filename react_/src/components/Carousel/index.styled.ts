import { styled } from 'styled-components';

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .dots {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    display: flex;
    padding: 10px 0;
    justify-content: center;
  }

  .dot {
    border: none;
    width: 10px;
    height: 10px;
    background: #c5c5c5;
    border-radius: 50%;
    margin: 0 5px;
    padding: 5px;
    cursor: pointer;
  }

  .dot:focus {
    outline: none;
  }

  .dot.active {
    background: #000;
  }

  .arrow {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    fill: #fff;
    cursor: pointer;
  }

  .arrow--left {
    left: 5px;
  }

  .arrow--right {
    left: auto;
    right: 5px;
  }

  .arrow--disabled {
    fill: rgba(255, 255, 255, 0.5);
  }

  .zoom-out {
    perspective: 1000px;
    height: 100%;
  }

  .zoom-out__slide div {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .zoom-out__slide img {
    background-color: transparent;
    width: 100%;
    height: 100%;
    object-fit: fill;
    //position: absolute;
  }
`;
