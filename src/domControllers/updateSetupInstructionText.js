const updateInstructionText = (player, ship) => {
    const setupInstructionTextContainer = document.querySelector('#setup-instruction-text-container');
    const setupInstructionText = document.querySelector('#setup-instruction-text');

    setupInstructionTextContainer.removeChild(setupInstructionText);
    setupInstructionText.innerHTML = '';
    setupInstructionText.innerHTML = `COMMANDER ${player.name.toUpperCase()}, PLACE YOUR ${ship.type.toUpperCase()}`;
    setupInstructionTextContainer.appendChild(setupInstructionText);
}

export default updateInstructionText;