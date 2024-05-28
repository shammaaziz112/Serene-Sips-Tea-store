import { HeroSection } from "@/components/heroSection"
import { ProductByCategory } from "@/components/productByCategory"
import { MainSection } from "@/components/mainSection"
import { SVGProps } from "react"

export function Home() {
  return (
    <div className="Home">
      <HeroSection />
      <MainSection />
      {/* Tea Category */}
      <div className="bg-[#fceadc]">
        <div
          className="rotate-180"
          style={{
            width: "100%",
            backgroundImage: 'url("../src/images/waves-white.png")',
            height: "65px",
            backgroundSize: "cover",
            zIndex: "1"
          }}
        ></div>

        <div className="px-16 md:px-20 py-12 md:py-10">
          <h2 className="text-3xl font-bold text-center text-[#313237] mb-6 md:mb-8 lg:mb-10">
            Our Tea Collection
          </h2>
          {/* <div className="w-full h-0.5 bg-[#313237] dark:bg-gray-700 mb-8 md:mb-10 lg:mb-12 " /> */}
          <ProductByCategory categoryId="61808512-01b7-4cd7-8911-26fd80f3cf54" />
        </div>
        
        <div
          className=""
          style={{
            width: "100%",
            backgroundImage: 'url("../src/images/waves-white.png")',
            height: "65px",
            backgroundSize: "cover",
            zIndex: "1"
          }}
        ></div>
      </div>

      {/* Matcha Category */}
      <div className="">
        <div className="px-16 md:px-20 py-12 md:py-10">
          <h2 className="text-3xl font-bold text-center text-[#627476] mb-6 md:mb-8 lg:mb-10">
            Our Matcha Collection
          </h2>
          {/* <div className="w-full h-0.5 bg-[#627476] dark:bg-gray-700 mb-8 md:mb-10 lg:mb-12 " /> */}
          <ProductByCategory categoryId="4d3307f6-956c-400f-b0ea-66ac56b2d0d1" />
        </div>
      </div>

      {/* Accessories Category */}
      <div className="bg-[#8a9aa5]">
        <div
          className="rotate-180"
          style={{
            width: "100%",
            backgroundImage: 'url("../src/images/waves-white.png")',
            height: "65px",
            backgroundSize: "cover",
            zIndex: "1"
          }}
        ></div>

        <div className="px-16 md:px-20 py-12 md:py-10">
          <h2 className="text-3xl font-bold text-center text-[#faf4e8] mb-6 md:mb-8 lg:mb-10">
            Our Accessories Collection
          </h2>
          {/* <div className="w-full h-0.5 bg-[#faf4e8] dark:bg-gray-700 mb-8 md:mb-10 lg:mb-12 " /> */}
          <ProductByCategory categoryId="61808512-01b7-4cd7-8911-26fd80f3cf54" />
        </div>

        <div
          className=""
          style={{
            width: "100%",
            backgroundImage: 'url("../src/images/waves-white.png")',
            height: "65px",
            backgroundSize: "cover",
            zIndex: "1"
          }}
        ></div>
      </div>


      <section className=" py-10 md:py-14 lg:py-16 ">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm font-medium dark:bg-gray-700">
            Free Delivery & 24/7 Support
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Enjoy Hassle-Free Shopping at Our Tea Shop
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl dark:text-gray-400">
            Get your tea orders delivered to your doorstep for free, and rest assured that our customers are always
            satisfied with our products and services. Were here to support you 24/7.
          </p>
          <div className="mt-8 flex justify-center gap-6">
            <div className="flex flex-col items-center">
              <TruckIcon className="h-12 w-12 text-primary" />
              <span className="mt-2 text-sm font-medium">Free Delivery</span>
            </div>
            <div className="flex flex-col items-center">
              <ThumbsUpIcon className="h-12 w-12 text-primary" />
              <span className="mt-2 text-sm font-medium">Satisfied Customers</span>
            </div>
            <div className="flex flex-col items-center">
              <ClockIcon className="h-12 w-12 text-primary" />
              <span className="mt-2 text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>


          
    </div>
  )
}

function ClockIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function ThumbsUpIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  )
}

function TruckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  )
}