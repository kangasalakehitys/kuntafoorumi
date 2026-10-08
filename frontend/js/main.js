(function () {
  var KORTTIVARIT = ["#DE232F", "#FCB316", "#28336C", "#E64925", "#00ADC5", "#009651"];

  function luoKortti(tieto, indeksi) {
    var kortti = document.createElement("li");
    kortti.className = "kortti";
    kortti.style.setProperty("--korttivari", KORTTIVARIT[indeksi % KORTTIVARIT.length]);

    var otsikko = document.createElement("h2");
    otsikko.textContent = tieto.otsikko;
    kortti.appendChild(otsikko);

    var teksti = document.createElement("p");
    teksti.textContent = tieto.teksti;
    kortti.appendChild(teksti);

    if (tieto.url) {
      var nappi = document.createElement("a");
      nappi.className = "nappi";
      nappi.href = tieto.url;
      nappi.target = "_blank";
      nappi.rel = "noopener noreferrer";
      nappi.textContent = (tieto.nappi || tieto.otsikko) + " →";
      var uusiIkkuna = document.createElement("span");
      uusiIkkuna.className = "piilotettu";
      uusiIkkuna.textContent = " (avautuu uuteen ikkunaan)";
      nappi.appendChild(uusiIkkuna);
      kortti.appendChild(nappi);
    } else {
      var tulossa = document.createElement("p");
      tulossa.className = "tulossa";
      var merkki = document.createElement("span");
      merkki.className = "tulossa-merkki";
      merkki.textContent = "Tulossa";
      tulossa.appendChild(merkki);
      if (tieto.tulossa) {
        tulossa.appendChild(document.createTextNode(" " + tieto.tulossa));
      }
      kortti.appendChild(tulossa);
    }

    return kortti;
  }

  function piirraKortit() {
    var lista = document.getElementById("kortit");
    var kortit = window.KUNTAFOORUMI_KORTIT;
    if (!lista || !kortit) return;
    lista.textContent = "";
    kortit.forEach(function (tieto, i) {
      lista.appendChild(luoKortti(tieto, i));
    });
  }

  function alustaJakonapit() {
    var napit = document.querySelectorAll("[data-jaa]");
    Array.prototype.forEach.call(napit, function (nappi) {
      var ilmoitus = nappi.parentNode.querySelector(".jaa-ilmoitus");
      nappi.addEventListener("click", function () {
        var osoite = window.location.href;
        var valmis = function () {
          if (ilmoitus) ilmoitus.textContent = "Linkki kopioitu leikepöydälle";
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(osoite).then(valmis, function () {
            window.prompt("Kopioi linkki:", osoite);
          });
        } else {
          window.prompt("Kopioi linkki:", osoite);
        }
      });
    });
  }

  piirraKortit();
  alustaJakonapit();
})();
