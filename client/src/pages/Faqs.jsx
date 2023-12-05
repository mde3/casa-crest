import { Link } from "react-router-dom"
import Helmet from "../components/Helmet"
import Accordion from "../components/Accordion"

const Faqs = () => {
  return <Helmet title={"FAQs"}>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:max-w-full">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-myblue">FAQs</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently asked questions
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Can’t find the answer you’re looking for? Reach out to our <Link to={'/contact'} className="font-semibold text-gray-800">customer support</Link> team.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="flex flex-col w-full gap-4">
            <Accordion
              title="What types of properties are listed on your platform?"
              answer="Our platform features a wide range of properties including apartments, houses, commercial properties, and land. We strive to provide a comprehensive selection to cater to all our user's needs."
            />
            <Accordion
              title="How can I trust the listings on your platform?"
              answer="We understand the importance of trust in real estate transactions. That's why we verify all listings before they are posted on our platform. We also encourage users to do their own due diligence before making a transaction."
            />
            <Accordion
              title="Can I negotiate the price of a property?"
              answer="Yes, we believe in fair and transparent dealings. Therefore, we provide a platform for buyers and sellers to negotiate and agree on a price that works for both parties."
            />
            <Accordion
              title="What should I do if I encounter a problem?"
              answer="We're here to help! If you encounter any problems or have any questions, please contact our support team. We're committed to providing a smooth and hassle-free experience for all our users."
            />
          </div>
        </div>
      </div>
    </section>
  </Helmet>
}

export default Faqs