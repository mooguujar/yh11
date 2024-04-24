import React, { MouseEventHandler, useState } from 'react';
import { TrackDetails, useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { CarouselContainer } from '@/components/Carousel/index.styled';
import MyImg from '@/components/MyImg';

interface CarouselProps {
  list: any[]
  children?: React.ReactNode
  onClick?: MouseEventHandler
}
const Carousel: React.FC<CarouselProps> = (props) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [details, setDetails] = React.useState<TrackDetails | null>(null);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      detailsChanged(s) {
        setDetails(s.track.details);
      },
      created() {
        setLoaded(true);
      }
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);

          if (mouseOver) return;

          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }

        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      }
    ]);

  function scaleStyle(idx: number) {
    if (!details) return {};

    const slide = details.slides[idx];
    const scaleSize = 0.7;
    const scale = 1 - (scaleSize - scaleSize * slide.portion);

    return {
      transform: `scale(${scale})`,
      WebkitTransform: `scale(${scale})`
    };
  }

  return (
    <CarouselContainer>
      <div ref={sliderRef} className="keen-slider zoom-out">
        {props.list.map((item, idx) => (
          <div key={idx} className="keen-slider__slide zoom-out__slide" onClick={() => { props.onClick && props.onClick(item); }}>
            <div style={scaleStyle(idx)}>
              <MyImg src={item.mobileimg} domain={process.env.REACT_APP_API_URL} />
            </div>
          </div>
        ))}
      </div>
      {/* 轮播图左右箭头 */}
      {/* {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )} */}

      {/* 轮播图底部小圆点 */}
      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys()
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={`dot${currentSlide === idx ? ' active' : ''}`}
              ></button>
            );
          })}
        </div>
      )}
    </CarouselContainer>
  );
};

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  const disabeld = props.disabled ? ' arrow--disabled' : '';

  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export default Carousel;
