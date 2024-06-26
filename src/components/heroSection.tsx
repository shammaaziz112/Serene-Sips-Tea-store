export function HeroSection() {
  return (
    /* with video*/
    <div>
      <section
        className="w-full relative"
        style={{
          width: "100%",
          position: "relative",
          paddingBottom: "35%" /* This sets the height to half the width */,
          overflow: "hidden"
        }}
      >
        <video
          autoPlay
          muted
          loop
          id="myVideo"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "98%",
            objectFit: "cover"
          }}
        >
          <source src="video/teaCommercial.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            width: "100%",
            backgroundImage: 'url("images/waves-white.png")',
            height: "65px",
            backgroundSize: "cover",
            position: "absolute",
            zIndex: "1",
            bottom: "0%",
            left: "-0%"
          }}
        ></div>
      </section>
    </div>
  )
  /* with image*/
  {
    /* <section
        className="w-full -mt-14 bg-cover bg-center relative "
        style={{
          backgroundImage: 'url("../src/images/header-image.jpg")',
          height: "50vh"
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundImage: 'url("../src/images/waves-white.png")',
            height: "65px",
            backgroundSize: "cover",
            position: "absolute",
            zIndex: "1",
            bottom: "0"
          }}
        ></div>
      </section> */
  }
}
