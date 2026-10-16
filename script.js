document.getElementById('year').textContent = new Date().getFullYear();

function updateSliderVal(type) {
    const val = document.getElementById('range' + type).value;
    document.getElementById('val' + type).textContent = `$${val} / mo.`;
}

function calculateReality() {
    const wage = parseFloat(document.getElementById('hourlyWage').value) || 15.00;
    const wishName = document.getElementById('wishName').value.trim() || 'Desired Purchase';
    const price = parseFloat(document.getElementById('wishPrice').value) || 0;

    const delivery = parseFloat(document.getElementById('rangeDelivery').value) || 0;
    const snacks = parseFloat(document.getElementById('rangeSnacks').value) || 0;
    const abos = parseFloat(document.getElementById('rangeAbos').value) || 0;
    const coffee = parseFloat(document.getElementById('rangeCoffee').value) || 0;

    // Calculations
    const hoursNeeded = price > 0 && wage > 0 ? (price / wage).toFixed(1) : 0;
    const daysNeeded = (hoursNeeded / 8).toFixed(1);

    const totalMonthlyImpulse = delivery + snacks + abos + coffee;
    const totalYearlyImpulse = totalMonthlyImpulse * 12;

    const multiplier = price > 0 ? (totalYearlyImpulse / price).toFixed(1) : 0;

    // Update UI
    document.getElementById('resHours').textContent = `${hoursNeeded} hrs`;
    document.getElementById('resDays').textContent = `${daysNeeded} Days`;
    document.getElementById('resYearly').textContent = `$${totalYearlyImpulse.toLocaleString('en-US')}`;

    document.getElementById('summaryText').innerHTML = `Your annual impulse spending equals <span id="wishMultiplier" class="text-accentMint font-black text-xl">${multiplier}x</span> the cost of a <span id="summaryWishName" class="text-accentViolet font-black">${wishName}</span>!`;

    // Pain badge calculation (Professional neutral badges)
    const painBadge = document.getElementById('badgePain');
    if (hoursNeeded > 100 || multiplier > 2) {
        painBadge.textContent = "PAIN LEVEL: EXTREME";
        painBadge.className = "px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-400 rounded-full text-xs font-black tracking-widest uppercase inline-block mb-2";
    } else if (hoursNeeded > 50 || multiplier >= 1) {
        painBadge.textContent = "PAIN LEVEL: HIGH";
        painBadge.className = "px-3 py-1 bg-pink-500/20 border border-pink-500/50 text-pink-400 rounded-full text-xs font-black tracking-widest uppercase inline-block mb-2";
    } else if (hoursNeeded > 20) {
        painBadge.textContent = "PAIN LEVEL: NOTICEABLE";
        painBadge.className = "px-3 py-1 bg-amber-500/20 border border-amber-500/50 text-amber-400 rounded-full text-xs font-black tracking-widest uppercase inline-block mb-2";
    } else {
        painBadge.textContent = "PAIN LEVEL: MILD";
        painBadge.className = "px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 rounded-full text-xs font-black tracking-widest uppercase inline-block mb-2";
    }

    // Reveal Results Card with animation
    const resCard = document.getElementById('resultsCard');
    resCard.classList.remove('hidden');
    resCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
