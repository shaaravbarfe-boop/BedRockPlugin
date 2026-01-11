import { world, system } from "@minecraft/server";

world.afterEvents.scriptEventReceive.subscribe((event) => {
  if (event.id !== "factions:start") return;

  system.run(() => {
    startFactions();
  });
});

function startFactions() {
  const players = world.getAllPlayers();

  // Remove old tags
  for (const p of players) {
    p.removeTag("TeamRed");
    p.removeTag("TeamBlue");
  }

  // Shuffle
  const shuffled = [...players].sort(() => Math.random() - 0.5);

  shuffled.forEach((player, index) => {
    const team = index % 2 === 0 ? "TeamRed" : "TeamBlue";
    player.addTag(team);

    // Adventure mode
    player.runCommandAsync("gamemode adventure");

    // Clear + give ONE full kit
    player.runCommandAsync("clear @s");
    player.runCommandAsync("give @s iron_sword");
    player.runCommandAsync("give @s iron_helmet");
    player.runCommandAsync("give @s iron_chestplate");
    player.runCommandAsync("give @s iron_leggings");
    player.runCommandAsync("give @s iron_boots");

    // Actionbar faction display
    const color = team === "TeamRed" ? "§cRED" : "§9BLUE";
    player.runCommandAsync(
      `titleraw @s actionbar {"rawtext":[{"text":"Faction: ${color}"}]}`
    );
  });

  world.sendMessage("§aFactions started!");
}
