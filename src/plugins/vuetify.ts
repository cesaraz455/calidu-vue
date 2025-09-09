import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#732daf',
          secondary: '#2196F3',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#93a5bdff',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
    },
  },
});
