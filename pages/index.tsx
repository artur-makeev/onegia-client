import Slider from '../components/Slider/Slider';
import slidesData from '../components/Slider/slidesData';

export default function HomePage({ slides }: any) {
  return (
    <Slider slides={slides} />
  );
}

export const getStaticProps = async () => {
  const slides = slidesData;

  return {
    props: {
      slides: slides,
    }
  };
};