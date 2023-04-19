import screenfull from "screenfull";
import * as bootstrap from "bootstrap";

Metis.collapseCard = () => {
    const triggers = document.querySelectorAll(".card .card-collapse-toggle");
    [...triggers].map((trigger) => {
        const cardBody = trigger.closest(".card").querySelector(".card-body");
        const i = trigger.querySelector("i.bi.bi-dash-lg");
        if (cardBody) {
            const collapseCard = new bootstrap.Collapse(cardBody);
            trigger.addEventListener("click", (e) => {
                e.preventDefault();
                collapseCard.toggle();
            });

            if (i) {
                cardBody.addEventListener("shown.bs.collapse", () => {
                    i.classList.remove("bi-plus-lg");
                    i.classList.add("bi-dash-lg");
                });
                cardBody.addEventListener("hidden.bs.collapse", () => {
                    i.classList.remove("bi-dash-lg");
                    i.classList.add("bi-plus-lg");
                });
            }
        }
    });
};

Metis.hideCard = () => {
    const closeButton = document.querySelectorAll(".card button.btn-close");
    [...closeButton].map((cb) => {
        const card = cb.closest(".card");
        if (card) {
            cb.addEventListener("click", (e) => {
                e.preventDefault();
                card.setAttribute("hidden", "true");
            });
        }
    });
};

Metis.fullCard = () => {
    if (!screenfull.isEnabled) {
        return false;
    }
    const triggers = document.querySelectorAll(".card .card-fs-toggle");
    [...triggers].map((trigger) => {
        const i = trigger.querySelector("i.bi-fullscreen");
        trigger.addEventListener("click", () => {
            screenfull.toggle(trigger.closest(".card"));
            i?.classList.toggle("bi-fullscreen");
            i?.classList.toggle("bi-fullscreen-exit");
        });
    });
};
