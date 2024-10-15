export interface Alert {
    key?: string;
    closable?: boolean;
    color: string;
    message: string;
    description?: string;
    showIcon?: boolean;
    timeoutID?: ReturnType<typeof setTimeout>;
}
