// Internationalization and Multi-Region Pricing Matrix for Mind Garden Plus

/**
 * Automatically detects the user's local regional currency based on timezone and browser locale.
 * Supports India, Europe, UK, Canada, Australia, Japan, UAE, and Americas.
 */
export const detectDefaultCurrency = () => {
  try {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
    const lang = (navigator.language || '').toLowerCase();

    // India
    if (tz.includes('calcutta') || tz.includes('kolkata') || lang.includes('en-in') || lang.includes('hi')) {
      return 'INR';
    }
    // United Kingdom
    if (tz.includes('london') || lang.includes('en-gb')) {
      return 'GBP';
    }
    // Eurozone
    if (
      tz.includes('berlin') || tz.includes('paris') || tz.includes('madrid') || 
      tz.includes('rome') || tz.includes('amsterdam') || tz.includes('brussels') || 
      tz.includes('vienna') || tz.includes('dublin') || tz.includes('lisbon') ||
      lang.includes('de') || lang.includes('fr') || lang.includes('es-es') || lang.includes('it')
    ) {
      return 'EUR';
    }
    // Canada
    if (tz.includes('toronto') || tz.includes('vancouver') || tz.includes('montreal') || lang.includes('en-ca') || lang.includes('fr-ca')) {
      return 'CAD';
    }
    // Australia & NZ
    if (tz.includes('sydney') || tz.includes('melbourne') || tz.includes('brisbane') || tz.includes('perth') || lang.includes('en-au')) {
      return 'AUD';
    }
    // Japan
    if (tz.includes('tokyo') || lang.includes('ja')) {
      return 'JPY';
    }
    // UAE / Middle East
    if (tz.includes('dubai') || tz.includes('muscat') || lang.includes('ar-ae')) {
      return 'AED';
    }

    // Default international is USD
    return 'USD';
  } catch (e) {
    return 'INR';
  }
};

export const PRICING_PLANS = {
  INR: {
    symbol: '₹',
    code: 'INR',
    plans: [
      {
        id: 'weekly',
        name: 'Weekly Pass',
        durationDays: 7,
        price: '₹249',
        priceNumber: 249,
        period: '/ week',
        billedText: 'Billed weekly • ₹35 / day',
        effectiveRate: '₹249 / wk',
        savings: null,
        badge: null,
        description: 'Ideal for trying out full soundscapes and companions.'
      },
      {
        id: 'monthly',
        name: 'Monthly Sanctuary',
        durationDays: 30,
        price: '₹599',
        priceNumber: 599,
        period: '/ month',
        billedText: 'Billed monthly • Save ₹397 vs Weekly',
        effectiveRate: '₹149 / wk',
        savings: 'Save 40%',
        badge: 'Popular',
        description: '40% cheaper than weekly renewals. Full serene access.'
      },
      {
        id: 'yearly',
        name: 'Yearly Oasis',
        durationDays: 365,
        price: '₹1,999',
        priceNumber: 1999,
        period: '/ year',
        billedText: 'Billed yearly • Save ₹5,189 vs Monthly',
        effectiveRate: '₹166 / mo (₹38/wk)',
        savings: 'Save 72%',
        badge: 'Best Value',
        description: 'Massive 72% savings. Under ₹39/week for 365 days of peace.'
      }
    ]
  },
  USD: {
    symbol: '$',
    code: 'USD',
    plans: [
      {
        id: 'weekly',
        name: 'Weekly Pass',
        durationDays: 7,
        price: '$2.99',
        priceNumber: 2.99,
        period: '/ week',
        billedText: 'Billed weekly • $0.42 / day',
        effectiveRate: '$2.99 / wk',
        savings: null,
        badge: null,
        description: 'Flexible week-by-week mindfulness companion.'
      },
      {
        id: 'monthly',
        name: 'Monthly Sanctuary',
        durationDays: 30,
        price: '$6.99',
        priceNumber: 6.99,
        period: '/ month',
        billedText: 'Billed monthly • Save $4.97 vs Weekly',
        effectiveRate: '$1.74 / wk',
        savings: 'Save 41%',
        badge: 'Popular',
        description: 'Save 41% compared to weekly renewals.'
      },
      {
        id: 'yearly',
        name: 'Yearly Oasis',
        durationDays: 365,
        price: '$24.99',
        priceNumber: 24.99,
        period: '/ year',
        billedText: 'Billed yearly • Save $58.89 vs Monthly',
        effectiveRate: '$2.08 / mo ($0.48/wk)',
        savings: 'Save 70%',
        badge: 'Best Value',
        description: 'Maximum 70% discount. 365 days of full sanctuary perks.'
      }
    ]
  },
  EUR: {
    symbol: '€',
    code: 'EUR',
    plans: [
      {
        id: 'weekly',
        name: 'Weekly Pass',
        durationDays: 7,
        price: '€2.99',
        priceNumber: 2.99,
        period: '/ week',
        billedText: 'Billed weekly • €0.42 / day',
        effectiveRate: '€2.99 / wk',
        savings: null,
        badge: null,
        description: 'Flexible week-by-week mindfulness companion.'
      },
      {
        id: 'monthly',
        name: 'Monthly Sanctuary',
        durationDays: 30,
        price: '€6.49',
        priceNumber: 6.49,
        period: '/ month',
        billedText: 'Billed monthly • Save €5.47 vs Weekly',
        effectiveRate: '€1.62 / wk',
        savings: 'Save 45%',
        badge: 'Popular',
        description: 'Save 45% compared to weekly renewals.'
      },
      {
        id: 'yearly',
        name: 'Yearly Oasis',
        durationDays: 365,
        price: '€22.99',
        priceNumber: 22.99,
        period: '/ year',
        billedText: 'Billed yearly • Save €54.89 vs Monthly',
        effectiveRate: '€1.91 / mo (€0.44/wk)',
        savings: 'Save 70%',
        badge: 'Best Value',
        description: 'Maximum 70% discount. 365 days of peaceful sanctuary.'
      }
    ]
  },
  GBP: {
    symbol: '£',
    code: 'GBP',
    plans: [
      {
        id: 'weekly',
        name: 'Weekly Pass',
        durationDays: 7,
        price: '£2.49',
        priceNumber: 2.49,
        period: '/ week',
        billedText: 'Billed weekly • £0.35 / day',
        effectiveRate: '£2.49 / wk',
        savings: null,
        badge: null,
        description: 'Flexible week-by-week mindfulness companion.'
      },
      {
        id: 'monthly',
        name: 'Monthly Sanctuary',
        durationDays: 30,
        price: '£5.99',
        priceNumber: 5.99,
        period: '/ month',
        billedText: 'Billed monthly • Save £3.97 vs Weekly',
        effectiveRate: '£1.49 / wk',
        savings: 'Save 40%',
        badge: 'Popular',
        description: 'Save 40% compared to weekly renewals.'
      },
      {
        id: 'yearly',
        name: 'Yearly Oasis',
        durationDays: 365,
        price: '£19.99',
        priceNumber: 19.99,
        period: '/ year',
        billedText: 'Billed yearly • Save £51.89 vs Monthly',
        effectiveRate: '£1.66 / mo (£0.38/wk)',
        savings: 'Save 72%',
        badge: 'Best Value',
        description: '72% savings. Under £0.39/week for 365 days of calm.'
      }
    ]
  },
  CAD: {
    symbol: 'CA$',
    code: 'CAD',
    plans: [
      {
        id: 'weekly',
        name: 'Weekly Pass',
        durationDays: 7,
        price: 'CA$3.99',
        priceNumber: 3.99,
        period: '/ week',
        billedText: 'Billed weekly • CA$0.57 / day',
        effectiveRate: 'CA$3.99 / wk',
        savings: null,
        badge: null,
        description: 'Flexible week-by-week companion.'
      },
      {
        id: 'monthly',
        name: 'Monthly Sanctuary',
        durationDays: 30,
        price: 'CA$8.99',
        priceNumber: 8.99,
        period: '/ month',
        billedText: 'Billed monthly • Save CA$6.97 vs Weekly',
        effectiveRate: 'CA$2.24 / wk',
        savings: 'Save 43%',
        badge: 'Popular',
        description: 'Save 43% compared to weekly renewals.'
      },
      {
        id: 'yearly',
        name: 'Yearly Oasis',
        durationDays: 365,
        price: 'CA$32.99',
        priceNumber: 32.99,
        period: '/ year',
        billedText: 'Billed yearly • Save CA$74.89 vs Monthly',
        effectiveRate: 'CA$2.74 / mo (CA$0.63/wk)',
        savings: 'Save 69%',
        badge: 'Best Value',
        description: '69% savings. 365 days of full sanctuary perks.'
      }
    ]
  },
  AUD: {
    symbol: 'A$',
    code: 'AUD',
    plans: [
      {
        id: 'weekly',
        name: 'Weekly Pass',
        durationDays: 7,
        price: 'A$4.49',
        priceNumber: 4.49,
        period: '/ week',
        billedText: 'Billed weekly • A$0.64 / day',
        effectiveRate: 'A$4.49 / wk',
        savings: null,
        badge: null,
        description: 'Flexible week-by-week companion.'
      },
      {
        id: 'monthly',
        name: 'Monthly Sanctuary',
        durationDays: 30,
        price: 'A$9.99',
        priceNumber: 9.99,
        period: '/ month',
        billedText: 'Billed monthly • Save A$7.97 vs Weekly',
        effectiveRate: 'A$2.49 / wk',
        savings: 'Save 44%',
        badge: 'Popular',
        description: 'Save 44% compared to weekly renewals.'
      },
      {
        id: 'yearly',
        name: 'Yearly Oasis',
        durationDays: 365,
        price: 'A$36.99',
        priceNumber: 36.99,
        period: '/ year',
        billedText: 'Billed yearly • Save A$82.89 vs Monthly',
        effectiveRate: 'A$3.08 / mo (A$0.71/wk)',
        savings: 'Save 69%',
        badge: 'Best Value',
        description: '69% savings. 365 days of full sanctuary perks.'
      }
    ]
  },
  JPY: {
    symbol: '¥',
    code: 'JPY',
    plans: [
      {
        id: 'weekly',
        name: 'Weekly Pass',
        durationDays: 7,
        price: '¥450',
        priceNumber: 450,
        period: '/ week',
        billedText: 'Billed weekly • ¥64 / day',
        effectiveRate: '¥450 / wk',
        savings: null,
        badge: null,
        description: 'Flexible week-by-week companion.'
      },
      {
        id: 'monthly',
        name: 'Monthly Sanctuary',
        durationDays: 30,
        price: '¥980',
        priceNumber: 980,
        period: '/ month',
        billedText: 'Billed monthly • Save ¥820 vs Weekly',
        effectiveRate: '¥245 / wk',
        savings: 'Save 45%',
        badge: 'Popular',
        description: 'Save 45% compared to weekly renewals.'
      },
      {
        id: 'yearly',
        name: 'Yearly Oasis',
        durationDays: 365,
        price: '¥3,600',
        priceNumber: 3600,
        period: '/ year',
        billedText: 'Billed yearly • Save ¥8,160 vs Monthly',
        effectiveRate: '¥300 / mo (¥69/wk)',
        savings: 'Save 69%',
        badge: 'Best Value',
        description: '69% savings. 365 days of full sanctuary perks.'
      }
    ]
  },
  AED: {
    symbol: 'AED ',
    code: 'AED',
    plans: [
      {
        id: 'weekly',
        name: 'Weekly Pass',
        durationDays: 7,
        price: 'AED 10.99',
        priceNumber: 10.99,
        period: '/ week',
        billedText: 'Billed weekly • AED 1.57 / day',
        effectiveRate: 'AED 10.99 / wk',
        savings: null,
        badge: null,
        description: 'Flexible week-by-week companion.'
      },
      {
        id: 'monthly',
        name: 'Monthly Sanctuary',
        durationDays: 30,
        price: 'AED 24.99',
        priceNumber: 24.99,
        period: '/ month',
        billedText: 'Billed monthly • Save AED 18.97 vs Weekly',
        effectiveRate: 'AED 6.24 / wk',
        savings: 'Save 43%',
        badge: 'Popular',
        description: 'Save 43% compared to weekly renewals.'
      },
      {
        id: 'yearly',
        name: 'Yearly Oasis',
        durationDays: 365,
        price: 'AED 89.99',
        priceNumber: 89.99,
        period: '/ year',
        billedText: 'Billed yearly • Save AED 209.89 vs Monthly',
        effectiveRate: 'AED 7.49 / mo (AED 1.73/wk)',
        savings: 'Save 70%',
        badge: 'Best Value',
        description: '70% savings. 365 days of full sanctuary perks.'
      }
    ]
  }
};
