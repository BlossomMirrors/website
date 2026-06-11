<script lang="ts">
	const year = new Date().getFullYear();

	const notices = [
		`Forza Horizon 6 © 2026 Microsoft Corporation. The game video was created under Microsoft's Game Content Usage Rules using assets from Forza Horizon 6, and is not endorsed by or affiliated with Microsoft. "Forza Horizon 6" is a trademark of the Microsoft group of companies.`,
		`Grand Theft Auto V © 2013 - ${year} Rockstar Games, Inc. All rights reserved. "Grand Theft Auto" is a registered trademark of Take-Two Interactive Software, Inc. The game video is copyright of Rockstar Games, Inc.`,
		`Minecraft © 2009 - ${year} Mojang Studios. All rights reserved. "Minecraft" is a registered trademark of Microsoft Corporation. The game video is copyright of Mojang Studios.`,
		`The Finals © 2022 - ${year} Embark Studios AB. All rights reserved. "The Finals" is a trademark of Embark Studios AB. The game video is copyright of Embark Studios AB.`,
		`Overwatch © 2016 - ${year} Blizzard Entertainment, Inc. All rights reserved. "Overwatch" is a registered trademark of Blizzard Entertainment, Inc. The game video is copyright of Blizzard Entertainment, Inc.`,
		`Clash of Clans © 2012 - ${year} Supercell Oy. All rights reserved. "Clash of Clans" is a registered trademark of Supercell Oy. This material is unofficial and is not endorsed by Supercell.`
	];
</script>

<div class="pt-36 pb-8">
	<div class="grid gap-x-4 gap-y-2 sm:grid-cols-2">
		{#each notices as notice (notice)}
			<p class="text-left font-mono text-[10px] text-muted-foreground/30">
				{notice}
			</p>
		{/each}
	</div>
</div>
