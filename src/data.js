export const initialSalons = [
  {
    id: 'atelier', name: 'Atelier Haar', city: 'Berlin', postcode: '10115', address: 'Invalidenstraße 32',
    tagline: 'Gute Haare. Gute Gespräche.', category: 'Modern & entspannt', rating: '4,9', reviews: 128,
    image: 'photo-1562322140-8baeececf3df', color: '#c5b49d', hours: { start: 9 * 60, end: 18 * 60 },
    staff: [
      { id: 'mia', name: 'Mia', role: 'Inhaberin · Schnitt & Styling', image: 'photo-1580489944761-15a19d654956', services: ['cut', 'wash', 'style', 'color'] },
      { id: 'leon', name: 'Leon', role: 'Stylist · Schnitt & Farbe', image: 'photo-1500648767791-00dcc994a43e', services: ['cut', 'wash', 'style', 'color'] },
      { id: 'nora', name: 'Nora', role: 'Stylistin · Schnitt & Styling', image: 'photo-1534528741775-53994a69daeb', services: ['cut', 'wash', 'style'] },
    ],
    services: [
      { id: 'cut', name: 'Haarschnitt', detail: 'Ein frischer Schnitt, der zu dir passt.', duration: 30, price: 35 },
      { id: 'wash', name: 'Haare waschen', detail: 'Pflege & eine kleine Kopfmassage.', duration: 15, price: 10 },
      { id: 'style', name: 'Föhnen & Styling', detail: 'Das Finish für deinen Look.', duration: 15, price: 15 },
      { id: 'color', name: 'Farbe & Pflege', detail: 'Neue Farbe inklusive Pflege.', duration: 90, price: 85 },
    ],
  },
  {
    id: 'studio', name: 'Studio Schnitt', city: 'Berlin', postcode: '10405', address: 'Prenzlauer Allee 18',
    tagline: 'Dein Look. Unser Handwerk.', category: 'Kreativ & persönlich', rating: '4,8', reviews: 94,
    image: 'photo-1600948836101-f9ffda59d250', color: '#b4b9a2', hours: { start: 10 * 60, end: 19 * 60 },
    staff: [
      { id: 'sam', name: 'Sam', role: 'Inhaber · Schnitt & Bart', image: 'photo-1506794778202-cad84cf45f1d', services: ['cut', 'wash', 'beard'] },
      { id: 'lina', name: 'Lina', role: 'Stylistin · Schnitt & Pflege', image: 'photo-1524504388940-b1c1722653e1', services: ['cut', 'wash'] },
    ],
    services: [
      { id: 'cut', name: 'Haarschnitt', detail: 'Individueller Schnitt mit Beratung.', duration: 45, price: 42 },
      { id: 'wash', name: 'Haare waschen', detail: 'Reinigung und wohltuende Pflege.', duration: 15, price: 12 },
      { id: 'beard', name: 'Bartpflege', detail: 'Konturen und Pflege für deinen Bart.', duration: 30, price: 22 },
    ],
  },
  {
    id: 'nord', name: 'Nord & Schere', city: 'Hamburg', postcode: '20357', address: 'Schanzenstraße 44',
    tagline: 'Ein bisschen Norden. Viel Gefühl.', category: 'Zeitlos & natürlich', rating: '4,9', reviews: 76,
    image: 'photo-1633681122611-7ff6b5d5843e', color: '#b9c2c6', hours: { start: 9 * 60, end: 17 * 60 },
    staff: [{ id: 'ella', name: 'Ella', role: 'Inhaberin · Schnitt & Styling', image: 'photo-1517841905240-472988babdf9', services: ['cut', 'wash', 'style'] }],
    services: [
      { id: 'cut', name: 'Haarschnitt', detail: 'Klassisch oder neu gedacht.', duration: 45, price: 45 },
      { id: 'wash', name: 'Haare waschen', detail: 'Sanfte Pflege für dein Haar.', duration: 15, price: 10 },
      { id: 'style', name: 'Föhnen & Styling', detail: 'Natürlich schön gestylt.', duration: 30, price: 25 },
    ],
  },
];
