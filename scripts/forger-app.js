import {
	GeneratorEngine
} from './generator-engine.js'

    export class ItemArchitectApp extends FormApplication {
        constructor(object, options) {
            super(object, options);
            this.draftedItem = null;
            this.ruleBench = []; // This will store our list of rules
        }


	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			id: 'item-architect-app',
			title: 'Architect: Item Architect',
			template: 'modules/item-architect/templates/forger-main.hbs',
			width: 500,
			height: 'auto',
			classes: ['item-architect-window'],
			closeOnSubmit: false,
			resizable: true
		})
	}
	async getData(options) {
		return {
			// This is where we could pass initial state if needed
		}
	}




	activateListeners(html) {
		super.activateListeners(html)
		// --- Material Description Listener ---
		html.find('#ia-special-materials-tag').on('change', event => {
			const selectedOption = $(event.currentTarget).find(':selected');
			// Pull the description from the data-desc attribute we injected
			const description = selectedOption.data('desc') || "";
			// Update the info text paragraph
			html.find('#ia-material-description').text(description);
			console.log(`IA | Material updated: ${selectedOption.text()}`);
		});
		// Listen for changes on any property rune selector
		html.on('change', '.ia-property-selector', event => {
			this.calculateTotalLevel(html)
		})
		// Also listen for changes on Potency and Striking/Resilient
		html.find('#ia-potency-runes, #ia-striking-runes').change(() => {
			this.calculateTotalLevel(html)
		})
		// Listen for Potency changes to update Property Rune slots
        html.find('#ia-potency-runes').change(async event => {
            const potencyValue = event.target.value;
            const slotContainer = html.find('#ia-property-slots');
            const category = html.find('#ia-category').val();
            
            slotContainer.empty();
            const slotCount = potencyValue ? parseInt(potencyValue.replace('+', '')) : 0;

            if (slotCount === 0) {
                slotContainer.html('<p style="font-size:0.8em; color:#777; font-style:italic;">Requires Potency +1 or higher</p>');
            } else {
                // 1. Create slots
                for (let i = 1; i <= slotCount; i++) {
                    slotContainer.append(`
                        <div class="property-slot-row" style="margin-bottom: 5px;">
                            <select name="propertyRune${i}" id="ia-rune-slot-${i}" class="ia-property-selector">
                                <option value="">-- Loading Runes... --</option>
                            </select>
                        </div>
                    `);
                }

                // 2. Fetch simplified runes from the Engine
                const availableRunes = await GeneratorEngine.getPropertyRunes(category);

                // 3. Build options using the NEW simplified properties (slug and level)
                let runeOptions = '<option value="">-- None --</option>';
                availableRunes.forEach(rune => {
                    // FIX: Use rune.level and rune.slug as provided by the new Model
                    runeOptions += `<option value="${rune.slug}" data-level="${rune.level}">${rune.name} (Lvl ${rune.level})</option>`;
                });

                // 4. Inject options
                for (let i = 1; i <= slotCount; i++) {
                    html.find(`#ia-rune-slot-${i}`).html(runeOptions);
                }
                console.log(`Item Architect | Populated ${slotCount} property slots for ${category} using Slugs.`);
            }

            this.calculateTotalLevel(html);
            this.setPosition({ height: 'auto' });
        });
        
		// Add a listener for the base item dropdown specifically to hide on change
		html.find('#ia-base-item').change(() => {
			html.find('#ia-workspace').hide();
            html.find('#ia-forge-btn').prop('disabled', true); // Add this
			this.setPosition({
				height: 'auto'
			})
		})
		// --- NEW LISTENER FOR THE RANDOM BUTTON ---
		html.find('#ia-random-base-btn').click(() => {
			const baseSelect = html.find('#ia-base-item')
			// Filter out the placeholder "Select Base" option
			const options = baseSelect.find('option').toArray().filter(opt => opt.value !== '')
			if (options.length > 0) {
				const randomOption = options[Math.floor(Math.random() * options.length)]
				baseSelect.val(randomOption.value).trigger('change')
				// Visual feedback that the randomizer worked
				baseSelect.css('background-color', 'rgba(255, 255, 0, 0.2)')
				setTimeout(() => baseSelect.css('background-color', ''), 200)
			}
			html.find('#ia-workspace').hide()
			this.setPosition({
				height: 'auto'
			})
		})

        // category button change
        html.find('#ia-category').change(async event => {
            const category = event.target.value;
            const baseItemSelect = html.find('#ia-base-item');
            const randomBtn = html.find('#ia-random-base-btn');
            
            if (!category) {
                baseItemSelect.prop('disabled', true).html('<option value="">Select Category First...</option>');
                randomBtn.prop('disabled', true);
                return;
            }

            randomBtn.prop('disabled', false);
            let options = '<option value="">-- Select Base --</option>';

            // --- PROPERTY RUNE UPDATE ---
            // If it's a weapon or armor, refresh the property rune dropdowns
            if (category === 'weapon' || category === 'armor') {
                await this._updatePropertyRunes(html, category);
            }

            if (category === 'worn') {
                const slots = GeneratorEngine.getWornSlots();
                slots.forEach(slot => {
                    options += `<option value="${slot.usage}">${slot.name}</option>`;
                });
                baseItemSelect.html(options).prop('disabled', false);
            } else {
                baseItemSelect.prop('disabled', true).html('<option value="">Loading...</option>');
                const items = await GeneratorEngine.getBaseItems(category, true);
                items.sort((a, b) => a.name.localeCompare(b.name)).forEach(item => {
                    options += `<option value="${item._id}">${item.name}</option>`;
                });
                baseItemSelect.html(options).prop('disabled', false);
            }

            html.find('#ia-workspace').hide();
            html.find('#ia-forge-btn').prop('disabled', true); // Add this
            this.setPosition({ height: 'auto' });
        });// end category button change


// --- DRAFT BUTTON ---
        html.find('#ia-draft-btn').click(event => {
            const category = html.find('#ia-category').val();
            const baseItem = html.find('#ia-base-item').val();
            
            if (!category || !baseItem) {
                ui.notifications.warn('Please select a Category and a Base Item first!');
                return;
            }

            // --- Section Visibility Logic ---
            if (category === 'worn') {
                html.find('#ia-physical-bench').attr('style', 'display: none !important');
            } else {
                // Show the Physical Bench for Weapons/Armor/Shields
                html.find('#ia-physical-bench').attr('style', 'display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; border-bottom: 1px solid #555; padding-bottom: 10px; margin-bottom: 10px;');
                
                const strikingSelect = html.find('#ia-striking-runes');
                const potencySelect = html.find('#ia-potency-runes');
                const strikingLabel = strikingSelect.closest('.build-section').find('label').first();

                // 1. Handle Shield Reinforcing vs. Standard Fundamentals
                if (category === 'shield') {
                    // Update Label
                    strikingLabel.html('<i class="fas fa-shield-alt"></i> Reinforcing Rune');

                    // Populate Reinforcing Options
                    let reinHtml = '';
                    GeneratorEngine.SHIELD_REINFORCING_LIBRARY.forEach(rune => {
                        const name = rune.suffix || "None";
                        const stats = rune.level > 0 ? ` [H:${rune.hardness} HP:${rune.hp}]` : "";
                        reinHtml += `<option value="${rune.suffix}" data-level="${rune.level}">${name}${stats}</option>`;
                    });
                    strikingSelect.html(reinHtml).prop('disabled', false);

                    // Shields don't use Potency
                    potencySelect.html('<option value="0" data-level="0">N/A</option>').prop('disabled', true);

                } else {
                    // Revert Label for Weapons/Armor
                    const labelText = category === 'weapon' ? 'Striking Rune' : 'Resiliency Rune';
                    strikingLabel.text(labelText);

                    // 1a. Populate Potency (+1, +2, +3)
                    let potencyHtml = '';
                    GeneratorEngine.POTENCY_RUNES.forEach(rune => {
                        const level = GeneratorEngine.POTENCY_LEVELS[rune] || 0;
                        potencyHtml += `<option value="${rune}" data-level="${level}">${rune || 'None'}</option>`;
                    });
                    potencySelect.html(potencyHtml).prop('disabled', false);

                    // 1b. Populate Fundamentals (Striking OR Resiliency)
                    let fundHtml = '';
                    const fundRunes = GeneratorEngine.getFundamentalList(category);
                    const fundLevelMap = category === 'armor' ? GeneratorEngine.RESILIENCY_LEVELS : GeneratorEngine.STRIKING_LEVELS;
                    
                    fundRunes.forEach(rune => {
                        const level = fundLevelMap && fundLevelMap[rune] ? fundLevelMap[rune] : 0;
                        fundHtml += `<option value="${rune}" data-level="${level}">${rune || 'None'}</option>`;
                    });
                    strikingSelect.html(fundHtml).prop('disabled', false);
                }

                // 2. Populate Material Tags
                let matHtml = '<option value="">None</option>';

                // Map the internal category names to our new usage object keys
                const categoryMap = {
                    'weapon': 'weapon',
                    'armor': 'armor',
                    'shield': 'shield'
                };
                const currentCategory = categoryMap[category];

                Object.entries(GeneratorEngine.PRECIOUS_MATERIALS)
                    // Check if the current category is marked as 'true' in the usage object
                    .filter(([id, data]) => data.usage[currentCategory] === true)
                    .sort((a, b) => a[1].level - b[1].level) // Optional: Sorts by level for a cleaner list
                    .forEach(([id, data]) => {
                        matHtml += `<option value="${id}" data-level="${data.level}" data-desc="${data.description}">${data.name}</option>`;
                    });

                html.find('#ia-special-materials-tag').html(matHtml);
                html.find('#ia-material-description').html("");
            }

            // Reveal and Resize the workspace
            html.find('#ia-workspace').slideDown(200, () => {
                html.find('#ia-forge-btn').prop('disabled', false);
                this.setPosition({ height: 'auto' });
            });

            // Trigger level calculation
            html.find('#ia-potency-runes').trigger('change');
        });

        // --- FORGE BUTTON ---
// --- FORGE BUTTON ---
        html.find('#ia-forge-btn').click(async event => {
            event.preventDefault();
            
            const category = html.find('#ia-category').val();
            const baseId = html.find('#ia-base-item').val();
            const customName = html.find('#ia-custom-name').val();
            
            // --- ADDED DEFINITIONS TO PREVENT REFERENCE ERRORS ---
            const strikingSelect = html.find('#ia-striking-runes');
            const strikingVal = strikingSelect.val();
            const fundList = GeneratorEngine.getFundamentalList(category);
            // 1. Gather Physical Data (Runes, Materials)
            const physicalData = {
                potency: parseInt(html.find('#ia-potency-runes').val()?.replace('+', '')) || 0,
                // SHIELD FIX: Send the suffix string if shield, otherwise the index for weapons/armor
                fundamental: category === 'shield' ? strikingVal : fundList.indexOf(strikingVal), 
                material: html.find('#ia-special-materials-tag').val(),
                materialTrait: html.find('#ia-special-materials-tag option:selected').data('trait'),
                propertyRunes: [],
                level: parseInt(html.find('#ia-calculated-level').text()) || 1
            };

            // Collect Property Runes (Your existing loop)
            html.find('.ia-property-selector').each((i, el) => {
                const val = $(el).val();
                if (val) physicalData.propertyRunes.push(val);
            });

            // 2. Generate the Source Object
            const source = await GeneratorEngine.forgeItem(category, baseId, physicalData, this.ruleBench, customName);

            // --- DEBUG PRINTOUT ---
            console.log("%c ARCHITECT | FINAL ITEM OBJECT PREVIEW ", "background: #ff6400; color: white; font-weight: bold;");
            console.dir(source); 

            // --- 3. Folder Structure Logic (Preserved exactly) ---
            const parentName = "Item Architect";
            const childName = "Items";

            let parent = game.folders.find(f => f.name === parentName && f.type === "Item");
            if (!parent) {
                parent = await Folder.create({ name: parentName, type: "Item", color: "#4a148c" });
            }

            let targetFolder = game.folders.find(f => f.name === childName && f.folder?.id === parent.id);
            if (!targetFolder) {
                targetFolder = await Folder.create({ 
                    name: childName, 
                    type: "Item", 
                    folder: parent.id, 
                    color: "#4a148c" 
                });
            }
            source.folder = targetFolder.id;

            // --- 4. Create the item ---
            const newItem = await Item.create(source);
            ui.notifications.info(`Item successfully forged in ${parentName} > ${childName}`);
            newItem.sheet.render(true);
        }); // // --- END FORGE BUTTON ---

		// ***** The ruleset workbench *************

		// 1. Rules Category Listener **********
		html.find('#ia-rule-category').on('change', event => {
			const category = event.currentTarget.value;
			const container = html.find('#ia-config-container');

			// Clear the current sub-box
			container.empty();

			switch (category) {
				case 'numerical':
					this._renderNumericalConfig(container);
					break;
				case 'strike':
					this._renderStrikeConfig(container);
					break;
				case 'defense':
					this._renderDefenseConfig(container);
					break;
				case 'sensory':
					this._renderSensoryConfig(container);
					break;
				default:
					container.append('<p style="grid-column: span 2; text-align: center;">Pick a category to begin.</p>');
			}
		}); // *** END rules Category Listner *******

        // ****** Add Rules Button Listner ********
        html.find('#ia-add-rule-btn').on('click', (event) => {
            event.preventDefault(); // Stop the form from trying to submit/close

            const category = html.find('#ia-rule-category').val();

            // 1. Safety check
            if (category === 'none') {
                ui.notifications.warn("Item Architect | Please select a logic category first!");
                return;
            }

            // 2. Prepare the Rule Object
            let ruleData = {
                category: category,
                id:foundry.utils.randomID() // Foundry helper to give each rule a unique ID for deletion later
            };
           // 3. Gather data based on the active category
            if (category === 'numerical') {
                const predValue = html.find('#ia-num-predicate').val(); // Grab the "target:trait:dragon" tag
                
                ruleData.selector = html.find('#ia-num-selector').val();
                ruleData.value    = parseInt(html.find('#ia-num-value').val()) || 0;
                ruleData.type     = html.find('#ia-num-type').val();
                
                // PF2e predicates must be an array: ["tag"]
                ruleData.predicate = predValue ? [predValue] : []; 
                
                // Create a "Human Readable" label for the UI list
                // This cleans up the tag (e.g., "off-guard") for the display list
                const cleanTag = predValue ? predValue.split(':').pop().replace(/-/g, ' ') : "";
                const condText = cleanTag ? ` (vs ${cleanTag})` : "";
                
                ruleData.label = `+${ruleData.value} ${ruleData.type} bonus to ${ruleData.selector}${condText}`;
            } // end gather data based on the active category
           
            else if (category === 'strike') { // gather rules for strike category
                // NEW STRIKE LOGIC
                const formula = html.find('#ia-strike-formula').val();
                const type = html.find('#ia-strike-type').val();
                const isPersistent = html.find('#ia-strike-persistent').is(':checked');
                const isCrit = html.find('#ia-strike-crit').is(':checked');
                const predValue = html.find('#ia-strike-predicate').val();

                ruleData.formula = formula;
                ruleData.damageType = type;
                ruleData.damageCategory = isPersistent ? "persistent" : null;
                
                // PF2e Predicate Array
                ruleData.predicate = predValue ? [predValue] : [];
                if (isCrit) ruleData.predicate.push("critical-hit");

                // Label for your visual list
                let label = `Extra ${formula} ${isPersistent ? 'persistent ' : ''}${type} damage`;
                if (predValue) label += ` vs ${predValue.split(':').pop()}`;
                if (isCrit) label += ` (Crits Only)`;
                
                ruleData.label = label;
            } // end rules for strike category

            else if (category === 'defense') {  // gather rules for defence category
                const mode = html.find('#ia-def-mode').val();
                const type = html.find('#ia-def-type').val();
                const val = parseInt(html.find('#ia-def-value').val()) || 0;
                const predValue = html.find('#ia-def-predicate').val();

                ruleData.mode = mode; // resistance, weakness, or immunity
                ruleData.damageType = type;
                ruleData.value = mode === 'immunity' ? null : val; // Immunities don't use numbers
                
                // Predicate Array
                ruleData.predicate = predValue ? [predValue] : [];

                // Format Label
                const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
                const modeLabel = mode.charAt(0).toUpperCase() + mode.slice(1);
                const condLabel = predValue ? ` vs ${predValue.split(':').pop()}` : "";
                
                if (mode === 'immunity') {
                    ruleData.label = `${modeLabel}: ${typeLabel}${condLabel}`;
                } else {
                    ruleData.label = `${modeLabel} ${val}: ${typeLabel}${condLabel}`;
                }
            } // gather rules for defence category
                        
            // *** Gather rules for sensory category 
            else if (category === 'sensory') {
                const subType = html.find('#ia-sensory-type').val();
                const range = parseInt(html.find('#ia-sensory-range').val()) || 0;
                const predValue = html.find('#ia-sensory-predicate').val();

                ruleData.subType = subType; // darkvision, aura, etc.
                ruleData.range = range;
                ruleData.predicate = predValue ? [predValue] : [];

                if (subType === 'aura') {
                    const target = html.find('#ia-aura-target').val();
                    const payloadType = html.find('#ia-aura-payload-type').val();
                    
                    ruleData.auraTarget = target;
                    ruleData.payloadType = payloadType;

                    if (payloadType === 'modifier') {
                        ruleData.stat  = html.find('#ia-aura-mod-stat').val();
                        ruleData.value = parseInt(html.find('#ia-aura-mod-val').val()) || 0;
                        ruleData.type  = html.find('#ia-aura-mod-type').val();
                        
                        ruleData.label = `Aura (${range}ft): +${ruleData.value} ${ruleData.type} to ${ruleData.stat} (${target})`;
                    } 
                    else if (payloadType === 'condition') {
                        ruleData.condition = html.find('#ia-aura-cond-name').val();
                        ruleData.value = parseInt(html.find('#ia-aura-cond-val').val()) || 1;
                        
                        ruleData.label = `Aura (${range}ft): Apply ${ruleData.condition} ${ruleData.value} (${target})`;
                    }
                } else {
                    // Standard Sense (Darkvision, etc.)
                    const senseLabel = subType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    ruleData.label = `Grant ${senseLabel}${range > 0 ? ' (' + range + 'ft)' : ''}`;
                }
                
                // Append logic requirement to label if present
                if (predValue) {
                    ruleData.label += ` [If ${predValue.split(':').pop()}]`;
                }
            } // *** END  Gather rules for sensory category 




            // 4. Push to the Bench (The array in your constructor)
            this.ruleBench.push(ruleData);
            console.log("Item Architect | Rule Added:", ruleData);

            // 5. Update the Visual List 
            // (We will create this method in Step 3, but let's call it now)
            this._updateRuleList(html);

            // 6. Reset the UI for the next rule
            html.find('#ia-rule-category').val('none').trigger('change');
            html.find('#ia-num-predicate, #ia-strike-predicate, #ia-strike-formula').val(''); // Clear text/search boxes
            html.find('#ia-strike-persistent, #ia-strike-crit').prop('checked', false); // Uncheck boxes
            html.find('#ia-sensory-range').val(30);
            html.find('#ia-aura-mod-stat, #ia-aura-cond-name, #ia-sensory-predicate').val('');
            html.find('#ia-aura-mod-val, #ia-aura-cond-val').val(1);




        });  // ****** end Add  Rules Button Listner ********



		// ++++  END ruleset workbench *************
	
    
    
    } // end activate Listeners

    async _updatePropertyRunes(html, category) {
        const runes = await GeneratorEngine.getPropertyRunes(category);
        // We use r.slug because the PF2e system needs the slug string (e.g., "authorized") 
        // to activate the rune's logic on the item sheet.
        const options = runes.map(r => `<option value="${r.slug}">${r.name} (Lvl ${r.level})</option>`).join('');
        
        html.find('.ia-property-selector').html(`<option value="">-- None --</option>${options}`);
    }




	// **** start render workbench Numerical Config ******
_renderNumericalConfig(container) {
    // 1. Get the list of options from our 'Model' (GeneratorEngine)
    // We map them into <option> tags for the datalist
    const tagOptions = GeneratorEngine.allLogicTags.map(t => 
        `<option value="${t.value}">${t.label}</option>`
    ).join('');

    const stats = `
        <div class="ia-field-group">
            <label>Statistic</label>
            <select id="ia-num-selector">
                <optgroup label="Saves & AC">
                    <option value="ac">Armor Class (AC)</option>
                    <option value="fortitude">Fortitude Save</option>
                    <option value="reflex">Reflex Save</option>
                    <option value="will">Will Save</option>
                </optgroup>
                <optgroup label="Core Skills">
                    <option value="athletics">Athletics</option>
                    <option value="acrobatics">Acrobatics</option>
                    <option value="stealth">Stealth</option>
                    <option value="thievery">Thievery</option>
                    <option value="deception">Deception</option>
                    <option value="intimidation">Intimidation</option>
                </optgroup>
                <optgroup label="Combat">
                    <option value="attack">Attack Rolls</option>
                    <option value="damage">Damage Rolls</option>
                    <option value="perception">Perception</option>
                    <option value="initiative">Initiative</option>
                </optgroup>
            </select>
        </div>
        <div class="ia-field-group">
            <label>Bonus Value</label>
            <input type="number" id="ia-num-value" value="1" step="1">
        </div>
        <div class="ia-field-group">
            <label>Bonus Type</label>
            <select id="ia-num-type">
                <option value="item">Item</option>
                <option value="status">Status</option>
                <option value="circumstance">Circumstance</option>
            </select>
        </div>

        <div class="ia-field-group" style="grid-column: span 2;">
            <label><i class="fas fa-brain"></i> Conditional Logic (Optional)</label>
            <input list="ia-logic-list" id="ia-num-predicate" placeholder="Search: Dragon, Off-Guard, Wounded...">
            <datalist id="ia-logic-list">
                ${tagOptions}
            </datalist>
            <p style="font-size: 0.7em; color: #777; margin-top: 4px;">
                Leave blank for a permanent bonus. Search to restrict (e.g., Dragonslayer).
            </p>
        </div>
    `;
    container.append(stats);
} // **** end render workbench Numerical Config ******


	// ****** render workbench strike config +++++++
    _renderStrikeConfig(container) {
        const tags = GeneratorEngine.allLogicTags || [];
        const logicOptions = tags.map(t => `<option value="${t.value}">${t.label}</option>`).join('');
        const damageTypes = Object.entries(CONFIG.PF2E.damageTypes)
            .map(([k, v]) => `<option value="${k}">${game.i18n.localize(v)}</option>`)
            .join('');

        const strikeFields = `
            <div class="ia-field-group">
                <label>Formula</label>
                <input type="text" id="ia-strike-formula" value="1d6" placeholder="e.g. 1d6">
            </div>
            <div class="ia-field-group">
                <label>Damage Type</label>
                <select id="ia-strike-type">
                    ${damageTypes}
                </select>
            </div>

            <div class="ia-field-group" style="display:flex; align-items:center; gap:15px; padding-top:20px; grid-column: span 2;">
                <div style="display:flex; align-items:center; gap:5px;">
                    <input type="checkbox" id="ia-strike-persistent" style="width:18px; height:18px;">
                    <label for="ia-strike-persistent">Persistent?</label>
                </div>
                <div style="display:flex; align-items:center; gap:5px;">
                    <input type="checkbox" id="ia-strike-crit" style="width:18px; height:18px;">
                    <label for="ia-strike-crit">Crit Only?</label>
                </div>
            </div>

            <div class="ia-field-group" style="grid-column: span 2;">
                <label><i class="fas fa-brain"></i> Only occurs if... (Logic Search)</label>
                <input list="ia-logic-list" id="ia-strike-predicate" placeholder="Search: Dragon, Off-Guard, etc...">
                <datalist id="ia-logic-list">${logicOptions}</datalist>
            </div>
        `;
        container.append(strikeFields);
    }  // ****** end render workbench strike config +++++++


	// ***** render workbench defense config *********
    _renderDefenseConfig(container) {
        const tags = GeneratorEngine.allLogicTags || [];
        const logicOptions = tags.map(t => `<option value="${t.value}">${t.label}</option>`).join('');

        // Pulling all damage types from the system
        const damageTypes = Object.entries(CONFIG.PF2E.damageTypes)
            .map(([k, v]) => `<option value="${k}">${game.i18n.localize(v)}</option>`)
            .join('');

        const defenseFields = `
            <div class="ia-field-group">
                <label>Mode</label>
                <select id="ia-def-mode">
                    <option value="resistance">Resistance</option>
                    <option value="weakness">Weakness</option>
                    <option value="immunity">Immunity</option>
                </select>
            </div>
            <div class="ia-field-group">
                <label>Damage Type</label>
                <select id="ia-def-type">
                    <option value="all-damage">All Damage</option>
                    ${damageTypes}
                </select>
            </div>
            <div class="ia-field-group">
                <label>Value</label>
                <input type="number" id="ia-def-value" value="5">
            </div>

            <div class="ia-field-group" style="grid-column: span 3;">
                <label><i class="fas fa-brain"></i> Conditional Logic (Optional)</label>
                <input list="ia-logic-list" id="ia-def-predicate" placeholder="Search: Dragon, Undead, Bleeding...">
                <datalist id="ia-logic-list">${logicOptions}</datalist>
            </div>
        `;
        container.append(defenseFields);
    } // ***** end render workbench defense config *********


    //** Render workbench sensory config   
    _renderSensoryConfig(container) {
        // 1. Fetch data from the Model (GeneratorEngine)
        const tags = GeneratorEngine.allLogicTags || [];
        const logicOptions = tags.map(t => `<option value="${t.value}">${t.label}</option>`).join('');

        const statOptions = GeneratorEngine.auraSelectors
            .map(s => `<option value="${s.value}">${s.label}</option>`).join('');

        const conditionOptions = GeneratorEngine.pf2eConditions
            .map(c => `<option value="${c}">${c.charAt(0).toUpperCase() + c.slice(1)}</option>`).join('');

        // 2. Build the HTML with Datalists
        const sensoryFields = `
            <div class="ia-field-group">
                <label>Basic Type</label>
                <select id="ia-sensory-type">
                    <optgroup label="Senses">
                        <option value="darkvision">Darkvision</option>
                        <option value="low-light-vision">Low-Light Vision</option>
                        <option value="see-invisibility">See Invisibility</option>
                    </optgroup>
                    <optgroup label="Auras">
                        <option value="aura">Custom Proximity Aura</option>
                    </optgroup>
                </select>
            </div>

            <div class="ia-field-group">
                <label>Range (Feet)</label>
                <input type="number" id="ia-sensory-range" value="30">
            </div>

            <div id="ia-aura-logic-container" style="display:none; border: 1px solid #444; padding: 10px; margin-top: 10px; border-radius: 5px; background: rgba(0,0,0,0.2);">
                
                <h4 style="border-bottom: 1px solid #555; margin-bottom: 10px;">Aura Configuration</h4>

                <div class="ia-field-group">
                    <label>Affected Targets</label>
                    <select id="ia-aura-target">
                        <option value="ally">Allies Only</option>
                        <option value="enemy">Enemies Only</option>
                        <option value="all">Everyone (Allies & Enemies)</option>
                        <option value="self-ally">Self & Allies</option>
                    </select>
                </div>

                <div class="ia-field-group">
                    <label>Payload Type</label>
                    <select id="ia-aura-payload-type">
                        <option value="modifier">Numerical Modifier (Stat Bonus/Penalty)</option>
                        <option value="condition">Status Condition (Frightened, etc.)</option>
                    </select>
                </div>

                <div id="ia-aura-payload-modifier" class="ia-field-group" style="grid-template-columns: 1fr 1fr 1fr; display: grid; gap: 5px;">
                    <div>
                        <label>Stat (Search)</label>
                        <input list="ia-aura-stat-list" id="ia-aura-mod-stat" placeholder="ac, attack...">
                        <datalist id="ia-aura-stat-list">${statOptions}</datalist>
                    </div>
                    <div>
                        <label>Value</label>
                        <input type="number" id="ia-aura-mod-val" value="1">
                    </div>
                    <div>
                        <label>Type</label>
                        <select id="ia-aura-mod-type">
                            <option value="status">Status</option>
                            <option value="circumstance">Circumstance</option>
                        </select>
                    </div>
                </div>

                <div id="ia-aura-payload-condition" class="ia-field-group" style="display:none;">
                    <label>Condition Name (Search) & Value</label>
                    <div style="display: flex; gap: 5px;">
                        <input list="ia-aura-cond-list" id="ia-aura-cond-name" placeholder="frightened..." style="flex: 2;">
                        <datalist id="ia-aura-cond-list">${conditionOptions}</datalist>
                        <input type="number" id="ia-aura-cond-val" value="1" style="flex: 1;">
                    </div>
                </div>
            </div>

            <div class="ia-field-group" style="grid-column: span 2; margin-top: 10px;">
                <label><i class="fas fa-brain"></i> Item Requirement (Only active if...)</label>
                <input list="ia-logic-list" id="ia-sensory-predicate" placeholder="Search: While Wounded, Off-Guard...">
                <datalist id="ia-logic-list">${logicOptions}</datalist>
            </div>
        `;

        container.append(sensoryFields);

        // 3. Keep your jQuery Toggles
        const typeSelect = container.find('#ia-sensory-type');
        const auraContainer = container.find('#ia-aura-logic-container');
        const payloadType = container.find('#ia-aura-payload-type');
        const modFields = container.find('#ia-aura-payload-modifier');
        const condFields = container.find('#ia-aura-payload-condition');

        typeSelect.on('change', () => {
            if (typeSelect.val() === 'aura') auraContainer.show();
            else auraContainer.hide();
        }).trigger('change');

        payloadType.on('change', () => {
            if (payloadType.val() === 'modifier') {
                modFields.show();
                condFields.hide();
            } else {
                modFields.hide();
                condFields.show();
            }
        }).trigger('change');
    } // END render workbench sensory config ****




    // ***** update RuleList ***********
    _updateRuleList(html) {
        // 1. Find the <ul> or <div> where the rules should live
        const list = html.find('#ia-rules-ul');
        list.empty(); // Clear the "No logic added yet" message

        // 2. If the bench is empty, show the placeholder
        if (this.ruleBench.length === 0) {
            list.append('<li style="color: #777; font-style: italic;">No logic added yet...</li>');
            return;
        }

        // 3. Loop through the bench and create a list item for each rule
        this.ruleBench.forEach((rule, index) => {
            const li = $(`
                <li style="display: flex; justify-content: space-between; align-items: center; 
                        margin-bottom: 5px; background: rgba(0,0,0,0.2); padding: 8px; border-radius: 3px;">
                    <span>
                        <i class="fas fa-check-circle" style="color: #4caf50; margin-right: 8px;"></i>
                        ${rule.label}
                    </span>
                    <a class="ia-delete-rule" data-index="${index}" title="Remove Rule" style="color: #ff5555; cursor: pointer;">
                        <i class="fas fa-trash"></i>
                    </a>
                </li>
            `);
            list.append(li);
        });

        // 4. Create the "Delete" Listener for the trash cans
        list.find('.ia-delete-rule').on('click', ev => {
            const idx = $(ev.currentTarget).data('index');
            this.ruleBench.splice(idx, 1); // Remove from the array
            this._updateRuleList(html);    // Redraw the list
        });
    } // ***** end update RuleList ***********
    

	calculateTotalLevel(html) {
		if (!html || !html.length) return
		// Start with 1 as the base level
		let levels = [1]
		// 1. Get level from Potency
		const potencyLevel = html.find('#ia-potency-runes option:selected').data('level')
		if (potencyLevel) levels.push(parseInt(potencyLevel))
		// 2. Get level from Striking/Resiliency
		const fundamentalLevel = html.find('#ia-striking-runes option:selected').data('level')
		if (fundamentalLevel) levels.push(parseInt(fundamentalLevel))
		// 3. Get level from all Property Rune slots
		html.find('.ia-property-selector').each((i, el) => {
			const rLevel = $(el).find(':selected').data('level')
			if (rLevel) levels.push(parseInt(rLevel))
		})
		// 4. The Magic Line: This always picks the highest number in the array
		const finalLevel = Math.max(...levels)
		// 5. Update the UI
		html.find('#ia-calculated-level').text(finalLevel)
		console.log(`IA Debug | Highest level found among ${levels}: ${finalLevel}`)
	}
	async runDraft(category, level, allowUncommon) {
		const bases = await GeneratorEngine.getBaseItems(category, allowUncommon)
		if (!bases || bases.length === 0) {
			ui.notifications.error('No valid base items found with these filters.')
			return null
		}
		const selectedBase = bases[Math.floor(Math.random() * bases.length)]
		const doc = await game.packs.get('pf2e.equipment-srd').getDocument(selectedBase._id)
		const source = doc.toObject()
		const {
			potency,
			fundamental
		} = GeneratorEngine.calculateFundamentals(category, level)
		const isWeapon = category === 'weapon'
		const fundName = isWeapon ? ['', 'Striking ', 'Greater Striking ', 'Major Striking '][fundamental] : ['', 'Resilient ', 'Greater Resilient ', 'Major Resilient '][
			fundamental
		]
		const finalName = `${potency > 0 ? '+' + potency : ''} ${fundName}${
      doc.name
    }`.trim()
		const updateData = {
			'system.runes.potency': potency,
			[`system.runes.${isWeapon ? 'striking' : 'resilient'}`]: fundamental
		}
		return {
			name: finalName,
			baseName: doc.name,
			description: doc.system.description.value,
			source: {
				...source,
				name: finalName,
				'system.identification.status': 'identified'
			},
			updateData: updateData
		}
	}
	updateUI(html) {
		if (!this.draftedItem) return
		html.find('.placeholder-text').hide()
		html.find('#ia-result-area').addClass('active')
		html.find('#ia-draft-content').show()
		html.find('#ia-preview-name').text(this.draftedItem.name)
		html.find('#ia-preview-description').html(this.draftedItem.description)
	}
}
