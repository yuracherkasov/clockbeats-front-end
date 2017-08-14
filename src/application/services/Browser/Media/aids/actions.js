export const MEDIA = {
	QUERY_CHANGED: 'MEDIA_QUERY_CHANGED',
};

export function mediaQueryChanged(results) {
	return {type: MEDIA.QUERY_CHANGED, payload: {media: results}};
}