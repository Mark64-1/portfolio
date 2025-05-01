
// JS 파일에 아래 스크립트 추가
fetch("assets/js/custom/skills.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("skills-container");

    data.skills.forEach((skillCategory) => {
      const row = document.createElement("div");
      row.classList.add("row");

      const section = document.createElement("section");
      section.classList.add("widget", "links", "skills");

      const h3 = document.createElement("h3");
      h3.textContent = skillCategory.skill_category;

      const ul = document.createElement("ul");
      ul.classList.add("style2");

      skillCategory.items.forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("skill-item"); // 기존 스타일을 적용할 수 있도록 클래스 추가

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        img.classList.add("skill-img"); // 이미지에 추가 스타일 클래스 적용

        li.appendChild(img);
        li.setAttribute("data-title", item.name); // 설명을 데이터 속성으로 저장
        li.setAttribute("data-description", item.description); // 설명을 데이터 속성으로 저장
        li.setAttribute("data-detail", item.detail); // 설명을 데이터 속성으로 저장
        li.setAttribute("data-image", item.image); // 설명을 데이터 속성으로 저장

        ul.appendChild(li);
      });

      section.appendChild(h3);
      section.appendChild(ul);
      row.appendChild(section);
      container.appendChild(row);

        // 각 항목 클릭 시 팝업을 띄울 이벤트 리스너 추가
        
        /*
        잠시 비활성화
      const items = row.querySelectorAll("li");
      items.forEach((item) => {
        item.addEventListener("click", () => {
            const project = {
              title: item.getAttribute("data-title"),
              description: item.getAttribute("data-description"),
              image: item.getAttribute("data-image"),
              detail: item.getAttribute("data-detail"),
            };
          showPopup(project);
        });
      });
        
        */
    });
  })
  .catch((error) => console.error("Error loading the JSON file:", error));

let tabContents;

// fetch("project.json")
fetch("assets/js/custom/project.json")
  .then((response) => response.json())
  .then((data) => {
    // 초기화 및 첫 번째 탭의 프로젝트 표시
    tabContents = data.tab_contents;
    displayProjects(0);
  })
  .catch((error) => {
    console.error("JSON 파일을 가져오는 데 문제가 발생했습니다.", error);
  });

// 탭에 해당하는 프로젝트를 동적으로 표시하는 함수
function displayProjects(tabIndex) {
    const selectedTab = tabContents[tabIndex]; // 해당 탭의 데이터 선택
    $(".tab_contents" + tabIndex + " .col-12-medium").remove(); //해당 탭의 데이터 삭제
  selectedTab.projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("col-4", "col-12-medium"); // 필요한 클래스 추가

    // 작은 이미지 HTML 생성
      let subImagesHTML;

    if (Array.isArray(project.image)) {
      subImagesHTML = project.image
        .map((src) => `<img src="${src}" alt="sub image" />`)
        .join("");
    } else {
      subImagesHTML = `<img src="${project.image}" alt="sub image" />`;
    }

    projectCard.innerHTML = `
      <section class="box feature project_item"
        data-title="${project.title}"
        data-detail="${project.detail.join("")}"
        data-image="${project.image}"
        data-tech_stack="${project.tech_stack}"
        data-detail="${project.detail}"
      >
        <a class="image featured">
          ${subImagesHTML}
        </a>
        <div class="inner">
          <header>
            <h2>${project.title}</h2>
            <p>${project.tech_stack.join(", ")}</p>
          </header>
          <p>${project.description}</p>
        </div>
      </section>
    `;
    
      $(".tab_contents" + tabIndex).append(projectCard);
      

      document.querySelectorAll(".project_item").forEach((el) => {
        el.addEventListener("click", () => {
            const project = {
              title: el.dataset.title,
              description: el.dataset.description,
              detail: el.dataset.detail,
              image: el.dataset.image,
              tech_stack: el.dataset.tech_stack,
              detail: el.dataset.detail,
            };

          showPopup(project);

        });
      });
  });
}



// 팝업을 띄우는 함수
function showPopup(project) {
  const title = project.title;
  const description = project.description;
  const detail = project.detail;
  const image = project.image;
  const techStack = project.tech_stack;
  document.getElementById("popup-title").innerText = title;
    document.getElementById("popup-description").innerHTML = detail;
//   document.getElementById("popup-image").src = image;
  document.getElementById("popup-tech-stack").innerText =
    "Tech Stack: " + techStack;

  document.getElementById("project-popup").style.display = "flex"; // 팝업 표시
  document.body.style.overflow = "hidden"; // 스크롤 막기
}

// 팝업을 닫는 함수

document.getElementById("project-popup").addEventListener("click", (e) => {
    e.stopPropagation(); // 팝업 내용 클릭은 이벤트 전파 막기
  const content = document.querySelector(".popup-content");
  if (!content.contains(e.target)) {
    document.getElementById("project-popup").style.display = "none";
    document.body.style.overflow = ""; // 스크롤 다시 가능하게
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.getElementById("project-popup").style.display = "none";
    document.body.style.overflow = ""; // 스크롤 다시 가능하게
  }
});


// 팝업을 닫는 함수
document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("project-popup").style.display = "none"; // 팝업 숨기기
  document.body.style.overflow = ""; // 스크롤 다시 가능하게
});