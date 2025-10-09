/* 
Ship object needs to include:
• Length (of ship)
• Number of times ship has been hit
• Whether or not ship has been sunk
• Hit() function that increases number of 'hits' in your ship
• isSunk() function - calculates whether a ship is considered sunk
based on its length and the number of hits it has received

Ship classes/sizes
No.	Class of ship	Size
1	Carrier	         5
2	Battleship	     4
3	Cruiser	         3
4	Submarine	     3
5	Destroyer	     2
*/

export const ship = (length, hitCount, sinkStatus) => {
  return {
    length: length,
    hitCount: hitCount,
    sinkStatus: sinkStatus,
    hit: () => {
      hitCount += 1;
      return hitCount;
    },
    isSunk: () => {
      if (length === hitCount) {
        return "The vessel has been sunk!";
      } else return "The vessel is still afloat!";
    },
  };
};
