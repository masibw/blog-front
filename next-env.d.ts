/// <reference types="next" />
/// <reference types="next/types/global" />

interface Window {
  gtag(type: 'config', googleAnalyticsId: string, { page_path: string });
  gtag(
    type: 'event',
    eventAction: string,
    fieldObject: {
      // eslint-disable-next-line camelcase
      event_label: string;
      // eslint-disable-next-line camelcase
      event_category: string;
      value?: number;
    },
  );
}
