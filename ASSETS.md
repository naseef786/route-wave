# Asset Documentation & Source Records

This document catalogs all brand assets, vector graphics, and photography used in the **Route Wave General Transport** web application.

---

## 1. Brand Identity & Vector Assets (SVG)

All vector logos were created specifically for Route Wave General Transport. They are lightweight, resolution-independent, and fully editable.

| Asset File | Format | Description | Primary Use Case |
| :--- | :--- | :--- | :--- |
| [`/public/logo-symbol.svg`](file:///d:/Projects/Route%20Wave/public/logo-symbol.svg) | SVG | Standalone dynamic "R" & "W" route-wave motif with deep navy background and amber directional accents. | Favicon, app launcher, browser tab, social avatar. |
| [`/public/logo-horizontal-light.svg`](file:///d:/Projects/Route%20Wave/public/logo-horizontal-light.svg) | SVG | Full brand wordmark ("ROUTE WAVE") + descriptor ("GENERAL TRANSPORT") with dark navy text. | Header on light backgrounds, email templates, documentation. |
| [`/public/logo-horizontal-dark.svg`](file:///d:/Projects/Route%20Wave/public/logo-horizontal-dark.svg) | SVG | Reversed wordmark + descriptor with white text and slate styling. | Footer on dark navy background, inverted cards. |
| [`/src/app/icon.svg`](file:///d:/Projects/Route%20Wave/src/app/icon.svg) | SVG | Next.js App Router root favicon vector. | Native Next.js 16 metadata icon generator. |

---

## 2. Photographic Imagery & Vehicle References

To maintain absolute commercial honesty, all images depict realistic commercial transport operations in the United Arab Emirates without identifiable third-party company branding, watermarks, or unsupported equipment.

> **Honesty Notice:** Stock and generated images are presented strictly as illustrative representations of commercial transport operations and vehicle categories, not as photographs of the company's proprietary fleet. Neutral captions are applied across the interface.

| Asset File | Resolution / Aspect | Description | Context / Usage |
| :--- | :--- | :--- | :--- |
| [`/public/images/light-truck-transport.jpg`](file:///d:/Projects/Route%20Wave/public/images/light-truck-transport.jpg) | 1792×1024 (16:9) | Modern white commercial light box truck operating on a sunny UAE highway corridor with road signage. | Homepage Services Overview & Services Page (Light Trucks Section). |
| [`/public/images/heavy-truck-transport.jpg`](file:///d:/Projects/Route%20Wave/public/images/heavy-truck-transport.jpg) | 1792×1024 (16:9) | Commercial heavy flatbed truck carrying neatly secured industrial materials and construction components on a UAE industrial road. | About Us page & Services Page (Heavy Trucks Section). |
| [`/public/images/loading-dock-operations.jpg`](file:///d:/Projects/Route%20Wave/public/images/loading-dock-operations.jpg) | 1792×1024 (16:9) | Commercial cargo vehicle at an industrial distribution bay in a modern UAE logistics park with palletized materials. | Homepage Introduction Section & Transport Operations context. |
| [`/public/images/uae-transport-corridor.jpg`](file:///d:/Projects/Route%20Wave/public/images/uae-transport-corridor.jpg) | 1792×1024 (16:9) | Scenic wide-angle highway view of a modern UAE commercial transport corridor (E11 corridor) stretching across desert dunes. | Homepage Hero banner background. |
| [`/public/images/heavy-tipper-quarry-operations.jpg`](file:///d:/Projects/Route%20Wave/public/images/heavy-tipper-quarry-operations.jpg) | 477×1024 (9:19 Tall Portrait) | High-capacity Volvo Globetrotter heavy tractor unit with tri-axle semi-tipper trailer loading sand aggregates in an active UAE quarry excavation pit. | Featured Field Operations & Heavy Tipper Fleet Showcase across Homepage, Services, and About pages. |
| [`/public/images/mercedes-actros-tipper-fleet.jpg`](file:///d:/Projects/Route%20Wave/public/images/mercedes-actros-tipper-fleet.jpg) | 934×1024 (4:5 Portrait) | Heavy-duty Mercedes-Benz Actros multi-axle all-terrain tipper trucks with deep-tread off-road tires deployed on UAE desert construction tracks. | All-Terrain Tipper Fleet Showcase & Heavy Haulage Field Equipment spotlight across Homepage, Services, and About pages. |
| [`/public/images/og-image.jpg`](file:///d:/Projects/Route%20Wave/public/images/og-image.jpg) | 1792×1024 (16:9) | Commercial transport corridor at golden hour with commercial freight haulage across a UAE logistics route. | OpenGraph social preview metadata and Twitter cards. |

---

## 3. Fonts & Iconography

- **Font Family:** `Inter` (Google Fonts), self-hosted via `next/font/google` with zero external runtime network requests.
- **Icons:** `lucide-react` (MIT Licensed), optimized inline SVG tree-shaken components.
