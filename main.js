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

            for (let j = 0; j < word.length - 1; j++) {
                result.push(word[j] + word[j + 1]);
            }

            return result;
        }

        function getSimilarity(word1, word2) {
            word1 = word1.toLowerCase();
            word2 = word2.toLowerCase();
            const bigram1 = getBigram(word1), bigram2 = getBigram(word2);
            let similar = [];

            for (let j = 0; j < bigram1.length; j++) {
                if (bigram2.indexOf(bigram1[j]) > -1) {
                    similar.push(bigram1[j]);
                }
            }

            return similar.length / Math.max(bigram1.length, bigram2.length);
        }

        function autoCorrect(word, knownWords = universeOfDiscourse, similarityThreshold = 0.5) {
            let maxSimilarity = 0;
            let mostSimilar = word;

            for (let j = 0; j < knownWords.length; j++) {
                let similarity = getSimilarity(knownWords[j], word);
                if (similarity > maxSimilarity) {
                    maxSimilarity = similarity;
                    mostSimilar = knownWords[j];
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
                    var j = items.indexOf(name);
                    items.splice(j, 1);
                }
            }

            this.getList = function () {
                return items;
            }
        }

        var inventario = new InventoryList();
        inventario.add("camisas");
        console.info(inventario.getList());


        
        /************************************************************************************************
         * CODIGO PUNTO 3
         ************************************************************************************************/

                    
            //TODO
            function counts(teamA, teamB) {

                var arrResult = [];

                for (var i = 0; i < teamB.length ; i++){

                    var totalPartidos = 0;

                    for (var j = 0; j < teamA.length ; j++){
                    
                        if(teamA[j] <= teamB[i]){

                            totalPartidos ++;

                        }
                    }  
                    
                    arrResult.push(totalPartidos);
                }

                return arrResult;
            }

            let teamA = [2, 10, 5, 4, 8];
            let teamB = [3, 1, 7, 8];
            let result = counts(teamA, teamB);
            console.log(result)

    });