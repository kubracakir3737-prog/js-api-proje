var input = document.getElementById("isimInput");
var buton = document.getElementById("araBtn");
var durum = document.getElementById("durumMesaji");
var kartListesi = document.getElementById("kartListesi");
var detayAlani = document.getElementById("detayAlani");

var liste = [];

buton.addEventListener("click", calistir);


function calistir() {

    var isim = input.value;

    if (isim == "") {
        durum.innerText = "Lütfen bir isim giriniz";
        return;
    }

    durum.innerText = "Analiz yapılıyor...";

    try {
        fetch("https://api.genderize.io/?name=" + isim)
            .then(function (cevap) {
                return cevap.json();
            })
            .then(function (sonuc) {

                if (sonuc.gender == null) {
                    durum.innerText = "Sonuç bulunamadı";
                    return;
                }

                durum.innerText = "Analiz tamamlandı";

                var cinsiyet;

                if (sonuc.gender == "male") {
                    cinsiyet = "Erkek";
                } else {
                    cinsiyet = "Kadın";
                }

                var oran = Math.round(sonuc.probability * 100);

                var kart = {
                    isim: sonuc.name,
                    cinsiyet: cinsiyet,
                    oran: oran,
                    sayi: sonuc.count
                };

                liste.push(kart);
                kartlariGoster();
            });
    } catch (hata) {
        durum.innerText = "Bir hata oluştu";
    }
}


function kartlariGoster() {

    kartListesi.innerHTML = "";

    
    liste.forEach(function (eleman) {

        kartListesi.innerHTML +=
            "<div class='kart'>" +
            "<h4>İsim Analizi</h4>" +
            "<p><b>İsim:</b> " + eleman.isim + "</p>" +
            "<p><b>Cinsiyet:</b> " + eleman.cinsiyet + "</p>" +
            "<button onclick='detayGoster(\"" + eleman.isim + "\", \"" + eleman.cinsiyet + "\", " + eleman.oran + ", " + eleman.sayi + ")'>Detayı Göster</button>" +
            "</div>";
    });
}


function detayGoster(isim, cinsiyet, oran, sayi) {

    detayAlani.innerHTML =
        "<h4>Detay Bilgileri</h4>" +
        "<p><b>İsim:</b> " + isim + "</p>" +
        "<p><b>Cinsiyet:</b> " + cinsiyet + "</p>" +
        "<p><b>Olasılık:</b> %" + oran + "</p>" +
        "<p><b>Veri Sayısı:</b> " + sayi + "</p>";
}