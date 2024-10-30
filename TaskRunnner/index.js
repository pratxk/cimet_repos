class TaskRunner {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.queue = [];
        this.counter = 0;
    }

    push(task) {
        this.queue.push(task);
        this.runFunc()
    }
    async runFunc() {
        while (this.counter < this.concurrency && this.queue.length > 0) {
            const task = this.queue.shift();
            this.counter++;
            await task();
            this.counter--;
            this.runFunc();
        }
    }
}

const t1 = async () => {
    console.log('t1 started');
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('t1 finished');
};
const t2 = async () => {
    console.log('t2 started');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('t2 finished');
};
const t3 = async () => {
    console.log('t3 started');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('t3 finished');
};
const t4 = async () => {
    console.log('t4 started');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('t4 finished');
};
const t5 = async () => {
    console.log('t5 started');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('t5 finished');
};


const queue = new TaskRunner(3);


queue.push(t1,t2,t3,t4,t5);



