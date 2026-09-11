# Cinematic Scroll

Build ONLY the Home Page of my Computer Science & Engineering Department Club website.

I will create the other pages later, so do NOT create any other pages now.

Tech Stack

Next.js

React

TypeScript

Turbopack

Tailwind CSS

Framer Motion

Use GSAP + ScrollTrigger only if necessary for advanced scroll control

MOST IMPORTANT REQUIREMENT — BIDIRECTIONAL SCROLL ANIMATION

The entire homepage must use scroll-position-based animations.

I do NOT want simple whileInView animations where an element animates once and stays visible.

I want the animation to be directly connected to the user's scroll position.

When scrolling DOWN:

Each section should transition into the screen with animation.

Example:

HOME
   ↓ scroll
DEPARTMENT
   ↓ scroll
LEADERSHIP
   ↓ scroll
CLUB IN-CHARGE
   ↓ scroll
RESEARCH CLUB
   ↓ scroll
EDITING CLUB
   ↓ scroll
FINAL CTA


When scrolling UP:

The exact opposite animation must happen:

FINAL CTA
   ↑ scroll
EDITING CLUB
   ↑ scroll
RESEARCH CLUB
   ↑ scroll
CLUB IN-CHARGE
   ↑ scroll
LEADERSHIP
   ↑ scroll
DEPARTMENT
   ↑ scroll
HOME


If the user changes scroll direction, the animation must immediately respond to the new scroll position.

The animation should NOT finish independently of scrolling.

SCROLL BEHAVIOR

Use Framer Motion:

useScroll

useTransform

useSpring

Motion values

or GSAP ScrollTrigger where appropriate.

Animations should be reversible.

For example:

scroll progress 0%   → section hidden
scroll progress 25%  → section entering
scroll progress 50%  → section fully visible
scroll progress 75%  → section leaving
scroll progress 100% → next section


Scrolling backwards should reverse these transformations naturally.

SECTION TRANSITION STYLE

Make sections feel like they are part of one continuous cinematic experience.

Do NOT simply stack:

section
section
section
section


Instead, use:

Large viewport sections

Sticky/pinned content where appropriate

Layered elements

Scale

Opacity

Translation

Parallax

Blur

Clip-path reveals

Image zoom

Text movement

Each section should have its own animation.

1. HERO

Full viewport.

Content:

COMPUTER SCIENCE & ENGINEERING

Research • Creativity • Innovation

Description:

"Empowering students to explore technology, research, creativity and innovation."

Buttons:

Explore Research Club

Explore Editing Club

HERO SCROLL ANIMATION

At the beginning:

Hero title is large and centered.

As user scrolls DOWN:

Title slowly scales down.

Title moves upward.

Subtitle fades.

Background image zooms.

Floating technology elements move using parallax.

Hero gradually fades/transform into the Department section.

As user scrolls UP:

All of these animations must reverse smoothly.

2. DEPARTMENT

Heading:

Computer Science & Engineering Department

Use:

Large department image

Description

4 statistics

Statistics:

2 Clubs

21+ Members

Multiple Events

Innovation & Research

DEPARTMENT SCROLL ANIMATION

When scrolling DOWN into the section:

Image starts slightly zoomed.

Image moves into position.

Text slides upward.

Statistics reveal sequentially.

Background elements move at different speeds.

When scrolling UP:

Everything reverses.

The statistics disappear in reverse order.

Text moves back.

Image zooms back.

3. LEADERSHIP

Heading:

Our Leadership

Show exactly 3 people:

Head of Club

Vice Principal

Head of Department

Use placeholder:

Name Here

Images:

/images/leadership/head-of-club.jpg
/images/leadership/vice-principal.jpg
/images/leadership/hod.jpg


LEADERSHIP SCROLL ANIMATION

Create a large sticky storytelling section.

As user scrolls DOWN:

Step 1

Head of Club appears.

Step 2

Head of Club moves away.

Vice Principal appears.

Step 3

Vice Principal moves away.

HOD appears.

Step 4

HOD moves away and the next section begins.

Use:

Image scale

Fade

Slide

Blur

Crossfade

Parallax

When scrolling UP, the entire sequence must play backward:

HOD → Vice Principal → Head of Club.

4. CLUB IN-CHARGE

Heading:

Club In-Charge

Show:

Large image

Name

Designation

Description

Image:

/images/leadership/club-incharge.jpg

Name:

Name Here

SCROLL ANIMATION

When scrolling DOWN:

Image begins zoomed

Image reveals through clip-path

Image scales down

Text enters from the side

Background changes

When scrolling UP:

Reverse every transformation.

5. RESEARCH CLUB PREVIEW

Heading:

Research Club

Tagline:

Explore. Experiment. Discover.

Short description about:

AI

Machine Learning

Research

Emerging Technologies

Innovation

Add a large research-themed image.

Button:

Explore Research Club →

Link:

/research-club

SCROLL ANIMATION

As user scrolls DOWN:

Large word "RESEARCH" appears behind the content.

Image zooms from 1.2 → 1.

Text slides into position.

Cards appear sequentially.

Background particles move.

Section transitions into Editing Club.

When scrolling UP:

All effects reverse.

6. EDITING CLUB PREVIEW

Heading:

Editing Club

Tagline:

Create. Edit. Inspire.

Short description about:

Video Editing

Photography

Graphic Design

Motion Graphics

Visual Storytelling

Add a large cinematic editing-related image.

Button:

Explore Editing Club →

Link:

/editing-club

SCROLL ANIMATION

As user scrolls DOWN:

Image starts zoomed.

Image slowly zooms out.

Text reveals.

Creative images/elements slide into view.

Background transitions.

Large typography moves behind the content.

When scrolling UP:

Reverse all animations naturally.

7. FINAL CTA

Full-screen section.

Heading:

EXPLORE. CREATE. INNOVATE.

Description:

"Discover the communities that turn ideas into technology, research and creativity."

Buttons:

Research Club

Editing Club

SCROLL ANIMATION

As user scrolls DOWN:

Typography scales up.

Background gradually transforms.

Buttons reveal.

Particles move.

As user scrolls UP:

Everything reverses.

NAVBAR

Sticky navbar:

Computer Science & Engineering

Links:

Home

Research Club

Editing Club

Gallery

Events

These links should point to future pages:

/
 /research-club
 /editing-club
 /gallery
 /events


Do NOT create those pages now.

IMPORTANT ANIMATION RULE

Every major animation must be reversible.

Do NOT use animations that only play once.

Bad:

whileInView → animate once


Preferred:

useScroll()
useTransform()
useSpring()


The visual state must depend on the current scroll position.

For example:

Scroll down:
0 → 1

Scroll up:
1 → 0


Therefore:

Scrolling DOWN = forward animation

Scrolling UP = reverse animation

If the user scrolls quickly upward, the page should smoothly reverse rather than replaying every animation from the beginning.

PERFORMANCE

Keep the scroll animation smooth.

Prefer:

transform

opacity

scale

translate

GPU-friendly animations

Avoid excessive:

box-shadow animation

filter animation

expensive layout changes

Use lazy-loaded images.

RESPONSIVE

Desktop:

Use the full cinematic scroll experience.

Tablet:

Reduce animation complexity where necessary.

Mobile:

Keep the same visual concept but simplify complex pinned/horizontal animations if they hurt usability or performance.

Never create horizontal overflow.

FINAL REQUIREMENT

Build ONLY the homepage.

Do NOT create:

Research Club page

Editing Club page

Gallery page

Events page

Member pages

The homepage should contain only:

Hero → Department → Leadership → Club In-Charge → Research Club Preview → Editing Club Preview → Final CTA → Footer

The defining feature must be:

SCROLL DOWN = ANIMATION FORWARD

SCROLL UP = ANIMATION BACKWARD

The animation must be controlled by the user's scroll position and must work smoothly in both directions.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/069ceaf9-f904-424e-a2d6-553db53569e0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
