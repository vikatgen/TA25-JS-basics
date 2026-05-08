const getSecretKey = async () => {
    try {
        const response = await fetch("./secrets.txt");

        if (!response.ok) {
            document.body.innerHTML = "Salastatud võtmeid ei saanud kätte. Kas secrets.txt fail on olemas?";
        }

        return await response.text();
    } catch (expection) {
        if (expection instanceof SyntaxError) {
            console.error(expection);
        }
    }
};

export { getSecretKey };