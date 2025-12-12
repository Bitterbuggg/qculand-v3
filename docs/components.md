# Interactable Components

This document lists all possible interactable components for QCULand V3, based on the qcumapv2.glb model and the reference implementation in qculand-v2.

---

## Buildings

| ID | Name | Model File | Description |
|----|------|------------|-------------|
| `techvoc` | TechVoc Building | qcu_bldg6.glb | Technical-Vocational building |
| `yellow-building` | Yellow Building | qcu_bldg5.glb | Yellow-colored campus building |
| `admin-building` | Admin Building | qcu_bldg4.glb | Administration building |
| `bautista` | Bautista Building | qcu_bldg2.glb | Bautista hall |
| `computer-lab` | Computer Lab | qcu_bldg1.glb | Computer laboratory building |
| `cube010-building` | Academic Building | qcu_bldg3.glb | Academic/classroom building |
| `triangle-complex` | Triangle Complex | qcu_triangle.glb | Triangle-shaped structure |

---

## Base Map Objects

These are objects embedded within the base map that can be made interactable:

| Object Name | Type | Interaction |
|-------------|------|-------------|
| `Bleachers` | Structure | Click to view/interact |
| `Triangle` | Structure | Opens triangle-complex scene |
| Floor/Ground | Navigation | Click to move character |

---

## Characters & NPCs

| ID | Name | Model File | Description |
|----|------|------------|-------------|
| `student-1` | Student Character | qcu_student_1.glb | Main playable student character (animated) |
| `student-4` | Student NPC | qcu_student_4.glb | Secondary student model |
| `bee` | Bee Mascot | qcu_bee.glb | QCU mascot |

---

## Enemies / Game Elements

| ID | Name | Model File | Description |
|----|------|------------|-------------|
| `ransomware` | Ransomware Boss | qcu_ransomware.glb | Boss enemy for dorm scene |
| `phisher` | Phisher Enemy | qcu_phisher.glb | Phishing-themed enemy |
| `cipher` | Cipher Element | qcu_cipher.glb | Cipher/puzzle game element |

---

## Scenes (Interior Locations)

Each building can transition to an interior scene:

| Scene ID | Name | Triggered By |
|----------|------|--------------|
| `campus` | Campus Map | Default/exit building |
| `computer-lab` | Computer Lab Interior | Click computer-lab building |
| `techvoc` | TechVoc Interior (Dorm) | Click techvoc building |
| `academic-building` | Academic Building Interior | Click cube010-building |
| `bautista` | Bautista Interior | Click bautista building |
| `yellow-building` | Yellow Building Interior | Click yellow-building |
| `admin-building` | Admin Building Interior | Click admin-building |
| `room-explorer` | Room Explorer | Click room-* prefixed objects |

---

## Room Configurations

Rooms are sub-locations within buildings:

| Room ID Pattern | Description |
|-----------------|-------------|
| `room-*` | Dynamic room IDs loaded from room configs |

---

## Interaction Types

### Click Events
- `onClick` - Primary interaction (enter building, pick up item)
- `onFloorClick` - Click on ground to move character

### Hover Events  
- `onPointerOver` / `onHover` - Highlight on mouse enter
- `onPointerOut` / `onHoverOut` - Remove highlight on mouse leave

### Visual Feedback
- Cursor change (`pointer` for interactable, `default` otherwise)
- Highlight/glow effect on hover
- Scale animation on interaction

---

## Implementation Notes

1. **Building Detection**: Check `e.object.name.includes('BuildingName')` in click handlers
2. **Hover Cursor**: Set `document.body.style.cursor = 'pointer'` for interactables
3. **Scene Transitions**: Use state management to switch between campus map and interior scenes
4. **Model Preloading**: Use `useGLTF.preload()` for smoother transitions
