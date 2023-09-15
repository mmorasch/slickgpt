<script lang="ts">
	import type { IChatMessage } from '$misc/michiStores';

	export let message: IChatMessage = {
		role: 'user',
    message: ''
	};
</script>

<div class="flex items-end mb-2.5 {message.role === 'user' ? 'right-msg' : 'left-msg'}">
	<div class="msg-bubble max-w-md p-2.5 rounded-2xl">
		{@html message.message}
	</div>
</div>

<style lang="postcss">
	.left-msg .msg-bubble {
		@apply rounded-bl-none variant-ghost-surface;
	}
	.right-msg {
		@apply flex-row-reverse;
	}
	.right-msg .msg-bubble {
		@apply rounded-br-none variant-ghost-tertiary;
	}
</style>
