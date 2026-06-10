# Medora - Mobil Uygulama (Hasta Paneli)

Medora mobil uygulaması, hastaların sağlık hizmetlerine ve eczane bilgilerine hızlı ve kolay bir şekilde erişmesini sağlayan, React Native ve Expo kullanılarak geliştirilmiş bir mobil platformdur.

## 📱 Özellikler

* **Kullanıcı Doğrulama (Auth):** Kayıt olma, giriş yapma ve güvenli oturum yönetimi.
* **Randevu Sistemi:**
  * Şehir, uzmanlık alanı ve tarihe göre doktor arama.
  * Doktorların puanlarını ve müsait saat dilimlerini (slot) görüntüleme.
  * Anlık randevu oluşturma ve randevu durumunu takip etme (bekliyor, onaylandı, iptal, tamamlandı).
* **Eczane ve Nöbetçi Eczane Haritası:**
  * Konum bazlı veya il/ilçe aramasıyla aktif eczaneleri harita üzerinde görüntüleme.
  * Mesai saatleri dışında (gece ve hafta sonları) **otomatik olarak nöbetçi eczaneleri** listeleme.
  * Seçili eczane için yol tarifi alma, arama yapma ve bilgileri paylaşma.
* **Geçmiş Randevular ve Puanlama:** 
  * Geçmiş randevuları listeleme.
  * Tamamlanan randevular sonrasında doktorları puanlama.
* **Profil Yönetimi:** Kullanıcı bilgilerini güncelleme.

## 🛠 Kullanılan Teknolojiler

* **Framework:** React Native, Expo
* **Navigasyon:** React Navigation (Tab ve Stack Navigasyon)
* **Harita Entegrasyonu:** React Native Maps
* **API İletişimi:** Fetch API / REST

## 📂 Proje Yapısı

Uygulamanın ana kodları `src` dizini altında organize edilmiştir:

```text
src/
├── constants/    # API URL'leri, renk paletleri ve sabit değerler
├── navigation/   # Uygulama içi yönlendirme (Stack ve Bottom Tab ayarları)
├── screens/      # Uygulama ekranları
│   ├── appointments/ # Randevu arama, saat seçimi ve detay ekranları
│   ├── auth/         # Giriş ve kayıt ekranları
│   ├── home/         # Ana sayfa ve özet paneli
│   ├── pharmacies/   # Eczane arama ve harita ekranı
│   └── profile/      # Kullanıcı profili ve geçmiş randevular/puanlama
└── services/     # API isteklerinin yönetildiği servis katmanı
```

## 🚀 Kurulum ve Çalıştırma

Uygulamayı lokal ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### Ön Koşullar
* Node.js (LTS sürümü önerilir)
* [Expo Go](https://expo.dev/client) uygulaması (Fiziksel cihazda test etmek için) veya Android Studio Emulator / iOS Simulator.
* **Önemli:** Mobil uygulamanın çalışabilmesi için öncelikle **Medora Backend** sunucusunun çalışır durumda olması gerekmektedir.

### Adımlar

1. **Bağımlılıkları Yükleyin:**
   Terminali `mobile` dizininde açın ve paketleri yükleyin:
   ```bash
   npm install
   ```

2. **API Bağlantısını Kontrol Edin:**
   Cihazınızın arka uca (backend) bağlanabilmesi için `src/constants/api.js` dosyasındaki `API_BASE_URL` adresinin, sunucunuzun çalıştığı IP adresine (veya localhost'a) doğru ayarlandığından emin olun.

3. **Uygulamayı Başlatın:**
   Expo sunucusunu başlatmak için aşağıdaki komutu çalıştırın:
   ```bash
   npx expo start
   ```

4. **Test Edin:**
   * **Fiziksel Cihaz:** Terminalde çıkan QR kodu telefonunuzdaki Expo Go uygulaması ile okutun.
   * **Emülatör:** Terminalde Android için `a` tuşuna veya iOS için `i` tuşuna basarak sanal cihazda açın.

## 🧪 Test Hesapları

Hazır veritabanı (seed) kullanıldığında giriş yapabileceğiniz bazı test hesapları:

* **E-posta:** `ahmet@medora.com`
* **Şifre:** `123456`

*(Diğer test kullanıcıları: `ayse@test.com`, `mehmet@test.com` vb. Şifre hepsinde `123456`)*
