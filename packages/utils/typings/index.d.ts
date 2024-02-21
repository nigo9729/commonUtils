// declare const wx: any;

// declare namespace NodeJS {
//   export interface Global {
//     wx: {
//       getSystemInfo: () => string;
//     };
//   }
// }

declare let global: typeof globalThis & {
  wx: {
    getSystemInfo: () => string;
  };
  my: {
    getSystemInfo: () => string;
  };
};
