import type { VerticalNavItems } from '@/@layouts/types'
import appAndPages from './app-and-pages'
import charts from './charts'
import dashboard from './dashboard'
import forms from './forms'
import others from './others'
import productInfo from './product-info'
import uiElements from './ui-elements'

export default [...dashboard, ...productInfo, ...appAndPages, ...uiElements, ...forms, ...charts, ...others] as VerticalNavItems
