# Pengaplikasian Algoritma UCS dan A* dalam Mencari Rute Terpendek antara 2 Titik Pada Peta

Dalam tugas kecil ini, akan dipecahkan persoalan pencarian jalur terpendek antara dua titik pada peta. Algoritma yang digunakan dalam pemecahan persoalaan adalah algoritma *uniform cost search* dan algoritma A*. Penjelelasan lebih detil terkait tugas kecil ini, latar belakang, dan penjelasan algoritma dapat dilihat pada laporan di folder `doc`. 

## Group Members

| NIM      | Name                     |
| -------- | ------------------------ |
| 13521056 | Daniel Egiant Sitanggang |
| 13521087 | Razzan Daksana Yoni      |

## Requirement
Pastikan telah diinstal requirement berikut pada perangkat anda
- npm 
- typescript (node js)

## About this project

- Menyelesaikan perosalan pencarian jalur terpendek dari dua titik pada maps
- GUI diplay diimplementasikan dengan react
- Input dapat berupa file dengan contoh pada folder `test` atau dengan membuat node secara manual dengan mengklik 

## Setup

1. Clone repository ini dengan memasukkan 
   ```git clone https://github.com/razzanYoni/Tucil3_13521056_13521087 ```  pada git bash
2. Buka terminal pada root directory dari repository yang telah di clone
3. Install seluruh *dependencies* dengan memasukkan perintah ```npm install```
5. Jalankan program pada *development* server dengan memasukkan ```npm start```

##  Disclaimer 
Agar solusi yang dihasilkan algoritma A* benar pastikan input yang dimasukkan konsisten yaitu dari *weight* dari suatu edge (dalam km) >= haversine distance kedua node yang dihubungkannya.

## Acknowledgements

- This project is spearheaded by the IF2211 Informatics major at Institut Teknologi Bandung, which has been well organized by the IF2211 - 2023 professors and assistants.
- README template by [@flynerdpl](https://www.flynerd.pl/): [README](https://github.com/ritaly/README-cheatsheet)
