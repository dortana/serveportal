import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import * as deepl from 'deepl-node';

const deeplClient = new deepl.DeepLClient(process.env.DEEPL_API_KEY!);

// Base file
const BASE_FILE = 'en-US.json';
const BASE_LANG = 'en';

// Folder path
const messagesPath = path.join(process.cwd(), 'src/messages');

// Auto-load target languages
const files = fs.readdirSync(messagesPath).filter(f => f.endsWith('.json'));
const TARGET_FILES = files.filter(f => f !== BASE_FILE);

console.log('🌍 Target language files:', TARGET_FILES);

// Detect XML/HTML tags
const containsTags = (str: string) => /<[^>]+>/.test(str);

// Placeholder helpers
const wrapPlaceholders = (str: string) =>
  str.replace(/\{[^}]+\}/g, m => `<ignore>${m}</ignore>`);

const unwrapPlaceholders = (str: string) => str.replace(/<\/?ignore>/g, '');

async function translateMissing() {
  const base = JSON.parse(
    fs.readFileSync(path.join(messagesPath, BASE_FILE), 'utf8'),
  );

  // COUNT ALL missing entries before doing anything
  let totalMissing = 0;

  for (const file of TARGET_FILES) {
    const targetPath = path.join(messagesPath, file);
    const target = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
    const missingKeys = Object.keys(base).filter(k => !target[k]);

    totalMissing += missingKeys.length;
  }

  console.log(`\n✨ Total new translations needed: ${totalMissing}\n`);

  if (totalMissing === 0) {
    console.log('🎉 Nothing to translate. Everything is up to date!');
    return;
  }

  // PROCESS EACH LANGUAGE
  for (const file of TARGET_FILES) {
    const targetPath = path.join(messagesPath, file);
    const target = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

    const langCode = file.split('.')[0].split('-')[0].toLowerCase();

    // Collect missing keys
    const missingKeys = Object.keys(base).filter(k => !target[k]);

    if (missingKeys.length === 0) {
      console.log(`✔ No missing keys for ${file}`);
      continue;
    }

    console.log(`🔍 Missing ${missingKeys.length} keys for ${file}`);

    // Wrap text for translation
    const textsToTranslate = missingKeys.map(key =>
      wrapPlaceholders(base[key]),
    );

    // Determine if ANY item contains tags or placeholders
    const anyHasTags = missingKeys.some(
      key => containsTags(base[key]) || /\{[^}]+\}/.test(base[key]),
    );

    const translationOptions = anyHasTags
      ? ({
          tagHandling: 'xml',
          ignoreTags: ['ignore'],
        } as deepl.TranslateTextOptions)
      : undefined;

    // 🚀 Batch translate (ONE DeepL CALL)
    const results = await deeplClient.translateText(
      textsToTranslate,
      BASE_LANG,
      langCode as deepl.TargetLanguageCode,
      translationOptions,
    );

    // Assign translations
    missingKeys.forEach((key, index) => {
      const translatedWrapped = results[index].text;
      const finalText = unwrapPlaceholders(translatedWrapped);
      target[key] = finalText;

      console.log(`➡️  ${key} → ${finalText}`);
    });

    // Save updated file
    fs.writeFileSync(targetPath, JSON.stringify(target, null, 2), 'utf8');
    console.log(`✔ Updated ${file}\n`);
  }

  console.log('✨ Translation sync complete (batch mode).');
}

translateMissing();
