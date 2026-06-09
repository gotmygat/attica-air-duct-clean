<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Sitemap — Attica Air Duct Cleaners</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8f9fa; color: #333; }
          header { background: #1a4a2e; color: white; padding: 24px 40px; }
          header h1 { font-size: 22px; font-weight: 700; }
          header p { font-size: 14px; opacity: 0.8; margin-top: 4px; }
          .container { max-width: 960px; margin: 32px auto; padding: 0 24px; }
          .stats { display: flex; gap: 16px; margin-bottom: 24px; }
          .stat { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px 24px; }
          .stat strong { display: block; font-size: 28px; font-weight: 700; color: #1a4a2e; }
          .stat span { font-size: 13px; color: #666; }
          table { width: 100%; background: white; border: 1px solid #e2e8f0; border-radius: 8px; border-collapse: collapse; overflow: hidden; }
          thead tr { background: #1a4a2e; color: white; }
          thead th { padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
          tbody tr:nth-child(even) { background: #f8fafb; }
          tbody tr:hover { background: #e8f5ee; }
          tbody td { padding: 11px 16px; font-size: 14px; border-bottom: 1px solid #eee; }
          a { color: #1a4a2e; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; background: #e8f5ee; color: #1a4a2e; }
          footer { text-align: center; padding: 24px; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <header>
          <h1>Attica Air Duct Cleaners — Sitemap</h1>
          <p>All indexed pages for www.atticacleaners.com</p>
        </header>
        <div class="container">
          <div class="stats">
            <div class="stat">
              <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>
              <span>Total URLs</span>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Change Freq</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                  <td><xsl:value-of select="sitemap:lastmod"/></td>
                  <td><span class="badge"><xsl:value-of select="sitemap:changefreq"/></span></td>
                  <td><xsl:value-of select="sitemap:priority"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
        <footer>Generated for atticacleaners.com</footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
