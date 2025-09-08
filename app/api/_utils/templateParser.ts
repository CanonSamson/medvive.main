import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// Proper way to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const parseTemplate = (templateName: string, placeholders: any) => {
  const templatePath = path.join(
    __dirname,
    "../../../app/api/_email-templates",
    `${templateName}.html`
  );
  let template = fs.readFileSync(templatePath, "utf-8");

  // Replace placeholders in the template
  Object.keys(placeholders).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    template = template.replace(regex, placeholders[key]);
  });

  return template;
};
