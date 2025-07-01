// Currently not used, but can be used to inject SEO data into the page
// or to trigger messages between background and popup
console.log("SEO Scanner Content Script Loaded");

// Example function if you want to send SEO data from content to popup
function scanSEO() {
  const title = document.querySelector('title')?.innerText || '';
  const description = document.querySelector('meta[name="description"]')?.content || '';
  const h1Tags = [...document.querySelectorAll('h1')].map(h => h.innerText.trim());
  const altTags = [...document.querySelectorAll('img')].map(img => img.alt).filter(Boolean);
  const canonical = document.querySelector('link[rel="canonical"]')?.href || '';

  return { title, description, h1Tags, altTags, canonical };
}
