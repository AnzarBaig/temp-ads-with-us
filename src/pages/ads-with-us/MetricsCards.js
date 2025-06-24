// const data = [
//   { icon: '👥', value: '10,247+', label: 'Monthly Visitors', sub: 'Qualified decision makers' },
//   { icon: '👁️', value: '96%', label: 'Engagement Rate', sub: 'Above industry average' },
//   { icon: '↩️', value: '3.8%', label: 'Bounce Rate', sub: 'Highly engaged audience' },
//   { icon: '⏱️', value: '272s', label: 'Avg. Session', sub: 'Deep content consumption' }
// ];

// const MetricsCards = () => (
//   <section className="py-16 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
//     {data.map((m, i) => (
//       <div
//         key={i}
//         className="bg-white/90 backdrop-blur-sm border border-gray-200 p-8 rounded-2xl text-center shadow transition-transform duration-300 transform hover:-translate-y-5 hover:shadow-xl"
//       >
//         <div className="text-blue-500 text-4xl mb-4">{m.icon}</div>
//         <h3 className="text-2xl font-extrabold text-gray-900">{m.value}</h3>
//         <p className="font-semibold text-gray-700">{m.label}</p>
//         <p className="text-gray-500 mt-1 text-sm">{m.sub}</p>
//       </div>
//     ))}
//   </section>
// );

// export default MetricsCards;

import CountUp from 'react-countup';

// comment added


const data = [
  {
    img: '/visitor.svg',
    value: 10000,
    suffix: '+',
    label: 'Monthly Visitors',
    sub: 'Steady organic traction'
  },
  {
    img: '/engagement.svg',
    value: 96,
    suffix: '%',
    label: 'Engagement Rate',
    sub: 'Deep content interaction'
  },
  {
    img: '/bounce-rate.svg',
    value: 4,
    suffix: '%',
    label: 'Bounce Rate',
    sub: 'Minimal drop-off behaviour'
  },
  {
    img: '/average.svg',
    value: 2,
    suffix: ' minutes',
    label: 'Average Session',
    sub: 'Meaningful on-site time'
  }
];


const MetricsCards = () => (
  <section className="py-16 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
    {data.map((m, i) => (
      <div
        key={i}
        className="bg-white/90 backdrop-blur-sm border border-gray-200 p-10 rounded-2xl text-center shadow 
        transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
        transform hover:scale-105 hover:shadow-xl"
      >
        <img
          src={m.img}
          alt={m.label}
          className="w-12 h-12 mb-4 mx-auto"
        />
        <h3 className="text-2xl font-extrabold text-gray-900">
          <CountUp end={m.value} duration={2} suffix={m.suffix} />
        </h3>
        <p className="font-semibold text-gray-700">{m.label}</p>
        <p className="text-gray-500 mt-1 text-sm">{m.sub}</p>
      </div>
    ))}
  </section>
);

export default MetricsCards;


