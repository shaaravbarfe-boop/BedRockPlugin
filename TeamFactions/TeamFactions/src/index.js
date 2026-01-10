import { Plugin, GameMode } from "endstone";

export default class TeamFactions extends Plugin {

  onEnable() {
    this.getLogger().info("TeamFactions enabled");

    // Disable PvP by default
    this.getServer().dispatchCommand(
      this.getServer().getConsoleSender(),
      "gamerule pvp false"
    );

    // Register the command
    this.getServer().getCommandMap().register("startfactions", {
      description: "Randomize teams with full kit",
      execute: (sender) => {
        this.randomizeTeams();
        sender.sendMessage("§aTeams randomized with full kit!");
      }
    });
  }

  randomizeTeams() {
    const players = Array.from(this.getServer().getOnlinePlayers());

    // Shuffle players
    players.sort(() => Math.random() - 0.5);

    players.forEach((player, index) => {

      // ❌ Clear old team tags
      player.removeTag("TeamRed");
      player.removeTag("TeamBlue");

      // 🎲 Assign team
      const isRed = index % 2 === 0;

      if (isRed) {
        player.addTag("TeamRed");
        player.setNameTag(`§cRed ${player.getName()}`);
      } else {
        player.addTag("TeamBlue");
        player.setNameTag(`§9Blue ${player.getName()}`);
      }

      // 🎮 Adventure mode
      player.setGameMode(GameMode.ADVENTURE);

      // 🎁 Full Kit

      // Sword
      player.runCommand(
        `give @s iron_sword 1 0 {"minecraft:enchantments":[{"id":"sharpness","lvl":2}]}`
      );

      // Armor
      player.runCommand(
        `give @s iron_helmet 1 0 {"minecraft:enchantments":[{"id":"protection","lvl":2}]}`
      );
      player.runCommand(
        `give @s iron_chestplate 1 0 {"minecraft:enchantments":[{"id":"protection","lvl":2}]}`
      );
      player.runCommand(
        `give @s iron_leggings 1 0 {"minecraft:enchantments":[{"id":"protection","lvl":2}]}`
      );
      player.runCommand(
        `give @s iron_boots 1 0 {"minecraft:enchantments":[{"id":"protection","lvl":2}]}`
      );
    });
  }
}
