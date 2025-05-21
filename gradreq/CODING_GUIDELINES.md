# GMS (Graduation Management System) - Kodlama Yönergeleri

Bu doküman, GMS projesinde tutarlı, okunabilir, bakımı kolay ve modüler kod yazmak için uyulması gereken temel kuralları ve en iyi uygulamaları içerir. "Cursor" AI kod asistanı da dahil olmak üzere tüm geliştiricilerin bu yönergelere uyması beklenir.

## 1. Genel Prensipler

1.  **Temiz Kod (Clean Code):** Kod, başkaları (ve gelecekteki kendiniz) tarafından kolayca anlaşılabilir olmalıdır. Açık, basit ve doğrudan çözümler tercih edilmelidir.
2.  **Tek Sorumluluk Prensibi (Single Responsibility Principle - SRP):** Her fonksiyon, bileşen veya modülün iyi tanımlanmış tek bir sorumluluğu olmalıdır.
3.  **Kendini Tekrar Etme (Don't Repeat Yourself - DRY):** Tekrarlayan kod bloklarından kaçının. Ortak mantığı yeniden kullanılabilir fonksiyonlara, hook'lara veya bileşenlere çıkarın.
4.  **Tutarlılık:** Proje genelinde isimlendirme, biçimlendirme ve yapısal yaklaşımlarda tutarlı olun.
5.  **Yorumlar:** Gerekli olduğunda, karmaşık mantığı veya "neden" böyle yapıldığını açıklayan yorumlar ekleyin. Kodun "ne" yaptığını açıklayan yorumlardan kaçının; kodun kendisi bunu ifade etmelidir.

## 2. Dosya ve Klasör Yapısı

- Proje, [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) (veya ilgili README dosyasına link) dosyasında detaylandırılan **Özellik Tabanlı (Feature-Based)** mimariyi takip eder.
- **`core` klasörü:** Uygulama genelinde paylaşılan, yeniden kullanılabilir mantık ve bileşenler için kullanılır.
- **`features` klasörü:** Uygulamanın ana işlevsel modüllerini içerir. Her özellik kendi alt klasörlerine (`components`, `pages`, `services`, `types` vb.) sahip olmalıdır.

## 3. İsimlendirme Kuralları

- **Klasörler:** `kebab-case` (örn: `auth-components`, `student-panel`) veya `camelCase` (örn: `authComponents`). Proje genelinde birini seçip tutarlı olun. (Öneri: `kebab-case`)
- **Genel Servisler:** `services/` altında gruplanır (örn: `apiService.ts`, `notificationService.ts`).
- **TypeScript Dosyaları (`.ts`):** `camelCase.ts` (örn: `exampleService.ts`, `validationUtils.ts`).
- **React Komponentleri (`.tsx`):** `PascalCase.tsx` (örn: `UserProfile.tsx`, `Header.tsx`).
- **CSS/Stil Dosyaları:** `ComponentName.module.css` (CSS Modülleri için) veya `kebab-case.css`.
- **Değişkenler ve Fonksiyonlar:** `camelCase` (örn: `userName`, `calculateGpa`).
- **Sabitler (Constants):** `UPPER_SNAKE_CASE` (örn: `MAX_LOGIN_ATTEMPTS`).
- **Sınıflar ve Arayüzler (Interfaces/Types):** `PascalCase` (örn: `class UserSession`, `interface StudentData`).
- **Boolean Değişkenler:** `is`, `has`, `should` gibi ön ekler kullanın (örn: `isLoggedIn`, `hasPermission`).
- **Event Handler Fonksiyonları:** `handle` ön eki ve ardından olay/element adı (örn: `handleSubmit`, `handleInputChange`).

## 4. React Bileşenleri

- **Fonksiyonel Bileşenler ve Hook'lar:** Sınıf bileşenleri yerine fonksiyonel bileşenler ve hook'lar (`useState`, `useEffect`, `useContext` vb.) kullanılmalıdır.
- **Props (Özellikler):**
  - TypeScript arayüzleri (`interface`) veya türleri (`type`) ile açıkça tanımlanmalıdır.
  - Props isimleri açıklayıcı olmalıdır.
  - Gereksiz prop drilling'den kaçının; `Context API` veya state yönetim kütüphaneleri (eğer kullanılıyorsa) değerlendirilmelidir.
  - Boolean prop'lar için varsayılan değer `false` ise, prop'u sadece `true` olduğunda belirtin (örn: `<Button primary />` yerine `<Button variant="primary" />` daha açık olabilir, ancak `<Modal isOpen />` gibi kullanımlar yaygındır).
- **State Yönetimi:**
  - Basit bileşen içi state için `useState` kullanın.
  - Karmaşık state mantığı için `useReducer` veya özel hook'lar değerlendirilebilir.
  - Global veya özellikler arası state paylaşımı için `AuthContext` gibi React Context'leri veya daha gelişmiş bir state yönetim kütüphanesi (ihtiyaç duyulursa) kullanılabilir.
- **JSX:**
  - Okunabilirlik için JSX içinde karmaşık JavaScript ifadelerinden kaçının. Gerekirse, render metodu dışında yardımcı değişkenlere veya fonksiyonlara çıkarın.
  - Koşullu render için `&&`, `||` veya ternari operatörleri (`condition ? <A /> : <B />`) ölçülü kullanılmalıdır. Çok karmaşık koşullar için render fonksiyonları veya değişkenler kullanılabilir.
  - Listeleri render ederken her zaman benzersiz bir `key` prop'u sağlayın.
- **Bileşen Boyutu:** Bileşenleri küçük ve odaklanmış tutun. Bir bileşen çok fazla sorumluluk üstleniyorsa veya çok büyüyorsa, onu daha küçük bileşenlere ayırmayı düşünün.
- **Yeniden Kullanılabilirlik:** Genel amaçlı UI elemanlarını (Button, Input, Card vb.) `src/core/components/ui/` altında, belirli bir özelliğe ait olmayan layout bileşenlerini `src/core/components/layout/` altında oluşturun. Özelliğe özgü bileşenler, ilgili özellik klasörünün `components` alt klasöründe yer almalıdır.

## 5. TypeScript

- **Katı Tür Tanımları (Strict Typing):** Mümkün olduğunca `any` türünden kaçının. Veri yapıları için arayüzler (`interface`) veya tür takma adları (`type`) kullanın.
- **Arayüz vs Tür (`interface` vs `type`):**
  - Nesne şekillerini veya sınıfların kontratlarını tanımlamak için `interface` kullanın.
  - Primitif türler, birleşimler (unions), kesişimler (intersections) veya karmaşık türler için `type` kullanın.
  - Tutarlılık önemlidir; projede bir standart benimseyin.
- **İsteğe Bağlı (Optional) ve Salt Okunur (Readonly) Özellikler:** Gerektiğinde `?` ve `readonly` anahtar kelimelerini kullanın.
- **Fonksiyon Türleri:** Fonksiyon parametreleri ve dönüş değerleri için tür tanımları yapın.
- **Enum'lar:** Sabit değer kümeleri için `enum` veya `as const` ile tanımlanmış nesneler kullanın. (Örn: `UserRole` enum'u `components/auth/types/index.ts` içinde tanımlanmış.)

## 6. Stil (Styling)

- Proje **Material-UI (MUI)** kullanmaktadır. MUI'nin tema ve stil yeteneklerinden (`sx` prop'u, `styled` API, `makeStyles`/`tss-react` vb.) faydalanın.
- Genel tema ayarları `src/core/styles/theme.ts` dosyasında tanımlanmıştır.
- Bileşene özgü stiller için MUI'nin `sx` prop'u veya `styled` API'si tercih edilebilir.
- Gerekirse, CSS Modülleri (`*.module.css`) de kullanılabilir.
- Global CSS (`index.css`) sadece en temel reset'ler veya genel sayfa stilleri için kullanılmalıdır.

## 7. Servisler (API Çağrıları)

- API istekleri, `src/features/[featureName]/services/` altındaki özel servis dosyalarında yönetilmelidir.
- `axios` veya `Workspace` API kullanılabilir. Projede `axios` kullanılıyor gibi görünüyor.
- İstek ve yanıtlar için tür tanımları yapılmalıdır.
- Hata yönetimi (error handling) ve yükleme durumları (loading states) uygun şekilde ele alınmalıdır.

## 8. State Yönetimi (Context API)

- `AuthContext` gibi React Context'leri, özellikler arasında veya global state paylaşımı için kullanılır.
- Context'leri gereksiz yere karmaşıklaştırmaktan kaçının. Sadece gerçekten paylaşılması gereken state'i içermelidirler.
- Performans etkilerini göz önünde bulundurun; sık güncellenen state için Context kullanmak yerine daha optimize çözümler (veya `useMemo`, `useCallback`) gerekebilir.

## 9. Yönlendirme (Routing)

- Uygulama yönlendirmesi `react-router-dom` ile `src/routes/AppRoutes.tsx` dosyasında merkezi olarak yönetilir.
- Lazy loading (`React.lazy` ve `Suspense`) sayfa yükleme performansını artırmak için kullanılır.

## 10. Hata Yönetimi (Error Handling)

- API çağrılarında, form gönderimlerinde ve diğer kritik işlemlerde uygun hata yönetimi yapılmalıdır.
- Kullanıcıya anlamlı hata mesajları gösterilmelidir (örn: MUI `Alert` bileşeni ile).
- Konsola geliştirme sırasında yardımcı olacak detaylı hatalar yazdırılabilir, ancak production'da kullanıcıya hassas bilgiler sızdırılmamalıdır.

## 11. Testler (Gelecek İçin)

- Birim testleri (Unit Tests) için Jest, React Testing Library gibi araçlar kullanılabilir.
- Entegrasyon testleri ve E2E testleri de projenin kalitesini artırmak için önemlidir.
- Kritik işlevler ve bileşenler için test yazılması hedeflenmelidir.

## 12. Linting ve Formatlama

- Projede **ESLint** ve **Prettier** (veya ESLint üzerinden formatlama) kullanılmalıdır.
- Mevcut ESLint yapılandırması (`eslint.config.js`) ve TypeScript yapılandırmaları (`tsconfig.json` vb.) projenin temelini oluşturur.
- Geliştiricilerin IDE'lerinde bu araçları aktif etmesi ve commit öncesi kodlarını lint edip formatlaması beklenir.

Bu yönergeler, projenin geliştirme sürecinde kaliteyi ve tutarlılığı sağlamak için bir başlangıç noktasıdır. Proje geliştikçe ve ihtiyaçlar değiştikçe bu yönergeler güncellenebilir.

```

```
