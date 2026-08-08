/* =========================================================
   TRAVELX COMPANY DASHBOARD JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =====================================================
     ELEMENTS
  ====================================================== */

  const sidebar =
    document.getElementById("sidebar");

  const menuToggle =
    document.getElementById("menuToggle");

  const sidebarOverlay =
    document.getElementById("sidebarOverlay");

  const modal =
    document.getElementById("listingModal");

  const openListingBtn =
    document.getElementById("openListingBtn");

  const closeModalBtn =
    document.getElementById("closeModalBtn");

  const cancelModalBtn =
    document.getElementById("cancelModalBtn");

  const listingForm =
    document.getElementById("listingForm");

  const listingList =
    document.getElementById("listingList");

  const searchInput =
    document.getElementById("searchInput");

  const logoutBtn =
    document.getElementById("logoutBtn");


  /* =====================================================
     MOBILE SIDEBAR
  ====================================================== */

  function openSidebar() {

    sidebar.classList.add("open");

    sidebarOverlay.classList.add("open");

    document.body.style.overflow = "hidden";

  }


  function closeSidebar() {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove("open");

    document.body.style.overflow = "";

  }


  if (menuToggle) {

    menuToggle.addEventListener(
      "click",
      openSidebar
    );

  }


  if (sidebarOverlay) {

    sidebarOverlay.addEventListener(
      "click",
      closeSidebar
    );

  }


  /* =====================================================
     SIDEBAR NAVIGATION
  ====================================================== */

  document
    .querySelectorAll(".nav-item")
    .forEach((link) => {

      link.addEventListener("click", () => {

        document
          .querySelectorAll(".nav-item")
          .forEach((item) => {

            item.classList.remove("active");

          });


        link.classList.add("active");


        if (window.innerWidth <= 900) {

          closeSidebar();

        }

      });

    });


  /* =====================================================
     MODAL
  ====================================================== */

  function openModal() {

    modal.classList.add("open");

    document.body.style.overflow = "hidden";

  }


  function closeModal() {

    modal.classList.remove("open");

    document.body.style.overflow = "";

  }


  if (openListingBtn) {

    openListingBtn.addEventListener(
      "click",
      openModal
    );

  }


  if (closeModalBtn) {

    closeModalBtn.addEventListener(
      "click",
      closeModal
    );

  }


  if (cancelModalBtn) {

    cancelModalBtn.addEventListener(
      "click",
      closeModal
    );

  }


  /* Close modal outside box */

  if (modal) {

    modal.addEventListener("click", (event) => {

      if (event.target === modal) {

        closeModal();

      }

    });

  }


  /* Close modal with ESC */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      closeModal();

      closeSidebar();

    }

  });


  /* =====================================================
     ADD NEW LISTING
  ====================================================== */

  if (listingForm) {

    listingForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const name =
          document
            .getElementById("listingName")
            .value
            .trim();


        const type =
          document
            .getElementById("listingType")
            .value;


        const price =
          document
            .getElementById("listingPrice")
            .value;


        if (!name || !price) {

          return;

        }


        const formattedPrice =
          Number(price)
            .toLocaleString("en-IN");


        const randomSeed =
          encodeURIComponent(name);


        const listing =
          document.createElement("div");


        listing.className =
          "listing-item";


        listing.innerHTML = `

                    <div
                        class="listing-image"
                        style="
                            background-image:
                            url(
                                'https://picsum.photos/seed/${randomSeed}/150/100'
                            );
                        "
                    ></div>


                    <div class="listing-info">

                        <strong>
                            ${escapeHTML(name)}
                        </strong>

                        <span>
                            1D · ${escapeHTML(type)}
                        </span>

                        <b>
                            ₹${formattedPrice}
                        </b>

                    </div>


                    <span class="status review">
                        In Review
                    </span>


                    <div class="listing-actions">

                        <button
                            class="edit-btn"
                            title="Edit">
                            ✎
                        </button>

                        <button
                            class="delete-btn"
                            title="Delete">
                            ♜
                        </button>

                    </div>

                `;


        listingList.prepend(listing);


        listingForm.reset();

        closeModal();

        bindListingActions();

      });

  }


  /* =====================================================
     DELETE / EDIT LISTING
  ====================================================== */

  function bindListingActions() {


    document
      .querySelectorAll(".delete-btn")
      .forEach((button) => {

        button.onclick = () => {

          const listing =
            button.closest(".listing-item");


          const listingName =
            listing
              ?.querySelector(".listing-info strong")
              ?.textContent;


          const confirmed =
            confirm(
              `Remove "${listingName}" from your listings?`
            );


          if (confirmed) {

            listing.remove();

          }

        };

      });


    document
      .querySelectorAll(".edit-btn")
      .forEach((button) => {

        button.onclick = () => {

          alert(
            "Edit listing functionality will be connected to the backend later."
          );

        };

      });

  }


  bindListingActions();


  /* =====================================================
     SEARCH
  ====================================================== */

  if (searchInput) {

    searchInput.addEventListener(
      "input",
      () => {

        const query =
          searchInput.value
            .toLowerCase()
            .trim();


        /* Search bookings */

        document
          .querySelectorAll(
            "#bookingTableBody tr"
          )
          .forEach((row) => {

            const text =
              row.textContent
                .toLowerCase();


            row.style.display =
              text.includes(query)
                ? ""
                : "none";

          });


        /* Search listings */

        document
          .querySelectorAll(
            "#listingList .listing-item"
          )
          .forEach((item) => {

            const text =
              item.textContent
                .toLowerCase();


            item.style.display =
              text.includes(query)
                ? ""
                : "none";

          });

      });

  }


  /* =====================================================
     CHART ANIMATION
  ====================================================== */

  const chartBars =
    document.querySelectorAll(".chart-bar");


  chartBars.forEach((bar, index) => {

    const height =
      bar.dataset.height || "50%";


    setTimeout(() => {

      bar.style.height = height;

    }, 150 + (index * 100));

  });


  /* =====================================================
     QUICK ACTIONS
  ====================================================== */

  document
    .querySelectorAll(".quick-action")
    .forEach((action) => {

      action.addEventListener(
        "click",
        () => {

          const type =
            action.dataset.action;


          if (type === "add-listing") {

            openModal();

          }


          if (type === "bookings") {

            document
              .getElementById("bookings")
              .scrollIntoView({
                behavior: "smooth"
              });

          }


          if (type === "earnings") {

            document
              .getElementById("earnings")
              .scrollIntoView({
                behavior: "smooth"
              });

          }

        });

    });


  /* =====================================================
     PERIOD SELECT
  ====================================================== */

  const periodSelect =
    document.querySelector(".period-select");


  if (periodSelect) {

    periodSelect.addEventListener(
      "change",
      () => {

        /*
            Backend se real data connect
            hone ke baad yahan chart update
            kiya ja sakta hai.
        */

        console.log(
          "Selected period:",
          periodSelect.value
        );

      });

  }


  /* =====================================================
     LOGOUT
  ====================================================== */

  if (logoutBtn) {

    logoutBtn.addEventListener(
      "click",
      () => {

        const confirmLogout =
          confirm(
            "Are you sure you want to logout?"
          );


        if (!confirmLogout) {

          return;

        }


        sessionStorage.removeItem(
          "companyLoggedIn"
        );


        /*
            Agar tumhare project me
            company login ka actual path
            alag hai to yahan change karna.
        */

        window.location.href =
          "../Admin_and_legal/admin-login.html";

      });

  }


  /* =====================================================
     SETTINGS BUTTON
  ====================================================== */

  const settingsBtn =
    document.querySelector(".settings-btn");


  if (settingsBtn) {

    settingsBtn.addEventListener(
      "click",
      () => {

        alert(
          "Company settings page will be connected here."
        );

      });

  }


  /* =====================================================
     NOTIFICATION
  ====================================================== */

  const notificationBtn =
    document.querySelector(
      ".notification-btn"
    );


  if (notificationBtn) {

    notificationBtn.addEventListener(
      "click",
      () => {

        alert(
          "You have 3 new partner notifications."
        );

      });

  }


  /* =====================================================
     ESCAPE HTML
     Prevents user input from becoming HTML.
  ====================================================== */

  function escapeHTML(value) {

    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }

});