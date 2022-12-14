# WaBot-Broadcast

***WhatsApp Bot Broadcast NodeJS Using Library [Baileys](https://github.com/adiwajshing/Baileys/tree/multi-device/)***

## Install
**Install on RDP/Windows ✅**

Install [NodeJS](https://nodejs.org/en/download/)
 dan [Git Bash](https://git-scm.com/downloads) terlebih dahulu
```bash
$ git clone https://github.com/Sansekai/WaBot-Broadcast
$ cd WaBot-Broadcast
$ npm install
$ node index.js
```
**Install on Termux ✅**

Silahkan install manual ```node_modules``` terlebih dahulu, karena di termux saat install otomatis melalui ```npm install``` terjadi error.
<br>Link ```node_modules```: [Klik Disini](https://drive.google.com/file/d/16CV6KWAKdo82LlNoOGMeZS8trlAw4Nsy/view?usp=drivesdk)
```bash
$ pkg install git nodejs -y
$ git clone https://github.com/Sansekai/WaBot-Broadcast
$ cd WaBot-Broadcast
```
Sesusah menginstall file node_modules, silahkan extract file ```node_modules.zip``` dan taruh di folder WaBot-Broadcast.

**Run**
```bash
$ node index.js
```

## Note
- Jangan lupa ganti nomor owner di file [config.js](https://github.com/Sansekai/WaBot-Broadcast/blob/85aae7903ed8578aca47fc102cae212bcb5f2a04/config.js#L23)
- Atur delay mengirim tiap pesannya untuk mengurangi resiko banned di file [config.js](https://github.com/Sansekai/WaBot-Broadcast/blob/85aae7903ed8578aca47fc102cae212bcb5f2a04/config.js#L24)
- Untuk fitur bclist, kalian bisa menambahkan list nomornya di file [list.json](https://github.com/Sansekai/WaBot-Broadcast/blob/main/list.json)<br>
contoh penginputan nomorya: ```["6281259261277","62812710385261","6289530877869"]```<br>
Ingat ya seperti di atas jangan sampai salah, kalau salah botnya gak bisa jalan.

Bot masih banyak kekurangan, kalian bisa mengembangkannya sendiri supaya lebih bagus.

## Donate
[Saweria](https://saweria.co/sansekai)

## License
[MIT License](https://github.com/Sansekai/WaBot-Broadcast/blob/main/LICENSE)

Copyright (c) 2022 M Yusril

