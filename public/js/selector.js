document.querySelectorAll('.nav-pills .nav-item a').forEach((tab) => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Mengambil kategori dari tombol yang diklik
        const category = tab.innerText.trim();
        
        // Menggunakan AJAX untuk mengambil data berdasarkan kategori
        fetch(`/data?category=${encodeURIComponent(category)}`)
            .then(response => response.json())
            .then(data => {
                console.log('Data untuk kategori yang dipilih:', data);
                
                // Menampilkan data di DOM
                const contentContainer = document.querySelector('.tab-content');
                contentContainer.innerHTML = ''; // Kosongkan konten lama

                // Render data baru
                data.forEach(campaign => {
                    const campaignElement = document.createElement('div');
                    campaignElement.className = 'col-lg-4 col-md-6 wow fadeInUp';
                    campaignElement.innerHTML = `
                        <div class="property-item rounded overflow-hidden">
                            <div class="position-relative overflow-hidden">
                                <a href=""><img class="img-fluid" src="${campaign.image}" alt="${campaign.title}"></a>
                                <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">${campaign.category}</div>
                                <div class="bg-white rounded-top position-absolute start-0 bottom-0 mx-4 pt-1 px-3">${campaign.location}</div>
                            </div>
                            <div class="p-4 pb-0">
                                <h5 class="mb-3" style="color: #FF3131;">${campaign.target}</h5>
                                <a class="d-block h5 mb-2" href="">${campaign.title}</a>
                                <p><i class="fa fa-map-marker-alt me-2" style="color: #FF3131;"></i>${campaign.location}</p>
                            </div>
                        </div>
                    `;
                    contentContainer.appendChild(campaignElement);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    });
});
