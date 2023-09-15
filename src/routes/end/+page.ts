import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
  console.log('url', url);
  console.log('url.searchParams', url.searchParams);
  console.log('url.searchParams.get(\'score\')', url.searchParams.get('score'));
	const score = url.searchParams.get('score');

	return {
		score
	};
};
