import 'windi.css'
import './styles/main.css'
import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'pages-generated'
import { setupLayouts } from 'layouts-generated'
import { setupI18nRoutes } from './modules/i18n'
import App from './App.vue'

const routes = setupLayouts(setupI18nRoutes(generatedRoutes))

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))
  }
)
