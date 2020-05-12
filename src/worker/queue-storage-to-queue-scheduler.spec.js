"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../setup");
const queue_storage_to_queue_scheduler_1 = require("./queue-storage-to-queue-scheduler");
describe('QueueStorageToQueueSchedulerSpec', () => {
    context('error handling of queue storage to queue scheduler', () => {
        let queueStorageToQueueScheduler;
        beforeEach(async () => {
            await setup_1.mongoConnection.dropDatabase();
        });
        it('should re-attempt to check if server is ready.', async () => {
            await new Promise((resolve, reject) => {
                let attempt = 2;
                const timeout = setTimeout(() => reject('should not reach here.'), 6000);
                queueStorageToQueueScheduler = new queue_storage_to_queue_scheduler_1.QueueStorageToQueueScheduler('queue1', () => ({}), async () => {
                    if (!attempt) {
                        clearTimeout(timeout);
                        resolve();
                    }
                    else {
                        attempt -= 1;
                        await Promise.reject(Error('Test Error'));
                    }
                    return [[], false];
                }, '*/2 * * * * *');
            });
        });
        afterEach(async () => {
            queueStorageToQueueScheduler.cancel();
        });
    });
});
//# sourceMappingURL=queue-storage-to-queue-scheduler.spec.js.map