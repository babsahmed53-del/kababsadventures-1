KABABS ADVENTURES WEBSITE — STARTER PROJECT

PROJECT STRUCTURE
kababs-adventures/
  index.html
  about.html
  trips.html
  gallery.html
  contact.html
  css/style.css
  js/script.js
  images/README.txt

1. OPEN IN VS CODE
- Extract the ZIP file.
- Open VS Code.
- Choose File > Open Folder and select the kababs-adventures folder.
- Install the Live Server extension (by Ritwick Dey) if you want automatic browser refresh.
- Right-click index.html and choose Open with Live Server. Alternatively, double-click index.html to open it in a browser.

2. IMPORTANT SETTINGS BEFORE PUBLISHING
Open js/script.js and edit SITE_CONFIG:
- whatsappNumber: replace 233000000000 with your official Ghana WhatsApp number, digits only (no +, spaces or hyphens).
- phoneDisplay: replace +233 XX XXX XXXX with the public phone number.
Also update the sample trips array in js/script.js with confirmed dates, prices, seat counts, descriptions and inclusions. These starter trip prices and seat counts are examples only, not real offers.
Update social media links in each HTML page. Add your own photos to images/ and update the image paths/URLs. Replace sample testimonials with real reviews only after getting permission.

3. HOW THE WEBSITE WORKS
- Each HTML file is a separate page.
- css/style.css controls shared layout, colours, typography and responsive design.
- js/script.js controls the mobile menu, trip cards, trip filters, trip details modal, WhatsApp enquiry, gallery lightbox, reveal animations, FAQ is native HTML details/summary, and footer year.
- Booking and contact forms validate in the browser and open WhatsApp with a prepared message. There is no database, payment gateway or booking-management backend. The customer must press Send in WhatsApp, and your team must confirm availability and the booking.

4. PUBLISH WITH GITHUB PAGES
- Create/sign in to a GitHub account.
- Create a new public repository named kababs-adventures (or another name you prefer).
- Upload the CONTENTS of this folder so index.html is at the repository root (not buried in another folder).
- In GitHub, open Settings > Pages.
- Under Build and deployment, choose Deploy from a branch.
- Select branch main and folder /(root), then Save.
- Wait for GitHub Pages to publish. Your site address will be shown in Settings > Pages.
- Whenever you edit files, commit/push the changes to the main branch; GitHub Pages will publish the update.

5. BEFORE GOING LIVE
- Test every navigation link and every form on a phone and desktop.
- Replace every placeholder number and social link.
- Confirm all trip prices, dates, seat counts and included services.
- Replace demo imagery and sample testimonials with authentic, permission-cleared content.
- Add a real email address and consider a form backend if you want messages delivered without WhatsApp.
- Test your official WhatsApp number from a different phone.

This is a static HTML/CSS/JavaScript website. GitHub Pages can host it for free; no server-side code is required for the current WhatsApp enquiry workflow.
