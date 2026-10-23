TravelX linked pages bundle

Main entry: index.html
Main customer-facing dashboard: Dashboard/index.html
Admin dashboard: Admin/admin-dashboard.html

The included travelx-global-nav.js adds a responsive TravelX navigation menu to every HTML page. It links Travel, Booking, Admin, Company, Information, Legal/Support, and Account pages. Existing internal anchor links were also repaired where a matching page exists.

Important: this ZIP contains the pages and their CSS/JS from the uploaded Admin.zip, but does not contain the project's public/images/logo.png or other external assets. Keep/copy your existing Frontend/public assets in your actual project.

For the existing project, place the contents of the folders Admin, Booking, company, Dashboard, Information, legal_footer, passworddrama, Travel, and User inside Frontend/src/pages, and put travelx-global-nav.js and travelx-global-nav.css at Frontend/src/pages/. Open Dashboard/index.html through your local server.

Note: linking pages does not implement authentication, database-backed bookings, or payment processing; those require backend integration.
