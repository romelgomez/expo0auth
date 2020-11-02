//
// Enviroments, What should be here, and what not:
//
//   Is o.k:
//
//      - public keys
//      - public client api keys
//      - public app id
//      - Api endpoints
//
//   Is not o.k:
//
//      - private keys: This should be handle by the microservices or a server side apps.
//      - passwords: never, just nope.
//
//  References:
//
// - https://blog.aamnah.com/expo/environment-variables-dotenv-expo
// - https://blog.decabits.com/javascript/reactnative/expokit/2019/12/22/Expokit-multiple-environment.html
// - https://harrymoreno.com/2019/07/05/Using-expo-release-channels-in-your-project.html
// - https://rammic.github.io/2015/07/28/hiding-secrets-in-android-apps/
// - https://cloud.google.com/solutions/secrets-management?hl=es
// - https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets
// - https://medium.com/@peterpme/environment-variables-in-expo-using-release-channels-4934594c5307
// - https://alxmrtnz.com/thoughts/2019/03/12/environment-variables-and-workflow-in-expo.html
//

import Constants from 'expo-constants';


export interface CommonEnvVars {
  sentry: {
    dsn: string;
  }
};

export interface EnvVars extends CommonEnvVars {
  firebase: {
      config: {
          apiKey: string;
          authDomain: string;
          databaseURL: string;
          projectId: string;
          storageBucket: string;
          messagingSenderId: string;
          appId: string;
          measurementId: string;
      };
  };
  google?: {
    expoClientId: string;
    webClientId: string;
    androidClientId: string;
  };
  facebook?: {
    appId: string;
  };
};

const common: CommonEnvVars = {
  sentry: {
    dsn: 'https://cc87da79098442d1b37c72dc5e885e16@o366067.ingest.sentry.io/5495452'
  }
};

const dev: EnvVars = {
  ...common,
  firebase: {
    config: {
      apiKey: 'AIzaSyAj5gA8GxW7rQFayNN6b9ctgh3WBHlpxjo',
      authDomain: 'expo0auth.firebaseapp.com',
      databaseURL: 'https://expo0auth.firebaseio.com',
      projectId: 'expo0auth',
      storageBucket: 'expo0auth.appspot.com',
      messagingSenderId: '1068323245880',
      appId: '1:1068323245880:web:48cd31569e1916d76f7bcd',
      measurementId: 'G-FH2SJSC81Y',
    },
  },
  google: {
    expoClientId:
      '1068323245880-f7r9hocb5v92s0dubf0ucpnkcm2ise79.apps.googleusercontent.com',
    webClientId:
      '1068323245880-f7r9hocb5v92s0dubf0ucpnkcm2ise79.apps.googleusercontent.com',
    androidClientId:
      '1068323245880-psk6d6giils8osmpo2811v798b2pklmc.apps.googleusercontent.com',
  },
  facebook: {
    appId: '651129349099345',
  },
};

const staging: EnvVars = {
  ...common,
  firebase:{
    config: {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: '',
    },
  },
  facebook: {
    appId: '',
  },
};

const prod: EnvVars = {
  ...common,
  firebase:{
    config: {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: '',
    },
  },
  facebook: {
    appId: '',
  },  
}

function getEnvVars(env = ''): EnvVars {

   if (env && env !== '' && env.indexOf('staging') !== -1) {
    return {
      ...common,
      ...staging,
    };
  }

  if (env && env !== '' && env.indexOf('prod') !== -1) {
    return {
      ...common,
      ...prod,
    };
  }

  // Default DEV
  return { 
    ...common,
    ...dev,
  }

};

export default getEnvVars(Constants.manifest.releaseChannel);
