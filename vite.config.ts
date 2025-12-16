 import { defineConfig } from 'vite'
 import react from '@vitejs/plugin-react-swc'


// export default defineConfig({
//   plugins: [react()],
//   base: "/nanny-services/",
//  }) 


export default defineConfig({
  base: process.env.NODE_ENV === 'production'
    ? '/nanny-services/'
    : '/',
  plugins: [react()],
});