const ParallaxImage = ({
    url = "/images/image2.jpg",
    children,
    
}) => <div style={{
    backgroundImage: `url(${url})`,
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    paddingTop: "100px",
    paddingBottom: "75px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "block"
}}>
{children}
</div>

export default ParallaxImage