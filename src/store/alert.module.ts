import {computed, reactive} from "vue";
import {defineStore} from "pinia";
import {Alert} from "@/types";

export const useAlertStore = defineStore("alert-store", () => {
    const alerts = reactive(new Map<any, Alert>());

    const reverseAlerts = computed(() => {
        return new Map<string, Alert>(Array.from(alerts).reverse());
    });

    function show(alert: Alert): void {
        if (alerts.size >= 3) {
            const [oldKey, a] = alerts.entries().next().value;
            clearTimeout(a.timeoutID);
            removeAlert(oldKey);
        }

        const key: string = window.performance.now().toString();
        alert.key = key;

        alert.timeoutID = setTimeout((): void => {
            removeAlert(key);
        }, 6000);

        addAlert(alert);
    }

    function addAlert(alert: Alert): void {
        if (alert.key != null) {
            alerts.set(alert.key, {
                closable: alert.closable,
                closeText: alert.closeText,
                type: alert.type,
                message: alert.message,
                description: alert.description,
                showIcon: alert.showIcon,
                timeoutID: alert.timeoutID,
            });
        }
    }

    function removeAlert(key: string): void {
        alerts.delete(key);
    }

    return {
        alerts,
        reverseAlerts,
        show,
        addAlert,
        removeAlert,
    };
});

export function alertSuccess(message: string): void {
    const alertStore = useAlertStore();
    alertStore.show({
        closable: true,
        type: "success",
        message: message,
    });
}

export function alertError(message: string): void {
    const alertStore = useAlertStore();
    alertStore.show({
        closable: true,
        type: "error",
        message: message,
    });
}

export function alertWarning(message: string): void {
    const alertStore = useAlertStore();
    alertStore.show({
        closable: true,
        type: "warning",
        message: message,
    });
}
