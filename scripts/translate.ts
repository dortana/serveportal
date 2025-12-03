import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import * as deepl from 'deepl-node';

const authKey = process.env.DEEPL_API_KEY!;
export const deeplClient = new deepl.DeepLClient(authKey);

// Base file
const BASE_FILE = 'en-US.json';
const BASE_LANG = 'en';

// Folder path
const messagesPath = path.join(process.cwd(), 'src/messages');

// Auto-load all target languages
const files = fs.readdirSync(messagesPath).filter(f => f.endsWith('.json'));
const TARGET_LANGS = files
  .filter(f => f !== BASE_FILE)
  .map(f => f.split('.')[0].split('-')[0].toLowerCase());

console.log('🌍 Target languages:', TARGET_LANGS);

// Detect if value contains any XML/HTML tag
function containsTags(str: string) {
  return /<[^>]+>/.test(str);
}

// Protect placeholders (e.g. {name})
function wrapPlaceholders(str: string) {
  return str.replace(/\{[^}]+\}/g, m => `<ignore>${m}</ignore>`);
}
function unwrapPlaceholders(str: string) {
  return str.replace(/<\/?ignore>/g, '');
}

async function translateMissing() {
  const base = JSON.parse(
    fs.readFileSync(path.join(messagesPath, BASE_FILE), 'utf8'),
  );

  for (const lang of TARGET_LANGS) {
    const langFile = files.find(f => f.toLowerCase().startsWith(lang))!;
    const targetPath = path.join(messagesPath, langFile);
    const target = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

    let updated = false;

    for (const key of Object.keys(base)) {
      if (!target[key]) {
        const sourceText = base[key];
        console.log(`🔍 Missing in ${lang}: ${key}`);

        const hasTags =
          containsTags(sourceText) || /\{[^}]+\}/.test(sourceText);

        // Wrap placeholders
        const wrapped = wrapPlaceholders(sourceText);

        // Choose mode depending on content
        const translationOptions = hasTags
          ? ({
              tagHandling: 'xml',
              ignoreTags: ['ignore'] as string[],
            } as const)
          : undefined;

        const result = await deeplClient.translateText(
          wrapped,
          BASE_LANG,
          lang as deepl.TargetLanguageCode,
          translationOptions,
        );

        const translatedText = Array.isArray(result)
          ? result[0].text
          : result.text;

        const finalText = unwrapPlaceholders(translatedText);

        target[key] = finalText;
        updated = true;

        console.log(`➡️ "${sourceText}" → "${finalText}"`);
      }
    }

    if (updated) {
      fs.writeFileSync(targetPath, JSON.stringify(target, null, 2), 'utf8');
      console.log(`✔ Updated ${langFile}`);
    }
  }

  console.log('✨ Translation sync complete');
}

translateMissing();
