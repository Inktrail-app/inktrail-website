# InkTrail Website Content Management Guide

This website has been architected with a **lightweight, centralized content configuration system**. You can update any headline, text, button label, external URL, social media account, or visual gallery item **without writing code** and **without paying for an expensive third-party CMS subscription**.

---

## Where to Make Content Changes

All website content is managed in a single, well-documented file:

📁 **`assets/content.js`**

You can open and edit this file in any text editor (such as VS Code, Notepad++, or standard Notepad).

---

## Common Editing Tasks

### 1. Changing Headlines & Subtitles
Look for the `hero` section in `assets/content.js`:
```javascript
hero: {
  badge: "The Global Tattoo Discovery Network",
  headline: "Travel the World. Discover Your Next Tattoo.",
  subtitle: "Discover tattoo artists, explore unique styles, and find your next tattoo wherever your journey takes you.",
  ...
}
```
Simply edit the text between the quotation marks `""` and save the file.

---

### 2. Updating Social Media & Contact Links
Look for the `social` section in `assets/content.js`:
```javascript
social: {
  instagram: "https://www.instagram.com/inktrail.app/",
  tiktok: "https://www.tiktok.com/@inktrail.app?lang=fr",
  whatsapp: "https://wa.me/33689978110",
  supportEmail: "mailto:inktrailapp@gmail.com"
}
```
Update any URL or phone number. When you save, all header, footer, and contact links will automatically point to your updated channels.

---

### 3. Updating Button Destinations & Labels
Look for the `primaryButtons` section:
```javascript
primaryButtons: {
  findArtist: {
    label: "Find Artist",
    url: "https://d72921c3b2.draftbit.dev/search"
  },
  createProfile: {
    label: "Create a Profile",
    url: "https://d72921c3b2.draftbit.dev/portal"
  },
  downloadApp: {
    label: "Download the App",
    url: "download.html"
  }
}
```
To change where the buttons lead, update the `url` property.

---

### 4. Updating the Google Play Android Link
When your Android app is published on the Google Play Store:
1. Open `assets/content.js` and set:
   ```javascript
   appLinks: {
     ios: "https://apps.apple.com/us/app/inktr%CE%BBil/id6799230498",
     android: "https://play.google.com/store/apps/details?id=YOUR_APP_ID"
   }
   ```
2. Open `download.html` and update the `ANDROID_URL` constant near the top:
   ```javascript
   const ANDROID_URL = "https://play.google.com/store/apps/details?id=YOUR_APP_ID";
   ```

---

### 5. Updating the Visual Discovery Gallery / Carousel
Look for the `gallery.items` array in `assets/content.js`. You can add new images or change existing ones:
```javascript
{
  id: "fine-line",
  title: "Delicate Fine Line Work",
  category: "Fine Line & Minimalist",
  imageWebp: "assets/gallery/fine-line.webp",
  imageJpg: "assets/gallery/fine-line.jpg",
  alt: "Delicate fine line tattoo work"
}
```
Place your new image file in `assets/gallery/` and reference its path here.

---

### 6. Updating "Who's Damien?" (Photo & Story)
You can easily update your photo, bio, tagline, quote, and travel stats in `assets/content.js`:

#### A. Replacing Your Photo:
1. Save your new photo file as `assets/damien.jpg` (replacing the current placeholder).
2. If using a different filename, open `assets/content.js` and update:
   ```javascript
   aboutDamien: {
     photo: "assets/your-new-photo.jpg",
     photoAlt: "Damien, founder of InkTrail"
   }
   ```

#### B. Editing Your Story & Bio:
Look for the `aboutDamien` section in `assets/content.js`:
```javascript
aboutDamien: {
  title: "Who’s Damien?",
  tagline: "Backpacker on a mission to get a tattoo in every country I visit.",
  paragraphs: [
    "Your story paragraph 1...",
    "Your story paragraph 2...",
    "Your story paragraph 3..."
  ],
  quote: "“Your favorite personal quote...”",
  author: "— Damien, Creator of InkTrail"
}
```
Simply edit any text between the quotation marks `""` and save. Changes appear immediately on the website!

---

### 7. Updating Technical SEO & Page Metadata
In `assets/content.js`, you can adjust the title, description, and keywords:
```javascript
meta: {
  siteTitle: "INKTRΛIL — Connect with Tattoo Artists Worldwide | Travel & Inking Platform",
  description: "Discover certified tattoo artists, explore authentic styles, and book your next tattoo wherever you travel.",
  canonicalUrl: "https://inktrailapp.com/",
  ...
}
```

---

## Summary of Benefits
* **Zero Recurring Fees:** No monthly subscription to Contentful, Sanity, or Prismic.
* **100% Client Ownership:** Everything stays inside your own repository and hosting account.
* **Fast Performance:** No slow external API calls or database delays.
* **Instant Updates:** Changes take effect immediately when published.
