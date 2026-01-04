# WebRTC Video Call using Pion (Golang)

## Deskripsi
Aplikasi video call sederhana berbasis WebRTC
yang diimplementasikan menggunakan library Pion (Golang)
dan WebSocket sebagai signaling server.

## Teknologi
- Golang
- Pion WebRTC
- WebSocket
- HTML & JavaScript

## Arsitektur Sistem
Browser berkomunikasi melalui WebSocket untuk signaling
dan menggunakan WebRTC untuk pengiriman audio dan video secara real-time.

## Cara Menjalankan
1. go mod tidy
2. go run main.go
3. Buka http://localhost:8080 di 2 tab browser
4. Klik Start Call

## Hasil
Pengguna dapat melakukan video call 1-to-1 secara real-time.
