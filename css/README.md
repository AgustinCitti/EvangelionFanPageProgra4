# CSS Architecture Documentation

This project's CSS has been refactored into a modular architecture for better maintainability and organization.

## File Structure

### Core Files (Required for all pages)
- **`variables.css`** - CSS custom properties and reset styles
- **`base.css`** - Base body styles and page transitions
- **`animations.css`** - Keyframe animations and effects

### Component Files (Include as needed)
- **`navigation.css`** - Page navigation and nav logo styles
- **`sections.css`** - Common section headers and borders
- **`hero.css`** - Hero section with video background
- **`synopsis.css`** - Synopsis section layout and styling
- **`characters.css`** - Character gallery and info panels
- **`eva.css`** - EVA units section with specifications
- **`episodes.css`** - Episodes carousel and library page
- **`world.css`** - World/Tokyo-3 section
- **`contact.css`** - Contact form styling
- **`footer.css`** - Footer layout and styling
- **`components.css`** - Small components (mini video player, etc.)

### Layout Files
- **`responsive.css`** - All responsive breakpoints and mobile styles

## Usage

### For index.html (Main page):
```html
<!-- Core CSS Files -->
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/animations.css">

<!-- Component CSS Files -->
<link rel="stylesheet" href="css/navigation.css">
<link rel="stylesheet" href="css/sections.css">
<link rel="stylesheet" href="css/hero.css">
<link rel="stylesheet" href="css/synopsis.css">
<link rel="stylesheet" href="css/characters.css">
<link rel="stylesheet" href="css/eva.css">
<link rel="stylesheet" href="css/episodes.css">
<link rel="stylesheet" href="css/world.css">
<link rel="stylesheet" href="css/contact.css">
<link rel="stylesheet" href="css/footer.css">
<link rel="stylesheet" href="css/components.css">

<!-- Responsive CSS -->
<link rel="stylesheet" href="css/responsive.css">
```

### For episodes.html (Episodes page):
```html
<!-- Core CSS Files -->
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/animations.css">

<!-- Component CSS Files -->
<link rel="stylesheet" href="css/navigation.css">
<link rel="stylesheet" href="css/sections.css">
<link rel="stylesheet" href="css/episodes.css">
<link rel="stylesheet" href="css/footer.css">

<!-- Responsive CSS -->
<link rel="stylesheet" href="css/responsive.css">
```

## Benefits of This Architecture

1. **Modularity** - Each component is isolated in its own file
2. **Maintainability** - Easy to find and edit specific styles
3. **Performance** - Pages only load the CSS they need
4. **Scalability** - Easy to add new components without bloating existing files
5. **Organization** - Clear separation of concerns

## File Size Comparison

- **Original style.css**: 2,527 lines
- **Modular files total**: Same content, distributed across 15 focused files
- **Average file size**: ~168 lines per file

## Adding New Components

1. Create a new CSS file in the `css/` directory
2. Follow the naming convention (lowercase with hyphens)
3. Add appropriate comments and section headers
4. Import the file in the relevant HTML pages
5. Update this documentation

## Maintenance Notes

- Keep `variables.css` updated with any new CSS custom properties
- All responsive styles should go in `responsive.css`
- Global animations belong in `animations.css`
- Component-specific styles should stay in their respective files
