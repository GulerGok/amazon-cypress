import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given("Ana sayfayı ziyaret et", () => {
  cy.visit("https://www.amazon.com.tr");
});

When("Arama kutusuna {string} yaz", (urunAdi) => {
  // Arama kutusuna ürün adı yazıp enter'a basıyoruz
  cy.get("#twotabsearchtextbox").type(urunAdi).type("{enter}");

  // Çerez kabul popup'ı varsa, görünür olana kadar bekle ve tıkla
  cy.xpath('//*[@id="sp-cc-accept"]', { timeout: 10000 }) // 10 saniye boyunca bekle
    .then(($el) => {
      if ($el.length > 0 && $el.is(':visible')) {  // Eğer öğe var ve görünürse
        cy.wrap($el).click();  // Popup'ı tıklayın
      } else {
        cy.log("Çerez popup'ı yok");  // Popup yoksa log at
      }
    });
});

Then("Arama sonuçlarının sayısını al ve doğrula", () => {
  // Sonuç metnini alıyoruz
  cy.get('span').contains('sonuç').invoke('text').then((text) => {
    // Sonuç metnindeki sayıyı çıkartıyoruz
    const numberOfElements = parseInt(text.match(/\d+/)[0], 10);
    cy.log('Sonuç sayısı: ' + numberOfElements);

    // Görünür öğeleri sayıyoruz
    cy.get('.s-result-list .sg-col-inner .s-widget-container')
      .filter(':visible') // Yalnızca görünür öğeleri say
      .should('have.length', numberOfElements);
  });
});
