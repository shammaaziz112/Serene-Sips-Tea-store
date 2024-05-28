// import { Link } from "react-router-dom"

export default function Component() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <section className="dark:bg-gray-800 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                The Serene Sips Shop
              </h1>
              <p className="max-w-[600px] text-gray-600 dark:text-gray-400 text-lg">
                Established in 2010, The Serene Sips Shop is a family-owned business that has been
                bringing the finest teas from around the world to our local community. Our mission
                is to share our passion for tea and provide a warm, inviting space for people to
                come together and enjoy the art of tea.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img
                alt="The Serene Sips Shop"
                className="rounded-lg object-cover"
                height="500"
                src="images/family.jpg"
                style={{
                  aspectRatio: "500/500",
                  objectFit: "cover"
                }}
                width="500"
              />
            </div>
          </div>
        </div>
      </section>
      <div
        className=""
        style={{
          width: "100%",
          backgroundImage: 'url("images/waves-Pearl.png")',
          height: "65px",
          backgroundSize: "cover",
          zIndex: "1"
        }}
      ></div>
      <section className="bg-[#fceadc] py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
            <div className="flex items-center justify-center">
              <img
                alt="The Serene Sips Shop Founders"
                className="rounded-lg object-cover"
                height="500"
                src="images/oldWoman.jpg"
                style={{
                  aspectRatio: "500/500",
                  objectFit: "cover"
                }}
                width="500"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Meet the Founders
              </h2>
              <p className="max-w-[600px] text-gray-600 dark:text-gray-400 text-lg">
                The Serene Sips Shop was founded by husband and wife duo, Emma and Jack, who share a
                deep passion for tea. After years of traveling the world and discovering the rich
                history and culture behind different tea traditions, they decided to open their own
                tea shop to share their love of tea with their local community.
              </p>
              <p className="max-w-[600px] text-gray-600 dark:text-gray-400 text-lg">
                Emma and Jack are committed to sourcing the highest quality, ethically-sourced teas
                from small, family-owned farms around the world. They believe in building direct
                relationships with their tea producers to ensure fair trade practices and
                sustainable farming methods.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div
        className="rotate-180"
        style={{
          width: "100%",
          backgroundImage: 'url("images/waves-Pearl.png")',
          height: "65px",
          backgroundSize: "cover",
          zIndex: "1"
        }}
      ></div>
      <section className="dark:bg-gray-800 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Unique Tea Offerings
              </h2>
              <p className="max-w-[600px] text-gray-600 dark:text-gray-400 text-lg">
                At The Serene Sips Shop, we pride ourselves on our carefully curated selection of
                teas from around the world. From classic black and green teas to rare and specialty
                blends, we offer a wide variety of options to suit every palate.
              </p>
              <p className="max-w-[600px] text-gray-600 dark:text-gray-400 text-lg">
                We also offer a range of unique brewing methods, including traditional gongfu tea
                ceremonies, to help our customers discover the true depth and complexity of each
                tea. Our commitment to sustainability extends to our brewing practices, as we use
                energy-efficient equipment and compostable accessories.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img
                alt="The Serene Sips Shop Tea Offerings"
                className="rounded-lg object-cover"
                height="500"
                src="images/tea.jpg"
                style={{
                  aspectRatio: "500/500",
                  objectFit: "cover"
                }}
                width="500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
