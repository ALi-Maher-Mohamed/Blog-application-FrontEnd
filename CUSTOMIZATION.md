# 🎨 UI Customization Guide

## 📁 Color Configuration

All colors are centralized in **`src/config/theme-colors.js`** for easy customization!

### Quick Start - Change Colors Anywhere

1. Open `src/config/theme-colors.js`
2. Edit the colors in the `light` or `dark` objects
3. All components using CSS variables will update automatically ✨

### Color Structure

```javascript
// Light Theme Colors
light: {
  // Background & Surface
  bgColor: "#f7f9fa",              // Main background
  surfaceColor: "#ffffff",         // Card/surface background

  // Primary Colors (Main Brand)
  primaryColor: "#1a8cd8",         // Main brand color
  primaryHover: "#167bc0",         // Hover state
  primaryLight: "#e7f5fb",         // Light tint
  primaryDark: "#0d5a93",          // Dark tint

  // Text Colors
  textMain: "#0f1419",             // Main text
  textSecondary: "#536471",        // Secondary text
  textTertiary: "#75828d",         // Tertiary text

  // Accent Colors
  redColor: "#f91880",             // Hearts/Likes
  greenColor: "#00ba7c",           // Success/Positive
  warnColor: "#ffd400",            // Warnings/Alerts
  orangeColor: "#ff6b6b",          // Additional accent

  // Borders
  borderColor: "#eff3f4",          // Main border color
  borderLight: "#f7f9fa",          // Light border
},

// Dark Theme Colors
dark: {
  // Same structure but darker values
  bgColor: "#000000",
  surfaceColor: "#16181c",
  // ... etc
}
```

---

## 🎬 Animations

### Available Animations

The project includes many beautiful animations you can use:

#### Entrance Animations

- `fadeIn` - Fade in with slight slide up
- `slideInUp` - Slide from bottom
- `slideInDown` - Slide from top
- `slideInLeft` - Slide from left
- `slideInRight` - Slide from right
- `scaleIn` - Scale from center

#### Motion Animations

- `float` - Gentle floating motion
- `bounce` - Bounce up and down
- `pulse` - Pulsing opacity
- `glow` - Glowing effect
- `rotate` - Continuous rotation
- `shimmer` - Loading shimmer effect

#### Utility Classes

Apply animations using CSS classes:

```jsx
// In JSX
<div className="fade-in">Content appears smoothly</div>
<div className="slide-in-up">Slides up from below</div>
<div className="floating">Floats continuously</div>
<div className="bounce-in">Bounces in with scale</div>

// In CSS
.my-element {
  animation: slideInLeft 0.5s ease-out;
}
```

---

## 🎨 Using Colors in CSS

### CSS Variables (Automatic Theme Support)

All CSS variables are automatically switched between light and dark themes:

```css
/* These automatically update based on theme */
.my-button {
  background-color: var(--primary-color);
  color: var(--text-main);
  border: 1px solid var(--border-color);
}
```

### Available CSS Variables

```css
/* Colors */
--bg-color              /* Background */
--surface-color         /* Card/Surface background */
--primary-color         /* Main brand color */
--primary-hover         /* Primary hover state */
--text-main             /* Main text color */
--text-secondary        /* Secondary text color */
--red-color             /* Red accent */
--green-color           /* Green accent */
--warn-color            /* Warning accent */

/* Spacing & Sizing */
--radius-sm             /* 8px border radius */
--radius-md             /* 16px border radius */
--radius-lg             /* 24px border radius */
--radius-full           /* 9999px (circles) */

/* Shadows */
--shadow-sm             /* Small shadow */
--shadow-md             /* Medium shadow */
--shadow-lg             /* Large shadow */

/* Transitions */
--transition-fast       /* 0.15s ease */
--transition-normal     /* 0.3s ease */
```

---

## 🌓 Light & Dark Theme

### How It Works

1. **Theme Context** (`src/context/ThemeContext.js`) manages the theme state
2. **Data attribute** `data-theme` is set on the root HTML element
3. **CSS variables** automatically update based on the theme

### Automatic Theme Switching

```css
/* Light theme (default) */
:root {
  --bg-color: #f7f9fa;
  --text-main: #0f1419;
  /* ... */
}

/* Dark theme */
[data-theme="dark"] {
  --bg-color: #000000;
  --text-main: #e7e9ea;
  /* ... */
}
```

### Using Theme in JavaScript

```jsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function MyComponent() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </>
  );
}
```

---

## 🛠️ Customization Examples

### Example 1: Change Primary Color Scheme

```javascript
// src/config/theme-colors.js
light: {
  primaryColor: "#7c3aed",      // Purple instead of blue
  primaryHover: "#6d28d9",
  primaryLight: "#ede9fe",
  primaryDark: "#5b21b6",
  // ... rest of colors
}
```

**Result**: All buttons, links, and primary elements turn purple!

### Example 2: Change to a Green Theme

```javascript
light: {
  primaryColor: "#10b981",      // Emerald green
  primaryHover: "#059669",
  primaryLight: "#ecfdf5",
  // ... rest of colors
}
```

### Example 3: Custom Dark Theme

```javascript
dark: {
  bgColor: "#0f172a",           // Darker background
  surfaceColor: "#1e293b",      // Darker surface
  primaryColor: "#3b82f6",      // Brighter blue for dark mode
  // ... rest of colors
}
```

### Example 4: Add Animation to Element

```jsx
// In JSX
<div className="fade-in">Appears smoothly</div>

// Or in CSS
.my-component {
  animation: slideInUp 0.5s ease-out;
}

// Or with custom duration
.my-component {
  animation: slideInUp 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Example 5: Style with Animations

```css
.card {
  background-color: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  animation: slideInUp 0.5s ease-out;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
  border-color: var(--primary-color);
}
```

---

## 📱 Responsive Design Tips

### Using CSS Variables for Responsive Spacing

```css
@media (max-width: 768px) {
  .container {
    padding: 12px;
    border-radius: var(--radius-md);
  }
}
```

### Animation Adjustments for Mobile

```css
@media (max-width: 640px) {
  /* Reduce animation duration on mobile */
  .animation-element {
    animation-duration: 0.3s;
  }
}
```

---

## ✨ Best Practices

1. **Always use CSS variables** instead of hardcoding colors
2. **Use semantic color names** (primary, success, danger) not hex values
3. **Add smooth transitions** to interactive elements
4. **Test in both light and dark modes** before committing
5. **Keep animations subtle** - avoid overusing them
6. **Use meaningful animation timing** - fast for icons, normal for cards

---

## 🚀 Performance Tips

- Animations use `transform` and `opacity` for best performance
- CSS variables have minimal performance impact
- Theme switching is instant (no page reload needed)
- All transitions are GPU-accelerated

---

## 🐛 Troubleshooting

### Colors not updating?

1. Make sure you're using CSS variables: `var(--primary-color)`
2. Check that the theme context is wrapping your app
3. Clear browser cache

### Animations not smooth?

1. Verify animations use `transform` or `opacity`
2. Check for conflicting CSS rules
3. Avoid animating layout-affecting properties

### Dark theme not working?

1. Check that `ThemeProvider` wraps your app
2. Verify `[data-theme="dark"]` CSS rules exist
3. Check browser DevTools for the `data-theme` attribute

---

## 📚 File References

- **Colors**: `src/config/theme-colors.js`
- **Theme Context**: `src/context/ThemeContext.js`
- **Global Styles**: `src/index.css`
- **Component Styles**: `src/Components/**/*.css`

---

**Happy customizing! 🎉**
