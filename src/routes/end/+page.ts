import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const score = url.searchParams.get('score');
	const expert = url.searchParams.get('expert');

	return {
		score,
    expert
	};
};
