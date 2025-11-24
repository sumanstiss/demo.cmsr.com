# Partner Logos Folder

Place your partner/client logo images in this folder.

## How to Add Partner Logos

1. **Save your logo images** in this folder (`public/partners/`)
2. **Name them** according to the partner name (see examples below)
3. **Supported formats**: PNG (recommended), JPG, SVG

## Recommended Logo Specifications

- **Format**: PNG with transparency (best for logos)
- **Size**: 200-300px wide (height will scale automatically)
- **Aspect ratio**: Maintain original logo proportions
- **Background**: Transparent or white

## Example File Names

Based on the current partners list:
- `aif.png`
- `unicef.png`
- `save-the-children.png`
- `giz.png`
- `care.png`
- `hdfc.png`
- `niua.png`
- `wri.png`
- `johns-hopkins.png`
- `tata.png`
- `deloitte.png`
- `palladium.png`
- `cornell.png`

## How It Works

- If a logo image exists, it will be displayed with the partner name below it
- If no logo is provided, it will show the first letter of the partner name with the full name

## Using Online Image URLs

You can also use online URLs instead of local files. In `src/pages/Home.jsx`, change:

```jsx
{ name: 'AIF', logo: '/partners/aif.png' }
```

To:

```jsx
{ name: 'AIF', logo: 'https://example.com/logos/aif.png' }
```

