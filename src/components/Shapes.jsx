import triangleSvg from '../assets/images/triangle.svg';

export default function Shapes() {
  return (
    <div className="shapes">
      <img src={triangleSvg} alt="Triangle" className="triangle triangle-1" />
      {/* <img src={triangleSvg} alt="Triangle" className="triangle triangle-2" /> */}
      <div className="circle top-right"></div>
      <div className="circle bottom-left"></div>
    </div>
  );
}