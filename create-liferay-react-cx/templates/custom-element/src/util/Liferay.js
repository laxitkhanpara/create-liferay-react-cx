/**
 * Liferay Mock Utility
 * 
 * This file provides a fallback for the global Liferay object.
 * It allows your application to run locally (outside of Liferay) 
 * without crashing when it tries to access Liferay APIs.
 */

const Liferay = window.Liferay || {
    Language: {
        get: (key) => key,
    },
    ThemeDisplay: {
        getCompanyGroupId: () => '0',
        getScopeGroupId: () => '0',
        getPortalURL: () => 'http://localhost:8080',
        isSignedIn: () => false,
        getPathThemeImages: () => '',
    },
    authToken: '',
    on: (event, callback) => {
        console.log(`[Liferay Mock] Listener added for: ${event}`);
    },
    fire: (event, data) => {
        console.log(`[Liferay Mock] Event fired: ${event}`, data);
    },
    detach: (event, callback) => {
        console.log(`[Liferay Mock] Listener removed for: ${event}`);
    }
};

export default Liferay;
