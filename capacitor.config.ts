import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.colegiokawabata.www',
  appName: 'Colegio Kawabata',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    BarcodeScanner: {
      appId: 'com.colegiokawabata.www',
    }
  }
};

export default config;
