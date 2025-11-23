# Hero Slider Guide - How to Add and Customize Slides

## 📍 Location
**File:** `src/components/HeroSlider.jsx` (Lines 7-42)

## ➕ How to Add a New Slide

Simply add a new object to the `slides` array. Here's the template:

```jsx
{
  id: 4,  // Unique ID (increment from last slide)
  title: 'Your Slide Title',
  tag: 'YOUR TAG TEXT',  // Small badge text at top
  tagColor: 'bg-secondary',  // or 'bg-primary' for blue
  description: 'Your description text goes here.',
  buttonText: 'Button Text',
  buttonLink: '/location',  // Where button links to
  backgroundImage: 'https://your-image-url.com/image.jpg',
  overlay: 'bg-gradient-to-r from-primary/80 to-primary/60',
},
```

## 🎨 Slide Options

### Option 1: Simple Description Slide
```jsx
{
  id: 4,
  title: 'Your Title',
  tag: 'YOUR TAG',
  tagColor: 'bg-primary',  // Blue badge
  description: 'Your description text.',
  buttonText: 'Learn More',
  buttonLink: '/what-we-do',
  backgroundImage: 'https://your-image.jpg',
  overlay: 'bg-gradient-to-r from-primary/85 to-primary/65',
}
```

### Option 2: Vision & Mission Slide
```jsx
{
  id: 4,
  title: 'Vision & Mission',
  tag: 'WHY WE EXIST',
  tagColor: 'bg-secondary',  // Yellow badge
  vision: 'Your vision statement here.',
  mission: 'Your mission statement here.',
  buttonText: 'Work with us',
  buttonLink: '/what-we-do',
  backgroundImage: 'https://your-image.jpg',
  overlay: 'bg-gradient-to-r from-primary/80 to-primary/60',
}
```

## 🎨 Customization Options

### Tag Colors
- `bg-primary` = Blue (#0C4A8C)
- `bg-secondary` = Yellow (#FFBF00)

### Overlay Options
- `bg-gradient-to-r from-primary/80 to-primary/60` = Blue gradient
- `bg-gradient-to-r from-primary/85 to-primary/65` = Darker blue gradient
- `bg-gradient-to-r from-secondary/80 to-secondary/60` = Yellow gradient

### Button Links
- `/` = Home page
- `/what-we-do` = What We Do page
- `/who-we-are` = Who We Are page
- `/location` = Location/Contact page
- `/careers` = Careers page
- `/our-team` = Our Team page
- `/our-thinking` = Our Thinking page

## 📸 Image Requirements

- **Format**: JPG or PNG
- **Size**: 1920x1080px or larger (16:9 aspect ratio recommended)
- **Source**: Can be from your website or any image URL

## 🔄 Auto-Play Settings

The slider automatically changes slides every **6 seconds** (line 47).

To change the interval:
```jsx
}, 6000) // Change 6000 to your desired milliseconds (e.g., 5000 for 5 seconds)
```

## 📝 Current Slides

1. **Slide 1**: Vision & Mission (Yellow tag)
2. **Slide 2**: Evidence, storytelling, and capacity Building (Blue tag)
3. **Slide 3**: Your New Slide (Template - customize this!)

## 💡 Tips

1. **Keep titles short** - They display large on screen
2. **Use high-quality images** - They're full-screen backgrounds
3. **Test on mobile** - Make sure text is readable over images
4. **Consistent styling** - Use similar overlay colors for cohesion

## 🎯 Example: Complete New Slide

```jsx
{
  id: 4,
  title: 'National Footprint',
  tag: 'OUR REACH',
  tagColor: 'bg-primary',
  description: 'Working across 25+ states and union territories to create lasting impact.',
  buttonText: 'View Locations',
  buttonLink: '/location',
  backgroundImage: 'https://cmsrconsultants.com/img/national-footprint.jpg',
  overlay: 'bg-gradient-to-r from-primary/80 to-primary/60',
},
```

That's it! The slider will automatically include your new slide. 🎉

