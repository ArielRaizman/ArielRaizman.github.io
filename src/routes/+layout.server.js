export const prerender = true;

// This ensures that the dev route is only available in development
export function entries() {
    if (process.env.NODE_ENV === 'development') {
        return [
            { path: '/dev' },
            { path: '/api/save-json' }
        ];
    }
    return [];
} 