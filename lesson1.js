console.log("Hello World!");
const generateRandomItemList = n =>{
	const items = [];
	for(let i = 0; i <= n; i++){
		const item = {
			name: "xd" + getRandomIntInclusive(0,1000),
			cost: getRandomIntInclusive(0,1000),
			size: Object.values(Size)[getRandomIntInclusive(0,2)]
		};
		items.push(item);
	}
	return items;
};
const items = generateRandomItemList(3);
console.log(items);