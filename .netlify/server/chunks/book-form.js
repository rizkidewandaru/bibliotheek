import { a as categories } from "./categories.js";
import { d as driveIdFromUrl } from "./drive.js";
function readBookForm(form) {
  const text = (key) => String(form.get(key) ?? "").trim();
  const values = {
    judul: text("judul"),
    penulis: text("penulis"),
    tahun_terbit: text("tahun_terbit"),
    jumlah_halaman: text("jumlah_halaman"),
    penerbit: text("penerbit"),
    kategori: text("kategori"),
    sinopsis: text("sinopsis"),
    hak_cipta: text("hak_cipta"),
    drive: text("drive"),
    cover_url: text("cover_url"),
    unggulan: form.get("unggulan") === "on"
  };
  const errors = {};
  const maxYear = (/* @__PURE__ */ new Date()).getFullYear() + 1;
  if (!values.judul) errors.judul = "Judul wajib diisi.";
  if (!values.penulis) errors.penulis = "Penulis wajib diisi.";
  const tahun = Number(values.tahun_terbit);
  if (!Number.isInteger(tahun) || tahun < 1e3 || tahun > maxYear)
    errors.tahun_terbit = `Tahun terbit harus berupa angka 1000–${maxYear}.`;
  const halaman = Number(values.jumlah_halaman);
  if (!Number.isInteger(halaman) || halaman < 1)
    errors.jumlah_halaman = "Jumlah halaman harus berupa angka positif.";
  if (!categories.some((c) => c.slug === values.kategori))
    errors.kategori = "Pilih kategori.";
  let driveId = null;
  if (values.drive) {
    driveId = driveIdFromUrl(values.drive);
    if (!driveId) errors.drive = "Tempel link Google Drive yang valid atau ID berkasnya.";
  }
  if (values.cover_url && !/^https:\/\//.test(values.cover_url))
    errors.cover_url = "URL cover harus diawali https://";
  if (Object.keys(errors).length) return { values, errors, row: null };
  return {
    values,
    errors,
    row: {
      judul: values.judul,
      penulis: values.penulis,
      tahun_terbit: tahun,
      jumlah_halaman: halaman,
      penerbit: values.penerbit || null,
      kategori: values.kategori,
      sinopsis: values.sinopsis || null,
      hak_cipta: values.hak_cipta || null,
      unggulan: values.unggulan,
      drive_file_id: driveId,
      cover_url: values.cover_url || null
    }
  };
}
export {
  readBookForm as r
};
