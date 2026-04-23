/**
 * Shadow DOM Style Utility
 * 
 * Injects inline styles and clones global styles (links and style tags) 
 * into a shadowRoot to ensure theme consistency within isolation.
 */
export function setupShadowRootStyles(shadowRoot, inlineStyles = []) {
    // Ensure styles are hidden initially to avoid FOUC
    if (shadowRoot.host instanceof HTMLElement) {
        shadowRoot.host.style.visibility = 'hidden';
    }

    // 1. Inject custom inline CSS strings
    inlineStyles.forEach((cssText) => {
        const styleTag = document.createElement('style');
        styleTag.textContent = cssText;
        shadowRoot.appendChild(styleTag);
    });

    // 2. Clone <link> and <style> tags from the main document (head)
    // This captures Clay UI, custom Liferay styles, AND Vite's injected CSS.
    const globalStyles = document.querySelectorAll('link[rel="stylesheet"], head style');
    globalStyles.forEach((styleNode) => {
        const clonedNode = styleNode.cloneNode(true);
        shadowRoot.appendChild(clonedNode);
    });

    // 3. Restore visibility on the next frame
    requestAnimationFrame(() => {
        if (shadowRoot.host instanceof HTMLElement) {
            shadowRoot.host.style.visibility = '';
        }
    });
}
