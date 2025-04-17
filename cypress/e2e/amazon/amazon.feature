Feature: Amazon Ürün Arama

  Scenario: Ana sayfayı ziyaret et
    Given Ana sayfayı ziyaret et

  Scenario: Arama kutusuna ürün yaz
    When Arama kutusuna "alcatel 2057d" yaz

  Scenario: Arama sonuçlarını doğrula
    Then Arama sonuçlarının sayısını al ve doğrula
