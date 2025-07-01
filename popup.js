chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    func: scanSEO,
  }, (results) => {
    const seoData = results[0].result;
    document.getElementById("seo-results").innerHTML = `
      <strong>Title:</strong> ${seoData.title}<br>
      <strong>Description:</strong> ${seoData.description}<br>
      <strong>Headings (H1):</strong> ${seoData.h1Tags.join(', ')}<br>
      <strong>Image Alts:</strong> ${seoData.altTags.slice(0, 3).join(', ')}<br>
      <strong>Canonical:</strong> ${seoData.canonical}<br>
    `;
  });
});

function scanSEO() {
  const title = document.querySelector('title')?.innerText || '';
  const description = document.querySelector('meta[name="description"]')?.content || '';
  const h1Tags = [...document.querySelectorAll('h1')].map(h => h.innerText.trim());
  const altTags = [...document.querySelectorAll('img')].map(img => img.alt).filter(Boolean);
  const canonical = document.querySelector('link[rel="canonical"]')?.href || '';

  return { title, description, h1Tags, altTags, canonical };
}
