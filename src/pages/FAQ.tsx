import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"
import { SVGProps } from "react"

export default function FAQ() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#fceadc] dark:bg-gray-800">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {
                "Discover the art of tea at our shop. We're passionate about sourcing the finest teas and sharing our knowledge with our customers."
              }
            </p>
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
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-6">
            <Collapsible collapsible type="single">
              <div>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-4 text-lg font-medium">
                  What tea offerings do you have?
                  <ChevronDownIcon className="h-5 w-5 transition-transform group-[data-state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 text-gray-500 dark:text-gray-400">
                  <p>
                    We offer a wide selection of premium loose-leaf teas, including black, green,
                    oolong, white, and herbal varieties. Our collection features teas sourced from
                    renowned tea-growing regions around the world, each with its own unique flavor
                    profile and health benefits.
                  </p>
                  <p className="mt-4">
                    {
                      "Whether you're a seasoned tea connoisseur or just starting to explore the world of tea, we have something to delight your senses. From classic English Breakfast to exotic Pu-erh, our tea offerings are carefully curated to provide a diverse and exceptional tea-drinking experience."
                    }
                  </p>
                </CollapsibleContent>
              </div>
            </Collapsible>
            <Collapsible collapsible type="single">
              <div>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-4 text-lg font-medium">
                  How do you recommend brewing your teas?
                  <ChevronDownIcon className="h-5 w-5 transition-transform group-[data-state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 text-gray-500 dark:text-gray-400">
                  <p>
                    We believe that the perfect cup of tea starts with the right brewing method. Our
                    team of tea experts is happy to provide guidance on the optimal brewing
                    techniques for each of our tea offerings.
                  </p>
                  <p className="mt-4">
                    Generally, we recommend using freshly drawn, filtered water heated to the
                    appropriate temperature for the specific tea type. The water-to-leaf ratio,
                    steeping time, and water temperature can all impact the flavor and aroma of the
                    final brew. We're happy to share our recommended brewing parameters for each tea
                    to help you achieve the perfect cup.
                  </p>
                </CollapsibleContent>
              </div>
            </Collapsible>
            <Collapsible collapsible type="single">
              <div>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-4 text-lg font-medium">
                  What are your sustainability practices?
                  <ChevronDownIcon className="h-5 w-5 transition-transform group-[data-state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 text-gray-500 dark:text-gray-400">
                  <p>
                    Sustainability is at the core of our business. We work closely with our tea
                    producers to ensure ethical and environmentally responsible sourcing practices.
                    This includes supporting small-scale, organic tea farms that prioritize
                    sustainable cultivation methods and fair labor practices.
                  </p>
                  <p className="mt-4">
                    In our own operations, we strive to minimize waste and environmental impact. Our
                    packaging is made from renewable and recyclable materials, and we offer a tea
                    leaf recycling program to give new life to used tea leaves. We also continuously
                    explore ways to reduce our carbon footprint and support local and global
                    initiatives that promote environmental stewardship.
                  </p>
                </CollapsibleContent>
              </div>
            </Collapsible>
            <Collapsible collapsible type="single">
              <div>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-4 text-lg font-medium">
                  What are your customer policies?
                  <ChevronDownIcon className="h-5 w-5 transition-transform group-[data-state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 text-gray-500 dark:text-gray-400">
                  <p>
                    At our tea shop, we prioritize exceptional customer service and satisfaction. We
                    offer a 30-day return policy on all purchases, no questions asked. If you're not
                    completely satisfied with your tea selection, simply return it for a full refund
                    or exchange.
                  </p>
                  <p className="mt-4">
                    We also provide free shipping on all orders over $50 within the continental
                    United States. For international customers, we offer competitive shipping rates
                    and work to ensure a seamless delivery experience.
                  </p>
                  <p className="mt-4">
                    {
                      "If you have any other questions or concerns, our friendly and knowledgeable customer service team is always available to assist you. We're committed to making your tea-drinking experience exceptional from start to finish."
                    }
                  </p>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
        </div>
      </section>
    </>
  )
}

function ChevronDownIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
