# Sample Transcript CSV Files

Bu klasör, secretary transcript processing testi için hazırlanmış 5 adet sample CSV dosyası içerir. Bu dosyalar Seeds verilerinden oluşturulmuş ve farklı senaryoları test etmek için tasarlanmıştır.

## CSV Format

Tüm dosyalar aynı formatı kullanır:

```
Student ID,Student Name,Department,Course Code,Course Name,Grade,Credits,Semester,Course Type
```

## Sample Files

### 1. student_1_transcript.csv

- **Öğrenci:** 202400001 - Ahmet Yılmaz
- **Durum:** Normal, başarılı öğrenci
- **Özellikler:** Tüm zorunlu dersleri tamamlamış, yeterli teknik ve teknik olmayan seçmeli dersleri almış
- **Not ortalaması:** Yüksek (çoğunlukla AA, BA, BB notları)

### 2. student_2_transcript.csv

- **Öğrenci:** 202400002 - Elif Demir
- **Durum:** Ortalama performanslı öğrenci
- **Özellikler:** Zorunlu dersleri tamamlamış ancak daha düşük notlar
- **Not ortalaması:** Orta (çoğunlukla BB, CB, CC notları)

### 3. student_3_problematic.csv

- **Öğrenci:** 202400077 - Mehmet Sorunlu
- **Durum:** Problematik - Eksik zorunlu ders
- **Özellikler:** CENG 415 (Undergraduate Thesis and Seminar I) dersi eksik
- **Not ortalaması:** Düşük (çoğunlukla DC, DD, CC notları)
- **Test amacı:** Eksik zorunlu ders senaryosunu test etmek

### 4. student_4_low_credits.csv

- **Öğrenci:** 202400079 - Fatma Az-Kredi
- **Durum:** Problematik - Yetersiz kredi
- **Özellikler:** İyi notlar ancak yeterli seçmeli ders almamış (toplam kredi < 240)
- **Not ortalaması:** İyi (çoğunlukla AA, BA, BB notları)
- **Test amacı:** Kredi eksikliği senaryosunu test etmek

### 5. student_5_excellent.csv

- **Öğrenci:** 202400005 - Zeynep Başarılı
- **Durum:** Mükemmel öğrenci
- **Özellikler:** Tüm gereksinimleri karşılar, mükemmel notlar
- **Not ortalaması:** Çok yüksek (çoğunlukla AA notları)
- **Test amacı:** İdeal mezuniyet adayı senaryosunu test etmek

## Test Senaryoları

Bu CSV dosyaları secretary transcript processing sayfasında aşağıdaki senaryoları test etmek için kullanılabilir:

1. **Normal Upload:** Başarılı transcript yükleme ve parse etme
2. **Graduation Eligibility Check:** Mezuniyet uygunluğunu kontrol etme
3. **Missing Requirements Detection:** Eksik ders/kredi tespiti
4. **GPA Calculation:** Not ortalaması hesaplama
5. **Course Type Classification:** Ders tiplerini ayırt etme

## Kullanım

1. Secretary Dashboard'a giriş yapın
2. Transcript Processing sayfasına gidin
3. Bu CSV dosyalarından birini seçin ve upload edin
4. Parse sonuçlarını ve mezuniyet uygunluk raporunu inceleyin

Bu dosyalar, sistem testleri ve demo amaçlı kullanılmak üzere hazırlanmıştır.
