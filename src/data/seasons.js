// Each `path` is a `d` attribute for the same open <path>, sharing a
// point count so Framer Motion can interpolate smoothly between them.
// Coordinates are hand-placed within a 0 0 600 400 viewBox tracing a
// route through the hills, dam wall, and open scrub.
const seasons = [
  {
    id: 'monsoon',
    label: 'Monsoon',
    months: 'Jul – Sep',
    path: 'M 60 300 C 130 260 150 200 220 210 C 290 220 300 160 370 150 C 440 140 470 190 540 170',
    note: 'Cats move higher into the hills as the plains flood and grass cover thickens.',
  },
  {
    id: 'winter',
    label: 'Winter',
    months: 'Nov – Feb',
    path: 'M 60 320 C 110 280 170 300 210 250 C 260 190 320 260 380 220 C 430 190 480 210 540 160',
    note: 'Peak sighting season — cool mornings keep leopards active later, closer to the dam.',
  },
  {
    id: 'summer',
    label: 'Summer',
    months: 'Apr – Jun',
    path: 'M 60 260 C 120 240 160 180 230 190 C 300 200 330 140 390 160 C 450 180 480 140 540 190',
    note: 'Heat pushes cats toward shaded caves and the reservoir edge in the afternoons.',
  },
];

export default seasons;
