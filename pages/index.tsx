import { Slider, slidesData } from '../modules/Slider';

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