document.addEventListener('DOMContentLoaded', () => {

  const page = document.getElementById('notfoundPage');
  const clouds = document.querySelectorAll('.cloud');
  const searchInput = document.getElementById('destSearch');
  const searchBtn = document.getElementById('destSearchBtn');
  const suggestions = document.getElementById('suggestions');

  const KNOWN_DESTINATIONS = [
    'Turkey', 'Bali', 'Thailand', 'Japan', 'Ladakh', 'Rajasthan', 'Spiti', 'Meghalaya', 'Coorg', 'Kerala'
  ];

  /* ---------- Mouse parallax on clouds ---------- */
  page.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;

    clouds.forEach((cloud, i) => {
      const depth = (i + 1) * 8;
      cloud.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });

  /* ---------- Mock destination search ---------- */
  function runSearch() {
    const query = searchInput.value.trim();
    if (!query) {
      suggestions.textContent = '';
      return;
    }

    const match = KNOWN_DESTINATIONS.find(
      (d) => d.toLowerCase() === query.toLowerCase()
    );

    const partial = KNOWN_DESTINATIONS.filter((d) =>
      d.toLowerCase().includes(query.toLowerCase())
    );

    if (match) {
      suggestions.textContent = `Great choice — redirecting you to ${match}…`;
      setTimeout(() => {
        // In a real site this would route to a destination page.
        suggestions.textContent = `(Demo) Would navigate to /destinations/${match.toLowerCase()}`;
      }, 900);
    } else if (partial.length) {
      suggestions.textContent = `Did you mean: ${partial.join(', ')}?`;
    } else {
      suggestions.textContent = `No matches for "${query}" — try Bali, Turkey, or Ladakh.`;
    }
  }

  searchBtn.addEventListener('click', runSearch);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runSearch();
  });

});
