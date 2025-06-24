const features = [
  {
    img: '/target.png',
    title: 'Precise Targeting',
    desc: (
      <>
        We help you reach procurement heads, project managers, and{' '}
        <strong>decision-makers where they’re already looking.</strong>
      </>
    )
  },
  {
    img: '/security.png',
    title: 'Quality Assurance',
    desc: (
      <>
        Backed by a <strong>domain rating of 29 and {'<1% spam score'}</strong>, our platform ensures your message reaches a credible audience.
      </>
    )
  },
  {
    img: '/visibility.png',
    title: 'Stronger Visibility',
    desc: (
      <>
        Enjoy <strong>17,000+</strong> monthly page views, with over <strong>1,000 </strong>returning users and an average session time of <strong>2+ minutes</strong>.
      </>
    )
  }
];



const FeaturesGrid = () => (
  <section className="py-16 px-6 bg-white">
    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Headsup B2B?</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {features.map((f, i) => (
        <div
          key={i}
          className="bg-white/90 backdrop-blur-sm border border-gray-200 p-10 rounded-2xl shadow 
            transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
            transform hover:scale-105 hover:shadow-xl text-center"
        >
          <div className="bg-yellow-400 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <img
              src={f.img}
              alt={f.title}
              className="w-12 h-12"
            />
          </div>
          <h3 className="font-bold text-xl mb-2 text-gray-900">{f.title}</h3>
          <p className="text-gray-600 text-base leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesGrid;