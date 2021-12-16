import R from "ramda";

export const parseInput = (str) => str;

const hexToBin = (hexes) =>
  hexes
    .split("")
    .map((hex) => parseInt(hex, 16).toString(2).padStart(4, "0"))
    .join("");

const createIterator = (str, initialIndex = 0) => {
  let i = initialIndex;
  return {
    takeNext: (amount) => {
      if (i + amount > str.length) {
        throw new Error("Exceeded string length");
      }

      const result = str.substr(i, amount);
      i += amount;
      return result;
    },
    hasNext: () => i < str.length,
    getCurrentIndex: () => i,
  };
};

const decodePacket = (bin, iterator) => {
  iterator = iterator || createIterator(bin, 0);
  const { takeNext, getCurrentIndex } = iterator;

  const startIndex = getCurrentIndex();
  const version = parseInt(takeNext(3), 2);
  const typeId = takeNext(3);
  const isLiteralValue = typeId === "100";

  if (isLiteralValue) {
    let literalValue = "";
    while (true) {
      const isLast = takeNext(1) === "0";
      literalValue += takeNext(4);
      if (isLast) {
        break;
      }
    }
    return {
      version,
      type: "literal",
      startIndex,
      endIndex: getCurrentIndex(),
      value: parseInt(literalValue, 2),
    };
  } else {
    const isTotalLength = takeNext(1) === "0";
    if (isTotalLength) {
      const lengthOfSubPackets = parseInt(takeNext(15), 2);
      const endIndex = getCurrentIndex() + lengthOfSubPackets;

      let subPackets = [];
      while (true) {
        const subPacket = decodePacket(bin, iterator);
        subPackets.push(subPacket);
        if (subPacket.endIndex === endIndex) {
          break;
        } else if (subPacket.endIndex > endIndex) {
          throw new Error(
            `Subpacket length (${subPacket.endIndex}) exceeds total length (${endIndex})`
          );
        }
      }

      return {
        version,
        type: "operator",
        startIndex,
        endIndex: getCurrentIndex(),
        subPackets,
      };
    } else {
      const numSubPackets = parseInt(takeNext(11), 2);

      const subPackets = R.range(0, numSubPackets).map(() => {
        return decodePacket(bin, iterator);
      });

      return {
        version,
        type: "operator",
        startIndex,
        endIndex: getCurrentIndex(),
        subPackets,
      };
    }
  }
};

const sumVersions = (packet) => {
  if (packet.type === "literal") {
    return packet.version;
  } else {
    return (
      packet.subPackets.reduce((acc, subPacket) => {
        return acc + sumVersions(subPacket);
      }, 0) + packet.version
    );
  }
};

export const runChallengeA = (hex) => {
  const bin = hexToBin(hex);

  return R.pipe(decodePacket, sumVersions)(bin);
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};
