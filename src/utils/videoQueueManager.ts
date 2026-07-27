type QueueCallback = (allowed: boolean) => void;

class VideoQueueManager {
  private queue: string[] = [];
  private activeDownloads = 0;
  private maxConcurrent = 1; // Load exactly one video at a time sequentially
  private listeners: Map<string, Set<QueueCallback>> = new Map();
  private loadedSet: Set<string> = new Set();

  register(id: string, callback: QueueCallback) {
    if (this.loadedSet.has(id)) {
      callback(true);
      return () => {};
    }

    if (!this.listeners.has(id)) {
      this.listeners.set(id, new Set());
    }
    this.listeners.get(id)!.add(callback);

    // If it's not already in the queue, queue it
    if (!this.queue.includes(id)) {
      this.queue.push(id);
    }

    this.processQueue();

    // Return unregister function
    return () => {
      const set = this.listeners.get(id);
      if (set) {
        set.delete(callback);
        if (set.size === 0) {
          this.listeners.delete(id);
          this.queue = this.queue.filter(q => q !== id);
        }
      }
    };
  }

  notifyLoaded(id: string) {
    if (this.loadedSet.has(id)) return;
    
    this.loadedSet.add(id);
    this.queue = this.queue.filter(q => q !== id);
    this.activeDownloads = Math.max(0, this.activeDownloads - 1);
    
    // Notify all listeners of this id
    const set = this.listeners.get(id);
    if (set) {
      set.forEach(cb => cb(true));
    }
    
    this.processQueue();
  }

  prioritize(id: string) {
    if (this.loadedSet.has(id)) return;
    
    if (this.queue.includes(id)) {
      this.queue = this.queue.filter(q => q !== id);
      this.queue.unshift(id);
      this.processQueue();
    }
  }

  private processQueue() {
    if (this.queue.length === 0) return;
    
    while (this.activeDownloads < this.maxConcurrent && this.queue.length > 0) {
      // Find the first index in queue that hasn't been allowed yet
      const nextId = this.queue[0];
      this.activeDownloads++;
      
      const set = this.listeners.get(nextId);
      if (set) {
        set.forEach(cb => cb(true));
      }
    }
  }
}

export const videoQueueManager = new VideoQueueManager();
