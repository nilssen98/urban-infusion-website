import HeroSection from '../../components/HeroSection';
import AboutUsSection from '../../components/Pages/About/AboutUsSection';

export default function About() {
    return (
        <>
            <HeroSection
                title={'About us'}
                description={'We value the ancient traditions which are brought to modern times through nature.'}
            />
            <AboutUsSection/>
        </>
    );
}
