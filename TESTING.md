# Tekshiruv — 2026-11-03

Amaldagi ochiq nusxadagi tuzatish:

- Vite jarayoni `outputs/exclusive-components`dan, 5173 portida ishlayotgani aniqlandi. Shu nusxada eski galereya kodi va yo‘q `.env.local` sababli oldingi o‘zgarishlar ishlamayotgan edi.
- Faqat farq qilgan olti source fayli yangilandi, Telegram sozlamalari shu papkaga ham kiritildi. Boshqa source fayllari saqlandi.
- Amaldagi server bergan JS modulda Telegram sozlamalari yuklangani qiymatlarni chiqarmasdan tekshirildi.
- 5173 dagi saytda to‘rtta rasmni bosganda asosiy rasm manzili o‘zgarmadi, transform `none`, galereya tugmalari soni 0.
- Mahsulot savatchaga qo‘shilgandan keyin ham headerdagi savatcha badge soni 0. Savatcha jadvalida mahsulot borligi tekshirildi.
- Amaldagi va asosiy nusxalarning production buildlari o‘tdi. Brauzer konsolida xato yo‘q.
- Oldingi tasdiqlangan bitta haqiqiy Telegram sinovi 200 javobi bilan qabul qilingan, message ID 9; foydalanuvchi xabar kelganini tasdiqlagan. Bu tuzatishda qo‘shimcha xabar yuborilmadi.

Telegram va galereya yangilanishi:

- Kichik mahsulot rasmlari oddiy statik bloklarga almashtirildi. Bosilgandan oldin va keyin katta rasm manzili bir xil, transform esa `none`. Galereyada rasm almashtiruvchi tugma qolmadi.
- 390 px ekranda ham to‘rtta rasmning transformi `none`, gorizontal overflow yo‘q.
- Telegram bot va chat `getMe`/`getChat` orqali qayta tekshirildi: ikkalasi ham ishlayapti.
- Yetkazish va faqat lokal saqlash javoblari alohida belgilandi. Sinov javoblarida muvaffaqiyatli Telegram yetkazilishi `telegramSent: true`, sozlamasiz saqlash esa `false` qaytardi. Yuborish xatosi muvaffaqiyat sifatida qaytmadi.
- Production build, tarjima testi va statik tekshiruv o‘tdi.
- Tayyor ZIPga faqat ikki Telegram sozlamasini saqlaydigan `.env.local` qo‘shildi. Alohida backend yoki `api` papkasi qo‘shilmadi.

Komponentlarga ajratilgandan keyingi tekshiruv:

- 14 ta komponent `src/components`ga, 11 ta sahifa moduli `src/pages`ga ajratildi. Signup va login bitta `Auth` sahifasidan foydalanadi.
- `CartTable` mahsulotlar va miqdor callbackini, `BillingForm` saqlangan ma’lumotlar va profilni props orqali oladi.
- Production build, tarjima testi va rekursiv statik tekshiruv o‘tdi.
- Barcha 12 yo‘l desktopda o‘zbek tilida va 390 px ekranda rus tilida ochildi. Buzilgan yuklangan rasm yoki gorizontal overflow topilmadi. Desktopda har bir sahifada bittadan Header va Footer borligi tekshirildi.
- Hero slaydi, ProductCard orqali savatcha va wishlist, wishlistdan olib tashlash, CartTable orqali miqdor va kupon hisoblari tekshirildi: $240 → $216.
- BillingForm orqali sozlamasiz sinov buyurtmasi saqlandi va savatcha bo‘shadi. Faqat bitta tasdiq toast chiqdi. Sinov serverida Telegram yuborish o‘chirilgan edi.
- Mobil menyu Contact sahifasiga o‘tdi va yopildi. Google tugmasi sessiya tekshiruvidan keyin yoqildi. Brauzer konsolida xato topilmadi.

Oldingi tekshiruvlar:

- `npm test`: tarjimalar tekshiruvi o‘tdi.
- `npm run build`: production nusxa yig‘ildi.
- Statik tekshiruvda yetishmagan tarjima yoki aniqlanmagan o‘zgaruvchi topilmadi.
- Brauzerda mahsulotni savatchaga va wishlistga qo‘shish tekshirildi. Popup chiqmadi, hisoblagichlar yangilandi.
- Miqdor va kupon tekshirildi: 2 × $120 = $240; `EXCLUSIVE10` bilan jami $216. Popup chiqmadi.
- Telegram sozlamalarisiz checkout tekshirildi: buyurtma tarixga saqlandi, savatcha bo‘shadi va faqat “Buyurtma saqlandi!” xabari chiqdi. Konfiguratsiya xatosi chiqmadi.
- Bo‘sh checkout formasi xatoni formaning ichida ko‘rsatdi; error toast chiqmadi.
- 390 px ekranda rus tilidagi login, contact va profil validatsiyasi tekshirildi. Xatolar formaning ichida ko‘rindi, gorizontal overflow va toast bo‘lmadi.
- Obuna formasi kuponni footerning o‘zida ko‘rsatdi.
- Sinov paytida brauzer konsolida xato topilmadi.
- Google kirish tugmasi yoqilgan, avtomatik konfiguratsiya xabari yo‘q. `src/firebase.js` ichidagi web-sozlamalar avval tekshirilgan Firebase loyihasi bilan bir xil.
- Google orqali haqiqiy kirish, ism/rasm, refreshdan keyin sessiya va logout oldingi tekshiruvda ishlagan. Ushbu o‘zgarishda qayta OAuth kirish bajarilmadi.
- Telegram funksiyasining sozlamasiz ishlashi, kuponi, xabar tarkibi va yuborish xatolari sinov javoblari bilan tekshirildi. Haqiqiy buyurtma xabari jo‘natilmadi. Bot va chatning mavjudligi oldingi `getMe`/`getChat` tekshiruvida tasdiqlangan.

Alohida backend va `api` papkasi yo‘q. Google kirish Firebasega, sozlangan Telegram buyurtmasi Telegramga brauzerdan ulanadi.

Avvalgi tekshiruvlarda barcha 12 sahifa uch tilda, mobil va desktop o‘lchamlarida ko‘rilgan. Rasmlar WebP, shriftlar WOFF2 formatiga o‘tkazilgan. Yangi Lighthouse bali o‘lchanmagan. Vercelga deploy qilinmagan.
