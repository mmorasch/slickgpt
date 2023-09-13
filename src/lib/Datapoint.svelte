<script lang="ts">
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	const sourceData = [
		{ position: 1, name: 'Hydrogen', weight: 1.0079 },
		{ position: 2, name: 'Helium', weight: 4.0026 },
		{ position: 3, name: 'Lithium', weight: 6.941 },
		{ position: 4, name: 'Beryllium', weight: 9.0122 },
		{ position: 5, name: 'Boron', weight: 10.811 }
	];
	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['Name', 'Weight'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, ['name', 'weight']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(sourceData, ['position', 'name', 'weight']),
	};
</script>

<div class="border-2 border-white" >
  <Table source={tableSimple}/>
</div>
