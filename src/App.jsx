import Nav from './components/Nav.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import AudioToggle from './components/AudioToggle.jsx';
import LiquidTransition from './components/LiquidTransition.jsx';
import Hero from './sections/Hero.jsx';
import Packages from './sections/Packages.jsx';
import Gallery from './sections/Gallery.jsx';
import StatsSection from './sections/StatsSection.jsx';
import MigrationMap from './sections/MigrationMap.jsx';
import TextMaskSection from './sections/TextMaskSection.jsx';
import Booking from './sections/Booking.jsx';
import Footer from './sections/Footer.jsx';
import useLenis from './hooks/useLenis.js';

export default function App() {
  useLenis();

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-void-gradient">
      <CustomCursor />
      <Nav />
      <main>
        <Hero onBook={scrollToBooking} />
        <Packages />
        <LiquidTransition />
        <Gallery />
        <StatsSection />
        <LiquidTransition />
        <MigrationMap />
        <TextMaskSection />
        <Booking />
      </main>
      <Footer />
      <AudioToggle />
    </div>
  );
}
