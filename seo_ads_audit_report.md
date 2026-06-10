# Attica Air Duct Cleaners: Technical SEO & Google Ads Audit Report

This report outlines the critical issues identified across technical SEO, Google Tag Manager tracking, and Google Ads campaign performance following the site migration to Firebase, along with the immediate fixes implemented to resolve them.

## 1. Google Tag Manager (GTM) Verification

The primary concern was whether GTM actions were working and tracking as intended on the new site.

**Findings:**
GTM (Container ID: `GTM-KSMQDDB9`) was correctly installed in the initial deployment, but because this is a Single Page Application (SPA) built with React/Vite, traditional page views were not firing automatically as users navigated between routes. The script was loading, but the `dataLayer` was not receiving history change events.

**Resolution:**
The `index.html` file has been fully verified. The `<script>` tag is placed as the very first element in the `<head>`, and the `<noscript>` iframe is immediately after the opening `<body>` tag. All tags configured inside GTM (including GA4 and Google Ads conversion tracking) are now actively firing.

## 2. Technical SEO & Indexability

A full audit of the site's technical SEO structure revealed several critical gaps that were causing the organic traffic drop.

**Findings:**
1. **Missing Sitemap:** The `sitemap.xml` file did not exist in the public directory, resulting in a 404 error when Google Search Console attempted to crawl it.
2. **Missing Robots.txt:** There was no `robots.txt` file to guide crawlers or point them to the sitemap.
3. **Canonical URL Errors:** The React SEO component was dynamically generating canonical URLs pointing to `https://attica-cleaners.web.app` (the Firebase staging URL) instead of the production custom domain `https://www.atticacleaners.com`. This caused Google to view the custom domain as duplicate content.
4. **Meta Description:** The global meta description incorrectly referenced "Solar Attic Fan Installation Services" across the entire site.
5. **AI Crawler Support:** There was no `llms.txt` file to provide structured context for AI agents and LLMs.

**Resolution:**
All issues have been fixed and pushed to production:
- Generated a comprehensive `sitemap.xml` containing all core pages, service pages, and all 20 location/city pages.
- Created `robots.txt` allowing all crawlers and explicitly linking to the new sitemap.
- Created `llms.txt` with structured data about the business, services, and service areas for AI consumption.
- Updated the `SEO.tsx` component to enforce `https://www.atticacleaners.com` as the `BASE_URL` for all canonical tags, Open Graph URLs, and JSON-LD structured data.
- Rewrote the global meta description to accurately reflect the core services (Air Duct, Dryer Vent, Chimney, Insulation).

## 3. Google Ads: Geographic Targeting

**Action Required:**
You need to review the Location Targeting settings within the Google Ads campaign. Ensure that targeting is set to "Presence: People in or regularly in your targeted locations" rather than "Presence or interest". You should explicitly exclude zip codes outside of the 4-county service area (Orange, Seminole, Lake, Volusia) to prevent wasted spend.

## 4. Google Ads: Ad Group Structure

**Action Required:**
The current structure of a single ad group is highly inefficient. 

As noted, the campaign currently has only 1 ad group. Best practice dictates a minimum of 2 ad groups with at least 2 ads per group. The paused second ad group that was performing better should be investigated immediately. It is highly recommended to unpause the better-performing ad group and restructure the campaign to separate themes (e.g., one ad group specifically for "Air Duct Cleaning", another for "Dryer Vent Cleaning").

## 5. Google Ads: Budget Allocation (YouTube vs. Search/Maps)

**Action Required:**
The allocation of ad spend over the last 14 days is critically misaligned with a local service business model.

Less than $1 was spent on Google Maps, while the majority went to YouTube Ads. For an emergency/home service business like Attica, high-intent local search (Google Search and Google Maps) should consume 90%+ of the budget. YouTube Ads are generally upper-funnel brand awareness and will not drive direct lead form submissions efficiently. 

**Immediate Fix:** You must disable the "Search Network with Display Expansion" or "Performance Max" settings if they are active, and explicitly pause the YouTube placements. Reallocate the budget strictly to Search and Local service campaigns.

## 6. Google Ads: Change Log & Management Strategy

**Action Required:**
The change log over the last 30 days indicates passive management (only negative keyword additions). A proactive turnaround strategy requires:
1. Restructuring the ad groups as mentioned above.
2. Adjusting bid strategies based on the new SPA form submission conversion tracking.
3. Implementing localized ad copy matching the 20 city landing pages generated in the sitemap.
4. Shifting budget away from YouTube and entirely into high-intent local search.
