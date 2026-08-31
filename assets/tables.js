document.addEventListener('DOMContentLoaded', function () {
  try {
    // Find all tables on the page and apply brand styles if not already present
    document.querySelectorAll('table').forEach(function (tbl) {
      if (tbl.classList.contains('brand-table')) return; // skip if already styled

      // Add brand class to table
      tbl.classList.add('brand-table');

      // Ensure table has a role and accessible label if missing
      if (!tbl.hasAttribute('role')) tbl.setAttribute('role', 'table');
      if (!tbl.getAttribute('aria-label') && tbl.querySelector('caption')) {
        tbl.setAttribute('aria-label', tbl.querySelector('caption').innerText.trim());
      }

      // Wrap the table in a card container for consistent appearance
      var wrapper = document.createElement('div');
      wrapper.className = 'table-card';

      tbl.parentNode.insertBefore(wrapper, tbl);
      wrapper.appendChild(tbl);
    });
  } catch (e) {
    // Fail silently but log for debugging
    console.error('tables.js: failed to enhance tables', e);
  }
});
