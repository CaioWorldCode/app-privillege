import { lazy } from 'react'
import { DEFAULT_PATHS } from 'config.js'


const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const home = lazy(() => import('views/home'))
const files = lazy(() => import('views/files'))
const signatures = lazy(() => import('views/signatures'))


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
			path: `${appRoot}/files`,
			component: files,
			label: 'Arquivos',
			icon: 'download',
			protected: true
		},

		{
			path: `${appRoot}/signatures`,
			component: signatures,
			label: 'Minhas Assinaturas',
			icon: 'pen',
			protected: true
		},
	],
	sidebarItems: [

	],
}

export default routesAndMenuItems
