/**
 * Liferay Mock Utility (TypeScript)
 */

interface LiferayMock {
  Language: {
    get: (key: string) => string;
  };
  ThemeDisplay: {
    getCompanyGroupId: () => string;
    getScopeGroupId: () => string;
    getPortalURL: () => string;
    isSignedIn: () => boolean;
    getPathThemeImages: () => string;
  };
  authToken: string;
  on: (event: string, callback: (...args: any[]) => void) => void;
  fire: (event: string, data: any) => void;
  detach: (event: string, callback: (...args: any[]) => void) => void;
}

const Liferay: LiferayMock = (window as any).Liferay || {
  Language: {
    get: (key: string) => key,
  },
  ThemeDisplay: {
    getCompanyGroupId: () => '0',
    getScopeGroupId: () => '0',
    getPortalURL: () => 'http://localhost:8080',
    isSignedIn: () => false,
    getPathThemeImages: () => '',
  },
  authToken: '',
  on: (event: string, _callback: any) => {
    console.log(`[Liferay Mock] Listener added for: ${event}`);
  },
  fire: (event: string, data: any) => {
    console.log(`[Liferay Mock] Event fired: ${event}`, data);
  },
  detach: (event: string, _callback: any) => {
    console.log(`[Liferay Mock] Listener removed for: ${event}`);
  },
};

export default Liferay;
