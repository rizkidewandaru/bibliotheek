const categories = [
  {
    slug: "katalog-koleksi",
    title: "Katalog Koleksi",
    short: "KOLEKSI",
    description: "Publikasi yang mendokumentasikan benda koleksi museum beserta identitas, bahan, dan konteks budayanya.",
    icon: "collection"
  },
  {
    slug: "katalog-pameran",
    title: "Katalog Pameran",
    short: "PAMERAN",
    description: "Katalog pendamping pameran tetap maupun temporer, memuat narasi kurasi dan karya yang dipamerkan.",
    icon: "exhibition"
  },
  {
    slug: "kajian-penelitian",
    title: "Kajian dan Penelitian Koleksi",
    short: "KAJIAN",
    description: "Hasil kajian, penelitian, dan konservasi atas koleksi sebagai rujukan peneliti, pendidik, dan masyarakat.",
    icon: "research"
  }
];
function getCategory(slug) {
  return categories.find((c) => c.slug === slug) ?? categories[0];
}
function categoryHref(slug) {
  return `/katalog?kategori=${slug}`;
}
export {
  categories as a,
  categoryHref as c,
  getCategory as g
};
