import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obtém o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminhos para os arquivos
const packageJsonPath = path.join(__dirname, "../package.json");
const appInfoPath = path.join(__dirname, "../src/shared/utils/appInfo.ts");

// Lê a versão do package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const version = packageJson.version;
const appName = "Lista de Tarefas"; // Nome mais amigável

// Data atual no formato brasileiro
const currentDate = new Date().toLocaleDateString("pt-BR");

// Lê o conteúdo atual do arquivo
let content = fs.readFileSync(appInfoPath, "utf8");

// Substitui as informações
content = content.replace(
  /export const APP_NAME = ".*";/,
  `export const APP_NAME = "${appName}";`
);

content = content.replace(
  /export const APP_VERSION = ".*";/,
  `export const APP_VERSION = "${version}";`
);

content = content.replace(
  /export const BUILD_DATE = ".*";/,
  `export const BUILD_DATE = "${currentDate}";`
);

// Escreve o arquivo atualizado
fs.writeFileSync(appInfoPath, content);

console.log(`✅ Informações atualizadas:`);
console.log(`   Nome: ${appName}`);
console.log(`   Versão: ${version}`);
console.log(`   Data de build: ${currentDate}`);
