// ==========================================
// DATA BARANG ATK
// ==========================================

const daftarBarang = {

    "01": {
        nama: "Bolpoin",
        harga: 3000
    },

    "02": {
        nama: "Pensil",
        harga: 2500
    },

    "03": {
        nama: "Penghapus",
        harga: 2000
    },

    "04": {
        nama: "Tipe-X",
        harga: 5000
    },

    "05": {
        nama: "Pensil 2B",
        harga: 3500
    },

    "06": {
        nama: "Pensil Mekanik",
        harga: 7000
    },

    "07": {
        nama: "Isi Pensil Mekanik",
        harga: 4000
    },

    "08": {
        nama: "Penggaris 30 cm",
        harga: 5000
    },

    "09": {
        nama: "Penggaris 15 cm",
        harga: 3000
    },

    "10": {
        nama: "Spidol",
        harga: 5000
    },

    "11": {
        nama: "Spidol Permanen",
        harga: 7000
    },

    "12": {
        nama: "Stabilo",
        harga: 6000
    },

    "13": {
        nama: "Buku Tulis",
        harga: 5000
    },

    "14": {
        nama: "Buku Gambar",
        harga: 8000
    },

    "15": {
        nama: "Buku Folio",
        harga: 7000
    },

    "16": {
        nama: "Kertas HVS",
        harga: 50000
    },

    "17": {
        nama: "Map Plastik",
        harga: 3000
    },

    "18": {
        nama: "Map Kertas",
        harga: 2000
    },

    "19": {
        nama: "Stapler",
        harga: 12000
    },

    "20": {
        nama: "Isi Stapler",
        harga: 5000
    },

    "21": {
        nama: "Gunting",
        harga: 8000
    },

    "22": {
        nama: "Lem Kertas",
        harga: 4000
    },

    "23": {
        nama: "Lem Stick",
        harga: 6000
    },

    "24": {
        nama: "Cutter",
        harga: 5000
    },

    "25": {
        nama: "Isi Cutter",
        harga: 4000
    },

    "26": {
        nama: "Selotip",
        harga: 5000
    },

    "27": {
        nama: "Lakban",
        harga: 10000
    },

    "28": {
        nama: "Sticky Notes",
        harga: 7000
    },

    "29": {
        nama: "Amplop",
        harga: 1000
    },

    "30": {
        nama: "Correction Tape",
        harga: 8000
    }

};


// ==========================================
// VARIABEL TRANSAKSI
// ==========================================

let keranjang = [];

let totalHarga = 0;

let nomorTransaksi =
    "TRX" +
    Date.now().toString().slice(-6);


// ==========================================
// ELEMENT HTML
// ==========================================

const kodeBarang =
    document.getElementById("kodeBarang");

const jumlahBarang =
    document.getElementById("jumlahBarang");

const infoBarang =
    document.getElementById("infoBarang");

const btnTambah =
    document.getElementById("btnTambah");

const btnSelesai =
    document.getElementById("btnSelesai");

const daftarBelanja =
    document.getElementById("daftarBelanja");

const totalHargaElement =
    document.getElementById("totalHarga");

const uangBayarElement =
    document.getElementById("uangBayar");

const uangKembaliElement =
    document.getElementById("uangKembali");


// ==========================================
// FORMAT RUPIAH
// ==========================================

function formatRupiah(angka) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }
    ).format(angka);

}


// ==========================================
// TANGGAL
// ==========================================

function tampilkanTanggal() {

    const sekarang = new Date();

    const tanggal =
        sekarang.toLocaleDateString(
            "id-ID",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );

    const waktu =
        sekarang.toLocaleTimeString(
            "id-ID",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    document.getElementById(
        "tanggalStruk"
    ).textContent =
        `${tanggal} ${waktu}`;

    document.getElementById(
        "nomorTransaksi"
    ).textContent =
        nomorTransaksi;
}

tampilkanTanggal();


// ==========================================
// MENAMPILKAN DAFTAR BARANG
// ==========================================

function tampilkanDaftarProduk() {

    const produkGrid =
        document.getElementById("produkGrid");

    produkGrid.innerHTML = "";

    for (const kode in daftarBarang) {

        const barang =
            daftarBarang[kode];

        const div =
            document.createElement("div");

        div.className =
            "produk-item";

        div.innerHTML = `
            <strong>${kode} - ${barang.nama}</strong>
            <span>${formatRupiah(barang.harga)}</span>
        `;

        produkGrid.appendChild(div);
    }
}

tampilkanDaftarProduk();


// ==========================================
// CEK KODE BARANG
// ==========================================

kodeBarang.addEventListener(
    "input",
    function () {

        const kode =
            kodeBarang.value.trim();

        if (daftarBarang[kode]) {

            const barang =
                daftarBarang[kode];

            infoBarang.innerHTML =
                `${barang.nama} - ${formatRupiah(barang.harga)}`;

            infoBarang.style.color =
                "green";

        } else {

            if (kode === "") {

                infoBarang.innerHTML =
                    "Masukkan kode barang";

            } else {

                infoBarang.innerHTML =
                    "Kode barang tidak ditemukan";

                infoBarang.style.color =
                    "red";
            }
        }
    }
);


// ==========================================
// TAMBAHKAN BARANG
// ==========================================

function tambahBarang() {

    const kode =
        kodeBarang.value.trim();

    const jumlah =
        parseInt(jumlahBarang.value);


    // CEK KODE

    if (!daftarBarang[kode]) {

        alert(
            "Kode barang tidak ditemukan!"
        );

        kodeBarang.focus();

        return;
    }


    // CEK JUMLAH

    if (!jumlah || jumlah <= 0) {

        alert(
            "Jumlah barang harus lebih dari 0!"
        );

        jumlahBarang.focus();

        return;
    }


    const barang =
        daftarBarang[kode];


    // CEK BARANG SUDAH ADA

    const barangLama =
        keranjang.find(
            item => item.kode === kode
        );


    if (barangLama) {

        barangLama.jumlah += jumlah;

        barangLama.subtotal =
            barangLama.jumlah *
            barangLama.harga;

    } else {

        keranjang.push({

            kode: kode,

            nama: barang.nama,

            harga: barang.harga,

            jumlah: jumlah,

            subtotal:
                barang.harga * jumlah

        });

    }


    tampilkanStruk();


    // RESET INPUT

    kodeBarang.value = "";

    jumlahBarang.value = "";

    infoBarang.innerHTML =
        "Masukkan kode barang";

    infoBarang.style.color =
        "#555";

    kodeBarang.focus();

}


// ==========================================
// EVENT BUTTON TAMBAH
// ==========================================

btnTambah.addEventListener(
    "click",
    tambahBarang
);


// ==========================================
// ENTER UNTUK KODE BARANG
// ==========================================

kodeBarang.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            if (kodeBarang.value.trim() !== "") {

                jumlahBarang.focus();

            }

        }

    }
);


// ==========================================
// ENTER PADA JUMLAH
// ==========================================

jumlahBarang.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            tambahBarang();

        }

    }
);


// ==========================================
// TAMPILKAN STRUK
// ==========================================

function tampilkanStruk() {

    daftarBelanja.innerHTML = "";

    totalHarga = 0;


    if (keranjang.length === 0) {

        daftarBelanja.innerHTML =
            `<p class="empty-cart">
                Belum ada barang
            </p>`;

        totalHargaElement.textContent =
            formatRupiah(0);

        return;
    }


    keranjang.forEach(
        function (item) {

            totalHarga +=
                item.subtotal;


            const div =
                document.createElement("div");

            div.className =
                "receipt-item";


            div.innerHTML = `

                <div class="item-name">
                    ${item.nama}
                </div>

                <div class="item-total">
                    ${formatRupiah(item.subtotal)}
                </div>

                <div class="item-detail">
                    ${item.jumlah} x ${formatRupiah(item.harga)}
                </div>

            `;


            daftarBelanja.appendChild(div);

        }
    );


    totalHargaElement.textContent =
        formatRupiah(totalHarga);

}


// ==========================================
// SELESAI BELANJA
// ==========================================

btnSelesai.addEventListener(
    "click",
    function () {

        if (keranjang.length === 0) {

            alert(
                "Belum ada barang di dalam keranjang!"
            );

            return;
        }


        document.getElementById(
            "modalTotal"
        ).textContent =
            formatRupiah(totalHarga);


        document.getElementById(
            "inputBayar"
        ).value = "";


        document.getElementById(
            "modalKembalian"
        ).textContent =
            formatRupiah(0);


        document.getElementById(
            "paymentModal"
        ).style.display =
            "flex";


        document.getElementById(
            "inputBayar"
        ).focus();

    }
);


// ==========================================
// HITUNG KEMBALIAN
// ==========================================

const inputBayar =
    document.getElementById("inputBayar");

const modalKembalian =
    document.getElementById("modalKembalian");


inputBayar.addEventListener(
    "input",
    function () {

        const bayar =
            parseInt(inputBayar.value) || 0;

        const kembali =
            bayar - totalHarga;


        if (kembali >= 0) {

            modalKembalian.textContent =
                formatRupiah(kembali);

        } else {

            modalKembalian.textContent =
                "Uang kurang " +
                formatRupiah(
                    Math.abs(kembali)
                );

        }

    }
);


// ==========================================
// PROSES PEMBAYARAN
// ==========================================

document.getElementById(
    "btnProsesBayar"
).addEventListener(
    "click",
    function () {

        const bayar =
            parseInt(inputBayar.value) || 0;


        if (bayar < totalHarga) {

            alert(
                "Uang pembayaran kurang!"
            );

            return;
        }


        const kembali =
            bayar - totalHarga;


        uangBayarElement.textContent =
            formatRupiah(bayar);


        uangKembaliElement.textContent =
            formatRupiah(kembali);


        document.getElementById(
            "paymentModal"
        ).style.display =
            "none";


        alert(
            "Pembayaran berhasil!"
        );

    }
);


// ==========================================
// TUTUP MODAL
// ==========================================

document.getElementById(
    "btnTutupModal"
).addEventListener(
    "click",
    function () {

        document.getElementById(
            "paymentModal"
        ).style.display =
            "none";

    }
);


// ==========================================
// CETAK STRUK
// ==========================================

document.getElementById(
    "btnPrint"
).addEventListener(
    "click",
    function () {

        window.print();

    }
);


// ==========================================
// KALKULATOR
// ==========================================

let calcValue = "";

let calcOperator = "";

let calcPrevious = "";

let calcReset = false;


const calcDisplay =
    document.getElementById(
        "calcDisplay"
    );


// ==========================================
// INPUT ANGKA
// ==========================================

function inputNumber(number) {

    if (calcReset) {

        calcValue = "";

        calcReset = false;

    }


    if (
        number === "." &&
        calcValue.includes(".")
    ) {

        return;

    }


    calcValue += number;

    calcDisplay.value =
        calcValue;

}


// ==========================================
// INPUT OPERATOR
// ==========================================

function inputOperator(operator) {

    if (calcValue === "") {

        return;

    }


    if (calcPrevious !== "") {

        calculate();

    }


    calcOperator =
        operator;

    calcPrevious =
        calcValue;

    calcValue = "";

}


// ==========================================
// HITUNG KALKULATOR
// ==========================================

function calculate() {

    if (
        calcPrevious === "" ||
        calcValue === "" ||
        calcOperator === ""
    ) {

        return;

    }


    const angkaPertama =
        parseFloat(calcPrevious);

    const angkaKedua =
        parseFloat(calcValue);

    let hasil;


    switch (calcOperator) {

        case "+":
            hasil =
                angkaPertama +
                angkaKedua;
            break;


        case "-":
            hasil =
                angkaPertama -
                angkaKedua;
            break;


        case "*":
            hasil =
                angkaPertama *
                angkaKedua;
            break;


        case "/":

            if (angkaKedua === 0) {

                calcDisplay.value =
                    "Error";

                calcValue = "";

                calcPrevious = "";

                calcOperator = "";

                return;

            }

            hasil =
                angkaPertama /
                angkaKedua;

            break;

    }


    calcValue =
        hasil.toString();

    calcDisplay.value =
        hasil;

    calcPrevious = "";

    calcOperator = "";

    calcReset = true;

}


// ==========================================
// CLEAR KALKULATOR
// ==========================================

function clearCalculator() {

    calcValue = "";

    calcOperator = "";

    calcPrevious = "";

    calcReset = false;

    calcDisplay.value = "0";

}


// ==========================================
// DELETE
// ==========================================

function deleteNumber() {

    calcValue =
        calcValue.slice(0, -1);


    if (calcValue === "") {

        calcDisplay.value =
            "0";

    } else {

        calcDisplay.value =
            calcValue;

    }

}


// ==========================================
// ENTER UNTUK KALKULATOR
// ==========================================

document.addEventListener(
    "keydown",
    function (event) {

        // Jangan ganggu input kasir

        if (
            document.activeElement === kodeBarang ||
            document.activeElement === jumlahBarang ||
            document.activeElement === inputBayar
        ) {

            return;

        }


        if (
            event.key >= "0" &&
            event.key <= "9"
        ) {

            inputNumber(event.key);

        }


        if (
            event.key === "+" ||
            event.key === "-" ||
            event.key === "*" ||
            event.key === "/"
        ) {

            inputOperator(event.key);

        }


        if (event.key === "Enter") {

            calculate();

        }


        if (event.key === "Backspace") {

            deleteNumber();

        }


        if (event.key === "Escape") {

            clearCalculator();

        }

    }
);