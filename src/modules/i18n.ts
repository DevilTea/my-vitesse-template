import { computed, watch } from 'vue'
import { createI18n, I18nOptions, useI18n } from 'vue-i18n'
import { RouteRecordRaw, useRouter } from 'vue-router'
import { UserModule } from '@/types'

let used = false
// import i18n resources
// https://vitejs.dev/guide/features.html#glob-import

const messages = Object.fromEntries(
  Object.entries(
    import.meta.globEager('../../locales/*.json'))
    .map(([key, value]) => {
      return [key.slice(14, -5), value.default]
    })
)
const locales = Object.keys(messages)

const i18nOptions: I18nOptions = {
  legacy: false,
  locale: 'zh-TW',
  fallbackLocale: 'zh-TW',
  messages
}

export const setupI18nRoutes = (routes: RouteRecordRaw[]) => {
  // Redirect the original routes to path within default locale
  const redirectors: RouteRecordRaw[] = routes.map((route) => ({
    path: route.path,
    redirect: `/${i18nOptions.fallbackLocale}${route.path}`
  }))

  // Map original routes to routes with locale parameter and navigation guard
  const extendedRoutes: RouteRecordRaw[] = routes.map((route) => ({
    ...route,
    path: `/:locale${route.path}`,
    beforeEnter (to, from, next) {
      if (locales.includes(to.params.locale?.toString() ?? '')) {
        next()
        return
      }
      next(`/${i18nOptions.fallbackLocale}${to.path}`)
    }
  }))

  const finalRoutes: RouteRecordRaw[] = [
    ...redirectors,
    ...extendedRoutes
  ]
  return finalRoutes
}

export const install: UserModule = ({ app, router }) => {
  const i18n = createI18n<I18nOptions>(i18nOptions)

  app.use(i18n)
}

export const useLocaleSwitch = (isRouterMethod = true) => {
  const router = useRouter()
  const { locale, availableLocales } = useI18n()

  const nextLocale = computed<string>(() => {
    const currentIndex = availableLocales.indexOf(locale.value)
    const nextIndex = (currentIndex + 1) % availableLocales.length
    return availableLocales[nextIndex]
  })

  const switchLocale = (newLocale?: string) => {
    const currentIndex = availableLocales.indexOf(locale.value)
    let nextIndex = availableLocales.indexOf(newLocale ?? '')
    if (nextIndex === -1) nextIndex = (currentIndex + 1) % availableLocales.length
    newLocale = availableLocales[nextIndex]

    isRouterMethod
      ? router.replace({ params: { locale: newLocale } })
      : locale.value = newLocale
  }

  return {
    nextLocale,
    switchLocale
  }
}

export const useModule = () => {
  if (used) return
  used = true
  const { locale, fallbackLocale } = useI18n()
  const router = useRouter()

  watch(router.currentRoute, (route) => {
    locale.value = route.params.locale.toString() ?? fallbackLocale.value
  }, {
    immediate: true
  })

  watch(locale, async (value) => {
    document.documentElement.setAttribute('lang', value)
    await router.replace({
      params: {
        locale: locale.value
      }
    })
  }, {
    immediate: true
  })
}
