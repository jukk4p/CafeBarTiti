'use server';
/**
 * @fileOverview A Genkit flow for extracting menu data (dish names, categories, prices, descriptions)
 * from images of a physical menu.
 *
 * - extractMenuData - A function that handles the menu data extraction process.
 * - ExtractMenuDataInput - The input type for the extractMenuData function.
 * - ExtractMenuDataOutput - The return type for the extractMenuData function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MenuItemSchema = z.object({
  id: z.string().describe('A unique identifier for the menu item, lowercase and kebab-case version of the name. e.g. "patatas_bravas".'),
  nombre: z.string().describe('The name of the dish.'),
  categoria: z.enum(['Desayunos', 'Tapas', 'Montaditos', 'Raciones', 'Bebidas', 'Otros']).describe('The category of the dish.'),
  precio: z.number().describe('The price of the dish.'),
  descripcion: z.string().describe('A concise description of the dish. If not explicitly found, infer one.'),
});

const ExtractMenuDataInputSchema = z.object({
  menuImages: z.array(z.string())
    .min(1)
    .describe(
      "An array of photo data URIs of the menu. Each URI must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractMenuDataInput = z.infer<typeof ExtractMenuDataInputSchema>;

const ExtractMenuDataOutputSchema = z.array(MenuItemSchema);
export type ExtractMenuDataOutput = z.infer<typeof ExtractMenuDataOutputSchema>;

export async function extractMenuData(input: ExtractMenuDataInput): Promise<ExtractMenuDataOutput> {
  return extractMenuDataFlow(input);
}

const extractMenuDataPrompt = ai.definePrompt({
  name: 'extractMenuDataPrompt',
  input: { schema: ExtractMenuDataInputSchema },
  output: { schema: ExtractMenuDataOutputSchema },
  prompt: `You are an expert menu data extractor. Your task is to accurately extract dish names, categories, prices, and descriptions from images of a restaurant menu.

Carefully analyze the provided menu images. For each menu item, extract the following information:
-   **nombre**: The exact name of the dish.
-   **categoria**: Assign each dish to one of the following categories: 'Desayunos', 'Tapas', 'Montaditos', 'Raciones', 'Bebidas', or 'Otros'. If a category is not explicitly mentioned but can be inferred from the dish name (e.g., 'Cerveza' -> 'Bebidas', 'Croquetas' -> 'Tapas'), use the inferred category. If unsure, use 'Otros'.
-   **precio**: The price of the dish as a numerical value.
-   **descripcion**: A short, concise description of the dish. If a description is not explicitly present, infer a brief, common description for that dish. Do not make up prices or names.
-   **id**: A unique identifier derived from the 'nombre'. It should be lowercase and kebab-case (e.g., "Patatas Bravas" -> "patatas_bravas").

If the menu is split across multiple images, combine all relevant items into a single list.

Return the extracted data as a JSON array of objects, strictly adhering to the provided schema.

Menu Images:
{{#each menuImages}}
  {{media url=this}}
{{/each}}
`,
});

const extractMenuDataFlow = ai.defineFlow(
  {
    name: 'extractMenuDataFlow',
    inputSchema: ExtractMenuDataInputSchema,
    outputSchema: ExtractMenuDataOutputSchema,
  },
  async (input) => {
    const { output } = await extractMenuDataPrompt({ menuImages: input.menuImages });
    if (!output) {
      throw new Error('Failed to extract menu data.');
    }
    return output;
  }
);
