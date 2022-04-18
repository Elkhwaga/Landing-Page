/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const moveToTop 	= document.getElementById("top");
const addNewSection = document.getElementById("add");
const navTag 		= document.querySelector("nav");
const toggle 		= document.getElementById("toggle");
const navbarList 	= document.getElementById("navbar__list");
const header 		= document.querySelector(".page__header");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// class sections
class sections {
	counter = 0;
	// return content
	createSection = () =>
		`<section id="section${this.counter}" data-nav="Section ${this.counter}">
		<div class="landing__container">
			<h2>Section ${this.counter}</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
					fermentum metus faucibus lectus pharetra dapibus. Suspendisse
					potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget
					lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed
					convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla
					eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam
					nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis
					lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a
					tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus
					vitae elit. Integer nec libero venenatis libero ultricies molestie
					semper in tellus. Sed congue et odio sed euismod.
				</p>

				<p>
					Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar
					gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam.
					Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum
					consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget
					elementum tortor mollis non.
				</p>
			</div>
		</div>
	</section>`;
	// Bulid Sections
	addSection = () => {
		this.counter++;
		document
			.querySelector("main")
			.insertAdjacentHTML("beforeend", this.createSection());
	};
}
const allSection = new sections();

// creating more sections by click on the button
addNewSection.addEventListener("click", () => {
	allSection.addSection();
	navbarListItem.menu();
});

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
class navbar {
	// Build menu
	menu() {
		let fragment = document.createDocumentFragment()
		let item = document.createElement('li');
		document.querySelectorAll("section").forEach((el) => {
			item.innerHTML = `<a data-nav="${el.id}" class="menu__link">${el.dataset.nav}</a>`;
			fragment .appendChild(item);
		});
		navbarList.appendChild(fragment);
		this.scrollToSection();
	}
	// Scroll to section on link click
	// Scroll to anchor ID using scrollTO event
	scrollToSection() {
		navbarList.addEventListener("click", (e) => {
			e.preventDefault();
			if (e.target.dataset.nav) {
				document.getElementById(`${e.target.dataset.nav}`).scrollIntoView({
					behavior: "smooth",
					block: "end",
				});
			}
		}, 300);
	}
}
const navbarListItem = new navbar();

// Add class 'active' to section when near top of viewport
// Set sections as active
window.addEventListener("scroll", function () {
	document.querySelectorAll("section").forEach((section) => {
		const sectionTitle = section.getAttribute("data-nav");
		const sectionTop = section.getBoundingClientRect().top;
		const links = document.querySelectorAll("a");
		// Add a class active on hover of the element in the viewport
		if (sectionTop >= 0 && sectionTop <= 250) {
			section.classList.add("your-active-class");
			links.forEach((link) => {
				if (link.textContent === sectionTitle) {
					link.classList.add("active-link");
				} else {
					link.classList.remove("active-link");
				}
			});
		} else {
			section.classList.remove("your-active-class");
		}
	});
});
/**
 * End Main Functions
 * Begin Events
 *
 */
// Toggle Menu
// Add class active (menu)
toggle.addEventListener("click", () => {
	toggle.classList.toggle("active");
	navTag.classList.toggle("active");
});

// remove class active (Toggle Menu)
document.addEventListener("click", (event) => {
	if (
		event.target !== "header" &&
		event.target.id !== "toggle" &&
		event.target.id !== "navbar"
	) {
		toggle.classList.remove("active");
		navTag.classList.remove("active");
	}
});

// Hide the menu when scroll down and appear when scroll up
let y = window.scrollY;
window.addEventListener("scroll", () => {
	if (y < window.scrollY) {
		header.classList.add("header__hidden");
	} else {
		header.classList.remove("header__hidden");
	}
	y = window.scrollY;
});

// fadein button move to top
window.addEventListener('scroll', function () {
	if (
		document.body.scrollTop > 150 ||
		document.documentElement.scrollTop > 150
	) {
		moveToTop.style.display = "block";
	} else {
		moveToTop.style.display = "none";
	}
})

// When the user clicks on the button, scroll to the top of the document
moveToTop.addEventListener('click', function () {
	document.body.scrollTo({
		top: 0,
		behavior: "smooth",
	});
	document.documentElement.scrollTo({
		top: 0,
		behavior: "smooth",
	});
})

// creating more sections after loded the page
window.onload = () => {
	for (let i = 1; i < 5; i++) {
		allSection.addSection();
		navbarListItem.menu();
	}
};