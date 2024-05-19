import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';

export const vuetifyPlugin = createVuetify({
  ssr: true,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          default: '#FFFFFF'
        }
      },
      light: {
        colors: {
          default: '#000000'
        }
      },
    },
  }
});
