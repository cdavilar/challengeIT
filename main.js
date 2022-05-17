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
        console.info("PUNTO 2",inventario.getList());



        /************************************************************************************************
         * CODIGO PUNTO 3
         ************************************************************************************************/


        //TODO
        function counts(teamA, teamB) {
            var arrResult = [];
            for (var i = 0; i < teamB.length; i++) {
                var totalPartidos = 0;
                for (var j = 0; j < teamA.length; j++) {
                    if (teamA[j] <= teamB[i]) {
                        totalPartidos++;
                    }
                }
                arrResult.push(totalPartidos);
            }
            return arrResult;
        }

        let teamA = [2, 10, 5, 4, 8];
        let teamB = [3, 1, 7, 8];
        let result = counts(teamA, teamB);
        console.log("PUNTO 3",result)


        /************************************************************************************************
         * CODIGO PUNTO 4
         ************************************************************************************************/

        /*
         * Complete the 'processLogs' function below.
         *
         * The function is expected to return a STRING_ARRAY.
         * The function accepts following parameters:
         *  1. STRING_ARRAY logs
         *  2. INTEGER threshold
         * 
         * FORMAT: "sender_user_id recipient_user_id amount"
         */
        function processLogs(logs, threshold) {

            var totalTransactionsByUser = {};
            var usersWithUmbral = [];

            // 10 al 5 es el limite
            if (logs.length > 100000) {
                logs = logs.slice(0, n);
            }

            // si el umbral no esta dentro del rango del total de registros a operar, devolvemos el arreglo vacio
            if(!(threshold >= 1 && threshold <= logs.length)){
                return usersWithUmbral;
            }

            for (const key in logs) {
                var log = logs[key];
                let logArray = log.split(" ");

                if (totalTransactionsByUser.hasOwnProperty(logArray[0])) {
                    totalTransactionsByUser[logArray[0]]++;
                } else {
                    totalTransactionsByUser[logArray[0]] = 1;
                }

                if (logArray[0] !== logArray[1]) {
                    if (totalTransactionsByUser.hasOwnProperty(logArray[1])) {
                        totalTransactionsByUser[logArray[1]]++;
                    } else {
                        totalTransactionsByUser[logArray[1]] = 1;
                    }
                }

            }

            for (const property in totalTransactionsByUser) {
                if (totalTransactionsByUser.hasOwnProperty(property)) {
                    if (totalTransactionsByUser[property] >= threshold) {
                        usersWithUmbral.push(property);
                    }
                }
            }

            usersWithUmbral.sort(function (a, b) {
                return parseInt(a) - parseInt(b);
            })

            return usersWithUmbral;
        }


        var logs = [
            "88 99 200",
            "88 99 300",
            "88 32 100",
            "12 12 15",
        ];

        var threshold = 2;

        var theResult = processLogs(logs, threshold);
        console.log("PUNTO 4: ", theResult);


    });