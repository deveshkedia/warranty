import React from "react"

function formatLiability(liability: string) {
  // Extract period-percentage pairs using regex
  const matches = Array.from(
    liability.matchAll(
      /Month\s*(\d+)[^–-]*[–-]\s*Month\s*(\d+)[^–-]*[–-]\s*([\d.]+)\s*%/g
    )
  )
  const extraMatches = Array.from(
    liability.matchAll(/Month\s*(\d+)[^–-]*[–-]\s*([\d.]+)\s*%/g)
  )
  const items = matches.length
    ? matches.map(
        (m) => `Month ${m[1]} - Month ${m[2]}: ${m[3]}% of replacement cost`
      )
    : extraMatches.map((m) => `Month ${m[1]}: ${m[2]}% of replacement cost`)
  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-2">Liability Breakdown</h3>
      <ul className="list-disc ml-6">
        {items.length > 0 ? (
          items.map((item, i) => <li key={i}>{item}</li>)
        ) : (
          <li>{liability}</li>
        )}
      </ul>
    </div>
  )
}

function formatConditions(conditions: string) {
  // Split by line breaks or bullet points, but NOT dashes
  const items = conditions
    .split(/[\n•\u2022]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !/^conditions[:]?$/i.test(s))
  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-2">Conditions</h3>
      <ul className="list-disc ml-6">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function formatApplication(application: string) {
  // Split by line breaks or bullet points, but NOT dashes
  const items = application
    .split(/[\n•\u2022]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !/^application[:]?$/i.test(s))
  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-2">Application</h3>
      <ul className="list-disc ml-6">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

const WarrantyText = ({
  warrantyProduct,
}: {
  warrantyProduct?: Record<string, string>
}) => (
  <div className="prose max-w-none text-base">
    <h1 className="text-3xl font-bold mb-4 text-center">
      Warranty Terms &amp; Conditions
    </h1>

    <h2 className="text-2xl font-semibold mt-8 mb-2">Extent of Warranty</h2>
    <p>
      <b>The warranty shall apply where:</b>
    </p>
    <ol className="list-decimal ml-6">
      <li>
        <b>Eligibility:</b> For sites where the quantity of the paint is more
        than 40 litres and its usage exceeds 90% of purchased volume. Warranty
        is only applicable when application guidelines are followed and in case
        of exterior walls, the entire paint system applied (including primer,
        and topcoat) is purchased, as recommended. For exterior vertical walls,
        the Warranty Period and Replacement Costs depend on the topcoat applied
        on the exterior affected area. For details, please refer to the warranty
        document of the relevant topcoat. The Warranty is applicable, subject to
        satisfactory pre-inspection of the exterior surface.
      </li>
      <li>
        <b>Replacement:</b> The Company will provide replacement paint and
        labour for re-application of coating, as may be necessary to set right
        the Paint Failure in the affected portion only in accordance with
        Liability as indicated in the ‘Liability’ section.
      </li>
      <li>
        <b>Paint Failure:</b> Throughout this Warranty the words{" "}
        <b>&quot;Paint Failure&quot;</b> shall mean any of the following
        occurring, subject to the other conditions laid under this Warranty:
        <ul className="list-disc ml-6">
          <li>
            Film integrity, flaking and peeling of the paint caused by one coat
            of paint coming off from another or the paint film coming off from
            the substrate.
          </li>
          <li>
            Shade fading, growth of fungus and algae on wall surfaces (spread
            over a minimum area of 10 sq. feet).
          </li>
        </ul>
      </li>
    </ol>

    {/* <h3 className="text-xl font-semibold mt-6 mb-2">Conditions</h3>
    <ul className="list-disc ml-6">
      <li>
        Five (5) year warranty only in case of anti-algal/anti-fungal
        performance.
      </li>
      <li>Four (4) year shade-fading warranty for the paint.</li>
    </ul> */}

    {warrantyProduct?.Conditions &&
      formatConditions(warrantyProduct.Conditions)}

    <h2 className="text-2xl font-semibold mt-8 mb-2">
      Commencement and Duration
    </h2>
    <ol className="list-decimal ml-6">
      <li>
        This Warranty shall commence on the date of purchase of the Product as
        per the tax invoice provided that painting work is fully complete and
        the user has registered for Warranty.
      </li>
      <li>
        The Company at its own discretion may appoint a person to inspect and
        validate the application of the paint as per the directions specified.
      </li>
    </ol>
    <p className="italic">
      Where any claim arises during the Warranty period, the period will not
      start afresh after settlement of the claim.
    </p>
    {/* 
    <h2 className="text-2xl font-semibold mt-8 mb-2">Application (Exterior)</h2>
    <p className="font-semibold">
      This warranty shall only be applicable where:
    </p>
    <ol className="list-decimal ml-6">
      <li>The paint has been used on exterior masonry wall surfaces only.</li>
      <li>
        All elements of surface preparation prior to the application and
        application work have been done in accordance with the instructions
        provided for the paint with regard to surface preparation and
        application as in the Technical Data Sheet.
      </li>
      <li>
        The Customer has used the entire paint system recommended by the
        manufacturer as per the Product Data Sheet.
      </li>
    </ol>

    <h2 className="text-2xl font-semibold mt-8 mb-2">Application (Interior)</h2>
    <p className="font-semibold">
      This warranty shall only be applicable where:
    </p>
    <ol className="list-decimal ml-6">
      <li>
        The paint has been used on interior masonry, plaster, or gypsum-board
        wall surfaces only.
      </li>
      <li>
        Surface preparation steps have been fully carried out as per the Product
        Data Sheet, including:
        <ul className="list-disc ml-6">
          <li>
            Removal of dust, grease, oil, loose particles or previous failing
            coatings
          </li>
          <li>
            Repair of cracks or holes with appropriate filler or putty and full
            cure before painting
          </li>
          <li>
            Light sanding of glossy or hard-to-stick surfaces to ensure adhesion
          </li>
          <li>
            Application of the recommended interior primer (if specified) at the
            prescribed spread rate
          </li>
        </ul>
      </li>
      <li>
        The Customer has applied the complete paint system recommended by the
        manufacturer (primer + topcoat) in the correct sequence, dilution,
        recoating intervals and ambient conditions (e.g., temperature between
        10–40 °C, relative humidity &lt; 85%).
      </li>
    </ol> */}

    {warrantyProduct?.Application &&
      formatApplication(warrantyProduct.Application)}

    {/* <h2 className="text-2xl font-semibold mt-8 mb-2">Liability</h2> */}
    {/* <p>{warrantyProduct?.Liability}</p> */}
    {warrantyProduct?.Liability && formatLiability(warrantyProduct.Liability)}
    <p>
      The replacement cost shall be the cost of the paint and labour only
      required to set right the area of paint failure only, at the time of the
      lodgement of claim. The labour rate will be determined by the manufacturer
      and it will be a reflection of the current prevailing market labour rates
      and the same will not be disputed by the Customer, at any point of time.
      The labour rate may be determined on the basis of a per sq.ft. rate or on
      a daily wage. The Customer will be liable for the balance costs, which are
      not manufacturer’s obligations, as indicated above.
    </p>
    <p>
      The Company will not be liable for any indirect or consequential loss or
      damages to the Customer. The Customer&apos;s exclusive and sole remedy
      under this Warranty shall be as mentioned here in this clause.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-2">Exclusions</h2>
    <p className="font-semibold">
      The Warranty will be void in the following events:
    </p>
    <ol className="list-decimal ml-6">
      <li>
        Intermittent dripping of water due to proximity of vegetation or
        air-conditioning units or any other sources of water leakage like plant
        pots.
      </li>
      <li>
        Water penetration due to capillary rise from the ground level, including
        water leakage, seeping and continuous dampness of the surface.
      </li>
      <li>Growth of algae or fungus on surfaces other than masonry walls.</li>
      <li>
        The Warranty will cover only manufacturing defects of the paint supplied
        and will not cover any defects arising out of factors out of control of
        the manufacturer, including but not limited to:
        <ul className="list-disc ml-6">
          <li>
            Paint failures due to structural defects, moss and other vegetative
            growth, excessive bird droppings/spitting, water leakage and seepage
            within the building structure and continuous dampness of the
            surface, staining due to plant pots.
          </li>
          <li>Natural calamities such as earthquakes, cyclones.</li>
          <li>Failure or defects in the structure or previous coating.</li>
          <li>Vandalism.</li>
          <li>Acts of God.</li>
          <li>Abuse or negligence by the Customer.</li>
          <li>Causes other than defects in the paint supplied.</li>
          <li>Improper surface preparation.</li>
          <li>Surface with contaminants and not dry.</li>
          <li>Normal wear and tear.</li>
          <li>
            Any act or omission on the part of the contractor/painter causing
            the paint or the application of the paint to be defective by any
            means. While the most durable and fade resistant colour pigments are
            used for manufacturing of the paint. Emulsion, experience has
            proven, particularly in coastal areas, that fading and chalking do
            occur with all paint products within normal limits; this is not
            considered as failure of the paint.
          </li>
        </ul>
      </li>
    </ol>

    <h2 className="text-2xl font-semibold mt-8 mb-2">Claims and Repairs</h2>
    <ol className="list-decimal ml-6">
      <li>
        Any claim made in terms of this Warranty shall be made within 30 days of
        the customer discovering any defect, damage or failure which gives rise
        to a claim.
      </li>
      <li>
        The consumer shall forthwith notify the manufacturer of the claim
        providing full details thereof, and shall set out the basis on which it
        believes that the manufacturer is liable in terms of the Warranty. The
        manufacturer reserves the right to carry out inspections of the paint
        application process, in which the paint is alleged to have failed and to
        perform any tests in respect thereof, and may do so either itself or by
        means of any person nominated by it. Prior to such inspection or
        testing, the customer shall not be entitled to perform any repairs to or
        remove or tamper with any part of the paint.
      </li>
      <li>
        The manufacturer shall use its best endeavours to ensure that the paint
        required for repairs is available as soon as possible at the place where
        the repairs are to be carried out, but does not assume liability for
        delay in this respect. The Company, in its sole discretion shall be
        entitled to:
        <ul className="list-disc ml-6">
          <li>
            Control/monitor re-painting which is to be carried out in accordance
            with all its specifications and instructions; and
          </li>
          <li>
            Appoint a contractor and/or approve the contractor appointed by the
            Customer.
          </li>
        </ul>
      </li>
    </ol>

    <h2 className="text-2xl font-semibold mt-8 mb-2">Miscellaneous</h2>
    <ol className="list-decimal ml-6">
      <li>
        This Warranty disclaims any liabilities, contracts, tort or otherwise
        including negligence and strict liability and the Company makes no
        warranty or merchantability or of fitness for any particular purpose
        whatsoever for the paint. There are no warranties expressed or implied
        under law, which extend beyond the warranty set out herein.
      </li>
      <li>
        If any dispute arises between the manufacturer and the Customer, in
        respect of the above Warranty, neither shall commence any court or
        arbitration proceedings relating to the dispute, unless they have first
        complied through mediation.
      </li>
      <li>
        In case of any disputes, the same is subject to exclusive Jurisdiction
        of the courts of Kolkata.
      </li>
      <li>
        The facts and all matters concerning any dispute will be kept
        confidential by both the manufacturer and the Company at all times.
      </li>
    </ol>
  </div>
)

export default WarrantyText
