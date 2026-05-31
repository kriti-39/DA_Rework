import Hero2               from "../components/Hero/Hero2";
import AboutTeaser         from "../components/AboutTeaser/AboutTeaser";
import AboutTeaserMobile   from "../components/AboutTeaser/AboutTeaserMobile";
import WatchSection        from "../components/Watch/WatchSection";
import WatchSectionMobile  from "../components/Watch/WatchSectionMobile";
import LearnSection        from "../components/Learn/LearnSection";
import LearnSectionMobile  from "../components/Learn/LearnSectionMobile";
import GalleryTeaser       from "../components/Gallery/GalleryTeaser";
import GalleryTeaserMobile from "../components/Gallery/GalleryTeaserMobile";

const Home = () => {
  return (
    <>
      <Hero2 />

      <div className="hidden md:block"><AboutTeaser /></div>
      <AboutTeaserMobile />

      <div className="hidden md:block"><WatchSection /></div>
      <WatchSectionMobile />

      <div className="hidden md:block"><LearnSection /></div>
      <LearnSectionMobile />

      <div className="hidden md:block"><GalleryTeaser /></div>
      <GalleryTeaserMobile />
    </>
  );
};

export default Home;
