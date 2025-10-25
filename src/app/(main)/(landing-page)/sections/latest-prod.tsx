import DesktopCarousel from "../components/carousel/dekstop-carousel";
import MobileCarousel from "../components/carousel/mobile-carousel";

export default function LatestProductions() {
  return (
    <section className="w-full flex flex-row gap-16 lg:pl-25 pl-6 py-12 lg:py-25 bg-section overflow-x-hidden">
      <div className="w-full">
        <DesktopCarousel />
        <MobileCarousel />
      </div>
    </section>
  );
}
