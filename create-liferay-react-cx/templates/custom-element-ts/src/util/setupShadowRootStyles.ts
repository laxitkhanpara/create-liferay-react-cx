/**
 * Shadow DOM Style Utility (TypeScript)
 */
export function setupShadowRootStyles(
    shadowRoot: ShadowRoot, 
    inlineStyles: string[] = []
): void {
    // Ensure styles are hidden initially to avoid FOUC
    if (shadowRoot.host instanceof HTMLElement) {
        shadowRoot.host.style.visibility = 'hidden';
    }

    // 1. Inject custom inline CSS
    inlineStyles.forEach((cssText) => {
        const styleTag = document.createElement('style');
        styleTag.textContent = cssText;
        shadowRoot.appendChild(styleTag);
    });

    // 2. Clone <link> and <style> tags from the main document (head)
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
