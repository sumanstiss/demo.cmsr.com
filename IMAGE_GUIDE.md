# Guide: How to Change Photos and Adjust Aspect Ratios

## 📍 Where Images Are Located

### 1. **"Where We Deliver" Carousel Images**
**File:** `src/pages/Home.jsx` (Lines 67-96)

### 2. **India Map Image**
**File:** `src/pages/Home.jsx` (Line 139)

### 3. **Hero Slider Images**
**File:** `src/components/HeroSlider.jsx` (Lines 8-30)

---

## 🖼️ How to Change Photos

### Option 1: Using Online Image URLs

1. **Find your image URL** (from Unsplash, your website, or any image hosting service)
2. **Open** `src/pages/Home.jsx`
3. **Locate the images array** (around line 67)
4. **Replace the `url` value** with your new image URL

**Example:**
```jsx
images={[
  {
    url: 'YOUR_NEW_IMAGE_URL_HERE',  // ← Change this
    alt: 'Agriculture & Livelihoods',
    title: 'Agriculture & Livelihoods',
    description: 'Your description here',
    overlay: true,
  },
  // ... more images
]}
```

### Option 2: Using Local Images

1. **Create a folder** `public/images/` in your project root
2. **Add your images** to that folder (e.g., `public/images/agriculture.jpg`)
3. **Reference them** in your code:

```jsx
{
  url: '/images/agriculture.jpg',  // ← Path from public folder
  alt: 'Agriculture & Livelihoods',
  // ...
}
```

---

## 📐 How to Adjust Aspect Ratios

### Current Aspect Ratio Settings

The carousel height is controlled in **`src/components/ImageCarousel.jsx`** (Line 30):

```jsx
<div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
```

### Common Aspect Ratio Options

#### **Square (1:1)**
```jsx
<div className="relative aspect-square">
```

#### **Landscape (16:9) - Wide**
```jsx
<div className="relative aspect-video">  // 16:9 ratio
```

#### **Portrait (4:5)**
```jsx
<div className="relative aspect-[4/5]">
```

#### **Custom Heights (Current Method)**
```jsx
// Small screens
h-48    // 192px
h-64    // 256px
h-80    // 320px
h-96    // 384px

// Responsive heights
h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px]
```

#### **Fixed Aspect Ratios with Tailwind**
```jsx
// 16:9 (widescreen)
aspect-video

// 4:3 (standard)
aspect-[4/3]

// 3:2 (photo)
aspect-[3/2]

// 21:9 (ultrawide)
aspect-[21/9]

// 1:1 (square)
aspect-square
```

---

## 🎨 Complete Example: Changing Image and Aspect Ratio

### Step-by-Step:

1. **Open** `src/components/ImageCarousel.jsx`

2. **Change the height/aspect ratio** (Line 30):
```jsx
// Before:
<div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px]">

// After (for 16:9 widescreen):
<div className="relative aspect-video w-full">

// Or for custom height:
<div className="relative h-96 sm:h-[400px] md:h-[500px] lg:h-[600px]">
```

3. **Open** `src/pages/Home.jsx`

4. **Change the image URL** (Lines 69, 76, 83, 90):
```jsx
{
  url: 'https://your-new-image-url.com/image.jpg',
  alt: 'Your Image Description',
  title: 'Your Title',
  description: 'Your description',
  overlay: true,
}
```

---

## 🖼️ Image Object Fit Options

In `ImageCarousel.jsx` (Line 41), you can change how images fill the container:

```jsx
// Current (covers entire area, may crop):
className="w-full h-full object-cover"

// Other options:
object-contain    // Shows full image, may have empty space
object-fill       // Stretches to fill (may distort)
object-none       // Original size
object-scale-down // Like contain, but won't scale up
```

---

## 📱 Responsive Aspect Ratios

For different aspect ratios on different screen sizes:

```jsx
<div className="relative 
  aspect-square sm:aspect-video md:aspect-[4/3] lg:aspect-[16/9]">
```

---

## 🔧 Quick Reference: All Image Locations

| Location | File | Line | What to Change |
|----------|------|------|----------------|
| Carousel Images | `src/pages/Home.jsx` | 67-96 | `url` property |
| Carousel Height | `src/components/ImageCarousel.jsx` | 30 | Height classes |
| India Map | `src/pages/Home.jsx` | 139 | `src` attribute |
| Hero Slider | `src/components/HeroSlider.jsx` | 8-30 | `backgroundImage` style |

---

## 💡 Tips

1. **Image Size**: Use images at least 1200px wide for best quality
2. **Format**: JPG for photos, PNG for graphics/logos
3. **Optimization**: Compress images before uploading (use tools like TinyPNG)
4. **Aspect Ratio**: Match your image's natural aspect ratio for best results
5. **Testing**: Always test on mobile, tablet, and desktop views

---

## 🎯 Example: Complete Image Change

**File:** `src/pages/Home.jsx`

```jsx
<ImageCarousel
  images={[
    {
      url: 'https://example.com/my-new-photo.jpg',  // ← Your new image
      alt: 'My Custom Image',
      title: 'Custom Title',
      description: 'My custom description',
      overlay: true,
    },
    // Add more images...
  ]}
  autoPlayInterval={5000}
/>
```

**File:** `src/components/ImageCarousel.jsx`

```jsx
// Change from fixed height to aspect ratio:
<div className="relative aspect-video w-full">  // ← 16:9 ratio
  {/* ... rest of code ... */}
</div>
```

That's it! Your images and aspect ratios are now updated! 🎉



