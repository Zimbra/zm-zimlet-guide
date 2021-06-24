//Load components from Zimbra
import { createElement, Fragment } from 'preact';
import { Text } from 'preact-i18n';
import { provide } from 'preact-context-provider';
import { withIntl } from './enhancers';
import { MenuItem, GenericMobileUISidebar, GenericMobileUIToolbar } from '@zimbra-client/components'; // Sidebar/Toolbar are so nav menu is accessible in mobile
import { Button } from '@zimbra-client/blocks';
import { useCallback } from 'preact/hooks';

//Load the createMore function from our Zimlet component
import createMore from './components/more';

//Load a style static stylesheet (Preact will not change this)
import './public/styles.css';

const App = () => {
    const handleClick = useCallback(() => alert('Test OK!'), []);
    return (<Fragment>
        <GenericMobileUIToolbar />
        <GenericMobileUISidebar />
        <Button onClick={handleClick}>Zimlet Callback Test</Button>
		<iframe class={'MyTestWrapper'} src="/service/extension/mytest"/>
    </Fragment>);
};

//Create function by Zimbra convention
export default function Zimlet(context) {
	//Get the 'plugins' object from context and define it in the current scope
	const { plugins, store, zimbraBatchClient } = context;
	const { dispatch, zimletRedux } = store;
	const exports = {};

	exports.init = function init() {
		// The zimlet slots to load into, and what is being loaded into that slot
		// (CustomMenuItem and Router are both defined below)
		plugins.register('slot::menu', CustomMenuItem);

		// Only needed if you need to create a new url route, like for a menu tab, or print, etc
		plugins.register('slot::routes', Router);

		//Here we load the moreMenu Zimlet item into the UI slot:
		plugins.register('slot::action-menu-mail-more', provide(context)(createMore));

	};

	// Register a new route with the preact-router instance
	function Router() {
		return [<App path={'/MyTest'} />];
	}

	// Create a main nav menu item.
	// withIntl should be used on every component registered via plugins.register(). You will see this in the App index.js file as well
	const CustomMenuItem = withIntl()(() => (
		// List of components can be found in zm-x-web, zimlet-manager/shims.js, and more can be added if needed
		<MenuItem responsive href={'/MyTest'}>
			<span className='appIconMyTest'></span><b>
				<Text id={'zimbra-zimlet-mytest.menuItem'} /></b>
		</MenuItem>
	));

	return exports;
}
