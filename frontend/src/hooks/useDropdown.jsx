const updateDropdownStates = (prevStates, link) => {
    const newStates = { ...prevStates };
    if (newStates[link]) {
        newStates[link] = false;
    } else {
        Object.keys(newStates).forEach((key) => {
            newStates[key] = false;
        });
        newStates[link] = true;
    }
    return newStates;
};

const toggleDropdown = (prevStates, link, scrollToBottom) => {
    if (link === 'apps' || link === 'feedback') {
        return { states: updateDropdownStates(prevStates, link), scrollToBottom: true };
    } else if (['warehouse', 'confluence', 'world'].includes(link)) {
        const newStates = { ...prevStates };
        if (newStates[link]) {
            newStates[link] = false;
        } else {
            ['warehouse', 'confluence', 'world'].forEach((key) => {
                newStates[key] = false;
            });
            newStates[link] = true;
        }
        return { states: newStates, scrollToBottom: true };
    } else {
        return { states: updateDropdownStates(prevStates, link), scrollToBottom: false };
    }
};

export { updateDropdownStates, toggleDropdown };