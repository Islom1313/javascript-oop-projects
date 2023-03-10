function getElement(selection) {
    const element = document.querySelector(selection);
    if (element) {
        return element;
    }
    throw new Error(
        `Please check "${selection}" selector, no related element exists`
    );
}

function Gallery(element) {
    this.container = element;
    this.list = [...element.querySelectorAll(".img")];
    // target function
    this.modal = getElement(".modal");
    this.mainImg = getElement(".main-img");
    this.imageName = getElement(".image-name");
    this.modalImages = getElement(".modal-images");

    this.closeBtn = getElement(".close-btn");
    this.nextBtn = getElement(".next-btn");
    this.prevBtn = getElement(".prev-btn");
    // self ref
    let self = this;
    // bind funtions
    // this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
    this.container.addEventListener(
        "click",
        function(e) {
            // self.openModal();
            if (e.target.classList.contains("img")) {
                this.openModal(e.target, this.list);
            }
        }.bind(this)
    );
}
// Open Modal function
Gallery.prototype.openModal = function(selectedImage, list) {
    this.setMainImage(selectedImage);
    this.modalImages.innerHTML = list
        .map(function(image) {
            return `<img src="${
        image.src
      }" title="${image.title}" data-id="${image.dataset.id}" class="${selectedImage.dataset.id === image.dataset.id ? "modal-img selected" : "modal-img"}"/>`;
        })
        .join("");

    this.modal.classList.add("open");
    this.closeBtn.addEventListener("click", this.closeModal);
    this.nextBtn.addEventListener("click", this.nextImage);
    this.prevBtn.addEventListener("click", this.prevImage);
    this.modalImages.addEventListener("click", this.chooseImage);
};
// setMainImage function
Gallery.prototype.setMainImage = function(selectedImage) {
    this.mainImg.src = selectedImage.src;
    this.imageName.textContent = selectedImage.title;
};
// close Modal function
Gallery.prototype.closeModal = function() {
    this.modal.classList.remove("open");
    this.closeBtn.removeEventListener("click", this.closeModal);
    this.nextBtn.removeEventListener("click", this.nextImage);

    this.prevBtn.removeEventListener("click", this.prevImage);
    this.modalImages.removeEventListener("click", this.chooseImage);
};
// NextImage function
Gallery.prototype.nextImage = function() {
    const selected = this.modalImages.querySelector(".selected");
    const next =
        selected.nextElementSibling || this.modalImages.firstElementChild;
    selected.classList.remove("selected");
    next.classList.add("selected");
    this.setMainImage(next);
};
// PrevImage function
Gallery.prototype.prevImage = function() {
    const selected = this.modalImages.querySelector(".selected");
    const prev =
        selected.previousElementSibling || this.modalImages.lastElementChild;
    selected.classList.remove("selected");
    prev.classList.add("selected");
    this.setMainImage(prev);
};

// Choose Image function
Gallery.prototype.chooseImage = function(e) {
    if (e.target.classList.contains("modal-img")) {
        const selected = this.modalImages.querySelector(".selected");
        selected.classList.remove("selected");

        this.setMainImage(e.target);
        e.target.classList.add("selected");
    }
};
// Get element of classes in HTML
const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));