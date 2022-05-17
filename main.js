jQuery(document)
    .ready(function () {


        /************************************************************************************************
         * CODIGO PUNTO 1
         ************************************************************************************************/

        // tomado de: https://github.com/eshiofune/auto-correction/blob/master/main.js

        const universeOfDiscourse = [
            "Caminar", "Jugar", "Reir", "Comida", "dominó", "alcohol", "Cambio", "Corazón", "Correr"
        ];

        function getBigram(word) {
            let result = [];

            for (let i = 0; i < word.length - 1; i++) {
                result.push(word[i] + word[i + 1]);
            }

            return result;
        }

        function getSimilarity(word1, word2) {
            word1 = word1.toLowerCase();
            word2 = word2.toLowerCase();
            const bigram1 = getBigram(word1), bigram2 = getBigram(word2);
            let similar = [];

            for (let i = 0; i < bigram1.length; i++) {
                if (bigram2.indexOf(bigram1[i]) > -1) {
                    similar.push(bigram1[i]);
                }
            }

            return similar.length / Math.max(bigram1.length, bigram2.length);
        }

        function autoCorrect(word, knownWords = universeOfDiscourse, similarityThreshold = 0.5) {
            let maxSimilarity = 0;
            let mostSimilar = word;

            for (let i = 0; i < knownWords.length; i++) {
                let similarity = getSimilarity(knownWords[i], word);
                if (similarity > maxSimilarity) {
                    maxSimilarity = similarity;
                    mostSimilar = knownWords[i];
                }
            }

            return maxSimilarity > similarityThreshold ? mostSimilar : word;
        }

        // codigo principal
        jQuery("#input_speel_checker").blur(function () {
            let text = jQuery(this).val();

            let textsArray = text.split(" ");

            let finalText = "";

            if (textsArray.length > 0) {

                for (const key in textsArray) {
                    var word = autoCorrect(textsArray[key]);
                    finalText += word + " ";
                }

                jQuery(this).val(finalText);
            }
        });

        /************************************************************************************************
         * CODIGO PUNTO 2
         ************************************************************************************************/


        // creamos un objeto  para operar la funcionalidad de inventario
        function InventoryList() {
            
            var items = [];

            this.add = function (name) {
                if (name.length == 0 || name == "") {
                    return;
                }
                if (!items.includes(name)) {
                    if (items.length < 10) {
                        items.push(name);
                    }
                }
            };

            this.remove = function (name) {
                if (name.length == 0 || name == "") {
                    return;
                }
                if (items.includes(name)) {
                    var i = items.indexOf(name);
                    items.splice(i, 1);
                }
            }

            this.getList = function () {
                return items;
            }
        }

        var inventario = new InventoryList();
        inventario.add("camisas");
        console.info(inventario.getList());

    });