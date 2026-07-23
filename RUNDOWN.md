# RUNDOWN — Integrasi Frame Template ke Photobooth

## 1. Kondisi Saat Ini

| Komponen | Status |
|---|---|
| `static/frames/` | 9 file SVG (600×1800) — background hitam solid `#0a0a0a`, dekorasi tepi (dots, lines, corner curves) |
| `templates.ts` | 28 template procedural — semua dekorasi pakai emoji via field `decor[]` |
| `canvas.ts` | Fungsi `createPhotoStrip()` **sudah punya param `frameSrc?`**, tapi tidak dipanggil |
| `photobooth.svelte.ts` | `applyTemplate()` set `stickers` dari `t.decor` — tidak ada field `frameSrc` di Template |
| Preview page | Panggil `createPhotoStrip()` tanpa argumen `frameSrc` |

## 2. Arsitektur Target

### 2.1 Flow Render Baru

```
1. Fill background              (bgColor dari template)
2. Draw photos + corner radius  (clip + drawImgFill)
3. Draw frame SVG overlay       →  DI ATAS foto (dekorasi tepi)
4. Draw stickers                →  DI ATAS frame
5. Header / footer text         →  DI ATAS semua
```

Frame SVG tidak boleh punya `rect` solid — hanya elemen dekoratif di tepi. Bagian tengah dibiarkan transparan agar foto dan background terlihat.

### 2.2 Dimensi Canvas

**4x1 layout:**
```
STRIP_W = 600px
PAD     = 28px
PHOTO_W = 544px (600 - 28*2)
PHOTO_H = 408px (544 * 3/4)
GAP     = 14px
HEADER  = 72px
FOOTER  = 44px
```

| Jumlah Foto | Tinggi Total |
|---|---|
| 1 | 72 + 408 + 44 = **524px** |
| 2 | 72 + 408 + 14 + 408 + 44 = **946px** |
| 3 | 72 + 408 + 14 + 408 + 14 + 408 + 44 = **1368px** |
| 4 | 72 + 408 + 14 + 408 + 14 + 408 + 14 + 408 + 44 = **1790px** |

**2x2 layout:**
```
innerW = (600 - 56 - 14) / 2 = 265px
innerH = 265 * 3/4 = 199px
```

| Jumlah Foto | Baris | Tinggi Total |
|---|---|---|
| 2 | 1 | 72 + 199 + 44 = **315px** |
| 4 | 2 | 72 + 199 + 14 + 199 + 44 = **528px** |

### 2.3 Persyaratan Frame SVG

- **Tidak boleh** punya `<rect>` background solid
- Hanya berisi elemen dekoratif: garis tepi, dots, corner curves, header ornament
- Dimensi mengikuti **salah satu ukuran di atas** (bervariasi per template)
- Area foto harus **transparan** — tidak ada elemen di area:
  - 4x1: `x=[28, 572]`, `y=[72, 72+PHOTO_H.x.count+GAP]`
  - 2x2: setiap cell `x=[28, 28+innerW]`, `y=[72, 72+innerH]` dengan spasi GAP

### 2.4 Jumlah File Frame yang Dibutuhkan

28 template → idealnya 28 file SVG (satu per template).

Tapi karena tinggi canvas hanya tergantung `(count, layout)` — cukup **6 varian tinggi:**

| Kelompok | Tinggi (px) | Jumlah Template |
|---|---|---|
| 1 foto, 4x1 | 524 | 7 |
| 2 foto, 4x1 | 946 | 4 |
| 2 foto, 2x2 | 315 | 3 |
| 3 foto, 4x1 | 1368 | 7 |
| 4 foto, 4x1 | 1790 | 4 |
| 4 foto, 2x2 | 528 | 3 |

Dalam 1 kelompok, frame bisa **berbagi ukuran kanvas** tapi desain dekorasi tepinya berbeda per template.

## 3. Step-by-Step Eksekusi

### FASE 1 — Edit Frame SVG (9 file existing)

**Goal:** Hapus solid background, simpan dekorasi tepi.

**File:** `static/frames/classic.svg`, `cinema.svg`, `forest.svg`, `moon.svg`, `ocean.svg`, `romance.svg`, `sunset.svg`, `vintage.svg`, `3foto-1.svg`

**Aksi per file:**
1. Baca SVG
2. Hapus baris: `<rect width="600" height="1800" fill="#0a0a0a"/>`
3. Simpan (ukuran 600×1800 tetap, tapi transparent bg)
4. Verifikasi: buka di browser, past cuma dekorasi tepi yang kelihatan

### FASE 2 — Tambah Field `frameSrc` ke Interface Template

**File:** `src/lib/utils/templates.ts`

```ts
export interface Template {
  id: string;
  name: { id: string; en: string };
  aspect: string;
  layout: Layout;
  count: 1 | 2 | 3 | 4;
  bg: string;
  border: string;
  filter: FilterId;
  desc: { id: string; en: string };
  decor: Decor[];
  frameSrc?: string;          // ← TAMBAH
}
```

Untuk 9 template yang punya SVG, isi `frameSrc: '/frames/classic.svg'` dst.
Untuk 19 template lainnya, biarkan `undefined` (fallback ke decor emoji).

### FASE 3 — Update Store

**File:** `src/lib/states/photobooth.svelte.ts`

Tambah field:
```ts
let frameSrc = $state<string | undefined>(undefined);
```

Update `applyTemplate()`:
```ts
frameSrc = t.frameSrc;
```

Export getter:
```ts
get frameSrc() { return frameSrc; },
```

### FASE 4 — Update Canvas Render Logic

**File:** `src/lib/utils/canvas.ts`

**4a.** Pindah render frame dari SEBELUM foto jadi SESUDAH foto.

Di `createPhotoStrip()`, untuk **4x1 layout:**
```
// SEBELUM (salah):
Pindahkan blok `if (frameImg)` dari baris 221-223
ke SETELAH loop foto (setelah baris 269)
```

Untuk **2x2 layout:**
```
// SEBELUM (salah):
Pindahkan blok `if (frameImg)` dari baris 142-144
ke SETELAH loop foto (setelah baris 179)
```

**4b.** Render frame dengan `ctx.drawImage()` — karena SVG transparan, foto di bawahnya akan terlihat.

### FASE 5 — Update Preview Page

**File:** `src/routes/preview/+page.svelte`

**5a.** Pass `frameSrc` ke `createPhotoStrip()`:
```ts
// baris 41
pb.generateStrip(await createPhotoStrip(
  pb.photos, '', pb.stripBg, pb.stripBorder,
  pb.layout, pb.stickers, pb.cornerRadius, pb.frameSrc
));
```

**5b.** Opsional: tampilkan frame SVG sebagai preview overlay di DOM (mirip cara decor emoji sekarang) — agar user lihat frame sebelum cetak.

### FASE 6 — Update Preview DOM (opsional tapi recommended)

**File:** `src/routes/preview/+page.svelte`

Agar frame terlihat di preview (sebelum generate), render SVG frame sebagai gambar overlay di atas div strip.

```svelte
{#if pb.frameSrc}
  <img
    src={pb.frameSrc}
    alt=""
    class="pointer-events-none absolute inset-0 z-10 w-full h-full object-cover"
  />
{/if}
```

Letakkan di dalam div strip, setelah foto loop, sebelum sticker layer.

### FASE 7 — Update Template Card (opsional)

**File:** `src/routes/template/+page.svelte`

Jika template punya `frameSrc`, tampilkan frame SVG sebagai preview di card template (menggantikan atau melengkapi decor emoji).

```svelte
{#if t.frameSrc}
  <img src={t.frameSrc} alt="" class="absolute inset-0 w-full h-full object-cover pointer-events-none" />
{/if}
```

### FASE 8 — Buat Frame Tambahan (jika perlu)

Untuk 19 template tanpa SVG, ada 2 opsi:
- **A:** Biarkan pakai decor emoji (seperti sekarang) — no frameSrc
- **B:** Buat SVG baru desain dari Canva — 19 file lagi

Rekomendasi: **Opsi A** dulu, tambah SVG bertahap.

### FASE 9 — Testing

| Test Case | Langkah |
|---|---|
| Template dengan frameSrc | Pilih template → preview → frame SVG muncul di atas foto |
| Template tanpa frameSrc | Pilih template → decor emoji masih jalan seperti biasa |
| 4x1 layout | 1,2,3,4 foto — tinggi canvas sesuai |
| 2x2 layout | 2 atau 4 foto — grid rapi |
| Ganti warna strip bg | Background tetap kelihatan di area transparan frame |
| Download result | Image PNG terdownload dengan frame + foto + stickers |

## 4. Dependency Graph

```
FASE 1  (edit SVG)
   │
   ▼
FASE 2  (tambah frameSrc di Template interface)
   │
   ▼
FASE 3  (tambah frameSrc di store)
   │
   ├────► FASE 4  (canvas render logic)
   │         │
   │         ▼
   ├────► FASE 5  (preview page → pass frameSrc)
   │
   ├────► FASE 6  (preview DOM overlay — optional)
   │
   └────► FASE 7  (template card — optional)
   
   FASE 8  (frame tambahan — optional)
   FASE 9  (testing)
```

## 5. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| SVG tidak tampil di canvas | `drawImage()` untuk SVG butuh CORS — pakai `img.crossOrigin = 'anonymous'` atau load dari `static/` (same-origin, aman) |
| SVG transparan tapi foto di bawah tidak rapi | Pastikan photo hole position di SVG cocok dengan posisi foto di canvas code. Cek `PHOTO_W`, `PHOTO_H`, `PAD`, `HEADER`, dll. |
| Tinggi SVG tidak cocok dengan totalH canvas | `ctx.drawImage(frameImg, 0, 0, STRIP_W, totalH)` — stretch otomatis. Pastikan aspect ratio proporsional. |
| Frame SVG menutupi header/footer text | Header/footer procedural HARUS di-draw SETELAH frame di canvas. Atau masukkan header/footer ke dalam SVG. |
| 3foto-1.svg ukuran 2.4MB | File terlalu besar untuk SVG — kemungkinan ada embedded data. Perlu di-optimasi atau di-export ulang. |
