export class WatchedList {
    constructor(initialItems) {
      this.currentItems = initialItems || [];
      this.initial = initialItems || [];
      this.new = [];
      this.removed = [];
      if (new.target === WatchedList) {
        throw new TypeError("Cannot construct WatchedList instances directly");
      }
    }
  
    compareItems(a, b) {
      throw new Error("compareItems method must be implemented by subclass");
    }
  
    getItems() {
      return this.currentItems;
    }
  
    getNewItems() {
      return this.new;
    }
  
    getRemovedItems() {
      return this.removed;
    }
  
    isCurrentItem(item) {
      return (
        this.currentItems.filter((v) => this.compareItems(item, v)).length !== 0
      );
    }
  
    isNewItem(item) {
      return this.new.filter((v) => this.compareItems(item, v)).length !== 0;
    }
  
    isRemovedItem(item) {
      return this.removed.filter((v) => this.compareItems(item, v)).length !== 0;
    }
  
    removeFromNew(item) {
      this.new = this.new.filter((v) => !this.compareItems(v, item));
    }
  
    removeFromCurrent(item) {
      this.currentItems = this.currentItems.filter(
        (v) => !this.compareItems(item, v)
      );
    }
  
    removeFromRemoved(item) {
      this.removed = this.removed.filter((v) => !this.compareItems(item, v));
    }
  
    wasAddedInitially(item) {
      return (
        this.initial.filter((v) => this.compareItems(item, v)).length !== 0
      );
    }
  
    exists(item) {
      return this.isCurrentItem(item);
    }
  
    add(item) {
      if (this.isRemovedItem(item)) {
        this.removeFromRemoved(item);
      }
  
      if (!this.isNewItem(item) && !this.wasAddedInitially(item)) {
        this.new.push(item);
      }
  
      if (!this.isCurrentItem(item)) {
        this.currentItems.push(item);
      }
    }
  
    remove(item) {
      this.removeFromCurrent(item);
  
      if (this.isNewItem(item)) {
        this.removeFromNew(item);
        return;
      }
  
      if (!this.isRemovedItem(item)) {
        this.removed.push(item);
      }
    }
  
    update(items) {
      const newItems = items.filter((a) => {
        return !this.getItems().some((b) => this.compareItems(a, b));
      });
  
      const removedItems = this.getItems().filter((a) => {
        return !items.some((b) => this.compareItems(a, b));
      });
  
      this.currentItems = items;
      this.new = newItems;
      this.removed = removedItems;
    }
  }
  