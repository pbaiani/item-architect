export class GeneratorEngine {

// Add to the top of GeneratorEngine class
static SHIELD_REINFORCING_LIBRARY = [
    { level: 0,  suffix: "", hardness: 0, hp: 0 },
    { level: 4,  suffix: "(Minor Reinforcing)", hardness: 3, hp: 44 },
    { level: 7,  suffix: "(Lesser Reinforcing)", hardness: 3, hp: 52 },
    { level: 10, suffix: "(Moderate Reinforcing)", hardness: 3, hp: 64 },
    { level: 13, suffix: "(Greater Reinforcing)", hardness: 5, hp: 80 },
    { level: 16, suffix: "(Major Reinforcing)", hardness: 5, hp: 84 },
    { level: 19, suffix: "(Supreme Reinforcing)", hardness: 7, hp: 108 }
];





static WEAPON_RUNE_LIBRARY = {
    "ancestralEchoing": { "name": "Ancestral Echoing", "level": 15, "description": "<p>Your proficiency rank with this weapon is one step higher than normal (max highest rank you have).</p>" },
    "anchoring": { "name": "Anchoring", "level": 10, "description": "<p>On a critical hit, the weapon casts Planar Tether on the target (DC 27 Will).</p>" },
    "dancing": { "name": "Animated", "level": 13, "description": "<p><strong>Activate</strong> [2-actions]; <strong>Effect</strong> The weapon fights on its own for 4 rounds.</p>" },
    "ashen": { "name": "Ashen", "level": 9, "description": "<p>Deals an extra 1d4 fire damage. On a crit, target is Dazzled for 1 minute.</p>" },
    "astral": { "name": "Astral", "level": 8, "description": "<p>Deals an extra 1d6 spirit damage (2d6 vs creatures with no physical form).</p>" },
    "authorized": { "name": "Authorized", "level": 3, "description": "<p>The weapon deals 1d6 spirit damage to any unauthorized creature that tries to wield it.</p>" },
    "bane": { "name": "Bane", "level": 4, "description": "<p>Deals an extra 1d6 damage against a specific type of creature chosen at creation.</p>" },
    "bloodbane": { "name": "Bloodbane", "level": 8, "description": "<p>Deals an extra 1d6 damage against a specific family of creatures (e.g., dwarves).</p>" },
    "bloodthirsty": { "name": "Bloodthirsty", "level": 16, "description": "<p>On a crit, you gain temporary HP equal to the target's persistent bleed damage.</p>" },
    "brilliant": { "name": "Brilliant", "level": 12, "description": "<p>Deals an extra 1d4 fire, 1d4 spirit, and 1d4 vitality damage to undead/fiends.</p>" },
    "called": { "name": "Called", "level": 7, "description": "<p><strong>Activate</strong> [1-action]; <strong>Effect</strong> The weapon returns to your hand from up to 100 feet.</p>" },
    "coating": { "name": "Coating", "level": 9, "description": "<p>The weapon can store up to 3 doses of a single injury poison.</p>" },
    "conducting": { "name": "Conducting", "level": 7, "description": "<p>Resonates with energy. If you used an energy action, the weapon deals 1d8 extra damage.</p>" },
    "corrosive": { "name": "Corrosive", "level": 8, "description": "<p>Deals an extra 1d6 acid damage. On a crit, deals 3d6 persistent acid damage.</p>" },
    "crushing": { "name": "Crushing", "level": 9, "description": "<p>On a crit, the target is Clumsy 1 and Enfeebled 1 until the end of your next turn.</p>" },
    "cunning": { "name": "Cunning", "level": 5, "description": "<p>On a crit, you learn the target's highest resistance, highest weakness, or lowest save.</p>" },
    "deathdrinking": { "name": "Deathdrinking", "level": 7, "description": "<p>Deals an extra 1d6 spirit damage to undead and vitality damage to the living.</p>" },
    "decaying": { "name": "Decaying", "level": 8, "description": "<p>Deals an extra 1d6 void damage. On a crit, deals 2d6 persistent void damage.</p>" },
    "demolishing": { "name": "Demolishing", "level": 6, "description": "<p>Deals an extra 1d6 spirit damage to constructs and ignores 10 Hardness.</p>" },
    "earthbinding": { "name": "Earthbinding", "level": 7, "description": "<p>On a crit against a flying creature, the target falls 100 feet and is grounded.</p>" },
    "energizing": { "name": "Energizing", "level": 6, "description": "<p>When you take energy damage, the weapon deals an extra 1d6 of that type on its next hit.</p>" },
    "extending": { "name": "Extending", "level": 9, "description": "<p><strong>Activate</strong> [1-action]; <strong>Effect</strong> The weapon's reach increases to 60 feet for one Strike.</p>" },
    "fanged": { "name": "Fanged", "level": 2, "description": "<p><strong>Activate</strong> [1-action]; <strong>Effect</strong> You transform into the animal the weapon represents.</p>" },
    "fearsome": { "name": "Fearsome", "level": 5, "description": "<p>On a crit, the target is Frightened 1.</p>" },
    "flaming": { "name": "Flaming", "level": 8, "description": "<p>Deals an extra 1d6 fire damage. On a crit, deals 1d10 persistent fire damage.</p>" },
    "flickering": { "name": "Flickering", "level": 9, "description": "<p>You gain a +2 item bonus to reach with this weapon on your own turn.</p>" },
    "flurrying": { "name": "Flurrying", "level": 11, "description": "<p>Reduces the multiple attack penalty when using certain flourish actions.</p>" },
    "frost": { "name": "Frost", "level": 8, "description": "<p>Deals an extra 1d6 cold damage. On a crit, target is Slowed 1 for 1 round.</p>" },
    "ghostTouch": { "name": "Ghost Touch", "level": 4, "description": "<p>The weapon can fully affect incorporeal creatures and can be grasped by them.</p>" },
    "giantKilling": { "name": "Giant-Killing", "level": 8, "description": "<p>Deals an extra 1d6 damage to Giants. On a crit, target is Enfeebled 1.</p>" },
    "greaterAnchoring": { "name": "Greater Anchoring", "level": 18, "description": "<p>As anchoring, but target is Bound (cannot leave plane) for 1 minute on a crit.</p>" },
    "greaterAshen": { "name": "Greater Ashen", "level": 16, "description": "<p>Deals 2d4 fire damage. On a crit, target is Blinded for 1 round, then Dazzled.</p>" },
    "greaterAstral": { "name": "Greater Astral", "level": 18, "description": "<p>Deals 2d6 spirit damage; ignores the target's concealed and hidden conditions.</p>" },
    "greaterBloodbane": { "name": "Greater Bloodbane", "level": 13, "description": "<p>Deals 2d6 extra damage against a specific family of creatures.</p>" },
    "greaterBrilliant": { "name": "Greater Brilliant", "level": 18, "description": "<p>Deals 1d8 fire, 1d8 spirit, and 1d8 vitality damage. Crit effects are enhanced.</p>" },
    "greaterCorrosive": { "name": "Greater Corrosive", "level": 15, "description": "<p>Deals 1d6 acid and splashes 3 acid to adjacent creatures. Crit deals 6d6 persistent acid.</p>" },
    "greaterCrushing": { "name": "Greater Crushing", "level": 13, "description": "<p>On a crit, target is Clumsy 2 and Enfeebled 2 until the end of your next turn.</p>" },
    "greaterDecaying": { "name": "Greater Decaying", "level": 15, "description": "<p>Deals 1d6 void and splashes 3 void. Crit deals 4d6 persistent void damage.</p>" },
    "greaterExtending": { "name": "Greater Extending", "level": 13, "description": "<p>As extending, but the reach increases to 120 feet.</p>" },
    "greaterFanged": { "name": "Greater Fanged", "level": 8, "description": "<p>As fanged, but you can also use a special Breath Weapon or similar ability.</p>" },
    "greaterFearsome": { "name": "Greater Fearsome", "level": 12, "description": "<p>On a crit, the target is Frightened 2 and Cowering.</p>" },
    "greaterFlaming": { "name": "Greater Flaming", "level": 15, "description": "<p>Deals 1d6 fire and splashes 3 fire. Crit deals 2d10 persistent fire.</p>" },
    "greaterFrost": { "name": "Greater Frost", "level": 15, "description": "<p>Deals 1d6 cold and splashes 3 cold. Crit target is Slowed 1 for 1 minute.</p>" },
    "greaterGiantKilling": { "name": "Greater Giant-Killing", "level": 12, "description": "<p>Deals 2d6 extra damage to Giants. On a crit, target is Enfeebled 2.</p>" },
    "greaterHauling": { "name": "Greater Hauling", "level": 11, "description": "<p>On a hit, you can push or pull the target 10 feet.</p>" },
    "greaterImpactful": { "name": "Greater Impactful", "level": 17, "description": "<p>Deals 2d6 extra force damage and splashes 3 force damage.</p>" },
    "greaterRooting": { "name": "Greater Rooting", "level": 12, "description": "<p>On a hit, target is Immobilized (DC 30 Athletics to escape).</p>" },
    "greaterShock": { "name": "Greater Shock", "level": 15, "description": "<p>Deals 1d6 electricity and splashes 3 electricity to adjacent creatures.</p>" },
    "greaterThundering": { "name": "Greater Thundering", "level": 15, "description": "<p>Deals 1d6 sonic and splashes 3 sonic. Crit deals 2d10 persistent sonic.</p>" },
    "greaterDisrupting": { "name": "Greater Vitalizing", "level": 14, "description": "<p>Deals 2d6 persistent vitality damage to undead. Crit enfeebles and stupefies.</p>" },
    "grievous": { "name": "Grievous", "level": 9, "description": "<p>Enhances the critical specialization effect of the weapon.</p>" },
    "hauling": { "name": "Hauling", "level": 6, "description": "<p>On a hit, you can push or pull the target 5 feet.</p>" },
    "holy": { "name": "Holy", "level": 11, "description": "<p>The weapon deals an extra 1d4 spirit damage; extra 1d4 if you are holy and target is unholy.</p>" },
    "hooked": { "name": "Hooked", "level": 5, "description": "<p>On a crit, you can attempt a Trip as a free action.</p>" },
    "hopeful": { "name": "Hopeful", "level": 11, "description": "<p>On a crit, you and allies within 30 feet gain a +1 status bonus to attacks for 1 round.</p>" },
    "impactful": { "name": "Impactful", "level": 10, "description": "<p>Deals an extra 1d6 force damage. On a crit, target is pushed 5 feet.</p>" },
    "impossible": { "name": "Impossible", "level": 20, "description": "<p>The weapon can strike creatures that don't exist or are in other timelines.</p>" },
    "keen": { "name": "Keen", "level": 13, "description": "<p>Increases the weapon's crit range for piercing and slashing attacks.</p>" },
    "kinWarding": { "name": "Kin-Warding", "level": 3, "description": "<p>When you use the Parry or Twin Parry action, you also grant the bonus to an adjacent ally.</p>" },
    "majorFanged": { "name": "Major Fanged", "level": 15, "description": "<p>As greater fanged, but your animal form is much more powerful.</p>" },
    "majorRooting": { "name": "Major Rooting", "level": 15, "description": "<p>On a hit, target is Immobilized (DC 34 Athletics to escape).</p>" },
    "merciful": { "name": "Merciful", "level": 6, "description": "<p>The weapon's damage is nonlethal. On a crit, target is Slowed 1.</p>" },
    "nightmare": { "name": "Nightmare", "level": 12, "description": "<p>Deals an extra 1d6 mental damage. On a crit, target is Confused for 1 round.</p>" },
    "pacifying": { "name": "Pacifying", "level": 5, "description": "<p>On a hit, the target takes a -2 penalty to attack rolls against you for 1 round.</p>" },
    "speed": { "name": "Quickstrike", "level": 16, "description": "<p>You are Quickened and can use the extra action only for a Strike with this weapon.</p>" },
    "returning": { "name": "Returning", "level": 3, "description": "<p>A thrown weapon returns to your hand immediately after the attack is resolved.</p>" },
    "rooting": { "name": "Rooting", "level": 5, "description": "<p>On a hit, target is Immobilized (DC 20 Athletics to escape).</p>" },
    "serrating": { "name": "Serrating", "level": 10, "description": "<p>Deals an extra 1d4 slashing damage. This increases to 1d12 on a Strike with 3+ actions.</p>" },
    "shifting": { "name": "Shifting", "level": 6, "description": "<p><strong>Activate</strong> [1-action]; <strong>Effect</strong> The weapon takes the shape of another melee weapon.</p>" },
    "shock": { "name": "Shock", "level": 8, "description": "<p>Deals an extra 1d6 electricity damage. On a crit, electricity arcs to adjacent foes.</p>" },
    "shockwave": { "name": "Shockwave", "level": 8, "description": "<p><strong>Activate</strong> [2-actions]; <strong>Effect</strong> Create a 15-foot cone that deals bludgeoning damage.</p>" },
    "spellStoring": { "name": "Spell Reservoir", "level": 13, "description": "<p>Can store a spell of 3rd rank or lower to be unleashed on a hit.</p>" },
    "swarming": { "name": "Swarming", "level": 9, "description": "<p>On a hit, the weapon creates a swarm of illusory copies, granting concealment.</p>" },
    "thundering": { "name": "Thundering", "level": 8, "description": "<p>Deals an extra 1d6 sonic damage. On a crit, target is Deafened permanently.</p>" },
    "trueRooting": { "name": "True Rooting", "level": 19, "description": "<p>On a hit, target is Immobilized (DC 41 Athletics to escape).</p>" },
    "underwater": { "name": "Underwater", "level": 3, "description": "<p>You don't take the usual penalties for using this weapon underwater.</p>" },
    "unholy": { "name": "Unholy", "level": 11, "description": "<p>The weapon deals an extra 1d4 spirit damage; extra 1d4 if you are unholy and target is holy.</p>" },
    "disrupting": { "name": "Vitalizing", "level": 5, "description": "<p>Deals an extra 1d6 persistent vitality damage to undead.</p>" },
    "vorpal": { "name": "Vorpal", "level": 17, "description": "<p>On a natural 20 critical hit, the target must save or be decapitated.</p>" },
    "wounding": { "name": "Wounding", "level": 7, "description": "<p>Deals 1d6 persistent bleed damage on a hit.</p>" }
};    

static ARMOR_RUNE_LIBRARY = {
    "acidResistant": { "name": "Acid Resistant", "level": 8, "description": "<p>This rune protects you from acid damage. You gain resistance 5 to acid damage.</p>" },
    "advancing": { "name": "Advancing", "level": 9, "description": "<p><strong>Activate</strong> [free-action] command; <strong>Requirements</strong> Your last action reduced an enemy to 0 HP; <strong>Effect</strong> You Stride up to 15 feet. This movement doesn't trigger reactions.</p>" },
    "aimAiding": { "name": "Aim-Aiding", "level": 6, "description": "<p>You don't provide enemies cover against your allies' ranged attacks.</p>" },
    "antimagic": { "name": "Antimagic", "level": 15, "description": "<p>+1 status bonus to saves vs magic. <strong>Activate</strong> [reaction] (concentrate); <strong>Effect</strong> Attempt to counteract a spell targeting you (7th-rank Dispel Magic, +26 counteract modifier).</p>" },
    "assisting": { "name": "Assisting", "level": 5, "description": "<p>Replicates the benefits of supports or prostheses. You can carry Bulk equal to 6 + Str mod before becoming encumbered.</p>" },
    "bitter": { "name": "Bitter", "level": 9, "description": "<p>Any creature that Engulfs or Swallows you is Sickened 1. If it retches, you can Escape as a reaction.</p>" },
    "coldResistant": { "name": "Cold Resistant", "level": 8, "description": "<p>This rune protects you from cold damage. You gain resistance 5 to cold damage.</p>" },
    "deathless": { "name": "Deathless", "level": 7, "description": "<p><strong>Activate</strong> [reaction] envision; <strong>Trigger</strong> You gain Doomed or Wounded; <strong>Effect</strong> Reduce the value of the condition by 1.</p>" },
    "electricityResistant": { "name": "Electricity Resistant", "level": 8, "description": "<p>This rune protects you from electricity damage. You gain resistance 5 to electricity damage.</p>" },
    "energyAdaptive": { "name": "Energy Adaptive", "level": 13, "description": "<p><strong>Activate</strong> [reaction] envision; <strong>Trigger</strong> You take acid, cold, electricity, or fire damage; <strong>Effect</strong> Gain resistance 5 to that type.</p>" },
    "ethereal": { "name": "Ethereal", "level": 17, "description": "<p><strong>Activate</strong> [action] command; <strong>Effect</strong> Gain the effects of Ethereal Jaunt for 10 minutes.</p>" },
    "fireResistant": { "name": "Fire Resistant", "level": 8, "description": "<p>This rune protects you from fire damage. You gain resistance 5 to fire damage.</p>" },
    "fortification": { "name": "Fortification", "level": 12, "description": "<p>When critically hit, attempt a DC 17 flat check; on a success, it becomes a normal hit. Increases Bulk by 1.</p>" },
    "glamered": { "name": "Glamered", "level": 5, "description": "<p><strong>Activate</strong> [1-action] (concentrate); <strong>Effect</strong> Disguise armor as ordinary or fine clothes.</p>" },
    "gliding": { "name": "Gliding", "level": 8, "description": "<p><strong>Activate</strong> [1-action] command; <strong>Effect</strong> Glide 5ft down and up to 25ft forward; you remain in the air if you spend an action gliding.</p>" },
    "greaterAcidResistant": { "name": "Greater Acid Resistant", "level": 12, "description": "<p>This rune protects you from acid damage. You gain resistance 10 to acid damage.</p>" },
    "greaterAdvancing": { "name": "Advancing (Greater)", "level": 16, "description": "<p><strong>Activate</strong> [free-action] command; <strong>Requirements</strong> Your last action reduced an enemy to 0 HP; <strong>Effect</strong> You Stride up to your Speed. No reactions triggered.</p>" },
    "greaterColdResistant": { "name": "Greater Cold Resistant", "level": 12, "description": "<p>This rune protects you from cold damage. You gain resistance 10 to cold damage.</p>" },
    "greaterDread": { "name": "Dread (Greater)", "level": 18, "description": "<p>Frightened enemies within 30ft must save (DC 38 Will) or their Frightened value doesn't decrease that turn.</p>" },
    "greaterElectricityResistant": { "name": "Greater Electricity Resistant", "level": 12, "description": "<p>This rune protects you from electricity damage. You gain resistance 10 to electricity damage.</p>" },
    "greaterFireResistant": { "name": "Greater Fire Resistant", "level": 12, "description": "<p>This rune protects you from fire damage. You gain resistance 10 to fire damage.</p>" },
    "greaterFortification": { "name": "Fortification (Greater)", "level": 18, "description": "<p>When critically hit, attempt a DC 14 flat check; on a success, it becomes a normal hit. Increases Bulk by 1.</p>" },
    "greaterInvisibility": { "name": "Invisibility (Greater)", "level": 10, "description": "<p><strong>Activate</strong> [1-action] (concentrate); <strong>Frequency</strong> 3/day; <strong>Effect</strong> Become invisible for 1 minute (2nd-rank spell).</p>" },
    "greaterQuenching": { "name": "Quenching (Greater)", "level": 10, "description": "<p>Flat check to end persistent acid or fire damage is DC 10 (or 5 with help).</p>" },
    "greaterReady": { "name": "Ready (Greater)", "level": 11, "description": "<p>You can don any armor with this rune as a single action.</p>" },
    "greaterShadow": { "name": "Shadow (Greater)", "level": 9, "description": "<p>You gain a +2 item bonus to Stealth checks.</p>" },
    "greaterSlick": { "name": "Slick (Greater)", "level": 8, "description": "<p>You gain a +2 item bonus to Acrobatics checks to Escape and Squeeze.</p>" },
    "greaterStanching": { "name": "Stanching (Greater)", "level": 9, "description": "<p>Flat check to end persistent bleed damage is DC 10 (or 5 with help).</p>" },
    "greaterSwallowSpike": { "name": "Swallow-Spike (Greater)", "level": 12, "description": "<p><strong>Activate</strong> [reaction] envision; <strong>Trigger</strong> You are Grabbed/Restrained; <strong>Effect</strong> Armor Strike (+22) for 3d6 piercing.</p>" },
    "greaterWinged": { "name": "Winged (Greater)", "level": 19, "description": "<p><strong>Activate</strong> [2-actions] (concentrate); <strong>Effect</strong> Gain fly Speed (25ft or land Speed) indefinitely.</p>" },
    "immovable": { "name": "Immovable", "level": 12, "description": "<p><strong>Activate</strong> [1-action] Interact; <strong>Effect</strong> You are Immobilized and anchored in place until Dismissed.</p>" },
    "implacable": { "name": "Implacable", "level": 11, "description": "<p>When affected by an effect requiring an Escape, you become Quickened (Step or Escape only).</p>" },
    "invisibility": { "name": "Invisibility", "level": 8, "description": "<p><strong>Activate</strong> [1-action] (concentrate); <strong>Frequency</strong> 1/day; <strong>Effect</strong> Become invisible for 1 minute (2nd-rank spell).</p>" },
    "lesserDread": { "name": "Dread (Lesser)", "level": 6, "description": "<p>Frightened enemies within 30ft must save (DC 20 Will) or Frightened doesn't decrease below 1.</p>" },
    "magnetizing": { "name": "Magnetizing", "level": 10, "description": "<p><strong>Activate</strong> [1-action] command; <strong>Effect</strong> You and adjacent metal creature treat movement away from each other as difficult terrain.</p>" },
    "majorQuenching": { "name": "Quenching (Major)", "level": 14, "description": "<p>Flat check to end persistent acid or fire damage is DC 8 (or 3 with help).</p>" },
    "majorShadow": { "name": "Shadow (Major)", "level": 17, "description": "<p>You gain a +3 item bonus to Stealth checks.</p>" },
    "majorSlick": { "name": "Slick (Major)", "level": 16, "description": "<p>You gain a +3 item bonus to Acrobatics checks to Escape and Squeeze.</p>" },
    "majorStanching": { "name": "Stanching (Major)", "level": 13, "description": "<p>Flat check to end persistent bleed damage is DC 8 (or 3 with help).</p>" },
    "majorSwallowSpike": { "name": "Swallow-Spike (Major)", "level": 16, "description": "<p><strong>Activate</strong> [reaction] envision; <strong>Trigger</strong> You are Grabbed/Restrained; <strong>Effect</strong> Armor Strike (+28) for 5d6 piercing.</p>" },
    "malleable": { "name": "Malleable", "level": 9, "description": "<p><strong>Activate</strong> [1-action] (manipulate); <strong>Effect</strong> Change the armor's specialization group.</p>" },
    "misleading": { "name": "Misleading", "level": 16, "description": "<p>Concealed flat check DC is 6. <strong>Activate</strong> [2-actions] command; <strong>Effect</strong> Cast Mislead on yourself 1/day.</p>" },
    "moderateDread": { "name": "Dread (Moderate)", "level": 12, "description": "<p>Frightened enemies within 30ft must save (DC 29 Will) or Frightened doesn't decrease below 2.</p>" },
    "portable": { "name": "Portable", "level": 9, "description": "<p><strong>Activate</strong> [3-actions] command; <strong>Effect</strong> Armor folds into a wearable bangle/amulet (Light bulk).</p>" },
    "quenching": { "name": "Quenching", "level": 6, "description": "<p>Flat check to end persistent acid or fire damage is DC 12 (or 7 with help).</p>" },
    "raiment": { "name": "Raiment", "level": 5, "description": "<p><strong>Activate</strong> [1-action] (concentrate); <strong>Effect</strong> Disguise armor as ordinary or fine clothes.</p>" },
    "ready": { "name": "Ready", "level": 6, "description": "<p>Don light armor in 1 action, or medium/heavy armor in 2 actions.</p>" },
    "rockBraced": { "name": "Rock-Braced", "level": 13, "description": "<p>+4 item bonus to Fortitude DC against forced movement.</p>" },
    "shadow": { "name": "Shadow", "level": 5, "description": "<p>You gain a +1 item bonus to Stealth checks.</p>" },
    "sinisterKnight": { "name": "Sinister Knight", "level": 8, "description": "<p>+1 item bonus to Deception. <strong>Activate</strong> [action] envision; <strong>Effect</strong> Mask alignment and identity with demonic aesthetics.</p>" },
    "sizeChanging": { "name": "Size-Changing", "level": 7, "description": "<p><strong>Activate</strong> [1-action] (concentrate); <strong>Effect</strong> Cast Enlarge or Shrink on yourself 1/day.</p>" },
    "slick": { "name": "Slick", "level": 5, "description": "<p>You gain a +1 item bonus to Acrobatics checks to Escape and Squeeze.</p>" },
    "soaring": { "name": "Soaring", "level": 14, "description": "<p>+10-foot item bonus to fly Speed. <strong>Activate</strong> [reaction] command; <strong>Effect</strong> Cast Gentle Landing.</p>" },
    "stanching": { "name": "Stanching", "level": 5, "description": "<p>Flat check to end persistent bleed damage is DC 12 (or 7 with help).</p>" },
    "swallowSpike": { "name": "Swallow-Spike", "level": 6, "description": "<p><strong>Activate</strong> [reaction] envision; <strong>Trigger</strong> You are Grabbed/Restrained; <strong>Effect</strong> Armor Strike (+14) for 2d6 piercing.</p>" },
    "trueQuenching": { "name": "True Quenching", "level": 18, "description": "<p>Flat check to end persistent acid or fire damage is DC 5 (help removes it automatically).</p>" },
    "trueStanching": { "name": "Stanching (True)", "level": 17, "description": "<p>Flat check to end persistent bleed damage is DC 5 (help removes it automatically).</p>" },
    "winged": { "name": "Winged", "level": 13, "description": "<p><strong>Activate</strong> [2-actions] (concentrate); <strong>Effect</strong> Gain fly Speed (25ft or land Speed) for 5 minutes 1/hour.</p>" }
};


static PRECIOUS_MATERIALS = {
    "abysium-standard": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Abysium (Standard-Grade)",
        "level": 9,
        "description": "<p>Items made of abysium glow with a faint greenish light. A weapon deals 1 additional poison damage. Any creature wearing abysium must succeed at a DC 25 Fortitude save or become sickened 1.</p>"
    },
    "abysium-high": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Abysium (High-Grade)",
        "level": 17,
        "description": "<p>High-grade abysium glows more intensely. A weapon deals 2 additional poison damage. The save DC for the sickened effect increases to 35.</p>"
    },
    "adamantine-standard": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Adamantine (Standard-Grade)",
        "level": 11,
        "description": "<p>Incredibly hard black metal. Weapons treat object Hardness as 5 lower. Armor grants resistance to physical damage. Shields have significantly higher Hardness.</p>"
    },
    "adamantine-high": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Adamantine (High-Grade)",
        "level": 17,
        "description": "<p>High-grade adamantine is almost indestructible. Weapons treat Hardness as 10 lower. Armor grants higher physical resistance.</p>"
    },
    "cold-iron-low": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Cold Iron (Low-Grade)",
        "level": 2,
        "description": "<p>Versatile metal used to fight fey and demons. Mined deep underground and forged at lower temperatures.</p>"
    },
    "cold-iron-standard": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Cold Iron (Standard-Grade)",
        "level": 10,
        "description": "<p>Standard-grade cold iron can hold mid-level magic runes and has higher Hardness and HP.</p>"
    },
    "cold-iron-high": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Cold Iron (High-Grade)",
        "level": 16,
        "description": "<p>Purest form of the metal. Required for the most powerful runes (+3) and effective against high-level fiends.</p>"
    },
    "dawnsilver-standard": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Dawnsilver (Standard-Grade)",
        "level": 11,
        "description": "<p>Also known as Mithral. Reduces Bulk by 1. Armor has its Strength requirement reduced by 2.</p>"
    },
    "dawnsilver-high": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Dawnsilver (High-Grade)",
        "level": 17,
        "description": "<p>High-grade dawnsilver is incredibly light and durable, required for the highest level of speed-enhancing magic.</p>"
    },
    "djezet-standard": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Djezet (Standard-Grade)",
        "level": 12,
        "description": "<p>Liquid rust-red metal that enhances spellcasting. Staves/wands increase spell DCs by 1.</p>"
    },
    "djezet-high": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Djezet (High-Grade)",
        "level": 19,
        "description": "<p>The ultimate catalyst for magic, used only in the most powerful artifacts.</p>"
    },
    "duskwood-standard": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Duskwood (Standard-Grade)",
        "level": 7,
        "description": "<p>As strong as steel but floats. Not metallic (safe from rust). Items weigh half as much.</p>"
    },
    "duskwood-high": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Duskwood (High-Grade)",
        "level": 15,
        "description": "<p>Virtually weightless. Provides the protection of heavy armor without the metallic drawbacks.</p>"
    },
    "inubrix-standard": {
        "usage": { weapon: true, armor: false, shield: true },
        "name": "Inubrix (Standard-Grade)",
        "level": 9,
        "description": "<p>Lead-soft metal that phases through other metals. Weapons ignore AC bonuses from metal shields.</p>"
    },
    "inubrix-high": {
        "usage": { weapon: true, armor: false, shield: true },
        "name": "Inubrix (High-Grade)",
        "level": 17,
        "description": "<p>Treats target's AC as if they weren't wearing metal armor at all.</p>"
    },
    "keep-stone-high": {
        "usage": { weapon: false, armor: false, shield: true },
        "name": "Keep Stone (High-Grade)",
        "level": 16,
        "description": "<p>Incredibly durable stone that resists movement. Grants +3 circumstance bonus to Fortitude DC against Shove/Trip.</p>"
    },
    "noqual-standard": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Noqual (Standard-Grade)",
        "level": 11,
        "description": "<p>Anti-magic metal. Grants a +1 bonus to saves vs spells. DC 5 Flat check to cast spells.</p>"
    },
    "noqual-high": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Noqual (High-Grade)",
        "level": 17,
        "description": "<p>Anti-magic metal. Grants a +2 status bonus to saves vs spells. DC 10 Flat check to cast spells.</p>"
    },
    "orichalcum-high": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Orichalcum (High-Grade)",
        "level": 20,
        "description": "<p>Distorts time. Weapon grants +1 initiative. Wielder is Quickened 1 during the first round.</p>"
    },
    "peachwood-standard": {
        "usage": { weapon: true, armor: false, shield: false },
        "name": "Peachwood (Standard-Grade)",
        "level": 11,
        "description": "<p>Lethal to undead. Weapons ignore 5 points of undead resistance and deal 1d6 extra vitality damage.</p>"
    },
    "peachwood-high": {
        "usage": { weapon: true, armor: false, shield: false },
        "name": "Peachwood (High-Grade)",
        "level": 17,
        "description": "<p>Ignores 10 points of undead resistance and deals 2d6 extra vitality damage.</p>"
    },
    "siccatite-standard": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Siccatite (Standard-Grade)",
        "level": 7,
        "description": "<p>Thermally active metal. Provides Resistance 5 to Fire (if Cold) or Cold (if Hot).</p>"
    },
    "siccatite-high": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Siccatite (High-Grade)",
        "level": 15,
        "description": "<p>Provides Resistance 10 to Fire (if Cold) or Cold (if Hot).</p>"
    },
    "silver-low": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Silver (Low-Grade)",
        "level": 2,
        "description": "<p>Essential for hunting lycanthropes. Bypasses silver-based weaknesses.</p>"
    },
    "silver-standard": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Silver (Standard-Grade)",
        "level": 10,
        "description": "<p>Required for mid-level enchantments. Higher durability than low-grade.</p>"
    },
    "silver-high": {
        "usage": { weapon: true, armor: true, shield: true },
        "name": "Silver (High-Grade)",
        "level": 16,
        "description": "<p>Purest alchemical silver, capable of harming the most powerful extraplanar entities.</p>"
    },
    "sovereign-steel-standard": {
        "usage": { weapon: true, armor: true, shield: false },
        "name": "Sovereign Steel (Standard-Grade)",
        "level": 12,
        "description": "<p>Disrupts magic. Critical hits attempt to counteract spells (+20).</p>"
    },
    "sovereign-steel-high": {
        "usage": { weapon: true, armor: true, shield: false },
        "name": "Sovereign Steel (High-Grade)",
        "level": 19,
        "description": "<p>Counteracts on critical hits (+30). Grants +2 status bonus to saves vs spells.</p>"
    },
    "warpglass-high": {
        "usage": { weapon: true, armor: false, shield: false },
        "name": "Warpglass (High-Grade)",
        "level": 17,
        "description": "<p>Chaotic material. Deals extra 1d6 random damage. Target confused on crit.</p>"
    }
};





/* Add these methods to the GeneratorEngine class in generator-engine.js */

/**
 * The Master Forge: Constructs the final item source object.
 */
static async forgeItem(category, baseId, physicalData, ruleBench, customName) {
    let source;
    const isWorn = category === 'worn';
    const isShield = category === 'shield';

    if (isWorn) {
        // Path A: Create Worn Vessel 
        source = {
            name: customName || "New Custom Item",
            type: "equipment",
            system: {
                description: { value: "A custom forged magical item." },
                usage: { value: baseId }, 
                bulk: { value: 0 }, 
                level: { value: 1 },
                traits: { value: ["magical"] },
                identification: { status: "identified" }
            }
        };
    } else {
        // Path B & C: Clone Base (Weapon, Armor, or Shield)
        const pack = game.packs.get("pf2e.equipment-srd");
        const doc = await pack.getDocument(baseId);
        source = doc.toObject();
        source.name = customName || `Forged ${doc.name}`;
        source.system.identification.status = "identified";
    }

    // --- NEW: SHIELD REINFORCING LOGIC ---
    if (isShield && physicalData.fundamental) {
        // physicalData.fundamental is the suffix string (e.g. "(Minor Reinforcing)")
        const runeData = this.SHIELD_REINFORCING_LIBRARY.find(r => r.suffix === physicalData.fundamental);
        
        if (runeData && runeData.level > 0) {
            // Apply Hardness and HP bonuses to the cloned base
            source.system.hardness = (source.system.hardness || 0) + runeData.hardness;
            source.system.hp.max = (source.system.hp.max || 0) + runeData.hp;
            source.system.hp.value = source.system.hp.max; // Fully heal

            // Update Name if no custom name exists
            if (!customName) {
                source.name = `${source.name} ${runeData.suffix}`;
            }
        }
    }

    // --- EXPANDED DESCRIPTION BUILDER ---
    let extraDesc = "";
    const descriptionParts = [];

    // 1. Add Material Description (Stays exactly the same)
if (physicalData.material) {
            const matData = GeneratorEngine.PRECIOUS_MATERIALS[physicalData.material];
            if (matData) {
                descriptionParts.push(`<h3>Material: ${matData.name}</h3>${matData.description}`);
                
                // UNIVERSAL SPLIT: Works for 1, 2, or 3 hyphens
                const parts = physicalData.material.split('-');
                const mGrade = parts.pop();      // Always takes the last word ("standard", "low", etc.)
                const mType = parts.join('-');   // Re-joins the rest ("sovereign-steel", "cold-iron")
                
                source.system.material = { 
                    type: mType, 
                    grade: mGrade 
                };
            }
        }

    // 2. Add Property Rune Descriptions (Only if NOT a shield)
    if (!isShield && physicalData.propertyRunes && physicalData.propertyRunes.length > 0) {
        let runeText = `<h3>Property Runes</h3>`;
        const library = (category === 'weapon') 
            ? GeneratorEngine.WEAPON_RUNE_LIBRARY 
            : GeneratorEngine.ARMOR_RUNE_LIBRARY;

        for (const runeSlug of physicalData.propertyRunes) {
            const runeData = library[runeSlug];
            if (runeData) {
                runeText += `<div style="margin-bottom: 10px;"><strong>${runeData.name}:</strong> ${runeData.description}</div>`;
            }
        }
        descriptionParts.push(runeText);
    }

    // 3. Add Custom Architect Logic
    if (ruleBench && ruleBench.length > 0) {
        let logicText = `<h3>Architect Logic</h3><ul>`;
        ruleBench.forEach(r => { logicText += `<li><strong>${r.label}</strong></li>`; });
        logicText += `</ul>`;
        descriptionParts.push(logicText);
    }

    // Finalize Description
    if (descriptionParts.length > 0) {
        extraDesc = descriptionParts.join('<hr />') + '<hr />';
    }
    source.system.description.value = extraDesc + (source.system.description.value || "");

    // --- Apply Physical Stats (Only for Weapons/Armor) ---
if (!isWorn) {
            const isShield = category === 'shield';
            const isWeapon = category === 'weapon';

            if (isShield) {
                // --- SHIELD REINFORCING ---
                const runeData = this.SHIELD_REINFORCING_LIBRARY.find(r => r.suffix === physicalData.fundamental);
                const runeIndex = this.SHIELD_REINFORCING_LIBRARY.indexOf(runeData);

                // This sets the native Foundry dropdown
                source.system.runes = {
                    reinforcing: runeIndex > 0 ? runeIndex : 0
                };

                if (runeData && runeData.level > 0) {
                    source.system.hardness = (source.system.hardness || 0) + runeData.hardness;
                    source.system.hp.max = (source.system.hp.max || 0) + runeData.hp;
                    source.system.hp.value = source.system.hp.max;
                    
                    if (!customName) {
                        source.name = `${source.name} ${runeData.suffix}`;
                    }
                }
            } else {
                // --- WEAPON & ARMOR LOGIC ---
                const uiPropertyRunes = (physicalData.propertyRunes || []).map(slug => {
                    let camel = slug.split('-').map((word, index) => 
                        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
                    ).join('');
                    
                    if (camel.endsWith('Greater')) {
                        const base = camel.slice(0, -7);
                        return 'greater' + base.charAt(0).toUpperCase() + base.slice(1);
                    }
                    if (camel.endsWith('Major')) {
                        const base = camel.slice(0, -5);
                        return 'major' + base.charAt(0).toUpperCase() + base.slice(1);
                    }
                    return camel;
                });

                source.system.runes = {
                    potency: physicalData.potency || 0,
                    [isWeapon ? 'striking' : 'resilient']: physicalData.fundamental || 0,
                    property: uiPropertyRunes 
                };

                // Attach Sub-items (Rune Documents)
                if (physicalData.propertyRunes?.length > 0) {
                    const pack = game.packs.get("pf2e.equipment-srd");
                    const index = await pack.getIndex({ fields: ["system.slug"] });
                    for (const originalSlug of physicalData.propertyRunes) {
                        const entry = index.find(i => i.system.slug === originalSlug);
                        if (entry) {
                            const runeDoc = await pack.getDocument(entry._id);
                            source.items = source.items || [];
                            source.items.push(runeDoc.toObject());
                        }
                    }
                }
            } // End of Weapon/Armor Else
        } // End of !isWorn Check

    // Final Rule and Level application
    source.system.rules = await this.forgeRules(ruleBench);
    source.system.level.value = Math.max(source.system.level.value, physicalData.level || 1);

    return source;
} // end forge item

    /**
     * Translates our ruleBench objects into official PF2e Rule Element JSON.
     */
/**
     * Translates our ruleBench objects into official PF2e Rule Element JSON.
     * Updated to be async to handle Aura item creation.
     */
    static async forgeRules(bench) {
        // 1. Create an array of "Promises" (pending tasks)
        const rulePromises = bench.map(async (rule) => {
            switch (rule.category) {
                case 'numerical':
                    return {
                        key: "FlatModifier",
                        selector: rule.selector,
                        value: rule.value,
                        type: rule.type,
                        predicate: rule.predicate,
                        label: rule.label
                    };
                    
                case 'strike':
                    return {
                        key: "FlatModifier",
                        selector: "damage",
                        value: rule.formula,
                        damageType: rule.damageType,
                        category: rule.damageCategory,
                        damageCategory: rule.damageCategory === "persistent" ? "persistent" : undefined,
                        predicate: rule.predicate,
                        label: rule.label
                    };

                case 'defense':
                    const keyMap = { resistance: "Resistance", weakness: "Weakness", immunity: "Immunity" };
                    return {
                        key: keyMap[rule.mode],
                        type: rule.damageType,
                        value: rule.value,
                        predicate: rule.predicate,
                        label: rule.label
                    };

                case 'sensory':
                    if (rule.subType === 'aura') {
                        // We 'await' here because _forgeAura is now looking at the database
                        return await this._forgeAura(rule);
                    } else {
                        return {
                            key: "Sense",
                            selector: rule.subType,
                            force: true,
                            acuity: "precise",
                            value: rule.range || null,
                            predicate: rule.predicate,
                            label: rule.label
                        };
                    }
                default:
                    return [];
            }
        });

        // 2. Wait for all rules to finish and flatten the array
        const results = await Promise.all(rulePromises);
        return results.flat();
    }


    // forge aura function *********
    static async _forgeAura(rule) {
        let affects = "allies";
        let includesSelf = false;
        
        if (rule.auraTarget === 'enemy') affects = "enemies";
        if (rule.auraTarget === 'all') affects = "all";
        if (rule.auraTarget === 'self-ally') {
            affects = "allies";
            includesSelf = true;
        }

        // 1. Branch to helper to get a real UUID from the 'Aura Effects' folder
        const effectUuid = await this._getOrCreateAuraEffect(rule);

        // 2. Return the official Aura Rule Element pointing to that UUID
        return {
            key: "Aura",
            radius: rule.range,
            includesSelf: includesSelf,
            label: rule.label,
            effects: [{
                uuid: effectUuid, 
                affects: affects,
                events: ["enter"],
                removeOnExit: true,
                predicate: rule.predicate || []
            }]
        };
    } // end forge aura 


        /**
     * Checks for an existing effect in the 'Aura Effects' folder 
     * or creates a new one if it doesn't exist.
     */
    static async _getOrCreateAuraEffect(rule) {
        console.log("Architect | Received Rule Data:", rule); // ADD THIS LINE
       
        const parentName = "Item Architect";
        const childName = "Aura Effects";

        // 1. Ensure Parent Folder exists
        let parent = game.folders.find(f => f.name === parentName && f.type === "Item");
        if (!parent) {
            parent = await Folder.create({ name: parentName, type: "Item", color: "#4a148c" });
        }

        // 2. Ensure Child Folder exists INSIDE Parent
        let folder = game.folders.find(f => f.name === childName && f.folder?.id === parent.id);
        if (!folder) {
            folder = await Folder.create({ 
                name: childName, 
                type: "Item", 
                folder: parent.id,
                color: "#6a1b9a" 
            });
        }

        
        // Create a unique fingerprint (DNA) for this specific math/condition
        const fingerprint = `arch-${rule.stat || rule.condition}-${rule.value}-${rule.type || 'none'}`;

        // Look for an existing effect with this fingerprint in that folder
            // SAFE SEARCH: Look at the data directly to bypass system security checks
            const existing = folder.contents.find(i => 
                i.flags?.architect?.fingerprint === fingerprint
            );
        if (existing) return existing.uuid;

        // Otherwise, create a new Effect item
const effectData = {
            name: `Aura: ${rule.label || "Unnamed Aura"}`,
            type: "effect",
            folder: folder.id,
            img: "icons/magic/symbols/circle-outline-star-yellow.webp",
            flags: { architect: { fingerprint: fingerprint } },
            system: {
                slug: fingerprint,
                description: { value: `Architect generated aura for ${rule.label}` },
                rules: [
                    rule.payloadType === 'modifier' ? {
                        key: "FlatModifier",
                        selector: rule.stat || "ac", // Default to AC if stat is missing
                        value: rule.value || 0,
                        type: rule.type || "status",
                        label: rule.label || "Aura Bonus",
                        slug: `arch-mod-${rule.stat || 'generic'}`
                    } : {
                        key: "Condition",
                        type: rule.condition || "frightened", // Default condition
                        value: rule.value || 1,
                        slug: `arch-cond-${rule.condition || 'generic'}`
                    }
                ]
            }
        };

        const newEffect = await Item.create(effectData);
        return newEffect.uuid;
    } // end get or create effect aura






static WORN_SLOTS = [
        { name: 'Amulet', usage: 'wornamulet' },
        { name: 'Anklets', usage: 'wornanklets' },
        { name: 'Armbands', usage: 'wornarmbands' },
        { name: 'Belt', usage: 'wornbelt' },
        { name: 'Boots', usage: 'wornboots' },
        { name: 'Bracelet', usage: 'wornbracelet' },
        { name: 'Bracers', usage: 'wornbracers' },
        { name: 'Cape/Cloak', usage: 'worncloak' },
        { name: 'Circlet/Crown', usage: 'wornheadwear' },
        { name: 'Gloves', usage: 'worngloves' },
        { name: 'Eyepiece/Goggles', usage: 'worneyepiece' },
        { name: 'Necklace', usage: 'wornnecklace' },
        { name: 'Ring', usage: 'wornring' },
        { name: 'Wrist/Bracers', usage: 'wornwrist' }
    ];

    static get auraSelectors() {
        return [
            { value: "ac", label: "Armor Class (AC)" },
            { value: "attack", label: "Attack Rolls" },
            { value: "damage", label: "Damage Rolls" },
            { value: "saving-throw", label: "All Saving Throws" },
            { value: "fortitude", label: "Fortitude Saves" },
            { value: "reflex", label: "Reflex Saves" },
            { value: "will", label: "Will Saves" },
            { value: "speed", label: "Movement Speed" }, // Added: For 'Celerity' or 'Slow' auras
            { value: "perception", label: "Perception" },
            { value: "skill-check", label: "All Skill Checks" },
            { value: "acrobatics", label: "Acrobatics" }, // Added
            { value: "athletics", label: "Athletics" },
            { value: "stealth", label: "Stealth" },
            { value: "intimidation", label: "Intimidation" }, // Added: Common for 'Menace' auras
            { value: "diplomacy", label: "Diplomacy" }, // Added: Common for 'Leadership' auras
            { value: "performance", label: "Performance" } // Added: Common for 'Bardic' auras
        ];
    }

    static get pf2eConditions() {
        return [
            "clumsy", "concealed", "confused", "dazzled", "deafened", "doomed", 
            "drained", "enfeebled", "frightened", "grabbed", "hidden", "immobilized", 
            "off-guard", "paralyzed", "prone", "restrained", "sickened", "slowed", 
            "stunned", "stupified"
        ];
    }

    static POTENCY_RUNES = ["", "+1", "+2", "+3"];
    static STRIKING_RUNES = ["", "Striking", "Greater Striking", "Major Striking"];
    static RESILIENCY_RUNES = ["", "Resilient", "Greater Resilient", "Major Resilient"];

    static POTENCY_LEVELS = { "": 0, "+1": 2, "+2": 10, "+3": 16 };
    static STRIKING_LEVELS = { "": 0, "Striking": 4, "Greater Striking": 12, "Major Striking": 19 };
    static RESILIENCY_LEVELS = { "": 0, "Resilient": 8, "Greater Resilient": 14, "Major Resilient": 20 };


static getFundamentalList(category) {
        if (category === 'armor') return this.RESILIENCY_RUNES;
        if (category === 'weapon') return this.STRIKING_RUNES;
        return [];
    }


   
    /**
     * Retrieves property runes from the hard-coded libraries.
     * Replaces the old compendium-fetch method for speed and reliability.
     */

    static async getPropertyRunes(category) {
        // 1. Select the correct library based on category
        const library = category === 'weapon' ? GeneratorEngine.WEAPON_RUNE_LIBRARY : GeneratorEngine.ARMOR_RUNE_LIBRARY;
        
        // 2. Map the library objects into the format the UI expects
        const mapped = Object.entries(library).map(([slug, data]) => ({
            name: data.name,
            slug: slug, // This is the key (e.g., 'acidResistant')
            level: data.level || 0
        }));

        console.log(`Item Architect | Loaded ${mapped.length} hard-coded runes for ${category}`);

        // 3. Sort Logic: Level (Ascending) then Name (Alphabetical)
        return mapped.sort((a, b) => {
            if (a.level !== b.level) {
                return a.level - b.level; 
            }
            return a.name.localeCompare(b.name);
        });
    } // end get property runes






/* Inside your GeneratorEngine class */
static get logicTags() {
    const tags = [];

    // 1. Add Creature Traits (Target Logic)
    for (let [key, label] of Object.entries(CONFIG.PF2E.creatureTraits)) {
        if (isNaN(key) && !['common', 'uncommon', 'rare', 'unique'].includes(key)) {
            tags.push({
                value: `target:trait:${key}`,
                label: `${game.i18n.localize(label)} (Target Trait)`
            });
        }
    }

    // 2. Add Conditions (Self & Target Logic)
    for (let [key, label] of Object.entries(CONFIG.PF2E.conditionTypes)) {
        const localized = game.i18n.localize(label);
        tags.push({ value: `target:condition:${key}`, label: `${localized} (Target Condition)` });
        tags.push({ value: `self:condition:${key}`, label: `${localized} (My Condition)` });
    }

    // Sort alphabetically by the label so the search feels natural
    return tags.sort((a, b) => a.label.localeCompare(b.label));
}




/* Inside GeneratorEngine class */
static get allLogicTags() {
    const tags = [];

    // Harvest Traits
    for (let [key, label] of Object.entries(CONFIG.PF2E.creatureTraits)) {
        if (isNaN(key) && !['common', 'uncommon', 'rare', 'unique'].includes(key)) {
            tags.push({
                value: `target:trait:${key}`,
                label: `${game.i18n.localize(label)} (Target Trait)`
            });
        }
    }

    // Harvest Conditions
    for (let [key, label] of Object.entries(CONFIG.PF2E.conditionTypes)) {
        const localized = game.i18n.localize(label);
        tags.push({ value: `target:condition:${key}`, label: `${localized} (Target Condition)` });
        tags.push({ value: `self:condition:${key}`, label: `${localized} (My Condition)` });
    }

    return tags;
}



    
static getWornSlots() {
        // We return a copy to prevent accidental modification of the static list
        return [...this.WORN_SLOTS].sort((a, b) => a.name.localeCompare(b.name));
    }



/**
 * Dynamically fetches mundane shields from the compendium and filters out "gimmick" items.
 * @returns {Promise<Array>} A list of base shield objects for the AI to choose from.
 */
static async getMundaneShieldPool() {
    const pack = game.packs.get("pf2e.equipment-srd");
    const index = await pack.getIndex({
        fields: ["system.hp", "system.hardness", "system.acBonus", "system.details.level", "system.traits", "system.baseItem"]
    });

    const blacklistedWords = [
        "gauntlet", "caster", "magnetic", "meteor", "razor", 
        "dart", "klar", "salvo", "swordstealer", "mycoweave", "martyr", "igroon", "targe"
    ];

    return index.filter(i => {
        const name = i.name.toLowerCase();
        const traits = i.system.traits?.value || [];
        const isShield = i.type === "shield";
        const isMundane = !traits.some(t => ["magical", "artifact", "intelligent", "specific"].includes(t));
        const isNotGimmick = !blacklistedWords.some(word => name.includes(word));
        const isNotVariant = !name.includes("(lesser)") && !name.includes("(greater)") && !name.includes("(major)");

        // Level 2 gate matches your armor logic (catching items like Full Plate or Fortress Shields)
        return isShield && isMundane && isNotGimmick && isNotVariant && (i.system.details?.level?.value || 0) <= 2;
    });
}



    /**
     * Pulls base items from the PF2e Equipment Compendium based on category.
     */
static async getBaseItems(category, allowUncommon = false) {
    const pack = game.packs.get("pf2e.equipment-srd");
    const index = await pack.getIndex({ 
        fields: ["type", "system.level.value", "system.traits"] 
    });
    
    return index.filter(item => {
        if (item.type !== category) return false;

        const level = item.system?.level?.value ?? 0;
        const traits = item.system?.traits?.value || [];
        const rarity = item.system?.traits?.rarity || "common";

        // 1. Level Check: 
        // Weapons are usually Level 0. Armors like Plate go up to Level 2.
        const maxBaseLevel = (category === "armor") ? 2 : 0;
        if (level > maxBaseLevel) return false;

        // 2. Trait Check:
        // Exclude specific magic items that might exist at low levels (if any)
        if (traits.includes("specific")) return false;

        // 3. Rarity Gate:
        if (rarity === "rare" || rarity === "unique") return false;
        if (rarity === "uncommon" && !allowUncommon) return false;

        return true;
    });
}

    /**
     * Determines Potency and Striking/Resilient runes based on item level.
     * Follows PF2e fundamental rune progression.
     */
    static calculateFundamentals(category, level) {
        let potency = 0;
        let fundamental = 0; // Striking or Resilient

        if (level >= 2) potency = 1;
        if (level >= 10) potency = 2;
        if (level >= 16) potency = 3;

        if (category === "weapon") {
            if (level >= 4) fundamental = 1; // Striking
            if (level >= 12) fundamental = 2; // Greater
            if (level >= 19) fundamental = 3; // Major
        } else if (category === "armor") {
            if (level >= 5) fundamental = 1; // Resilient
            if (level >= 11) fundamental = 2; // Greater
            if (level >= 20) fundamental = 3; // Major
        }

        return { potency, fundamental };
    }
}