import Vue from "vue";

Vue.filter("monthFormat", function(value) {
  var bulan = value;
  switch (bulan) {
    case 0:
      bulan = "Januari";
      break;
    case 1:
      bulan = "Februari";
      break;
    case 2:
      bulan = "Maret";
      break;
    case 3:
      bulan = "April";
      break;
    case 4:
      bulan = "Mei";
      break;
    case 5:
      bulan = "Juni";
      break;
    case 6:
      bulan = "Juli";
      break;
    case 7:
      bulan = "Agustus";
      break;
    case 8:
      bulan = "September";
      break;
    case 9:
      bulan = "Oktober";
      break;
    case 10:
      bulan = "November";
      break;
    case 11:
      bulan = "Desember";
      break;
  }

  return bulan;
});

Vue.filter("dateFormat", function(value) {
    var date = value;
    var tahun = date.getFullYear();
    var bulan = date.getMonth();
    var tanggal = date.getDate();
    switch (bulan) {
      case 0:
        bulan = "Januari";
        break;
      case 1:
        bulan = "Februari";
        break;
      case 2:
        bulan = "Maret";
        break;
      case 3:
        bulan = "April";
        break;
      case 4:
        bulan = "Mei";
        break;
      case 5:
        bulan = "Juni";
        break;
      case 6:
        bulan = "Juli";
        break;
      case 7:
        bulan = "Agustus";
        break;
      case 8:
        bulan = "September";
        break;
      case 9:
        bulan = "Oktober";
        break;
      case 10:
        bulan = "November";
        break;
      case 11:
        bulan = "Desember";
        break;
    }

    return tanggal + bulan + tahun;
  });

  Vue.filter("calculateAge", function(){
    let currentDate = new Date();
    let createdDate = value;
    let difference = currentDate - createdDate;
    let age = Math.floor(difference/31557600000);
    return age
  }
  );