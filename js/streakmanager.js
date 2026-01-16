import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export class StreakManager {
    constructor(firebaseConfig) {
        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore(this.app);
        
        // CONFIGURACIÓN
        this.GOAL_DAILY = 2; // Acciones necesarias para salvar la racha
        this.GOAL_REWARD = 50; // Días para el premio
    }

    async getStreakData(userId) {
        const snap = await getDoc(doc(this.db, "user_streaks", userId));
        if (snap.exists()) return snap.data();
        return { currentStreak: 0, lastMessageDate: '', messagesToday: 0, claimedReward: false };
    }

    async incrementProgress(userId, onStreakSavedCallback) {
        const today = new Date().toISOString().split('T')[0];
        const ref = doc(this.db, "user_streaks", userId);
        
        try {
            let data = await this.getStreakData(userId);
            
            // Lógica de validación de días
            if (data.lastMessageDate === today) {
                // Ya ha interactuado hoy
                data.messagesToday = (data.messagesToday || 0) + 1;
                
                // Si alcanza la meta EXACTA
                if (data.messagesToday === this.GOAL_DAILY) {
                    data.currentStreak = (data.currentStreak || 0) + 1;
                    if(onStreakSavedCallback) onStreakSavedCallback(data.currentStreak);
                }
            } else {
                // Es un nuevo día
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];

                let newStreak = data.currentStreak || 0;

                // Si no completó ayer o saltó días, reset a 0
                if (data.lastMessageDate !== yesterdayStr || (data.messagesToday < this.GOAL_DAILY)) {
                    // Excepción: Si es el primer día de uso, no reseteamos, empezamos de 0
                    if(data.lastMessageDate) newStreak = 0;
                }

                data.lastMessageDate = today;
                data.messagesToday = 1; // Primera acción de hoy
                data.currentStreak = newStreak; 
            }

            await setDoc(ref, data, { merge: true });
            return data;
        } catch (e) {
            console.error("Streak Error:", e);
        }
    }

    async claimReward(userId) {
        await updateDoc(doc(this.db, "user_streaks", userId), { claimedReward: true });
    }
}
