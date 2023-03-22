import { lazy } from 'react'
import { DEFAULT_PATHS } from 'config.js'


const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const home = lazy(() => import('views/home'))
const signatures = lazy(() => import('views/signatures'))
const news = lazy(() => import('views/newsletter'))


const routesAndMenuItems = {
	mainMenuItems: [
		{
			path: DEFAULT_PATHS.APP,
			exact: true,
			redirect: true,
			to: `${appRoot}/home`,
			protected: true
		},

		{
			path: `${appRoot}/home`,
			component: home,
			label: 'Home',
			icon: 'dashboard-1',
			protected: true
		},

		{
			path: `${appRoot}/signatures`,
			component: signatures,
			label: 'Minhas Assinaturas',
			icon: 'pen',
			protected: true
		},

		// {
		// 	path: `${appRoot}/newsletter`,
		// 	component: news,
		// 	label: 'Notícias',
		// 	icon: 'news',
		// 	protected: true
		// },
	],
	sidebarItems: [
		// {
		// 	path: `${appRoot}/contracts`,
		// 	component: config.index,
		// 	label: 'Contratos',
		// 	icon: 'book',
		// 	protected: false,
		// 	visible: false,
		// 	subs: [
		// 		{ path: '/edit/:slug', label: 'Editar contrato', component: contracts.new },
		// 	],
		// },
	],
}

export default routesAndMenuItems
