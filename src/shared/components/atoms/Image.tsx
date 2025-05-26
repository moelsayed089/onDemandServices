interface IImage {
  src: string;
  alt: string;
  className?: string;
}
const Image: React.FC<IImage> = ({ src, alt, className }) => {
  return (
    <>
      <img src={src} alt={alt} loading="lazy" className={className} />
    </>
  );
};

export default Image;
