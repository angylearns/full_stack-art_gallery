import Footer from "../components/footer/Footer";
import GalleryPreview from "../components/galleryPreviewHome/GalleryPreview";
import Hero from "../components/hero/Hero";
import LastProducts from "../components/lastProducts/LastProducts";

function Home(){
    return(
        <>
        <Hero/>
        <GalleryPreview/>
        <LastProducts/>
        <Footer/>
        </>
    )
}

export default Home;