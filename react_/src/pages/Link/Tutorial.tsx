import ISprite from '@/components/ISprite';
import { Column } from '@/components/flex';
const demos = [{
  // 固定宽高放大
  url: '/sprites/test/s1.png',
  backgroundSize: [204, 168],
  originSize: [80, 40],
  size: [200, 100],
  pos: [-75, 0]
},
{
  // 固定宽高缩小
  url: '/sprites/test/s1.png',
  backgroundSize: [204, 168],
  originSize: [44, 44],
  size: [22, 22],
  pos: [0, -75]
},
{
  // 正常
  url: '/sprites/point/sprite-point.png',
  backgroundSize: [473, 455],
  size: [9, 17],
  pos: [-454, -193]
},
{
  // 比例放大
  url: '/sprites/test/s1.png',
  backgroundSize: [204, 168],
  size: [44, 44],
  pos: [-49, -124],
  originSize: 1.5

},
{
  // 比例缩小
  url: '/sprites/test/s1.png',
  backgroundSize: [204, 168],
  size: [44, 44],
  pos: [-160, -49],
  originSize: 0.5
},
{
  url: '/sprites/point/sprite-point.png',
  backgroundSize: [473, 455],
  size: [9, 17],
  pos: [-454, -193]
  // pos: [-454, -179]
}];
const Tutorial = () => {
  return (
    <Column style={{ backgroundColor: '#000' }}>
      {demos.map((item, index) => (
        <ISprite key={index} {...item} />
      ))}
    </Column>
  );
};

export default Tutorial;
