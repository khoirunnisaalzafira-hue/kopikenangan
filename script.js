        // 1. DATA MENU KOPI KENANGAN
        const daftarMenu = [
            {
                id: 1,
                nama: "Kopi Kenangan Mantan",
                kategori: "kopi",
                harga: 18000,
                deskripsi: "Kopi susu dengan gula aren murni khas Kenangan.",
                gambar: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 2,
                nama: "Americano Warisan",
                kategori: "kopi",
                harga: 15000,
                deskripsi: "Espresso murni dengan air dingin/panas, mantap dan segar.",
                gambar: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 3,
                nama: "Avocado Coffee Kenangan",
                kategori: "kopi",
                harga: 26000,
                deskripsi: "Alpukat lembut, espresso, dan sirup cokelat legit.",
                gambar: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 4,
                nama: "Kenangan Milk Tea",
                kategori: "non-kopi",
                harga: 20000,
                deskripsi: "Teh hitam aromatik dipadu susu segar gurih.",
                gambar: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 5,
                nama: "Cokelat Klasik",
                kategori: "non-kopi",
                harga: 22000,
                deskripsi: "Minuman cokelat creamy dengan manis gurih yang pas.",
                gambar: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 6,
                nama: "Roti Cokelat Klasik",
                kategori: "camilan",
                harga: 12000,
                deskripsi: "Roti lembut dengan isian cokelat lumer di mulut.",
                gambar: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 7,
                nama: "Toast Daging Asap Keju",
                kategori: "camilan",
                harga: 24000,
                deskripsi: "Roti panggang renyah berpadu smoked beef dan keju gurih.",
                gambar: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 8,
                nama: "Matcha Latte",
                kategori: "non-kopi",
                harga: 24000,
                deskripsi: "Teh hijau Jepang asli dipadu susu segar lembut.",
                gambar: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=500&q=80"
            }
        ];

        // 2. KERANJANG BELANJA (STATE)
        let keranjang = [];

        // 3. ELEMEN DOM
        const menuGrid = document.getElementById("menu-grid");
        const filterBtns = document.querySelectorAll(".filter-btn");

        const btnKeranjangNav = document.getElementById("btn-keranjang-nav");
        const cartModal = document.getElementById("cart-modal");
        const btnCloseCart = document.getElementById("btn-close-cart");

        const cartItemsContainer = document.getElementById("cart-items");
        const cartTotalPrice = document.getElementById("cart-total-price");
        const cartCountBadge = document.getElementById("cart-count");
        const btnClearCart = document.getElementById("btn-clear-cart");
        const btnCheckout = document.getElementById("btn-checkout");

        const orderModal = document.getElementById("order-success-modal");
        const orderReceipt = document.getElementById("order-receipt");
        const btnCloseOrder = document.getElementById("btn-close-order");

        const feedbackInput = document.getElementById("feedback-input");
        const btnKirimSaran = document.getElementById("btn-kirim-saran");
        const feedbackResult = document.getElementById("feedback-result");

        // 4. FORMAT RUPIAH
        function formatRupiah(angka) {
            return "Rp " + angka.toLocaleString("id-ID");
        }

        // 5. RENDER MENU DENGAN DOM MANIPULATION
        function renderMenu(kategori = "semua") {
            menuGrid.innerHTML = ""; // Bersihkan tampilan menu

            const menuTampil = (kategori === "semua")
                ? daftarMenu
                : daftarMenu.filter(item => item.kategori === kategori);

            menuTampil.forEach(item => {
                const card = document.createElement("div");
                card.className = "menu-card";

                card.innerHTML = `
                    <div class="menu-img-wrap">
                        <img src="${item.gambar}" alt="${item.nama}">
                        <span class="menu-tag">${item.kategori}</span>
                    </div>
                    <div class="menu-body">
                        <h3 class="menu-title">${item.nama}</h3>
                        <p class="menu-desc">${item.deskripsi}</p>
                        <div class="menu-footer">
                            <span class="menu-price">${formatRupiah(item.harga)}</span>
                            <button class="btn-add-cart" data-id="${item.id}">+ Tambah</button>
                        </div>
                    </div>
                `;

                // Event Listener langsung pada tombol + Tambah
                const btnTambah = card.querySelector(".btn-add-cart");
                btnTambah.addEventListener("click", () => {
                    tambahKeKeranjang(item.id);
                });

                menuGrid.appendChild(card);
            });
        }

        // 6. FILTER MENU LEWAT TOMBOL
        filterBtns.forEach(button => {
            button.addEventListener("click", () => {
                filterBtns.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const kategori = button.getAttribute("data-category");
                renderMenu(kategori);
            });
        });

        // 7. TAMBAH KE KERANJANG
        function tambahKeKeranjang(id) {
            const produk = daftarMenu.find(item => item.id === id);
            if (!produk) return;

            const adaItem = keranjang.find(item => item.id === id);
            if (adaItem) {
                adaItem.qty += 1;
            } else {
                keranjang.push({
                    id: produk.id,
                    nama: produk.nama,
                    harga: produk.harga,
                    qty: 1
                });
            }

            updateKeranjangDOM();

            // Animasi kecil di tombol keranjang
            btnKeranjangNav.style.transform = "scale(1.15)";
            setTimeout(() => {
                btnKeranjangNav.style.transform = "scale(1)";
            }, 150);
        }

        // 8. UBAH JUMLAH (+ / -)
        function ubahQty(id, delta) {
            const item = keranjang.find(i => i.id === id);
            if (!item) return;

            item.qty += delta;
            if (item.qty <= 0) {
                keranjang = keranjang.filter(i => i.id !== id);
            }

            updateKeranjangDOM();
        }

        // 9. UPDATE TAMPILAN KERANJANG (DOM)
        function updateKeranjangDOM() {
            let totalItem = 0;
            let totalHarga = 0;

            keranjang.forEach(item => {
                totalItem += item.qty;
                totalHarga += item.harga * item.qty;
            });

            // Update badge dan total harga
            cartCountBadge.textContent = totalItem;
            cartTotalPrice.textContent = formatRupiah(totalHarga);

            // Update isi daftar keranjang
            if (keranjang.length === 0) {
                cartItemsContainer.innerHTML = '<p class="empty-cart-text">Keranjang kamu masih kosong nih. Yuk pilih menu dulu!</p>';
                return;
            }

            cartItemsContainer.innerHTML = "";

            keranjang.forEach(item => {
                const itemRow = document.createElement("div");
                itemRow.className = "cart-item";

                itemRow.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.nama}</h4>
                        <span>${formatRupiah(item.harga)} x ${item.qty} = <strong>${formatRupiah(item.harga * item.qty)}</strong></span>
                    </div>
                    <div class="cart-item-controls">
                        <button class="qty-btn btn-minus">-</button>
                        <span class="item-qty">${item.qty}</span>
                        <button class="qty-btn btn-plus">+</button>
                    </div>
                `;

                // Event listener tombol minus & plus
                itemRow.querySelector(".btn-minus").addEventListener("click", () => ubahQty(item.id, -1));
                itemRow.querySelector(".btn-plus").addEventListener("click", () => ubahQty(item.id, 1));

                cartItemsContainer.appendChild(itemRow);
            });
        }

        // 10. BUKA & TUTUP MODAL
        btnKeranjangNav.addEventListener("click", () => cartModal.classList.add("active"));
        btnCloseCart.addEventListener("click", () => cartModal.classList.remove("active"));

        window.addEventListener("click", (e) => {
            if (e.target === cartModal) cartModal.classList.remove("active");
            if (e.target === orderModal) orderModal.classList.remove("active");
        });

        // 11. KOSONGKAN KERANJANG
        btnClearCart.addEventListener("click", () => {
            if (keranjang.length === 0) return;
            if (confirm("Kosongkan semua pesanan di keranjang?")) {
                keranjang = [];
                updateKeranjangDOM();
            }
        });

        // 12. CHECKOUT / PESAN
        btnCheckout.addEventListener("click", () => {
            if (keranjang.length === 0) {
                alert("Keranjang masih kosong! Silakan pilih menu dulu.");
                return;
            }

            let receiptHTML = "<strong>Daftar Pesanan:</strong><ul style='margin-top: 5px; padding-left: 18px;'>";
            let totalBayar = 0;

            keranjang.forEach(item => {
                const subtotal = item.harga * item.qty;
                totalBayar += subtotal;
                receiptHTML += `<li>${item.nama} (${item.qty}x) - ${formatRupiah(subtotal)}</li>`;
            });

            receiptHTML += `</ul><p style='margin-top: 8px; font-weight: bold;'>Total: ${formatRupiah(totalBayar)}</p>`;
            orderReceipt.innerHTML = receiptHTML;

            cartModal.classList.remove("active");
            orderModal.classList.add("active");

            keranjang = [];
            updateKeranjangDOM();
        });

        btnCloseOrder.addEventListener("click", () => orderModal.classList.remove("active"));

        // 13. FITUR SARAN PENGUNJUNG
        btnKirimSaran.addEventListener("click", () => {
            const pesan = feedbackInput.value.trim();

            if (pesan === "") {
                feedbackResult.style.color = "#c93b2b";
                feedbackResult.textContent = "Silakan tuliskan ide menu kamu dulu ya!";
                return;
            }

            feedbackResult.style.color = "#2b8a3e";
            feedbackResult.textContent = `Terima kasih! Ide "${pesan}" dicatat barista kami ✨`;
            feedbackInput.value = "";

            setTimeout(() => {
                feedbackResult.textContent = "";
            }, 3500);
        });

        // 14. INISIALISASI
        document.addEventListener("DOMContentLoaded", () => {
            renderMenu("semua");
            updateKeranjangDOM();
        });
