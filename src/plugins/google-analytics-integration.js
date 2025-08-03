export default function googleAnalyticsIntegration(options = {}) {
  const GA_MEASUREMENT_ID = options.measurementId || 'G-4T628XHQ7P';
  
  return {
    name: 'google-analytics-integration',
    hooks: {
      'astro:config:setup': ({ injectScript }) => {
        // Inject the Google Analytics script into all pages
        injectScript('head-inline', `
          (function() {
            // Load gtag.js asynchronously
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
            document.head.appendChild(script);
            
            // Initialize dataLayer and gtag
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          })();
        `);
      }
    }
  };
}