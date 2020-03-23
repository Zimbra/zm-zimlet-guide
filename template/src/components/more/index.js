import { createElement } from 'preact';
import MoreMenu from '../more-menu';

export default function createMore(context, menuItemText) {
	return props => (
		<MoreMenu {...props}>{context}{menuItemText}</MoreMenu>
	);
}
