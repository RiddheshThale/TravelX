(() => {
  const current = document.currentScript;
  if (!current || document.getElementById('travelx-global-nav')) return;
  const pagesRoot = new URL('.', current.src);
  const route = p => new URL(p, pagesRoot).href;
  const groups = [
    {label:'Travel', items:[['Destinations','Travel/destinations.html'],['Flights','Travel/flights.html'],['Flight details','Travel/flight-details.html'],['Hotels','Travel/hotels.html'],['Hotel details','Travel/hotel-details.html'],['Packages','Travel/packages.html'],['Package details','Travel/packages-details.html']]},
    {label:'Booking', items:[['Book a trip','Booking/booking.html'],['Checkout','Booking/checkout.html'],['Payment','Booking/payment.html'],['Confirmation','Booking/booking-confirmation.html'],['Booking history','Booking/booking-history.html']]},
    {label:'Company', items:[['Careers','company/careers.html'],['Our team','company/our-team.html'],['Partners','company/patners.html'],['Reviews','company/reviews.html']]},
    {label:'Explore', items:[['Blog','Information/blogs.html'],['Blog details','Information/blog-details.html'],['FAQ','Information/faq.html'],['Travel guide','Information/travel-guide.html']]},
    {label:'Support & Legal', items:[['About TravelX','legal_footer/aboutus.html'],['Contact','legal_footer/contact.html'],['Help center','legal_footer/helpcenter.html'],['Cancellation policy','legal_footer/cancellation-policy.html'],['Refunds','legal_footer/Refunds.html'],['Privacy policy','legal_footer/privacy-policy.html'],['Terms & conditions','legal_footer/terms-and-conditions.html']]},
    {label:'Admin', items:[['Admin dashboard','Admin/admin-dashboard.html'],['Admin login','Admin/admin-login.html'],['Admin profile','Admin/admin-profile.html'],['Settings / Extra','Admin/extra.html'],['Management / Extra 2','Admin/extra2.html'],['Manage bookings','Admin/manage-bookings.html'],['Manage flights','Admin/manage-flights.html'],['Manage hotels','Admin/manage-hotels.html'],['Manage packages','Admin/manage-packages.html'],['Manage users','Admin/manage-users.html'],['Reports','Admin/reports.html']]},
    {label:'Account', items:[['Sign in','passworddrama/signin.html'],['Create account','passworddrama/signup.html'],['Forgot password','passworddrama/Forgot-password.html'],['Page not found','passworddrama/Page-notFound.html'],['My profile','User/profil.html'],['Wishlist','User/wishlist.html'],['Sign out','passworddrama/signout.html']]}
  ];
  const nav = document.createElement('div'); nav.id='travelx-global-nav';
  const wrap=document.createElement('div'); wrap.className='tx-wrap';
  const brand=document.createElement('a'); brand.className='tx-brand'; brand.href=route('Dashboard/index.html'); brand.textContent='✦ TravelX';
  wrap.appendChild(brand);
  const links=document.createElement('div'); links.className='tx-links';
  const home=document.createElement('a'); home.href=route('Dashboard/index.html'); home.textContent='Main Dashboard'; links.appendChild(home);
  groups.forEach(group=>{const d=document.createElement('details');const sum=document.createElement('summary');sum.textContent=group.label+' ▾';d.appendChild(sum);const menu=document.createElement('div');menu.className='tx-menu';group.items.forEach(([label,path])=>{const a=document.createElement('a');a.href=route(path);a.textContent=label;menu.appendChild(a)});d.appendChild(menu);links.appendChild(d)});
  const admin=document.createElement('a');admin.className='tx-admin';admin.href=route('Admin/admin-dashboard.html');admin.textContent='Admin Dashboard';links.appendChild(admin);
  wrap.appendChild(links);nav.appendChild(wrap);
  const style=document.createElement('link');style.rel='stylesheet';style.href=route('travelx-global-nav.css');document.head.appendChild(style);
  document.body.insertBefore(nav,document.body.firstChild);
  document.addEventListener('click',e=>{if(!nav.contains(e.target))nav.querySelectorAll('details[open]').forEach(d=>d.removeAttribute('open'))});
})();
