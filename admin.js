/* admin.js */

const ADMIN_PASSWORD = "123";
let currentOrderTab = "الكل";

function money(value) {
    const val = Number(value);
    if (isNaN(val)) return "0 د.ع";
    return val.toLocaleString("ar-IQ") + " د.ع";
}

function showToast(message) {
    const toast = document.getElementById("toast-notification");
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function checkAdmin() {
    const authenticated = sessionStorage.getItem("aldoctor_admin_auth");

    if (authenticated === "true") {
        initAdminDashboard();
        return;
    }

    const authModal = document.getElementById("auth-modal");
    if (authModal) {
        authModal.classList.add("open");
        setTimeout(() => {
            const input = document.getElementById("admin-pass-input");
            if (input) input.focus();
        }, 100);
    }
}

function handleAdminLogin(e) {
    e.preventDefault();
    const passInput = document.getElementById("admin-pass-input").value;
    const errorMsg = document.getElementById("auth-error-msg");

    if (passInput === ADMIN_PASSWORD) {
        sessionStorage.setItem("aldoctor_admin_auth", "true");
        document.getElementById("auth-modal").classList.remove("open");
        initAdminDashboard();
        showToast("تم تسجيل الدخول بنجاح.");
    } else {
        errorMsg.innerText = "كلمة المرور غير صحيحة، يرجى المحاولة مجدداً.";
    }
}

function cancelAdminLogin() {
    window.location.href = "index.html";
}

function initAdminDashboard() {
    renderAdminProducts();
    renderOrders();
    updateStats();
}

function getProducts() {
    return JSON.parse(
        localStorage.getItem("aldoctor_products") || "[]"
    );
}

function saveProducts(products) {
    localStorage.setItem("aldoctor_products", JSON.stringify(products));
}

function renderAdminProducts() {
    const container = document.getElementById("admin-products");
    const searchInput = document.getElementById("admin-search");
    if (!container || !searchInput) return;

    const search = searchInput.value.toLowerCase();
    const products = getProducts().filter(p => p.title.toLowerCase().includes(search));

    container.innerHTML = "";

    if (!products.length) {
        container.innerHTML = "<p>لا توجد منتجات.</p>";
        return;
    }

    products.forEach(product => {
        container.innerHTML += `
            <div class="admin-product">
                <img src="${product.image}">
                <div class="admin-product-body">
                    <h3>${product.title}</h3>
                    <p>النوع: ${product.type}</p>
                    <p>السعر: <b>${money(product.price)}</b></p>
                    <p>المخزون: ${product.stock || 0}</p>
                    <p>القياسات: ${(product.sizes || []).join(", ")}</p>
                    <div class="admin-actions">
                        <button class="edit-btn" onclick="editProduct(${product.id})">✏️ تعديل</button>
                        <button class="delete-btn" onclick="deleteProduct(${product.id})">🗑️ حذف</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function editProduct(id) {
    const product = getProducts().find(p => p.id === id);
    if (!product) return;

    document.getElementById("edit-id").value = product.id;
    document.getElementById("product-title").value = product.title;
    document.getElementById("product-type").value = product.type;
    document.getElementById("product-price").value = product.price;
    document.getElementById("product-old-price").value = product.oldPrice || "";
    document.getElementById("product-color").value = product.color || "";
    document.getElementById("product-cut").value = product.cut || "";
    document.getElementById("product-drop").value = product.drop || "";
    document.getElementById("product-stock").value = product.stock || 0;
    document.getElementById("product-sizes").value = (product.sizes || []).join(",");
    document.getElementById("product-image").value = product.image;
    document.getElementById("product-badge").value = product.badge || "";
    document.getElementById("product-description").value = product.description || "";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteProduct(id) {
    if (!confirm("هل تريد حذف المنتج؟")) return;

    let products = getProducts();
    products = products.filter(p => p.id !== id);

    saveProducts(products);
    renderAdminProducts();
    updateStats();
}

function resetForm() {
    document.getElementById("product-form").reset();
    document.getElementById("edit-id").value = "";
}

document.getElementById("product-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const editId = document.getElementById("edit-id").value;

    const product = {
        id: editId ? Number(editId) : Date.now(),
        title: document.getElementById("product-title").value,
        type: document.getElementById("product-type").value,
        price: Number(document.getElementById("product-price").value),
        oldPrice: Number(document.getElementById("product-old-price").value) || 0,
        color: document.getElementById("product-color").value,
        cut: document.getElementById("product-cut").value,
        drop: document.getElementById("product-drop").value,
        stock: Number(document.getElementById("product-stock").value),
        sizes: document.getElementById("product-sizes").value.split(",").map(x => x.trim()).filter(Boolean),
        image: document.getElementById("product-image").value,
        badge: document.getElementById("product-badge").value,
        description: document.getElementById("product-description").value
    };

    let products = getProducts();

    if (editId) {
        products = products.map(p => p.id === Number(editId) ? product : p);
    } else {
        products.push(product);
    }

    saveProducts(products);
    showToast(editId ? "تم تعديل المنتج بنجاح." : "تمت إضافة المنتج بنجاح.");
    resetForm();
    renderAdminProducts();
    updateStats();
});

function getOrders() {
    return JSON.parse(
        localStorage.getItem("aldoctor_orders") || "[]"
    );
}

function switchOrderTab(tab, btnElement) {
    currentOrderTab = tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    renderOrders();
}

function renderOrders(customOrders = null) {
    const container = document.getElementById("orders-container");
    if (!container) return;

    let orders = customOrders;
    
    if (!orders) {
        orders = getOrders();
        
        // تصفية حسب التاب النشط إذا لم يكن "الكل"
        if (currentOrderTab !== "الكل") {
            orders = orders.filter(o => {
                const st = o.status || "جديد";
                return st === currentOrderTab;
            });
        }

        // تطبيق البحث النصي بدقة عالية
        const searchInputElem = document.getElementById("order-search-input");
        if (searchInputElem && searchInputElem.value.trim() !== "") {
            const searchVal = searchInputElem.value.trim().toLowerCase();
            
            orders = orders.filter(order => {
                const orderIdStr = String(order.id).toLowerCase();
                const customerName = (order.customerName || order.name || "").toLowerCase();
                const phone = String(order.phone || "").toLowerCase();
                return orderIdStr.includes(searchVal) || customerName.includes(searchVal) || phone.includes(searchVal);
            });

            // إعطاء أولوية مطلقة للطلب المطابق تماماً للـ ID ليظهر في الصدارة
            orders.sort((a, b) => {
                const aExact = String(a.id).toLowerCase() === searchVal ? 1 : 0;
                const bExact = String(b.id).toLowerCase() === searchVal ? 1 : 0;
                return bExact - aExact;
            });
        }
    }

    container.innerHTML = "";

    if (!orders.length) {
        container.innerHTML = "<p>لا توجد طلبات تطابق بحثك أو في هذا القسم حالياً.</p>";
        return;
    }

    const searchInputElem = document.getElementById("order-search-input");
    const isSearching = searchInputElem && searchInputElem.value.trim() !== "";
    const finalOrdersToDisplay = isSearching ? orders : [...orders].reverse();

    finalOrdersToDisplay.forEach(order => {
        const items = (order.items || []).map(item =>
            `<div>${item.title || item.name || 'منتج'} × ${item.quantity || 1} — ${money((item.price || 0) * (item.quantity || 1))}</div>`
        ).join("");

        const currentStatus = order.status || "جديد";

        container.innerHTML += `
            <div class="order">
                <div class="order-header">
                    <strong>طلب #${order.id}</strong>
                    <span>${order.date || ''}</span>
                </div>

                <div class="order-info">
                    <div>👤 <b>الزبون:</b> ${order.customerName || order.name || 'غير محدد'}</div>
                    <div>📞 <b>الهاتف:</b> <a href="tel:${order.phone || ''}">${order.phone || 'غير محدد'}</a></div>
                    <div>📍 <b>العنوان:</b> ${order.address || 'غير محدد'}</div>
                    <div>💳 <b>الدفع:</b> ${order.payment || order.paymentMethod || 'الدفع عند الاستلام'}</div>
                </div>

                <div class="order-items">
                    <b>المنتجات:</b>
                    ${items || 'لا توجد عناصر'}
                </div>

                ${order.notes ? `<div class="order-notes"><b>ملاحظات التعديل:</b> ${order.notes}</div>` : ''}

                <div class="order-controls">
                    <label>حالة الطلب:</label>
                    <select id="status-select-${order.id}" class="status-select">
                        ${[
                            "جديد",
                            "توصيل واستلام",
                            "التجهيز والموافقة",
                            "تسليم لشركة التوصيل",
                            "بيع داخل المتجر",
                            "الملغي"
                        ].map(status =>
                            `<option value="${status}" ${status === currentStatus ? "selected" : ""}>${status}</option>`
                        ).join("")}
                    </select>

                    <button type="button" class="save-status-btn" onclick="applyOrderStatus('${order.id}')">🔄 تحويل الحالة</button>
                    <button type="button" class="edit-order-btn" onclick="editOrderDetails('${order.id}')">✏️ تعديل الطلب</button>
                    <button type="button" class="delete-order-btn" onclick="deleteSingleOrder('${order.id}')">🗑️ حذف الطلب</button>
                </div>

                <div class="order-total">
                    <span>الإجمالي</span>
                    <b>${money(order.total)}</b>
                </div>
            </div>
        `;
    });
}

function applyOrderStatus(id) {
    const selectElem = document.getElementById(`status-select-${id}`);
    if (!selectElem) return;

    const newStatus = selectElem.value;
    let orders = getOrders();

    orders = orders.map(order => String(order.id) === String(id) ? { ...order, status: newStatus } : order);

    localStorage.setItem("aldoctor_orders", JSON.stringify(orders));
    showToast(`تم تحويل حالة الطلب إلى: ${newStatus}`);
    renderOrders();
    updateStats();
}

function editOrderDetails(id) {
    const orders = getOrders();
    const order = orders.find(o => String(o.id) === String(id));
    if (!order) return;

    document.getElementById("modal-order-id").value = order.id;
    document.getElementById("modal-order-title").innerText = `✏️ تعديل طلب #${order.id}`;
    document.getElementById("modal-customer-name").value = order.customerName || order.name || "";
    document.getElementById("modal-phone").value = order.phone || "";
    document.getElementById("modal-address").value = order.address || "";
    document.getElementById("modal-total").value = order.total || 0;
    document.getElementById("modal-notes").value = order.notes || "";

    document.getElementById("edit-order-modal").classList.add("open");
}

function closeOrderModal() {
    document.getElementById("edit-order-modal").classList.remove("open");
}

function saveModalOrder(e) {
    e.preventDefault();

    const id = document.getElementById("modal-order-id").value;
    let orders = getOrders();

    orders = orders.map(o => {
        if (String(o.id) === String(id)) {
            return {
                ...o,
                customerName: document.getElementById("modal-customer-name").value,
                name: document.getElementById("modal-customer-name").value,
                phone: document.getElementById("modal-phone").value,
                address: document.getElementById("modal-address").value,
                total: Number(document.getElementById("modal-total").value),
                notes: document.getElementById("modal-notes").value
            };
        }
        return o;
    });

    localStorage.setItem("aldoctor_orders", JSON.stringify(orders));
    closeOrderModal();
    showToast("تم تعديل الطلب بنجاح.");
    renderOrders();
    updateStats();
}

let orderIdToDelete = null;

function deleteSingleOrder(id) {
    orderIdToDelete = id;
    const titleElem = document.getElementById("delete-modal-title");
    const textElem = document.getElementById("delete-modal-text");
    const modal = document.getElementById("delete-order-modal");

    if (titleElem && textElem && modal) {
        textElem.innerText = `هل أنت متأكد من حذف الطلب #${id}؟`;
        modal.classList.add("open");
    }
}

function closeDeleteOrderModal() {
    const modal = document.getElementById("delete-order-modal");
    if (modal) {
        modal.classList.remove("open");
    }
    orderIdToDelete = null;
}

// ربط الحدث داخل DOMContentLoaded لضمان وجود الزر وتفعيله بشكل صحيح
document.addEventListener("DOMContentLoaded", () => {
    checkAdmin();

    const confirmDeleteBtn = document.getElementById("confirm-delete-order-btn");
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener("click", function() {
            if (!orderIdToDelete) return;

            let orders = getOrders();
            orders = orders.filter(o => String(o.id) !== String(orderIdToDelete));

            localStorage.setItem("aldoctor_orders", JSON.stringify(orders));
            showToast(`تم حذف الطلب #${orderIdToDelete} بنجاح.`);
            closeDeleteOrderModal();
            renderOrders();
            updateStats();
        });
    }
});

function updateStats() {
    const products = getProducts();
    const orders = getOrders();

    const sales = orders
        .filter(o => o.status !== "الملغي" && o.status !== "ملغي")
        .reduce((sum, o) => sum + Number(o.total || 0), 0);

    const newOrders = orders.filter(o => o.status === "جديد" || !o.status).length;

    const statProducts = document.getElementById("stat-products");
    const statOrders = document.getElementById("stat-orders");
    const statSales = document.getElementById("stat-sales");
    const statNew = document.getElementById("stat-new");

    if (statProducts) statProducts.innerText = products.length;
    if (statOrders) statOrders.innerText = orders.length;
    if (statSales) statSales.innerText = money(sales);
    if (statNew) statNew.innerText = newOrders;
}

function searchOrders() {
    renderOrders();
}
// تحويل ملف الصورة المرفوع إلى Base64 عند اختياره
document.addEventListener("DOMContentLoaded", () => {
    const imageFileInput = document.getElementById("product-image-file");
    if (imageFileInput) {
        imageFileInput.addEventListener("change", function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    // وضع كود الصورة الناتج في حقل الصورة المخفي لتخزينه مع بيانات المنتج
                    document.getElementById("product-image").value = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});