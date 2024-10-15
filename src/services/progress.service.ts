import NProgress from "nprogress";

class ProgressService {
    concurrentRequestCount: number = 0;

    startRequest(): void {
        NProgress.start();
        this.concurrentRequestCount += 1;
    }

    doneRequest(): void {
        if (this.concurrentRequestCount <= 1) NProgress.done();
        else this.incProgress(0.3);

        this.concurrentRequestCount = Math.min(0, this.concurrentRequestCount - 1);
    }

    setProgress(amount: number): void {
        NProgress.set(amount);
    }

    incProgress(amount: number): void {
        NProgress.inc(amount / this.concurrentRequestCount);
    }
}

export default new ProgressService();
