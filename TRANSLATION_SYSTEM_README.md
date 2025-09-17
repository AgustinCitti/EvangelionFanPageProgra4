# Evangelion Website Translation System

## Overview

Your Evangelion website now features a complete Japanese-to-Spanish translation system with a stunning glitch animation that embodies the show's aesthetic. The website starts in Japanese and automatically transitions to Spanish with an authentic Eva-style system corruption effect.

## Features

### 🇯🇵 Japanese → 🇪🇸 Spanish Translation
- **Default Language**: Japanese (all content starts in Japanese)
- **Target Language**: Spanish (content transitions to Spanish)
- **Complete Coverage**: All text elements are translated including:
  - Navigation menus
  - Character descriptions
  - Eva unit specifications
  - Episode information
  - Interface elements
  - System messages

### 🎮 Section-Based Translation System
- **Intersection Observer**: Sections translate when 30% visible (perfect for intro videos)
- **Manual trigger**: Press 'L' key to manually translate entire page at once
- **Section-Based Processing**: Text elements within each section translate together with:
  - Character-by-character corruption simulation
  - Subtle scan line effects during processing
  - Small random delays (0-200ms) for natural variation
  - Synchronized processing within each section
  - Individual element corruption while staying synchronized
- **Section Visual Effects**: 
  - Terminal-style character corruption for all elements
  - Matrix-style glitch characters with Japanese symbols
  - Color-coded transformation phases (Red → Yellow → Green)
  - Realistic section-by-section translation processing
  - Minimal screen flash effects (only for primary elements)
  - Clean simultaneous element transformation per section

### 🚀 Technical Implementation
- **Data-driven**: Uses `data-translate` attributes for seamless integration
- **Performance optimized**: Batched updates for smooth transitions
- **Responsive**: Works on all device sizes
- **Evangelion-themed**: Custom glitch effects matching the show's aesthetic

## How It Works

### 1. Page Load
- Website loads with all content in Japanese
- Translation system initializes in background
- Japanese text displays with authentic styling

### 2. Section-Based Translation System (on scroll)
1. **Section Detection**: As user scrolls, sections become visible and trigger translation
   - Intersection Observer detects when 30% of section is in viewport
   - Each section translates independently (perfect for intro videos)
   - Simultaneous processing within each section for dramatic effect
   - Character-by-character corruption with glitch symbols
   - Subtle scan line effects sweep across corrupting text
   - Small random delays (0-200ms) for natural variation
   - Minimal screen flashes only for primary elements
2. **Synchronized Translation**: All text appears to be processed together
   - No dramatic global overlay - just clean simultaneous translations
   - Natural variation in timing keeps it organic
   - Individual character corruption for each element

### 3. Character System Integration
- Character information updates dynamically
- Names, roles, and descriptions translate seamlessly
- Age information remains constant across languages

## Files Modified

### Core Translation Files
- `translations.js` - Complete translation system and glitch effects
- `test.html` - Testing page for development

### Updated HTML Files
- `index.html` - Main page with translation integration
- `episodes.html` - Episodes page with Japanese/Spanish support
- `map.html` - Map page with tactical interface translations
- `report.html` - Report page with NERV database translations

### Updated JavaScript Files
- `script.js` - Enhanced character system with translation support

## Translation Coverage

### Navigation
- INTRO / イントロ
- OVERVIEW / 概要  
- PILOTS / パイロット
- UNITS / ユニット
- ARCHIVE / アーカイブ
- MAP / マップ
- REPORT / レポート

### Characters (Complete with descriptions)
- Shinji Ikari / 碇シンジ
- Rei Ayanami / 綾波レイ
- Asuka Langley / 惣流・アスカ・ラングレー
- Gendo Ikari / 碇ゲンドウ
- Misato Katsuragi / 葛城ミサト
- Kaworu Nagisa / 渚カヲル
- Ryoji Kaji / 加持リョウジ
- Ritsuko Akagi / 赤木リツコ

### Eva Units
- Unit-01 (Test Type) / ユニット-01（テストタイプ）
- Unit-00 (Prototype) / ユニット-00（プロトタイプ）
- Unit-02 (Production Model) / ユニット-02（量産型）

### Interface Elements
- Sync ratios, A.T. Field status, entry plug information
- Episode archive system
- Map controls and tactical information
- NERV database access forms

## How to Use

### Automatic Experience
1. Open any page of the website
2. Wait 4 seconds
3. Watch the glitch animation transform Japanese to Spanish

### Manual Control
- Press 'L' key at any time to trigger the animation
- Refresh the page to reset to Japanese
- Open `test.html` for testing and manual controls

### For Development
- All translatable elements use `data-translate="key"` attributes
- Add new translations to the `translations` object in `translations.js`
- Use `languageSystem.manualTrigger()` in console for testing

## Visual Effects

The synchronized element glitch system includes:
- **Character-by-character corruption**: Each letter transforms individually with glitch symbols
- **Clean transitions**: No overlapping Japanese/Spanish text - smooth corruption phases
- **Screen flashes**: White flash effects when elements begin corruption (primary elements only)
- **Scan line effects**: Red scan lines sweep across corrupting elements
- **Variable corruption patterns**: Different glitch intensities based on text importance
- **Synchronized processing**: All elements corrupt simultaneously with natural variation
- **Terminal corruption**: Matrix-style digital artifacts with Japanese characters
- **Phase transitions**: Japanese → Corruption → Complete Corruption → Spanish
- **Text distortion**: Realistic digital glitch effects with blur and skew
- **Timed sequences**: Carefully orchestrated synchronized transformation
- **Evangelion aesthetic**: Matches the show's terminal/computer interfaces perfectly

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Performance Notes

- Animations are GPU-accelerated where possible
- Text updates are batched for smooth performance
- Memory-efficient glitch character generation
- Responsive design maintains quality on all devices

## Customization

To modify the system:
1. **Change timing**: Edit the `setTimeout` value in `translations.js`
2. **Add languages**: Extend the `translations` object
3. **Modify effects**: Update CSS animations in the `addGlitchStyles()` function
4. **Add elements**: Include new `data-translate` attributes and corresponding translations

## Technical Details

### Animation Sequence
```javascript
// Phase timing (milliseconds)
Phase 1: Japanese text display (1000ms)
Phase 2: Corruption begins (800ms) 
Phase 3: Rapid switching (1000ms)
Phase 4: Spanish stabilization (1500ms)
Phase 5: Page translation (variable)
Phase 6: Cleanup (500ms)
```

### Key Classes
- `.language-glitch-overlay` - Main overlay container
- `.glitch-text-layer` - Individual text layers
- `.language-transition` - Element-level glitch effect
- `[data-translate]` - Translatable elements

## Enjoy Your Bilingual Evangelion Experience! 🤖⚡

The translation system brings an authentic Eva-style interface corruption experience while seamlessly transitioning your content from Japanese to Spanish. The glitch effects are designed to feel like an actual system malfunction in the Evangelion universe.

Press 'L' anytime to re-experience the glitch, or simply reload the page to start fresh in Japanese!
