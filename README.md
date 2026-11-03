# Exclusive

React va Tailwind CSS bilan tayyorlangan Figma uslubidagi do‘kon. Alohida backend yoki `api` papkasi yo‘q.

## Ishga tushirish

Node.js 20.19+ yoki 22.12+ bilan loyiha papkasida bajaring:

```bash
npm install
npm run dev
```

Production nusxa uchun:

```bash
npm run build
npm run preview
```

## Nimalar ishlaydi

- Sahifalar orasida o‘tish, mahsulot qidirish va saralash.
- Savatcha, wishlist, miqdorni o‘zgartirish va `EXCLUSIVE10` kuponi.
- O‘zbek, ingliz va rus tillari. Asosiy til — o‘zbekcha; tanlov brauzerda saqlanadi.
- Google va email/parol orqali kirish, sessiya va chiqish.
- Profil va buyurtmalar tarixini shu brauzerda saqlash.
- Mahsulot rasmlari statik: kichik rasmlarni bosganda katta rasm burilmaydi yoki kattalashmaydi.
- Headerdagi savatcha belgisi ustida mahsulot soni ko‘rsatilmaydi.

Savatcha, wishlist va kupon amallari popup chiqarmaydi. Forma xatolari o‘sha formaning ichida ko‘rsatiladi. Buyurtma uchun bitta qisqa xabar chiqadi: Telegramga yuborilgani yoki faqat brauzerda saqlangani aniq yoziladi.

## Google kirish

Mavjud Firebase web-sozlamalari `src/firebase.js` ichida tayyor. Google kirish uchun alohida `.env` fayli kerak emas. Firebase sessiyasini `src/AuthContext.jsx` boshqaradi.

Saytni boshqa domenga joylashtirganda shu domenni Firebase Console → Authentication → Settings → Authorized domains ichiga qo‘shing. Domen `https://` va yo‘lsiz yoziladi.

## Buyurtmalar va Telegram

Checkout `src/sendOrder.js` ichidagi funksiyani ishlatadi. Telegram sozlamalari bo‘lmasa, buyurtma brauzerda saqlanadi va savatcha bo‘shatiladi.

Telegramga ham yuborish uchun loyiha papkasidagi `.env.local` faylida quyidagi ikki qiymat bo‘lishi kerak:

```text
VITE_TELEGRAM_BOT_TOKEN=bot_tokeningiz
VITE_TELEGRAM_CHAT_ID=chat_id
```

Yangi tayyor ZIPga bot sozlamalari bilan `.env.local` ham qo‘shilgan. Uni loyiha papkasida qoldiring. Sozlamani o‘zgartirgandan keyin dev serverni qayta ishga tushiring. Bu frontend variantida token brauzer kodida ko‘rinadi.

Telegram sozlangan bo‘lsa, buyurtma to‘g‘ridan-to‘g‘ri Telegramga yuboriladi. Yuborish muvaffaqiyatsiz bo‘lsa, mahsulotlar savatchada qoladi. Haqiqiy onlayn to‘lov qo‘shilmagan. Contact formasi namuna sifatida ishlaydi.

## Vercel

Root Directory — `package.json` turgan papka, Framework — Vite, Build Command — `npm run build`, Output Directory — `dist`. Telegram kerak bo‘lsa, Vercel muhitiga ham ikkita `VITE_TELEGRAM_*` qiymatini kiriting va qayta deploy qiling. `vercel.json` ichki sahifalarni yangilashni qo‘llaydi.

## Fayllar

`App.jsx` sahifalarni ulaydi. Umumiy komponentlar `src/components`, sahifalar `src/pages` ichida.

```text
src/
  components/
    Header.jsx
    Footer.jsx
    Hero.jsx
    Countdown.jsx
    ProductCard.jsx
    ProductGrid.jsx
    CartTable.jsx
    BillingForm.jsx
    Breadcrumb.jsx
    Stars.jsx
    SectionTitle.jsx
    Services.jsx
    EmptyState.jsx
    BackToTop.jsx
  pages/
    Home.jsx
    Shop.jsx
    Product.jsx
    Wishlist.jsx
    Cart.jsx
    Checkout.jsx
    Contact.jsx
    About.jsx
    Account.jsx
    Auth.jsx
    NotFound.jsx
  App.jsx
  store.jsx
  utils.js
  sendOrder.js
```

Har bir komponent oddiy funksiya sifatida yozilgan. Masalan, savatcha sahifasi jadvalga mahsulotlar va miqdorni o‘zgartiradigan funksiyani props orqali beradi:

```jsx
<CartTable items={items} onQuantityChange={updateQty} />
```

`ProductGrid` har bir mahsulot uchun `ProductCard`ni ishlatadi. Header va Footer `App.jsx`da bir marta ulangan. `utils.js` rasm yo‘llari va narx formatini, `store.jsx` savatcha va wishlistni, `LanguageContext.jsx` va `translations.js` tillarni boshqaradi. Rasmlar `public/assets` ichida.

`npm test` tarjimalarni tekshiradi. Tekshiruv qaydlari `TESTING.md`, rasm va shrift manbalari `ASSET-CREDITS.md` ichida.
