const { getPeople } = require("./service");

Array.prototype.customReduce = function (callback, initialValue) {

    // Duplicando o array usando o Spread Operator
    const copyArray = [...this];
    let previousValue = initialValue;

    if (initialValue === undefined) {
        previousValue = copyArray[0];
        copyArray.shift();
    }

    for (const item of copyArray) {
        previousValue = callback(previousValue, item, this);
    }

    return previousValue;

};

async function main() {

    try {
        const { results } = await getPeople("a");

        const heights = results.map(character => parseInt(character.height));
        const totalHeights = heights.reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        });

        console.log("[result]", heights);
        console.log("[total]", totalHeights);

        const myList = [
            ["Gabriel", "Sousa"],
            ["NodeBR", "JSBrasil"]
        ];

        const total = myList.customReduce((previousValue, currentValue) => {
            return previousValue.concat(currentValue);
        }, []).join(", ");

        console.log("total", total);

    } catch (error) {
        console.error("[error]", error);
    }

}

main();