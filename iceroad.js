// Author: _MotokoKusanagi
function HungerChecker() {
    let inv = Player.openInventory() 
    while (Player.getPlayer().getFoodLevel() < 20 
        && (inv.getSlot(36 + inv.getSelectedHotbarSlotIndex()).isFood() || inv.getSlot(45).isFood())) {
        KeyBind.pressKeyBind("key.use")
        Client.waitTick(25)
    }
    KeyBind.releaseKeyBind("key.use")
}

function iceroad() {
    if (!GlobalVars.putBoolean("iceroad-running", !GlobalVars.getBoolean("iceroad-running"))) {
        Chat.log("Iceroad runner deactivated")
        return
    }
    Chat.log("Iceroad runner activated")
    JavaWrapper.methodToJavaAsync(() => {
        while(GlobalVars.getBoolean("iceroad-running")) {
            HungerChecker()
            Client.waitTick(20 * 8)
        }
    }).run()

    Chat.say("/cardinal")
    while(GlobalVars.getBoolean("iceroad-running")) {
        KeyBind.pressKeyBind("key.jump")
        KeyBind.pressKeyBind("key.forward")
        KeyBind.pressKeyBind("key.sprint")
        Client.waitTick(1);
        KeyBind.releaseKeyBind("key.jump");
        KeyBind.pressKeyBind("key.forward")
        KeyBind.pressKeyBind("key.sprint")
        Client.waitTick(1);
    }
    KeyBind.releaseKeyBind("key.forward")
    KeyBind.releaseKeyBind("key.sprint")
}

iceroad()