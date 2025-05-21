namespace Domain.Enums;

public enum FileType
{
    UPLOADED_TRANSCRIPT_JSON = 1,            // Bölüm Sekreteri Tarafından Yüklenen JSON Transkript
    DECISION_LETTER_DEANS_OFFICE = 2,        // Dekanlık Ofisi Karar Yazısı
    INFORMATION_LETTER_TO_DEPT = 3,          // Bölümlere Gönderilen Bilgi Yazısı - ÖİDB Tarafından
    DIPLOMA_MAIN = 4,                        // Ana Diploma Belgesi
    DIPLOMA_CERTIFICATE_HONOUR = 5,          // Şeref Belgesi
    DIPLOMA_CERTIFICATE_HIGH_HONOUR = 6,     // Yüksek Şeref Belgesi
    STUDENT_LIST_EXPORTED = 7,               // Dışa Aktarılan Öğrenci Listesi
    ADVISOR_GRADUATION_REPORT = 8,           // Danışman Mezuniyet Uygunluk Raporu/Notu
    DISENGAGEMENT_FORM = 9,                  // İlişik Kesme Formu
    OTHER_DOCUMENT = 10                      // Diğer Belge Türleri
    // (Kapak Yazısı ile ilgili türler kaldırılmıştır.)
} 