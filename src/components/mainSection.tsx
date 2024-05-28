import { SVGProps } from "react"

export function MainSection() {
  return (
    <div>
      <section className="w-full py-14 md:py-16 lg:py-20 text-left">
        <div className="container grid items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Organic & Quality
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Exceptional Tea, Naturally
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our tea house sources the finest organic and high-quality tea leaves from the most
              renowned tea gardens around the world. We are committed to providing our customers
              with an exceptional tea experience.
            </p>
          </div>
          <img
            alt="Tea House"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
            height={450}
            src="public/images/header-image.jpg"
            width={650}
          />
        </div>
        <div className="container mt-12 grid grid-cols-2 gap-6 px-4 md:grid-cols-4 md:px-6 lg:mt-16">
          <div className="flex flex-col items-center justify-center gap-2">
            <LeafIcon className="h-8 w-8 text-green-500" />
            <p className="text-sm font-medium">Organic</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <DropletIcon className="h-8 w-8 text-blue-500" />
            <p className="text-sm font-medium">Pure Water</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <MouseIcon className="h-8 w-8 text-amber-500" />
            <p className="text-sm font-medium">Artisanal</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <LeafIcon className="h-8 w-8 text-green-500" />
            <p className="text-sm font-medium">Sustainable</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function DropletIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  )
}

function LeafIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}

function MouseIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <rect x="5" y="2" width="14" height="20" rx="7" />
      <path d="M12 6v4" />
    </svg>
  )
}
