import HeroSlider from '../components/HeroSlider'
import ImageCarousel from '../components/ImageCarousel'
import PartnersCarousel from '../components/PartnersCarousel'

const Home = () => {
  return (
    <div className="relative">
      <HeroSlider />
      
      {/* Content Wrapper - Slides over HeroSlider */}
      <div className="relative z-10 min-h-screen">
        {/* Spacer to push content below hero - allows hero to be visible initially */}
        <div className="h-screen pointer-events-none"></div>
        
        {/* Gradient transition from transparent to white - non-interactive */}
        <div className="h-0 bg-gradient-to-b from-transparent to-white -mt-32 pointer-events-none"></div>
        
        {/* Why We Exist Section - Now interactive */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white pointer-events-auto">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 lg:p-16 shadow-lg">
            <div className="inline-block bg-secondary text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              WHY WE EXIST
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
              Vision & Mission
            </h2>
            <div className="space-y-6 text-lg sm:text-xl text-gray-700">
              <p>
                <span className="font-semibold text-primary">Vision:</span> To
                create a better-informed, educated, and aware world.
              </p>
              <p>
                <span className="font-semibold text-primary">Mission:</span> To
                catalyse the power of research and communication for social
                equity and progressive change.
              </p>
            </div>
            <div className="mt-8">
              <a
                href="/what-we-do"
                className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300"
              >
                <span>Work with us</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Where We Deliver Section with Carousel */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 pointer-events-auto">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
            THEMATIC EXPERTISE
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-12">
            Where we deliver
          </h2>
          
          {/* Image Carousel */}
          <div className="mb-12">
            <ImageCarousel
              images={[
                {
                  url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
                  alt: 'Agriculture & Livelihoods',
                  title: 'Agriculture & Livelihoods',
                  description: 'Empowering rural communities through sustainable agricultural practices',
                  overlay: true,
                },
                {
                  url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80',
                  alt: 'Education & Skill Development',
                  title: 'Education & Skill Development',
                  description: 'Building capacities for a skilled and educated workforce',
                  overlay: true,
                },
                {
                  url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&q=80',
                  alt: 'Health & Nutrition',
                  title: 'Health & Nutrition',
                  description: 'Improving health outcomes through research and communication',
                  overlay: true,
                },
                {
                  url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80',
                  alt: 'Environment & Climate Change',
                  title: 'Environment & Climate Change',
                  description: 'Addressing environmental challenges for sustainable development',
                  overlay: true,
                },
              ]}
              autoPlayInterval={5000}
            />
          </div>

          {/* Thematic Areas */}
          <div className="flex flex-wrap gap-4 text-lg sm:text-xl text-gray-700 justify-center">
            <span className="font-medium px-4 py-2 bg-white rounded-lg shadow-sm">Agriculture & Livelihoods</span>
            <span className="text-primary">·</span>
            <span className="font-medium px-4 py-2 bg-white rounded-lg shadow-sm">Education & Skill Development</span>
            <span className="text-primary">·</span>
            <span className="font-medium px-4 py-2 bg-white rounded-lg shadow-sm">Health & Nutrition</span>
            <span className="text-primary">·</span>
            <span className="font-medium px-4 py-2 bg-white rounded-lg shadow-sm">Environment & Climate Change</span>
            <span className="text-primary">·</span>
            <span className="font-medium px-4 py-2 bg-white rounded-lg shadow-sm">WASH</span>
            <span className="text-primary">·</span>
            <span className="font-medium px-4 py-2 bg-white rounded-lg shadow-sm">Sustainable Transportation</span>
            <span className="text-primary">·</span>
            <span className="font-medium px-4 py-2 bg-white rounded-lg shadow-sm">Urban Planning & Public Policy</span>
          </div>
        </div>
      </section>

      {/* India Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white pointer-events-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-secondary text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              NATIONAL FOOTPRINT
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Where We Have Worked
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our pan-India presence spans across 25+ states and union territories
            </p>
          </div>

          {/* India Map with Locations */}
          <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 mb-8">
            <div className="relative w-full h-96 sm:h-[500px] lg:h-[600px]">
              <img
                src="https://static.vecteezy.com/system/resources/previews/014/219/821/non_2x/doodle-freehand-drawing-of-india-map-free-png.png"
                alt="India Map"
                className="w-full h-full object-contain"
              />
              {/* Location Markers - You can add more specific coordinates */}
              <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              <div className="absolute top-1/2 right-1/2 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-8 text-white text-center">
              <div className="text-5xl font-bold mb-2">25+</div>
              <div className="text-xl">States & UTs</div>
            </div>
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-8 text-white text-center">
              <div className="text-5xl font-bold mb-2">3 L+</div>
              <div className="text-xl">Individuals engaged</div>
            </div>
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-8 text-white text-center">
              <div className="text-5xl font-bold mb-2">30 K+</div>
              <div className="text-xl">Stakeholders trained</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Carousel Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white pointer-events-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              PARTNERS
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Selected Clients
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're proud to partner with leading organizations driving social change
            </p>
          </div>

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
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white pointer-events-auto">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
            WHAT WE DO
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-12">
            Evidence, storytelling, and capacity building
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl">
            End-to-end solutions from research to communication and training.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-primary text-sm font-semibold uppercase tracking-wider mb-4">
                RESEARCH & EVALUATION
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Evidence-driven decisions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Independent & policy research, evaluations, impact assessments,
                baselines/midlines/endlines, monitoring, feasibility & need
                assessments, and market research.
              </p>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-primary text-sm font-semibold uppercase tracking-wider mb-4">
                INTEGRATED COMMUNICATIONS
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                From concept to impact
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Storytelling for change, IEC/BCC campaigns, pre-testing,
                audio-visual production, documentation, translations &
                transcriptions with 50+ production partners nationwide.
              </p>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="text-primary text-sm font-semibold uppercase tracking-wider mb-4">
                TRAINING & CAPACITY BUILDING
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Contextual, hands-on learning
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sector trainings and stakeholder engagements with PRIs,
                frontline workers, officials, CBOs/NGOs, youth & women groups,
                and media advocacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-auto">
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
            <a
              href="/location"
              className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300"
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
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email us</span>
            </a>
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
      </div>
    </div>
  )
}

export default Home

