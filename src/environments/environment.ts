// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  bloombergApiUrl: 'https://bloomberg-market-and-financial-news.p.rapidapi.com',
  bloombergRapidApiKey: 'rapidapi-key=e945b61393msh34694ffb92a9decp1dc310jsn5cb8a620cfa8',
  metalsApiUrl: 'https://live-metal-prices.p.rapidapi.com/v1/latest/',
  allMetalsUrl: 'XAU,XAG,PA,PL',
  currencyApiUrl: 'https://currency-converter5.p.rapidapi.com/currency/convert',
  cryptocurrencyApiUrl: 'https://api.coingecko.com/api/v3/simple/price?ids=',
  cryptocurrenciesNameUrl: 'bitcoin%2Cmonero%2Cethereum%2Ctether%2Cpolkadot%2Ccardano%2Clitecoin%2Cchainlink%2Cxrp%2Cstellar%2Cdash',
  stocksApiUrl: 'https://financialmodelingprep.com/api/v3/quote',
  stocksApiKey: 'apikey=c140ff64588f7be5bbd63f620f801d67',
  firebaseConfig: {
    apiKey: 'AIzaSyBwnRtV0wuXCydaai6JR1UOLv69YZ5zWiY',
    authDomain: 'pricewatcher-a4e48.firebaseapp.com',
    databaseURL: 'https://pricewatcher-a4e48-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'pricewatcher-a4e48',
    storageBucket: 'pricewatcher-a4e48.appspot.com',
    messagingSenderId: '977415166502',
    appId: '1:977415166502:web:917f794a789d415aaa24e7'
  },
  defaultAvatar: 'https://firebasestorage.googleapis.com/v0/b/pricewatcher-a4e48.appspot.com/o/default_avatar.jpeg?alt=media&token=5f6d8d3c-e711-480f-b473-bc4f754745f4',
  defaultImagePath: 'https://firebasestorage.googleapis.com/v0/b/pricewatcher-a4e48.appspot.com/o/img%',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
