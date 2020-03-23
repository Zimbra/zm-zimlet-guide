import { createElement, Component } from 'preact';
import { withIntl } from '../../enhancers';
import style from './style';
// Can also use shimmed decorators like graphql or withText.
// Or, utils, like callWtih. Refer to zm-x-web, zimbraManager/shims.js
// More shims can be added here if necessary; also requires an update to zimlet-cli

@withIntl()
export default class App extends Component {
	render() {
		return (
			<iframe class={style.wrapper} src="/service/extension/mytest">
			</iframe>
		);
	}
}
