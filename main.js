
document.getElementById("inputBook").addEventListener("submit", function (e) {
   
    const judul = document.getElementById("inputBookTitle").value;
    const penulis = document.getElementById("inputBookAuthor").value;
    const tahun = parseInt(document.getElementById("inputBookYear").value);

    const seleseDibaca = document.getElementById("inputBookIsComplete");
 


    const timestamp = Math.floor(new Date().getTime()) * 1000;
    const random = Math.floor(Math.random() * 1000000);
    const id = `${timestamp}${random}`;

    let buku = {}; 

    if (seleseDibaca.checked) {
        buku.id = id;
        buku.title = judul;
        buku.author = penulis;
        buku.year = tahun;
        buku.isComplete = true;
    } else {
        buku.id = id;
        buku.title = judul;
        buku.author = penulis;
        buku.year = tahun;
        buku.isComplete = false;
    }

    const bukuJSON = JSON.stringify(buku);
 
    if (localStorage.getItem("list-buku") == null) {
        let list_buku = [];
        list_buku.push(bukuJSON);
        localStorage.setItem("list-buku", JSON.stringify(list_buku));

   
    } else {
        let list_buku = JSON.parse(localStorage.getItem("list-buku"));
        list_buku.push(bukuJSON);
        localStorage.removeItem("list-buku");
        localStorage.setItem("list-buku", JSON.stringify(list_buku));
    }
});

const rakIncomplete = document.getElementById("incompleteBookshelfList");
const rakComplete = document.getElementById("completeBookshelfList");


document.getElementById("searchBook").addEventListener("submit", function (e) {
    e.preventDefault();

    const inputCari = document.getElementById("searchBookTitle").value.toLowerCase(); 
    const list_buku = JSON.parse(localStorage.getItem("list-buku"));


    rakComplete.innerHTML = "";
    rakIncomplete.innerHTML = "";

    let bukuDitemukan = false;

    list_buku.forEach(buku => {
        const bookData = JSON.parse(buku);

        if (bookData.title.toLowerCase() == inputCari && bookData.isComplete == true) {
            bukuDitemukan = true;

            rakComplete.innerHTML += `
                <article class="book_item">
                    <h3>${bookData.title}</h3>
                    <p>Penulis: ${bookData.author}</p>
                    <p>Tahun: ${bookData.year}</p>
                    <div class="action">
                        <button class="green" data-id="${bookData.id}">Belum Selesai dibaca</button>
                        <button class="red" data-id="${bookData.id}">Hapus buku</button>
                    </div>
                </article>`;
        } else if (bookData.title.toLowerCase() == inputCari && bookData.isComplete == false) {
            bukuDitemukan = true;

            rakIncomplete.innerHTML += `
                <article class="book_item">
                    <h3>${bookData.title}</h3>
                    <p>Penulis: ${bookData.author}</p>
                    <p>Tahun: ${bookData.year}</p>
                    <div class="action">
                        <button class="green" data-id="${bookData.id}">Selesai dibaca</button>
                        <button class="red" data-id="${bookData.id}">Hapus buku</button>
                    </div>
                </article>`;
        }
    });


    if (!bukuDitemukan) {
        alert("Buku tidak ditemukan");
    }
});


function renderRak() {
    const list_buku = JSON.parse(localStorage.getItem("list-buku"));

    if (localStorage.getItem("list-buku")) {

        rakComplete.innerHTML = "";
        rakIncomplete.innerHTML = "";

        list_buku.forEach(buku => {
            const bookData = JSON.parse(buku);

            if (bookData.isComplete == true) {
                rakComplete.innerHTML += `
                    <article class="book_item">
                    <h3>${bookData.title}</h3>
                    <p>Penulis: ${bookData.author}</p>
                    <p>Tahun: ${bookData.year}</p>
                        <div class="action">
                            <button class="green" data-id="${bookData.id}">Belum Selesai dibaca</button>
                            <button class="red" data-id="${bookData.id}">Hapus buku</button>
                        </div>
                    </article>`;
            } else if (bookData.isComplete == false) {
                rakIncomplete.innerHTML += `
                    <article class="book_item">
                    <h3>${bookData.title}</h3>
                    <p>Penulis: ${bookData.author}</p>
                    <p>Tahun: ${bookData.year}</p>
                        <div class="action">
                            <button class="green" data-id="${bookData.id}">Selesai dibaca</button>
                            <button class="red" data-id="${bookData.id}">Hapus buku</button>
                        </div>
                    </article>`;
            }
        });
    }
}

renderRak();

rakComplete.addEventListener('click', function (e) {
    const book_id = e.target.dataset.id;

    if (e.target.innerText === "Belum Selesai dibaca") {
     
        let list_buku = JSON.parse(localStorage.getItem("list-buku"));

     
        const bookIndex = list_buku.findIndex(buku => {
            const bookData = JSON.parse(buku);
            return bookData.id === book_id;
        });

        if (bookIndex !== -1) {
      
            const bookData = JSON.parse(list_buku[bookIndex]);
            bookData.isComplete = false;

      
            list_buku[bookIndex] = JSON.stringify(bookData);

         
            localStorage.removeItem("list-buku");
            localStorage.setItem("list-buku", JSON.stringify(list_buku));

  
            rakComplete.innerHTML = "";
            rakIncomplete.innerHTML = "";
            renderRak();
        }
    } else if (e.target.innerText === "Hapus buku") {
        let list_buku = JSON.parse(localStorage.getItem("list-buku"));

    
        const bookIndex = list_buku.findIndex(buku => {
            const bookData = JSON.parse(buku);
            return bookData.id === book_id;
        });

        if (bookIndex !== -1) {
       
            list_buku.splice(bookIndex, 1);

         
            localStorage.removeItem("list-buku");
            localStorage.setItem("list-buku", JSON.stringify(list_buku));

      
            rakComplete.innerHTML = "";
            rakIncomplete.innerHTML = "";
            renderRak();
        }
    }
});

rakIncomplete.addEventListener('click', function (e) {
    const book_id = e.target.dataset.id;

    if (e.target.innerText === "Selesai dibaca") {
     
        let list_buku = JSON.parse(localStorage.getItem("list-buku")) || [];

  
        const bookIndex = list_buku.findIndex(buku => {
            const bookData = JSON.parse(buku);
            return bookData.id === book_id;
        });

        if (bookIndex !== -1) {
         
            const bookData = JSON.parse(list_buku[bookIndex]);
            bookData.isComplete = true;

       
            list_buku[bookIndex] = JSON.stringify(bookData);

       
            localStorage.removeItem("list-buku");
            localStorage.setItem("list-buku", JSON.stringify(list_buku));

         
            rakComplete.innerHTML = "";
            rakIncomplete.innerHTML = "";
            renderRak();
        }
    } else if (e.target.innerText === "Hapus buku") {
        let list_buku = JSON.parse(localStorage.getItem("list-buku"));


        const bookIndex = list_buku.findIndex(buku => {
            const bookData = JSON.parse(buku);
            return bookData.id === book_id;
        });

        if (bookIndex !== -1) {
         
            list_buku.splice(bookIndex, 1);

          
            localStorage.removeItem("list-buku");
            localStorage.setItem("list-buku", JSON.stringify(list_buku));

     
            rakComplete.innerHTML = "";
            rakIncomplete.innerHTML = "";
            renderRak();
        }
    }
});
