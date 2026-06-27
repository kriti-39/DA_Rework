import Hero2                from "../components/Hero/Hero2";
import AboutTeaser          from "../components/AboutTeaser/AboutTeaser";
import AboutTeaserTablet    from "../components/AboutTeaser/AboutTeaserTablet";
import AboutTeaserMobile    from "../components/AboutTeaser/AboutTeaserMobile";
import WatchSection         from "../components/Watch/WatchSection";
import WatchSectionTablet   from "../components/Watch/WatchSectionTablet";
import WatchSectionMobile   from "../components/Watch/WatchSectionMobile";
import LearnSection         from "../components/Learn/LearnSection";
import LearnSectionTablet   from "../components/Learn/LearnSectionTablet";
import LearnSectionMobile   from "../components/Learn/LearnSectionMobile";
import GalleryTeaser        from "../components/Gallery/GalleryTeaser";
import GalleryTeaserMobile  from "../components/Gallery/GalleryTeaserMobile";

const Home = () => {
  return (
    <>
      <Hero2 />

      <div className="hidden xl:block"><AboutTeaser /></div>
      <div className="hidden md:block xl:hidden"><AboutTeaserTablet /></div>
      <AboutTeaserMobile />

      <div className="hidden xl:block"><WatchSection /></div>
      <div className="hidden md:block xl:hidden"><WatchSectionTablet /></div>
      <WatchSectionMobile />

      <div className="hidden xl:block"><LearnSection /></div>
      <div className="hidden md:block xl:hidden"><LearnSectionTablet /></div>
      <LearnSectionMobile />

      <div className="hidden xl:block"><GalleryTeaser /></div>
      <GalleryTeaserMobile />
    </>
  );
};

export default Home;
