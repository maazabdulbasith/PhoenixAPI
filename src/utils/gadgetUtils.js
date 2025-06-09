// List of codename prefixes and suffixes for generating random codenames
const codenamePrefixes = ["The", "Operation", "Project", "Mission", "Agent"];

const codenameSuffixes = [
    "Astra",
    "Tejo",
    "Cypher",
    "Jett",
    "Killjoy",
    "Omen",
    "Phoenix",
    "Raze",
    "Reyna",
    "Vyse",
    "Harbor",
    "Clove",
    "Sova",
    "Viper",
    "Reyna",
    "Yoru",
    "Brimstone",
    "Fade",
    "Raze",
    "Jett",
    "Breach",
    "Omen",
];

// Generate a random codename
const generateCodename = () => {
    const prefix =
        codenamePrefixes[Math.floor(Math.random() * codenamePrefixes.length)];
    const suffix =
        codenameSuffixes[Math.floor(Math.random() * codenameSuffixes.length)];
    return `${prefix} ${suffix}`;
};

// Generates a random success probability like(between 50 and 99)
const generateSuccessProbability = () => {
    return Math.floor(Math.random() * 50) + 50; // Random number between 50 and 99
};

// Generates a random confirmation code of (6 digits)
const generateConfirmationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = {
    generateCodename,
    generateSuccessProbability,
    generateConfirmationCode,
};
