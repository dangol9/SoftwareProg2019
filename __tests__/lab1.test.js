import * as lab1 from "../src/lab1";

describe("Lab 1 warmup", () =>{
  it("sums an array", () =>{
    expect(lab1.simpleArraySum([1,2,3])).toBe(6);
    expect(lab1.simpleArraySum([])).toBe(0);
    expect(lab1.simpleArraySum([2, -3])).toBe(-1);
  });

  it("reverses a string", () =>{
    expect(lab1.reverseString("Tallinn University"))
    .toBe("ytisrevinU nnillaT");
    expect(lab1.reverseString("")).toBe("");
  });

  it("generates random items", () =>{
    const items = lab1.generateRandomItemList(30);
    expect(items.length).toBe(30);
    expect(isEachItemDifferent(items)).toBe(true);
  });

  it("finds the most expensive item in list", () =>{
    const items = lab1.generateRandomItemList(30);
    const item = lab1.findMostExpensiveItem(items);
    expect(item.cost).toBe(findHighest(items));
  });

  it("finds the cheapest item in list", () =>{
    const items = lab1.generateRandomItemList(30);
    const item = lab1.findCheapestItem(items);
    expect(item.cost).toBe(findLowest(items));
  });
});

const findHighest = (items) => {
  return items.reduce( (acc, item) => {
    if(acc < item.cost) acc = item.cost;
    return acc;
  },0);
};

const findLowest = (items) => {
  return items.reduce( (acc, item) => {
    if(!acc || acc > item.cost) acc = item.cost;
    return acc;
  },null);
};

/**
 * Checks if an item is different from the previous.
 */
const isEachItemDifferent = items => {
  let result = false;
  items.forEach( (item, index) => {
    if(index === 0 ) return result = true;
    result = isDifferent(item, items[index-1]);
  });
  return result;
};

const isDifferent = (item1, item2) => {
  return item1.name !== item2.name &&
    item1.cost !== item2.cost
  // don't test size.. too much effort.
};
