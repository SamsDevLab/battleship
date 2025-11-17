export const Ship = (name, length) => {
  return {
    name: name,
    length: length,
    hitCount: 0,
    sinkStatus: false,
    hit: function () {
      this.hitCount += 1;
      return this.hitCount;
    },
    isSunk: function () {
      if (this.length === this.hitCount) {
        this.sinkStatus = true;
        return true;
      } else return false;
    },
  };
};
