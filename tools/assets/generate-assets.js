#!/usr/bin/env node

/**
 * MiniMax Image Generation Asset Script
 *
 * Generates game assets using MiniMax's image generation API.
 * Usage: node generate-assets.js --prompt "description" --output path [--api-key KEY]
 *
 * Or configure API_KEY in environment or .env file.
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

// ============================================================================
// CONFIGURATION
// ============================================================================

const API_ENDPOINT = 'https://api.minimax.io/v1/image_generation';
const MODEL = 'image-01';
const DEFAULT_ASPECT_RATIO = '1:1';
const DEFAULT_SIZE = 1024;

// Asset categories and their prompts for the lunar colony game
// STRICT PIXEL ART STYLE: 16x16 or 32x32, 8-bit/16-bit aesthetic, limited color palette (4-8 colors), CRISP PIXELS, transparent backgrounds
const ASSET_MANIFEST = {
  resources: [
    { name: 'ice', prompt: '16x16 pixel art ice crystal, pure pixel art style, 8-bit aesthetic, limited 4-color cyan palette, transparent background, crisp hard edges, no anti-aliasing, no gradients, game sprite, Minecraft ice block style' },
    { name: 'water', prompt: '16x16 pixel art water drop, pure 8-bit pixel art, limited blue palette, transparent background, crisp pixels, no smoothing, classic game sprite style' },
    { name: 'lunar-wheat', prompt: '16x16 pixel art wheat stalk, 8-bit pixel art, limited gold/brown palette, transparent background, crisp pixels, agricultural crop sprite' },
    { name: 'bread', prompt: '16x16 pixel art bread loaf, 8-bit pixel art, warm browns and golds, transparent background, crisp pixels, no anti-aliasing' },
    { name: 'solar-energy', prompt: '16x16 pixel art energy orb, 8-bit pixel art, yellow orange amber, transparent background, glowing center, crisp pixels, power-up sprite style' },
    { name: 'credits', prompt: '16x16 pixel art coin, 8-bit pixel art, purple pink holographic shimmer, transparent background, crisp pixels, shiny metallic' },
  ],
  buildings: [
    { name: 'ice-drill', prompt: '32x32 pixel art ice drilling machine, 16-bit sprite style, limited cyan silver palette, transparent background, industrial sci-fi, crisp pixels, idle animation frame, top-down view' },
    { name: 'water-extractor', prompt: '32x32 pixel art water extractor building on transparent background, PNG with alpha channel, no white, pipes and tanks, crisp pixels, top-down game sprite' },
    { name: 'biodome', prompt: '32x32 pixel art biodome greenhouse, 16-bit sprite, limited green clear palette, transparent background, glass dome with plants inside, crisp pixels, top-down' },
    { name: 'bakery', prompt: '32x32 pixel art space bakery, 16-bit sprite, limited warm orange brown palette, transparent background, cozy building, crisp pixels, top-down' },
    { name: 'solar-panel', prompt: '32x32 pixel art solar panel array on transparent background, PNG with alpha channel, no white, golden panels, crisp pixels, top-down game sprite' },
    { name: 'shop', prompt: '32x32 pixel art lunar trading post, 16-bit sprite, limited purple cyan palette, transparent background, holographic sign, crisp pixels, top-down' },
  ],
  plots: [
    { name: 'plot-empty', prompt: '16x16 pixel art empty plot tile, 8-bit style, dark gray lunar soil, subtle pixel texture, transparent background, crisp pixels, buildable area indicator' },
    { name: 'plot-growing', prompt: '16x16 pixel art growing plant, 8-bit sprite, tiny green sprout, limited 3-color palette, transparent background, early growth stage, crisp pixels' },
    { name: 'plot-ready', prompt: '16x16 pixel art harvest ready plant, 8-bit sprite, full grown with sparkle pixels around, golden glow, limited palette, transparent background, crisp pixels' },
  ],
  ui: [
    { name: 'lunar-ground', prompt: '16x16 pixel art lunar ground tile on transparent background, PNG alpha channel, no white, dark gray regolith, seamless tileable, top-down view, pure game tile' },
    { name: 'starfield-bg', prompt: '16x16 pixel art starry space background tile, 8-bit style, dark purple blue sky with tiny white star pixels, LIMITED 4-COLOR PALETTE, seamless tileable, transparent background, cosmic void atmosphere' },
    { name: 'ui-icon-ice', prompt: '16x16 pixel art ice resource icon, 8-bit sprite, cyan blue chunk, transparent background, HUD interface element, crisp pixels, limited palette' },
    { name: 'ui-icon-energy', prompt: '16x16 pixel art energy icon, 8-bit sprite, yellow orange orb, transparent background, HUD interface element, crisp pixels, limited palette' },
  ]
};

// ============================================================================
// API CALL
// ============================================================================

/**
 * Generate image using MiniMax API
 * @param {string} prompt - Image description
 * @param {string} aspectRatio - Aspect ratio (e.g., "1:1", "16:9")
 * @param {string} apiKey - MiniMax API key
 * @returns {Promise<{url: string, base64: string}>}
 */
async function generateImage(prompt, aspectRatio = DEFAULT_ASPECT_RATIO, apiKey) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: MODEL,
      prompt: prompt,
      aspect_ratio: aspectRatio,
      response_format: 'base64',
      n: 1,
      prompt_optimizer: true
    });

    const url = new URL(API_ENDPOINT);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          if (response.base_resp?.status_code === 0) {
            // base64 response - try different field names
            const data = response.data;
            let base64Data = null;
            if (data) {
              base64Data = data.image_base64s?.[0] || data.image_base64?.[0] || data.base64?.[0] || data[0]?.base64 || data[0];
            }
            if (base64Data && typeof base64Data === 'string') {
              resolve({ base64: base64Data, fullResponse: response });
            } else {
              reject(new Error('No base64 data in response. Response keys: ' + Object.keys(data || {}).join(', ')));
            }
          } else {
            reject(new Error(`API Error ${response.base_resp?.status_code}: ${response.base_resp?.status_msg || 'Unknown error'}`));
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ============================================================================
// FILE DOWNLOAD
// ============================================================================

/**
 * Download image from URL and save to file
 */
async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadImage(res.headers.location, outputPath).then(resolve).catch(reject);
        return;
      }

      const stream = fs.createWriteStream(outputPath);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve(outputPath);
      });
      stream.on('error', reject);
    }).on('error', reject);
  });
}

// ============================================================================
// MAIN GENERATION FUNCTION
// ============================================================================

/**
 * Generate all assets from manifest or specific ones
 */
async function generateAssets(options = {}) {
  const {
    apiKey = process.env.MINIMAX_API_KEY,
    category = null,  // 'resources', 'buildings', 'plots', 'ui', or null for all
    name = null,      // Specific asset name
    outputDir = path.join(projectRoot, 'public', 'assets'),
    delayMs = 2500    // Delay between requests to respect rate limits
  } = options;

  if (!apiKey) {
    throw new Error('API key required. Set MINIMAX_API_KEY environment variable or pass --api-key');
  }

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const manifest = category
    ? { [category]: ASSET_MANIFEST[category] }
    : ASSET_MANIFEST;

  const results = [];
  const errors = [];

  for (const [cat, assets] of Object.entries(manifest)) {
    const catDir = path.join(outputDir, cat);
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
    }

    for (const asset of assets) {
      // Skip if name specified and doesn't match
      if (name && asset.name !== name) continue;

      console.log(`\n📦 Generating: ${asset.name} (${cat})`);
      console.log(`   Prompt: ${asset.prompt}`);

      try {
        const result = await generateImage(asset.prompt, DEFAULT_ASPECT_RATIO, apiKey);
        console.log(`   ✅ Generated (base64)`);

        // Save base64 as PNG
        const outputPath = path.join(catDir, `${asset.name}.png`);
        const imageBuffer = Buffer.from(result.base64, 'base64');
        fs.writeFileSync(outputPath, imageBuffer);
        console.log(`   💾 Saved: ${outputPath}`);

        results.push({ name: asset.name, category: cat, path: outputPath, format: 'png' });

        // Rate limiting - wait between requests
        if (delayMs > 0) {
          await new Promise(r => setTimeout(r, delayMs));
        }
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}`);
        errors.push({ name: asset.name, category: cat, error: error.message });
      }
    }
  }

  // Save manifest
  const manifestPath = path.join(outputDir, 'manifest.json');
  const manifestData = {
    generated: new Date().toISOString(),
    assets: results,
    errors: errors
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2));
  console.log(`\n📋 Manifest saved: ${manifestPath}`);

  console.log(`\n✨ Done! Generated ${results.length} assets, ${errors.length} errors`);

  return { results, errors };
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

function showHelp() {
  console.log(`
🎨 MiniMax Asset Generator for Lunar Colony

Usage:
  node generate-assets.js [options]

Options:
  --api-key KEY     MiniMax API key (or set MINIMAX_API_KEY env)
  --category CAT    Generate specific category: resources, buildings, plots, ui
  --name NAME       Generate specific asset by name
  --output DIR      Output directory (default: public/assets)
  --all             Generate all assets
  --list            List available assets
  --help            Show this help

Examples:
  node generate-assets.js --list
  node generate-assets.js --category resources
  node generate-assets.js --name ice-drill
  MINIMAX_API_KEY=your_key node generate-assets.js --all

Environment:
  MINIMAX_API_KEY   Your MiniMax API key (required)
`);
}

function listAssets() {
  console.log('\n📦 Available Assets:\n');
  for (const [cat, assets] of Object.entries(ASSET_MANIFEST)) {
    console.log(`  ${cat.toUpperCase()}:`);
    for (const asset of assets) {
      console.log(`    - ${asset.name}`);
    }
    console.log();
  }
}

// Parse CLI arguments
const args = process.argv.slice(2);
const options = {};

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '--api-key':
      options.apiKey = args[++i];
      break;
    case '--category':
      options.category = args[++i];
      break;
    case '--name':
      options.name = args[++i];
      break;
    case '--output':
      options.outputDir = args[++i];
      break;
    case '--all':
      options.category = null;
      break;
    case '--list':
      listAssets();
      process.exit(0);
    case '--help':
      showHelp();
      process.exit(0);
  }
}

// Load .env file if exists
try {
  const envPath = path.join(projectRoot, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    for (const line of envContent.split('\n')) {
      const [key, value] = line.split('=');
      if (key && value && !process.env[key.trim()]) {
        process.env[key.trim()] = value.trim();
      }
    }
  }
} catch (e) {
  // Ignore .env errors
}

// Run
generateAssets(options).catch(console.error);
