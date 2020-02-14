// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /*firebaseConfig: {
    apiKey: "AIzaSyAwn-keld13oRzePyod8EQKgfsGJhRn4tU",
    authDomain: "prueba-50195.firebaseapp.com",
    databaseURL: "https://prueba-50195.firebaseio.com",
    projectId: "prueba-50195",
    storageBucket: "prueba-50195.appspot.com",
    messagingSenderId: "27440595928",
    appId: "1:27440595928:web:b5d013a2f037f60ade68ad"
  }*/
  firebaseConfig : {
    apiKey: "AIzaSyDWwW4uUKZ-Ket7qnO5fo4nbcTF27HwrtY",
    authDomain: "ioniclabsx.firebaseapp.com",
    databaseURL: "https://ioniclabsx.firebaseio.com",
    projectId: "ioniclabsx",
    storageBucket: "ioniclabsx.appspot.com",
    messagingSenderId: "284961209366",
    appId: "1:284961209366:web:e8b6aadd297cfc304e4937"
  }
};

export const FIREBASECONFIG={
    apiKey: "AIzaSyAwn-keld13oRzePyod8EQKgfsGJhRn4tU",
    authDomain: "prueba-50195.firebaseapp.com",
    databaseURL: "https://prueba-50195.firebaseio.com",
    projectId: "prueba-50195",
    storageBucket: "prueba-50195.appspot.com",
    messagingSenderId: "27440595928",
    appId: "1:27440595928:web:b5d013a2f037f60ade68ad"
};
export const snapshotToArray=snapshot =>{
  let returnArray=[];
  snapshot.forEach(element => {
    let item =element.val();
    item.key=element.key();
    returnArray.push(item);
  });


}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
