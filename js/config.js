// js/config.js
window.CONFIG = {
    environment: "production",
    debug: false,
    analytics: { id: "", enabled: false },
    adsense: {
        client: "", // ca-pub-XXXX
        enabled: false,
        slots: [
            { id: 'adSlot1', slotId: 'XXXX1' },
            { id: 'adSlot2', slotId: 'XXXX2' }
        ]
    }
};

// تجميد الإعدادات لحمايتها
Object.freeze(window.CONFIG);
