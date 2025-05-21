```markdown
# GMS (Graduation Management System) - Proje ve Modül Yapısı

Bu doküman, GMS projesinin dosya ve klasör yapısını, benimsenen modülerlik yaklaşımını ve temel tasarım prensiplerini açıklamaktadır. Amaç, projenin anlaşılırlığını artırmak, yeni geliştiricilerin adaptasyonunu hızlandırmak ve kod tabanının bakımını kolaylaştırmaktır.

## Genel Yaklaşım: Özellik Tabanlı (Feature-Based) Mimari

Proje, **Özellik Tabanlı (Feature-Based)** bir mimari yaklaşımı benimsemektedir. Bu yaklaşımda, uygulamanın ana işlevsel alanları veya kullanıcı rolleri (`auth`, `student`, `secretary` vb.) ayrı modüller (features) olarak ele alınır. Her modül, kendi içinde ilgili bileşenleri, sayfaları, servisleri, tür tanımlarını ve diğer kaynakları barındırır.

## Ana Klasör Yapısı
```

src/
├── App.tsx \# Ana uygulama bileşeni, yönlendirme ve tema sağlayıcılarını içerir
├── main.tsx \# Uygulamanın giriş noktası (React DOM render)
├── index.css \# Global CSS stilleri (minimal düzeyde tutulmalı)
├── core/ \# Proje genelinde paylaşılan, yeniden kullanılabilir modüller ve araçlar
│ ├── assets/ \# Genel statik varlıklar (logolar, ikonlar vb.)
│ ├── components/ \# Genel UI bileşenleri ve layout'lar
│ │ ├── layout/ \# Genel sayfa düzeni bileşenleri (örn: DashboardLayout)
│ │ └── ui/ \# Temel, atomik UI bileşenleri (Button, Input, Modal vb.)
│ ├── contexts/ \# Proje genelinde kullanılacak React Context'leri
│ ├── hooks/ \# Genel custom React Hook'ları
│ ├── services/ \# Genel API servisleri veya yardımcıları (nadiren kullanılır, genellikle özelliğe özgüdür)
│ ├── styles/ \# Tema tanımları, global stil değişkenleri
│ │ └── theme.ts
│ ├── types/ \# Genel TypeScript tür tanımları ve arayüzleri
│ └── utils/ \# Genel yardımcı fonksiyonlar ve sabitler
├── features/ \# Uygulamanın ana özellik modülleri
│ ├── auth/ \# Kimlik doğrulama işlemleri modülü
│ │ ├── components/ \# Kimlik doğrulamaya özel bileşenler (LoginForm, RegisterForm vb.)
│ │ ├── contexts/ \# Kimlik doğrulamaya özel context'ler (örn: AuthContext)
│ │ ├── hooks/ \# Kimlik doğrulamaya özel hook'lar
│ │ ├── pages/ \# Kimlik doğrulama sayfaları (LoginPage, RegisterPage vb.)
│ │ ├── services/ \# Kimlik doğrulama API çağrıları
│ │ └── types/ \# Kimlik doğrulamaya özel tür tanımları
│ ├── student/ \# Öğrenci paneli modülü
│ │ ├── components/ \# Öğrenci paneline özel bileşenler
│ │ ├── layout/ \# Öğrenci paneline özel layout (StudentDashboardLayout)
│ │ ├── pages/ \# Öğrenci paneli sayfaları (StudentDashboardPage, TranscriptPage vb.)
│ │ ├── services/ \# Öğrenci ile ilgili API servisleri
│ │ └── types/ \# Öğrenci ile ilgili tür tanımları
│ ├── secretary/ \# Sekreter paneli modülü
│ │ └── ... \# (auth ve student modüllerine benzer bir iç yapı)
│ └── admin/ \# (Opsiyonel) Yönetici paneli modülü
│ └── ... \# (auth ve student modüllerine benzer bir iç yapı)
├── routes/ \# Uygulama yönlendirme (routing) yapılandırması
│ └── AppRoutes.tsx \# Ana yönlendirme bileşeni
└── vite-env.d.ts \# Vite ortam değişkenleri için TypeScript tanımları (veya core/types altına taşınabilir)

```

## Temel Prensipler

1.  **Modülerlik:** Her özellik (`feature`) kendi içinde bağımsız bir birim gibi düşünülür. Bu, geliştirme ve bakımı kolaylaştırır.
2.  **Sorumlulukların Ayrılması (Separation of Concerns):**
    * **`core` Klasörü:** Uygulamanın herhangi bir yerinde kullanılabilecek, belirli bir özelliğe bağlı olmayan genel amaçlı kodları içerir.
    * **`features` Klasörü:** Uygulamanın belirli işlevsel bölümlerini içerir. Bir özelliğe ait kodlar (bileşenler, servisler, türler vb.) mümkün olduğunca o özelliğin klasörü içinde tutulur.
    * **Sayfalar (`pages`):** Genellikle bir URL'ye karşılık gelen, birden fazla bileşeni bir araya getiren ve sayfanın genel yapısını oluşturan konteyner bileşenleridir. Özellik klasörleri içinde bulunurlar.
    * **Bileşenler (`components`):** Yeniden kullanılabilir UI parçalarıdır. Hem `core` altında (genel bileşenler) hem de özellik klasörleri altında (özelliğe özgü bileşenler) bulunabilirler.
    * **Servisler (`services`):** API istekleri gibi dış dünya ile etkileşimleri yönetirler. Genellikle özelliğe özgüdürler.
    * **Context'ler (`contexts`):** Global veya özelliğe özgü state yönetimini sağlarlar.
    * **Hook'lar (`hooks`):** Tekrarlayan mantık parçalarını soyutlamak ve yeniden kullanılabilir hale getirmek için kullanılırlar.
    * **Türler (`types`):** TypeScript tür tanımlarını içerirler.
3.  **İsimlendirme Kuralları:**
    * Dosya ve klasör isimleri `kebab-case` veya `PascalCase` (bileşenler için) olabilir. Tutarlılık önemlidir. (Bu projede `PascalCase` bileşenler için, diğerleri için `camelCase` veya `kebab-case` tercih edilebilir. CODING_GUIDELINES'da netleştirilmeli.)
    * Bileşen dosyaları `.tsx`, diğer TypeScript dosyaları `.ts` uzantılı olmalıdır.
4.  **İçe Aktarma Yolları (Imports):**
    * Mümkün olduğunca göreceli (relative) importlar yerine mutlak (absolute) importlar (örneğin, `@/features/auth/components/LoginForm`) tercih edilir. Bu, `tsconfig.json` içinde `baseUrl` ve `paths` ayarları ile yapılandırılabilir. (Mevcut projede bu ayar yok gibi, eklenebilir.)

## Yeni Bir Özellik (Feature) Eklemek

1.  `src/features` altında yeni bir klasör oluşturun (örn: `src/features/new-feature`).
2.  Bu klasörün içine gerekli alt klasörleri (`components`, `pages`, `services`, `types` vb.) ekleyin.
3.  Özelliğe ait kodları bu yapı içinde geliştirin.
4.  Gerekirse, yeni sayfaları `src/routes/AppRoutes.tsx` dosyasına ekleyin.
5.  Eğer özellik genel bir state veya context kullanıyorsa, bunu `src/core/contexts` altında tanımlayabilir veya özelliğe özgü ise kendi `contexts` klasöründe tutabilirsiniz.

Bu yapı, projenin büyümesiyle birlikte esneklik ve yönetilebilirlik sağlamayı hedefler.
```
