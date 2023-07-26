export const getActiveElement = () => {
	if (document.activeElement === null) return null;
	
	return (function checkShadowDom(element): Element | null {
		if (element?.shadowRoot !== null) {
			const shadowActiveElement = element.shadowRoot.activeElement
			if (shadowActiveElement) {
				return checkShadowDom(shadowActiveElement)
			}
			return null
		}
		return element
	})(document.activeElement);
};