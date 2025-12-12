// Global state
let currentGirl = null;
let roster = [];
let startingFive = [null, null, null, null, null];
let draggedCard = null;
let draggedFromStarting = false;
let draggedStartingIndex = -1;

// Mobile selection state
let mobileSelectionMode = false;
let selectedGirlForMove = null;
let isMobile = false;

// Detect mobile device
function detectMobile() {
    isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
    return isMobile;
}

// Update on resize
window.addEventListener('resize', () => {
    detectMobile();
});

// Tier definitions
const TIER_THRESHOLDS = [
    { name: 'Galaxy Opal', min: 90, class: 'tier-galaxy-opal' },
    { name: 'Pink Diamond', min: 80, class: 'tier-pink-diamond' },
    { name: 'Diamond', min: 70, class: 'tier-diamond' },
    { name: 'Amethyst', min: 60, class: 'tier-amethyst' },
    { name: 'Ruby', min: 50, class: 'tier-ruby' },
    { name: 'Sapphire', min: 40, class: 'tier-sapphire' },
    { name: 'Bronze', min: 0, class: 'tier-bronze' }
];

// Form submission
document.getElementById('girlForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateAndDisplayGirl();
});

function calculateAndDisplayGirl() {
    // Get form values
    const name = document.getElementById('name').value;
    
    // Base stats
    const face = parseInt(document.getElementById('face').value) || 0;
    const eyes = parseInt(document.getElementById('eyes').value) || 0;
    const hair = parseInt(document.getElementById('hair').value) || 0;
    const top = parseInt(document.getElementById('top').value) || 0;
    const bottom = parseInt(document.getElementById('bottom').value) || 0;
    const fitness = parseInt(document.getElementById('fitness').value) || 0;
    const history = parseInt(document.getElementById('history').value) || 0;
    const personality = parseInt(document.getElementById('personality').value) || 0;
    const tolerance = parseInt(document.getElementById('tolerance').value) || 0;
    const substances = parseInt(document.getElementById('substances').value) || 0;
    
    // Cap Breakers
    const athletic = parseInt(document.getElementById('athletic').value) || 0;
    const height = parseInt(document.getElementById('height').value) || 0;
    const attractiveness = parseInt(document.getElementById('attractiveness').value) || 0;
    const intoYou = parseInt(document.getElementById('intoYou').value) || 0;
    const comfort = parseInt(document.getElementById('comfort').value) || 0;
    
    // Calculate totals
    const baseTotal = face + eyes + hair + top + bottom + fitness + history + 
                      personality + tolerance + substances;
    const capBreakerTotal = athletic + height + attractiveness + intoYou + comfort;
    const overall = baseTotal + capBreakerTotal;
    
    // Determine tier
    const tier = TIER_THRESHOLDS.find(t => overall >= t.min);
    
    // Create girl object
    currentGirl = {
        id: Date.now(),
        name: name,
        stats: {
            face, eyes, hair, top, bottom, fitness, history, 
            personality, tolerance, substances
        },
        capBreakers: {
            athletic, height, attractiveness, intoYou, comfort
        },
        baseTotal,
        capBreakerTotal,
        overall,
        tier: tier.name,
        tierClass: tier.class
    };
    
    // Display the card
    displayGirlCard(currentGirl);
    
    // Show action buttons
    document.getElementById('cardActions').style.display = 'flex';
}

function displayGirlCard(girl) {
    const cardDisplay = document.getElementById('cardDisplay');
    
    const cardHTML = `
        <div class="girl-card ${girl.tierClass}">
            <div class="card-header">
                <div class="card-name">${girl.name}</div>
            </div>
            
            <div class="card-stats">
                <div class="stat-row">
                    <span class="stat-label">Face</span>
                    <span class="stat-value">${girl.stats.face}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Eyes</span>
                    <span class="stat-value">${girl.stats.eyes}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Hair</span>
                    <span class="stat-value">${girl.stats.hair}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Top</span>
                    <span class="stat-value">${girl.stats.top}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Bottom</span>
                    <span class="stat-value">${girl.stats.bottom}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Fitness</span>
                    <span class="stat-value">${girl.stats.fitness}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">History</span>
                    <span class="stat-value">${girl.stats.history}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Personality</span>
                    <span class="stat-value">${girl.stats.personality}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Tolerance</span>
                    <span class="stat-value">${girl.stats.tolerance}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Substances</span>
                    <span class="stat-value">${girl.stats.substances}</span>
                </div>
            </div>
            
            ${girl.capBreakerTotal > 0 ? `
            <div class="cap-breakers-section">
                <h4>⚡ Cap Breakers</h4>
                ${girl.capBreakers.athletic > 0 ? `<div class="stat-row"><span class="stat-label">Athletic/Build</span><span class="cap-breaker-value">+${girl.capBreakers.athletic}</span></div>` : ''}
                ${girl.capBreakers.height > 0 ? `<div class="stat-row"><span class="stat-label">Height</span><span class="cap-breaker-value">+${girl.capBreakers.height}</span></div>` : ''}
                ${girl.capBreakers.attractiveness > 0 ? `<div class="stat-row"><span class="stat-label">Attractiveness</span><span class="cap-breaker-value">+${girl.capBreakers.attractiveness}</span></div>` : ''}
                ${girl.capBreakers.intoYou > 0 ? `<div class="stat-row"><span class="stat-label">Into You</span><span class="cap-breaker-value">+${girl.capBreakers.intoYou}</span></div>` : ''}
                ${girl.capBreakers.comfort > 0 ? `<div class="stat-row"><span class="stat-label">Comfort</span><span class="cap-breaker-value">+${girl.capBreakers.comfort}</span></div>` : ''}
                <div class="stat-row" style="margin-top: 10px; padding-top: 10px; border-top: 2px solid rgba(255, 215, 0, 0.3);">
                    <span class="stat-label">Total Bonus</span>
                    <span class="cap-breaker-value">+${girl.capBreakerTotal}</span>
                </div>
            </div>
            ` : ''}
            
            <div class="card-footer">
                <div class="overall-score">${girl.overall}</div>
                <div class="tier-label">${girl.tier}</div>
            </div>
        </div>
    `;
    
    cardDisplay.innerHTML = cardHTML;
}

// Save button
document.getElementById('saveBtn').addEventListener('click', function() {
    if (!currentGirl) return;
    
    if (roster.length >= 20) {
        alert('Roster is full! Maximum 20 girls allowed.');
        return;
    }
    
    roster.push(currentGirl);
    updateRosterDisplay();
    updateTeamStats();
    resetForm();
});

// Delete button
document.getElementById('deleteBtn').addEventListener('click', function() {
    resetForm();
});

function resetForm() {
    document.getElementById('girlForm').reset();
    document.getElementById('cardDisplay').innerHTML = '<p>Create a girl to see her card</p>';
    document.getElementById('cardDisplay').className = 'card-placeholder';
    document.getElementById('cardActions').style.display = 'none';
    currentGirl = null;
}

function updateRosterDisplay() {
    document.getElementById('rosterCount').textContent = roster.length;
    
    // Update starting five
    const startingFiveContainer = document.getElementById('startingFive');
    startingFiveContainer.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        if (startingFive[i]) {
            const card = createRosterCard(startingFive[i], true, i);
            startingFiveContainer.appendChild(card);
        } else {
            const emptySlot = document.createElement('div');
            emptySlot.className = 'empty-slot';
            emptySlot.dataset.position = i;
            emptySlot.textContent = `Empty Slot ${i + 1}`;
            
            // Desktop drag-and-drop
            if (!detectMobile()) {
                emptySlot.addEventListener('dragover', handleDragOver);
                emptySlot.addEventListener('drop', handleDrop);
                emptySlot.addEventListener('dragleave', handleDragLeave);
            } else {
                // Mobile tap to place
                emptySlot.addEventListener('click', () => {
                    if (mobileSelectionMode && selectedGirlForMove) {
                        placeMobileSelection(i);
                    }
                });
            }
            
            startingFiveContainer.appendChild(emptySlot);
        }
    }
    
    // Update bench
    const benchContainer = document.getElementById('bench');
    const benchPlayers = roster.filter(girl => !startingFive.includes(girl));
    
    if (benchPlayers.length === 0) {
        benchContainer.innerHTML = '<p class="empty-message">No bench players yet</p>';
    } else {
        benchContainer.innerHTML = '';
        benchPlayers.forEach(girl => {
            const card = createRosterCard(girl, false, -1);
            benchContainer.appendChild(card);
        });
    }
}

function placeMobileSelection(position) {
    if (!selectedGirlForMove) return;
    
    // Place the selected girl in the position
    startingFive[position] = selectedGirlForMove;
    
    // Cancel selection mode
    cancelMobileSelection();
    
    // Update display
    updateRosterDisplay();
    updateTeamStats();
}

function createRosterCard(girl, isStarting, startingIndex) {
    const card = document.createElement('div');
    card.className = 'roster-card';
    card.draggable = !detectMobile(); // Disable drag on mobile
    card.dataset.girlId = girl.id;
    
    // Add tier border color
    const tierColor = getTierBorderColor(girl.tierClass);
    card.style.borderColor = tierColor;
    
    card.innerHTML = `
        <div class="roster-card-header">
            <div class="roster-card-name">${girl.name}</div>
            <div class="roster-card-overall">${girl.overall}</div>
        </div>
        <div class="roster-card-tier" style="background-color: ${tierColor}20;">${girl.tier}</div>
        <div class="roster-card-actions">
            ${isStarting ? 
                `<button class="btn btn-delete" onclick="removeFromStarting(${startingIndex})">Remove</button>` :
                `<button class="btn btn-save" onclick="addToStarting(${girl.id})">Add to Starting 5</button>`
            }
            <button class="btn btn-delete" onclick="deleteGirl(${girl.id})">Delete</button>
        </div>
    `;
    
    // Desktop drag events
    if (!detectMobile()) {
        card.addEventListener('dragstart', (e) => {
            draggedCard = girl;
            draggedFromStarting = isStarting;
            draggedStartingIndex = startingIndex;
            card.classList.add('dragging');
        });
        
        card.addEventListener('dragend', (e) => {
            card.classList.remove('dragging');
            draggedCard = null;
            draggedFromStarting = false;
            draggedStartingIndex = -1;
        });
    } else {
        // Mobile: tap to select for moving
        if (!isStarting) {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking a button
                if (e.target.tagName === 'BUTTON') return;
                
                if (mobileSelectionMode && selectedGirlForMove && selectedGirlForMove.id === girl.id) {
                    // Deselect
                    cancelMobileSelection();
                } else {
                    // Select for moving
                    selectGirlForMove(girl, card);
                }
            });
        }
    }
    
    return card;
}

// Mobile selection functions
function selectGirlForMove(girl, cardElement) {
    mobileSelectionMode = true;
    selectedGirlForMove = girl;
    
    // Clear previous selections
    document.querySelectorAll('.roster-card.selected').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Highlight selected card
    cardElement.classList.add('selected');
    
    // Highlight empty slots
    document.querySelectorAll('.empty-slot').forEach(slot => {
        slot.classList.add('selection-mode');
    });
    
    // Show instruction
    showMobileInstruction('Tap an empty slot in Starting 5 to move this player');
}

function cancelMobileSelection() {
    mobileSelectionMode = false;
    selectedGirlForMove = null;
    
    // Remove highlights
    document.querySelectorAll('.roster-card.selected').forEach(el => {
        el.classList.remove('selected');
    });
    document.querySelectorAll('.empty-slot.selection-mode').forEach(slot => {
        slot.classList.remove('selection-mode');
    });
    
    // Hide instruction
    hideMobileInstruction();
}

function showMobileInstruction(text) {
    let instruction = document.querySelector('.mobile-instruction');
    if (!instruction) {
        instruction = document.createElement('div');
        instruction.className = 'mobile-instruction';
        document.querySelector('.starting-five-container').insertBefore(
            instruction, 
            document.querySelector('.starting-five-container h3').nextSibling
        );
    }
    instruction.textContent = text;
    instruction.style.display = 'block';
}

function hideMobileInstruction() {
    const instruction = document.querySelector('.mobile-instruction');
    if (instruction) {
        instruction.style.display = 'none';
    }
}

function getTierBorderColor(tierClass) {
    const colors = {
        'tier-galaxy-opal': '#ffd700',
        'tier-pink-diamond': '#ff69b4',
        'tier-diamond': '#4db8ff',
        'tier-amethyst': '#9b59b6',
        'tier-ruby': '#e74c3c',
        'tier-sapphire': '#3498db',
        'tier-bronze': '#cd7f32'
    };
    return colors[tierClass] || '#ffffff';
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    if (!draggedCard) return;
    
    const targetPosition = parseInt(e.currentTarget.dataset.position);
    
    if (isNaN(targetPosition)) return;
    
    // If dragging from starting five, remove from old position
    if (draggedFromStarting) {
        startingFive[draggedStartingIndex] = null;
    }
    
    // If target position is occupied, swap
    if (startingFive[targetPosition]) {
        if (draggedFromStarting) {
            // Swap positions
            const temp = startingFive[targetPosition];
            startingFive[targetPosition] = draggedCard;
            startingFive[draggedStartingIndex] = temp;
        } else {
            // Move bench player to starting, occupied player to bench
            startingFive[targetPosition] = draggedCard;
        }
    } else {
        // Empty slot, just place the card
        startingFive[targetPosition] = draggedCard;
    }
    
    updateRosterDisplay();
    updateTeamStats();
}

window.addToStarting = function(girlId) {
    const girl = roster.find(g => g.id === girlId);
    if (!girl) return;
    
    // Find first empty slot
    const emptyIndex = startingFive.findIndex(slot => slot === null);
    
    if (emptyIndex === -1) {
        alert('Starting 5 is full! Remove a player first or drag to swap positions.');
        return;
    }
    
    startingFive[emptyIndex] = girl;
    updateRosterDisplay();
    updateTeamStats();
}

window.removeFromStarting = function(index) {
    startingFive[index] = null;
    updateRosterDisplay();
    updateTeamStats();
}

window.deleteGirl = function(girlId) {
    if (!confirm('Are you sure you want to delete this girl from the roster?')) {
        return;
    }
    
    // Remove from roster
    roster = roster.filter(g => g.id !== girlId);
    
    // Remove from starting five if present
    for (let i = 0; i < startingFive.length; i++) {
        if (startingFive[i] && startingFive[i].id === girlId) {
            startingFive[i] = null;
        }
    }
    
    updateRosterDisplay();
    updateTeamStats();
}

function updateTeamStats() {
    const startingPlayers = startingFive.filter(g => g !== null);
    
    // Average overall
    let avgOverall = '-';
    if (startingPlayers.length > 0) {
        const sum = startingPlayers.reduce((acc, girl) => acc + girl.overall, 0);
        avgOverall = (sum / startingPlayers.length).toFixed(1);
    }
    document.getElementById('avgOverall').textContent = avgOverall;
    
    // Highest tier
    let highestTier = '-';
    if (startingPlayers.length > 0) {
        const sorted = [...startingPlayers].sort((a, b) => b.overall - a.overall);
        highestTier = sorted[0].tier;
    }
    document.getElementById('highestTier').textContent = highestTier;
    
    // Total cap breakers
    const totalCapBreakers = roster.reduce((acc, girl) => acc + girl.capBreakerTotal, 0);
    document.getElementById('totalCapBreakers').textContent = totalCapBreakers;
    
    // Galaxy Opal/Diamond count
    const topTierCount = roster.filter(girl => 
        girl.tier === 'Galaxy Opal' || girl.tier === 'Pink Diamond' || girl.tier === 'Diamond'
    ).length;
    document.getElementById('topTierCount').textContent = topTierCount;
}

// Initialize
detectMobile();
updateRosterDisplay();
updateTeamStats();

// Add smooth scroll behavior for mobile
if (detectMobile()) {
    document.addEventListener('DOMContentLoaded', () => {
        const startingFive = document.getElementById('startingFive');
        if (startingFive) {
            // Enable smooth scrolling
            startingFive.style.scrollBehavior = 'smooth';
        }
    });
}
