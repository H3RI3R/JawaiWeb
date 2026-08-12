const species = [
  {
    id: 'leopard',
    name: 'Indian Leopard',
    latin: 'Panthera pardus fusca',
    image:
      'https://s3.eu-west-3.amazonaws.com/cdn.bigcatsindia.com/wp-content/uploads/2019/09/08135444/Indian-Leopard-Kabini-Wildlife.jpg',
    stats: { speed: 58, speedUnit: 'km/h', population: 70, populationUnit: 'resident cats', lifespan: 14, lifespanUnit: 'years' },
    fact: 'Jawai\'s leopards den in open granite caves rather than dense forest, living alongside Rabari shepherd villages with almost no recorded conflict.',
  },
  {
    id: 'jackal',
    name: 'Golden Jackal',
    latin: 'Canis aureus',
    image:
      'https://www.ecologyasia.com/images-gh/golden-jackal_8648_CC.jpg',
    stats: { speed: 25, speedUnit: 'km/h', population: 150, populationUnit: 'est. in region', lifespan: 8, lifespanUnit: 'years' },
    fact: 'Often heard before seen — their evening chorus around the bandh is one of the first signs a safari is entering active leopard territory.',
  },
  {
    id: 'crocodile',
    name: 'Marsh Crocodile',
    latin: 'Crocodylus palustris',
    image:
      'https://res.cloudinary.com/roundglass/image/upload/v1600164365/roundglass/sustain/panna-marsh-crocodile-mugger-lead-surya-ramchandran_r7r2j0.jpg',
    stats: { speed: 15, speedUnit: 'km/h burst', population: 40, populationUnit: 'in Jawai bandh', lifespan: 45, lifespanUnit: 'years' },
    fact: 'The Jawai reservoir holds one of Rajasthan\'s largest wild mugger crocodile populations, basking openly on the dam wall each winter.',
  },
  {
    id: 'birds',
    name: 'Demoiselle Crane',
    latin: 'Grus virgo',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Demoiselle_Cranes_at_Tal_Chappar.jpg/960px-Demoiselle_Cranes_at_Tal_Chappar.jpg',
    stats: { speed: 60, speedUnit: 'km/h flight', population: 15000, populationUnit: 'winter visitors', lifespan: 20, lifespanUnit: 'years' },
    fact: 'Cranes cross the Himalaya from Central Asia each autumn, arriving in Jawai\'s wetlands in flocks that darken the evening sky.',
  },
];

export default species;
