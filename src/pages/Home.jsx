// Home.jsx
import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'
import ImageCarousel from '../components/ImageCarousel'
import PartnersCarousel from '../components/PartnersCarousel'

const Home = () => {
  const overlayRef = useRef(null)

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    const onPointerDown = (ev) => {
      if (ev.button && ev.button !== 0) return

      // check if target or any ancestor up to overlay is marked interactive
      let el = ev.target
      let interactiveFound = false
      while (el && el !== overlay) {
        if (el.hasAttribute && el.hasAttribute('data-interactive')) {
          interactiveFound = true
          break
        }
        el = el.parentElement
      }
      if (interactiveFound) return

      // forward event to underlying element
      ev.preventDefault()
      ev.stopPropagation()
      const { clientX, clientY } = ev

      const prevPointer = overlay.style.pointerEvents
      overlay.style.pointerEvents = 'none'

      // allow browser to update stacking, then dispatch events on underlying element
      setTimeout(() => {
        const underneath = document.elementFromPoint(clientX, clientY)
        if (underneath) {
          underneath.dispatchEvent(new PointerEvent('pointerdown', {
            bubbles: true, cancelable: true, clientX, clientY, pointerType: ev.pointerType || 'mouse',
          }))
          underneath.dispatchEvent(new PointerEvent('pointerup', {
            bubbles: true, cancelable: true, clientX, clientY, pointerType: ev.pointerType || 'mouse',
          }))
          underneath.dispatchEvent(new MouseEvent('click', {
            bubbles: true, cancelable: true, clientX, clientY,
          }))
        }
        overlay.style.pointerEvents = prevPointer || 'auto'
      }, 0)
    }

    const onTouchStart = (ev) => {
      const touch = ev.touches && ev.touches[0]
      if (!touch) return
      const fake = {
        target: ev.target,
        button: 0,
        pointerType: 'touch',
        clientX: touch.clientX,
        clientY: touch.clientY,
        preventDefault: () => ev.preventDefault(),
        stopPropagation: () => ev.stopPropagation(),
      }
      onPointerDown(fake)
    }

    overlay.addEventListener('pointerdown', onPointerDown, { passive: false })
    overlay.addEventListener('touchstart', onTouchStart, { passive: false })

    return () => {
      overlay.removeEventListener('pointerdown', onPointerDown)
      overlay.removeEventListener('touchstart', onTouchStart)
    }
  }, [])

  // Inline slider images for each card
  const researchImages = [
    { url: 'https://images.unsplash.com/photo-1526378727929-4f9f5d8b1f9a?w=1200&q=80', alt: 'Field survey' },
    { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80', alt: 'Data analysis' },
    { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80', alt: 'Research workshop' },
  ]

  const commsImages = [
    { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80', alt: 'AV production' },
    { url: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&q=80', alt: 'Campaign planning' },
    { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80', alt: 'Community outreach' },
  ]

  const capacityImages = [
    { url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&q=80', alt: 'Workshop' },
    { url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80', alt: 'Training materials' },
    { url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80', alt: 'Group learning' },
  ]

  const trainingImages = [
    { url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80', alt: 'Training session 1' },
    { url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80', alt: 'Training session 2' },
    { url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&q=80', alt: 'Training session 3' },
  ]

  /* COUNTER ANIMATION */
  useEffect(() => {
    const counters = document.querySelectorAll('[data-counter]')
    if (!counters.length) return

    const animate = (el, start, end, duration) => {
      let startTimestamp = null
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        const value = Math.floor(progress * (end - start) + start)
        el.textContent = value.toLocaleString()
        if (progress < 1) {
          window.requestAnimationFrame(step)
        } else {
          // add suffixes if present in data-final (for things like "700+")
          const suffix = el.getAttribute('data-suffix') || ''
          if (suffix) el.textContent = `${el.textContent}${suffix}`
        }
      }
      window.requestAnimationFrame(step)
    }

    counters.forEach((c) => {
      const final = parseInt(c.getAttribute('data-final') || '0', 10)
      const suffix = c.getAttribute('data-suffix') || ''
      const start = 0
      // duration scaled by size of number
      const duration = Math.min(2000 + final * 2, 3000)
      // clear and set data-suffix (preserve + or M)
      c.setAttribute('data-suffix', suffix)
      animate(c, start, final, duration)
    })
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Hero below */}
      <HeroSlider />

      {/* Overlay wrapper: receives scroll; forwards clicks to hero when clicking non-interactive areas */}
      <div ref={overlayRef} className="absolute inset-0 z-20 pointer-events-auto overflow-auto">
        {/* Sticky header - interactive */}
        <header data-interactive="true" className="p-4 bg-white/30 sticky top-0 pointer-events-auto">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="font-bold">CMSR Consultants</div>
            <div className="flex gap-3">
              <button data-interactive="true" className="px-3 py-1 rounded bg-white/90 text-sm shadow" onClick={() => alert('Nav clicked')}>Nav</button>
              <button data-interactive="true" className="px-3 py-1 rounded border bg-transparent text-sm" onClick={() => alert('Sign in clicked')}>Sign in</button>
            </div>
          </nav>
        </header>

        <div className="relative z-10">
          {/* Big spacer that visually sits over the hero. It is non-interactive so clicks fall through */}
          <div className="h-screen pointer-events-none" />

          {/* Gradient transition - non-interactive */}
          <div className="h-0 bg-gradient-to-b from-transparent to-white -mt-32 pointer-events-none" />

          {/* ---------- NEW: Counters (themed & responsive) ---------- */}
          <section
            data-interactive="true"
            className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col items-center text-center mb-8">
                <h4 className="text-sm font-semibold uppercase tracking-wider bg-primary text-white px-3 py-1 rounded-full">OUR IMPACT</h4>
                <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">Numbers that matter</h2>
                <p className="mt-2 text-gray-600 max-w-2xl">Years of experience, evaluations conducted, partners and stakeholders we've engaged.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold text-primary leading-none">
                    <span data-counter data-final="14">0</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">Years</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold text-primary leading-none">
                    <span data-counter data-final="25" data-suffix="+">0</span><span className="sr-only">+</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 ">States </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold text-primary leading-none">
                    <span data-counter data-final="100" data-suffix="+">0</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">Partners</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold text-primary leading-none">
                    <span data-counter data-final="30" data-suffix="K+">0</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">Stakeholders Engaged</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold text-primary leading-none">
                    <span data-counter data-final="300" data-suffix="K+">0</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">Individuals Engaged</div>
                </div>
              </div>
            </div>
          </section>
          {/* ---------- END: Counters ---------- */}

          {/* ---------- REPLACED SECTION: Services tiles (reformatted to current theme) ---------- */}
          <section
            data-interactive="true"
            className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden"
          >
            <div className="max-w-7xl mx-auto">
              <div className="mb-12 text-center">
                <div className="inline-block bg-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                  OUR EXPERTISE
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Services we deliver</h2>
                <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                  Research, communications and capacity building — tailored and scalable solutions across India.
                </p>
              </div>

              {/* Grid: 1 col on small, 2 cols on md, 4 cols on lg */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1: Research & Evaluation */}



                <article className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
                  <div className="flex items-center gap-4 px-6 py-5">
                    <div className="w-12 h-12 rounded-lg bg-yellow-400 flex items-center justify-center text-white text-xl">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3v18M20 7v10M2 14v6" />
                      </svg>
                    </div>

                    {/* Link should contain inline content only; keep it simple */}
                    <Link
                      data-interactive="true"
                      to="/what-we-do"
                      className="inline-flex items-center gap-3"
                      aria-label="Research & Evaluation"
                    >
                      <h3 className="text-lg font-semibold text-[color:var(--secondary,#0C4A8C)]">
                        RESEARCH &amp; EVALUATION
                      </h3>
                    </Link>
                  </div>

                  {/* Carousel — use an explicit width (or w-full for responsiveness) */}
                  <div className="w-192 h-72 media overflow-hidden relative z-40 pointer-events-auto">
                    <ImageCarousel images={researchImages} autoPlayInterval={4500} />
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
  {/* Scrollable text box: fixed height, consistent padding, scroll when content overflows */}
  <div
    className="h-48 overflow-y-auto pr-2"
    role="region"
    aria-label="Research summary"
  >
    <p className="text-gray-700 py-3 px-2 leading-tight text-sm text-justify break-words">
    Research and Monitoring & Evaluation constitute one of the core areas of CMSR Consultants. We provide broad based consultancy in the domains of Social Research, Policy Research, Market Research, Communication Research, Formative Research, Surveys and exit polls etc. The Core Research team comes from diverse disciplines – Sociology, Economics, Agriculture, Geography, Disaster Management etc.There is an extensive network of field executives, supervisors and managers to conduct any large scale research or evaluation study in any part of the country. CMSR provides its services in terms of:
    </p>
  </div>
</div>
                  {/* Actions / buttons area */}
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Evaluation Studies"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                          Evaluation Studies
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Impact Assessment"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                          Impact Assessment
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Need Assessment"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                          Need Assessment
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Baseline/ Midline/Endline Surveys"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Baseline/ Midline/Endline Surveys
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Process Monitoring"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Process Monitoring
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Formative Research"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Formative Research
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Feasibility Studies"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Feasibility Studies
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Vulnarability Study"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Vulnarability Study
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>

                 

                  <div className="p-6">
                    <Link
                      data-interactive="true"
                      to="/what-we-do"
                      className="w-full inline-flex items-center justify-center px-4 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition"
                    >
                      Discover More
                      <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" />
                      </svg>
                    </Link>
                  </div>
                </article>


                {/* Integrated Communications */}
                <article className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
                  <div className="flex items-center gap-4 px-6 py-5">
                    <div className="w-12 h-12 rounded-lg bg-yellow-400 flex items-center justify-center text-white text-xl">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
                      </svg>
                    </div>
                    <Link data-interactive="true" to="/what-we-do" className="w-full inline-flex items-center justify-center px-4 py-3 bg-white-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition">
                    <h3 className="text-lg font-semibold text-[color:var(--secondary,#0C4A8C)]">INTEGRATED COMMUNICATIONS</h3>
                    </Link>
                  </div>
                  <div className="w-192 h-72 media overflow-hidden relative z-40 pointer-events-auto">
                    <ImageCarousel images={commsImages} autoPlayInterval={4200} />
                  </div>
                  


                  <div className="h-48 overflow-y-auto pr-2" role="region" aria-label="Research summary" >
                     <p className="text-gray-700 py-3 px-2 leading-tight text-sm text-justify break-words">
                     CMSR Consultants offer Innovative and integrated communication solutions matched by a provocative approach and irresistible creative work. Over the years, the team has worked on several pan-India studies and campaigns launched by national and international organizations. We have an in-house design and branding team to deliver quality work in a time-bound manner. In addition, more than 50 production houses are empanelled with us for audio-visual material production viz corporate films, documentaries, project documentation, radio and tv campaigns etc.
                      </p>
                    </div>
                  



                    {/* Actions / buttons area */}
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Pre-testing of development communication concepts and material"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Pre-testing of development communication concepts and material
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Developing IEC / BCC campaigns and communication material"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Developing IEC / BCC campaigns and communication material
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Documentation of projects and Best Practices"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Documentation of projects and Best Practices
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Production of audio-visual communication material"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Production of audio-visual communication material
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Translation and Transcription"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Translation and Transcription
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                 
                  </div>

                  <div className="p-6">
                    <Link data-interactive="true" to="/what-we-do" className="w-full inline-flex items-center justify-center px-4 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition">
                      Discover More
                      <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" />
                      </svg>
                    </Link>
                  </div>
                </article>

                {/* Capacity Building */}
                <article className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
                  <div className="flex items-center gap-4 px-6 py-5">
                    <div className="w-12 h-12 rounded-lg bg-yellow-400 flex items-center justify-center text-white text-xl">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <Link data-interactive="true" to="/what-we-do" className="w-full inline-flex items-center justify-center px-4 py-3 bg-white-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition">
                    <h3 className="text-lg font-semibold text-[color:var(--secondary,#0C4A8C)]">CAPACITY BUILDING</h3>
                    </Link>
                  </div>

                  <div className="w-192 h-72 media overflow-hidden relative z-40 pointer-events-auto">
                    <ImageCarousel images={capacityImages} autoPlayInterval={4800} />
                  </div>
                  <div
    className="h-48 overflow-y-auto pr-2"
    role="region"
    aria-label="Research summary"
  >
    <p className="text-gray-700 py-3 px-2 leading-tight text-sm text-justify break-words">
       Sector trainings and stakeholder engagements with PRIs, frontline workers, officials, CBOs/NGOs, youth & women groups. Practical, contextual programs designed and delivered by senior trainers.
    </p>
  </div>




{/* Actions / buttons area */}
<div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Media (National and Regional)"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Media (National and Regional)
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="PRI representatives, anganwadi workers, frontline health workers"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        PRI representatives, anganwadi workers, frontline health workers
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Community Based Organisations (CBOs) and Non- Governmental Organisations"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Community Based Organisations (CBOs) and Non- Governmental Organisations
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="NGOs working in water and sanitation, rural development, child rights and related sectors"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        NGOs working in water and sanitation, rural development, child rights and related sectors
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="State, district and block level government officials"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        State, district and block level government officials
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Development communication professionals"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Development communication professionals
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  







                  <div className="p-6">
                    <Link data-interactive="true" to="/what-we-do" className="w-full inline-flex items-center justify-center px-4 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition">
                      Discover More
                      <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" />
                      </svg>
                    </Link>
                  </div>
                </article>

                {/* Training & Capacity Building (with inline slider) */}
                <article className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
                  <div className="flex items-center gap-4 px-6 py-5">
                    <div className="w-12 h-12 rounded-lg bg-yellow-400 flex items-center justify-center text-white text-xl">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zM12 14v7" />
                      </svg>
                    </div>
                    <Link data-interactive="true" to="/what-we-do" className="w-full inline-flex items-center justify-center px-4 py-3 bg-white-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition">
                    <h3 className="text-lg font-semibold text-[color:var(--secondary,#0C4A8C)]">Project Management</h3>
                    </Link>
                  </div>

                  <div className="w-192 h-72 media overflow-hidden relative z-40 pointer-events-auto">
                    <ImageCarousel images={trainingImages} autoPlayInterval={4000} />
                  </div>
                  <div
    className="h-48 overflow-y-auto pr-2"
    role="region"
    aria-label="Research summary"
  >
    <p className="text-gray-700 py-3 px-2 leading-tight text-sm text-justify break-words">
    We design contextual, hands-on trainings and workshops for government, civil society and community stakeholders — supported by senior trainers and practical field experience across rural and urban settings.
    </p>
  </div>





{/* Actions / buttons area */}
<div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Evaluation Studies"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                          Evaluation Studies
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Impact Assessment"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                          Impact Assessment
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Need Assessment"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                          Need Assessment
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Baseline/ Midline/Endline Surveys"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Baseline/ Midline/Endline Surveys
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Process Monitoring"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Process Monitoring
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Formative Research"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Formative Research
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Feasibility Studies"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 py-1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Feasibility Studies
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>
                  <div className="px-3 py-0 res-eval ">
                    <div className="flex flex-col gap-3 ">
                      {/* Impact Assessment (full width) */}
                      <button
                        data-interactive="true"
                        aria-label="Vulnarability Study"
                        type="button"
                        className="relative overflow-hidden w-full rounded-md group whitespace-nowrap"
                      >
                        {/* sliding background (covers whole button) */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-0 bg-[#7AB2EE] z-0"
                        />

                        {/* label (on top) */}
                        <span className="relative z-10 block w-full text-left px-4 1 text-sm font-semibold text-black group-hover:text-black text-center transition-colors duration-200">
                        Vulnarability Study
                        </span>
                      </button>

                      {/* Example: secondary narrow button under the full-width button (optional) */}
                      {/* <button className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-sm bg-white border text-sm">Need Assessment</button> */}
                    </div>
                  </div>









                  <div className="p-6">
                    <Link data-interactive="true" to="/what-we-do" className="w-full inline-flex items-center justify-center px-4 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition">
                      Discover More
                      <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" />
                      </svg>
                    </Link>
                  </div>
                </article>
              </div>
            </div>
          </section>
          {/* ---------- END: REPLACED SECTION ---------- */}

          {/* Thematic expertise with carousel */}
          <section data-interactive="true" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 pointer-events-auto relative z-40">
            <div className="max-w-7xl mx-auto">
              <div className="inline-block bg-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                THEMATIC EXPERTISE
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-12">Where we deliver</h2>

              <div className="mb-12">
                <div className="relative z-40 pointer-events-auto">
                  <ImageCarousel
                    images={[
                      { url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80', alt: 'Agriculture & Livelihoods', title: 'Agriculture & Livelihoods', description: 'Empowering rural communities through sustainable agricultural practices', overlay: true },
                      { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80', alt: 'Education & Skill Development', title: 'Education & Skill Development', description: 'Building capacities for a skilled and educated workforce', overlay: true },
                      { url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&q=80', alt: 'Health & Nutrition', title: 'Health & Nutrition', description: 'Improving health outcomes through research and communication', overlay: true },
                      { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80', alt: 'Environment & Climate Change', title: 'Environment & Climate Change', description: 'Addressing environmental challenges for sustainable development', overlay: true },
                    ]}
                    autoPlayInterval={5000}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-lg sm:text-xl text-gray-700 justify-center">
  <Link
    data-interactive="true"
    to="/what-we-do"
    className="font-medium px-4 py-2 bg-white rounded-lg shadow-sm inline-block transition-colors duration-200 hover:text-[#0C4A8C]"
  >
    Agriculture &amp; Livelihoods
  </Link>

  <span className="text-primary">·</span>

  <Link
    data-interactive="true"
    to="/what-we-do"
    className="font-medium px-4 py-2 bg-white rounded-lg shadow-sm inline-block transition-colors duration-200 hover:text-[#0C4A8C]"
  >
    Education &amp; Skill Development
  </Link>

  <span className="text-primary">·</span>

  <Link
    data-interactive="true"
    to="/what-we-do"
    className="font-medium px-4 py-2 bg-white rounded-lg shadow-sm inline-block transition-colors duration-200 hover:text-[#0C4A8C]"
  >
    Health &amp; Nutrition
  </Link>

  <span className="text-primary">·</span>

  <Link
    data-interactive="true"
    to="/what-we-do"
    className="font-medium px-4 py-2 bg-white rounded-lg shadow-sm inline-block transition-colors duration-200 hover:text-[#0C4A8C]"
  >
    Environment &amp; Climate Change
  </Link>
</div>
            </div>
          </section>

          {/* Partners Carousel - integrated as requested */}
          <section data-interactive="true" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white pointer-events-auto relative z-40">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block bg-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">PARTNERS</div>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Selected Clients</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">We're proud to partner with leading organizations driving social change</p>
              </div>

              <div className="relative z-40 pointer-events-auto">
                <PartnersCarousel
                  partners={[
                    { name: 'AIF', logo: 'https://du8ef2qvb6oy7.cloudfront.net/media/images/29d7acef-9a01-443d-87dd-d07ffc5b1068/aiflogo2x.png?fm=jpg&q=80&fit=max&crop=%2C%2C%2C&w=1000' },
                    { name: 'UNICEF', logo: 'https://www.itu.int/net4/wsis/ungis/Content/img/logos/uniform/unicef.png' },
                    { name: 'Save the Children', logo: 'https://pbs.twimg.com/profile_images/1556932384280510464/ylD3BMs5_400x400.jpg' },
                    { name: 'GIZ', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRYHEdI1djJYk83Is_VOdyDTTcX-yO8_lkWTmFvOwH2tabpFI3YzU_oaRshwA6QdF8_iE&usqp=CAU' },
                    { name: 'CARE', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/CARE_Logo_Orange.png/960px-CARE_Logo_Orange.png' },
                    { name: 'HDFC Bank Parivartan', logo: 'https://programs.t-hub.co/wp-content/uploads/2024/02/Untitled-design-18-1-1.png' },
                    { name: 'NIUA', logo: '/partners/niua.png' },
                    { name: 'WRI India', logo: '/partners/wri.png' },
                    { name: 'Johns Hopkins BSPH', logo: '/partners/johns-hopkins.png' },
                    { name: 'TATA Trusts', logo: '/partners/tata.png' },
                    { name: 'Deloitte', logo: '/partners/deloitte.png' },
                    { name: 'Palladium', logo: '/partners/palladium.png' },
                    { name: 'Cornell University', logo: '/partners/cornell.png' },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Connect Section (white bg) */}
          <section data-interactive="true" className="py-20 px-4 sm:px-6 lg:px-8 bg-white pointer-events-auto relative z-40">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl p-8 sm:p-12 lg:p-16 shadow-xl">
                <div className="inline-block bg-secondary text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                  CONNECT
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
                  Let's build sustainable partnerships
                </h2>
                <div className="space-y-4 text-lg text-gray-700 mb-8">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>
                      <span className="font-semibold">Email:</span>{' '}
                      gajendra@cmsrconsultants.com
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span>
                      <span className="font-semibold">Web:</span>{' '}
                      cmsrconsultants.com · Pan-India operations
                    </span>
                  </div>
                </div>
                <Link data-interactive="true" to="/contact" className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email us</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Google Maps Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white pointer-events-auto">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block bg-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                  LOCATION
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                  Visit Us
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
                  Wave One Tower, Noida Sector 18, Noida, Uttar Pradesh, India
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-xl">
                <div className="w-full h-96 sm:h-[500px] lg:h-[600px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.1234567890123!2d77.3251234!3d28.5678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37cce50b0d4c8a3f!2sWave%20One%20Tower!5e0!3m2!1sen!2sin!4v1698765432109!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="CMSR Consultants Location - Wave One Tower, Noida Sector 18"
                  ></iframe>
                </div>
                <div className="p-6 sm:p-8 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        CMSR Consultants
                      </h3>
                      <p className="text-gray-600">
                        Wave One Tower, Noida Sector 18
                      </p>
                      <p className="text-gray-600">Noida, Uttar Pradesh, India</p>
                    </div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Wave+One+Tower+Noida+Sector+18+Noida+Uttar+Pradesh+India"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Get Directions</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-gray-300 py-12 pointer-events-auto relative z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <div className="font-bold text-white text-lg">CMSR Consultants</div>
                  <p className="mt-2 max-w-md">Research. Communication. Capacity building. Driving impact through evidence and storytelling.</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Company</h4>
                    <ul className="space-y-1">
                      <li><Link data-interactive="true" to="/about" className="hover:underline">About</Link></li>
                      <li><Link data-interactive="true" to="/careers" className="hover:underline">Careers</Link></li>
                      <li><Link data-interactive="true" to="/contact" className="hover:underline">Contact</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Resources</h4>
                    <ul className="space-y-1">
                      <li><Link data-interactive="true" to="/blog" className="hover:underline">Blog</Link></li>
                      <li><Link data-interactive="true" to="/reports" className="hover:underline">Reports</Link></li>
                      <li><Link data-interactive="true" to="/privacy" className="hover:underline">Privacy</Link></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-sm text-gray-500">© {new Date().getFullYear()} CMSR Consultants. All rights reserved.</div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Home
