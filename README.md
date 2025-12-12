# NBA 2K Style Girl Rating - Full Team Mode

A fully responsive web application inspired by NBA 2K's MyTeam mode, featuring holographic card designs, tier-based ratings, and complete team management.

## 🎮 Features

### Core Functionality
- **Create Custom Cards**: Rate girls across 10 base stats with optional Cap Breakers
- **7-Tier System**: From Bronze to Galaxy Opal with unique holographic effects
- **Team Roster**: Manage up to 20 girls on your team
- **Starting 5**: Select and optimize your starting lineup
- **Team Statistics**: Track average ratings, highest tiers, and more

### Visual Effects
- **Holographic Cards**: Galaxy Opal cards feature animated gold/purple gradients
- **Neon UI**: Glowing titles and neon effects throughout
- **Stadium Background**: Animated arena lights and particle effects
- **Tier-Based Styling**: Each tier has unique colors and visual effects

## 📱 Mobile Optimized

### Responsive Layout
- **Vertical Stacking**: All sections stack vertically on mobile for easy scrolling
- **Touch-Friendly**: 48px minimum tap targets for all buttons and inputs
- **Horizontal Scroll**: Starting 5 cards scroll horizontally with swipe gestures
- **Adaptive Text**: Font sizes scale appropriately for small screens

### Mobile Interactions
- **Tap to Select**: Instead of drag-and-drop, tap a bench player then tap an empty slot
- **Visual Feedback**: Selected cards highlight with green glow
- **Touch Gestures**: Swipe through Starting 5 positions
- **Active States**: Buttons scale down when pressed for tactile feedback

### Performance
- **Optimized Animations**: Reduced animation intensity on mobile devices
- **Smooth Scrolling**: Hardware-accelerated scrolling for Starting 5
- **Efficient Rendering**: Minimal re-renders for better battery life

## 🎯 How to Use

### Desktop
1. Fill in girl's name and stats
2. Click "Calculate Overall" to generate card
3. Choose "Save to Roster" or "Delete"
4. Drag-and-drop cards to manage Starting 5
5. View team stats in the roster panel

### Mobile
1. Fill in girl's name and stats (tap each field)
2. Tap "Calculate Overall" to generate card
3. Choose "Save to Roster" or "Delete"
4. Tap a bench player to select them
5. Tap an empty slot in Starting 5 to place them
6. Swipe horizontally to view all Starting 5 positions

## 📊 Tier System

| Tier | Overall Score | Visual Effect |
|------|---------------|---------------|
| 🌟 Galaxy Opal | 90+ | Holographic gold/purple with sparkles ✨ |
| 💎 Pink Diamond | 80-89 | Pink/purple gradient shimmer |
| 💠 Diamond | 70-79 | Blue gradient shine |
| 🔮 Amethyst | 60-69 | Deep purple shimmer |
| 🔴 Ruby | 50-59 | Red gradient sparkle |
| 🔷 Sapphire | 40-49 | Blue gradient |
| 🥉 Bronze | 0-39 | Brown/bronze matte |

## 🎨 Stat Categories

### Base Stats (Total: 100)
- **Face** (0-15): Facial features rating
- **Eyes** (0-5): Eye attractiveness
- **Hair** (0-5): Hair style and quality
- **Top** (0-5): Upper body clothing/appearance
- **Bottom** (0-5): Lower body clothing/appearance
- **Fitness** (0-15): Physical fitness level
- **History** (0-10): Personal history score
- **Personality** (0-20): Personality traits
- **Tolerance** (0-10): Patience and tolerance
- **Substances** (0-10): Lifestyle choices rating

### Cap Breakers (Bonus: 0-8)
- **Athletic/Build** (0-2): Athletic ability bonus
- **Height** (0-1): Height preference bonus
- **Attractiveness** (0-2): Overall attractiveness bonus
- **Into You** (0-1): Interest level bonus
- **Comfort** (0-2): Comfort factor bonus

## 🚀 Getting Started

Simply open `index.html` in any modern web browser. No installation or server required!

### Recommended Browsers
- Chrome/Edge (Desktop & Mobile)
- Safari (Desktop & Mobile)
- Firefox (Desktop & Mobile)

## 📱 Screen Size Support

- **Small Phones**: 320px - 480px (iPhone SE, etc.)
- **Medium Phones**: 481px - 767px (iPhone 12, Galaxy S21)
- **Tablets**: 768px - 1024px (iPad, Android tablets)
- **Desktop**: 1025px and above

## 🎮 Team Management

### Roster Rules
- Maximum 20 girls total
- Maximum 5 in Starting lineup
- Unlimited bench players (up to roster limit)
- Drag-and-drop (desktop) or tap-to-place (mobile)

### Team Statistics
- **Starting 5 Average**: Average overall rating of starting players
- **Highest Tier**: Best tier in starting lineup
- **Total Cap Breakers**: Sum of all bonus points across roster
- **Top Tier Count**: Number of Galaxy Opal, Pink Diamond, and Diamond cards

## 💡 Tips

1. **Galaxy Opal Strategy**: Aim for 90+ overall by maximizing stats and using all Cap Breakers
2. **Balanced Team**: Mix high-rated personalities with good fitness scores
3. **Cap Breakers**: Use strategically - they can push borderline cards into higher tiers
4. **Starting 5**: Balance your lineup with diverse strengths
5. **Mobile**: Use landscape mode for better visibility of Starting 5

## 🎨 Technical Details

### Technologies
- Pure HTML5, CSS3, JavaScript
- No frameworks or dependencies
- Fully client-side (no server needed)
- Responsive design with CSS Grid and Flexbox
- CSS animations and transitions
- Touch event handling for mobile

### Features
- Local state management
- Drag-and-drop API (desktop)
- Touch events (mobile)
- Responsive media queries
- CSS custom properties
- Hardware-accelerated animations

## 📄 License

This is a personal project for entertainment purposes.

---

**Enjoy building your ultimate NBA 2K style team! 🏀✨**