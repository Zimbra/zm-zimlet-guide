//Load components from Zimbra
import { createElement } from "preact";
import { Text } from "preact-i18n";
import { SLUG } from "./constants";
import { withIntl } from "./enhancers";
import { MenuItem } from "@zimbra-client/components";

//Load the App component from our Zimlet
import App from "./components/app";
//Load the createMore function from our Zimlet component
import createMore from "./components/more";

//Load a style static stylesheet (Preact will not change this)
import './public/styles.css';

//Create function by Zimbra convention
export default function Zimlet(context) {
	//Get the 'plugins' object from context and define it in the current scope
	const { plugins } = context;
	const exports = {};
   
   //moreMenu stores a Zimlet menu item. We pass context to it here
	const moreMenu = createMore(context, <Text id={`app.menuItem`}/>);

	
	exports.init = function init() {
		// The zimlet slots to load into, and what is being loaded into that slot
		// (CustomMenuItem and Router are both defined below)
		plugins.register("slot::menu", CustomMenuItem);

		// Only needed if you need to create a new url route, like for a menu tab, or print, etc
		plugins.register("slot::routes", Router);
		
		//Here we load the moreMenu Zimlet item into the UI slot:
		plugins.register('slot::action-menu-mail-more', moreMenu);

	};

	// Register a new route with the preact-router instance
	function Router() {
		return [<App path={`/${SLUG}`} />];
	}

	// Create a main nav menu item.
	// withIntl should be used on every component registered via plugins.register(). You will see this in the App index.js file as well
	const CustomMenuItem = withIntl()(() => (
		// List of components can be found in zm-x-web, zimlet-manager/shims.js, and more can be added if needed
		<MenuItem responsive href={`/${SLUG}`}>
			<span className="appIcon"></span><b>
			<Text id={`app.menuItem`} /></b>
		</MenuItem>
	));

	return exports;
}
