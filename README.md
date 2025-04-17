# 🧪 Cypress + Cucumber + Allure Integration

Bu proje, **Cypress 11.2**, **Cucumber (BDD)** ve **Allure Raporlama** sistemlerinin birlikte çalıştığı modern bir test otomasyon altyapısı sunar.

## 🔧 Kurulum

### 1. Bağımlılıkları yükle

```sql
npm install --legacy-peer-deps
```

🚀 Testleri Çalıştır
Tüm testleri terminal üzerinden çalıştırmak için:
```sql
npx cypress run
```

Cypress GUI ile testleri çalıştırmak için:
```sql
npx cypress open
```
📊 Allure Raporu Oluşturma
Test çalıştıktan sonra Allure raporunu oluştur ve GUI ile görüntüle:
```sql
npx allure generate allure-results --clean && npx allure open
```

📁 Dosya Yapısı
```sql
project-root/
│
├── cypress/
│   ├── e2e/                  # .feature dosyaları ve step definitions
│   ├── support/              # e2e.js, custom commands, vs.
│
├── allure-results/          # Allure test sonuçları
├── cypress.config.js        # Cypress ayarları
└── package.json
```

⚙️ Cypress Config
cypress.config.js içeriği:

```sql
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    env: {
      allureResultsPath: "allure-results",
    },
    setupNodeEvents: async (on, config) => {
      await addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));
      allureWriter(on, config);
      return config;
    },
  },
});
```

📦 Kullanılan Paketler
cypress

@badeball/cypress-cucumber-preprocessor

@shelex/cypress-allure-plugin

allure-commandline

@bahmutov/cypress-esbuild-preprocessor

esbuild

✅ Notlar
.feature dosyalarınızı cypress/e2e/ klasörüne yerleştirin.

Allure çıktıları allure-results/ klasörüne kaydedilir.

allure-results klasörü .gitignore içinde olmalıdır.

📃 Lisans
MIT





