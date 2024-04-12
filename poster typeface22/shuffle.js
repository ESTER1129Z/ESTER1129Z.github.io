document.addEventListener("DOMContentLoaded", function () {
  // Three arrays of classes to choose from
  const firstSet = ["a", "b", "c"];
  const secondSet = ["x", "y", "z"];
  const thirdSet = ["one", "two", "three"];
  const allSets = firstSet.concat(secondSet, thirdSet); // Combine all sets for easier removal

  // Function to add a combination of random classes to each div
  function addRandomClasses() {
    // Select all divs with class 'random'
    const divs = document.querySelectorAll(".random");

    divs.forEach((div) => {
      // Remove only the classes from the specified sets
      allSets.forEach((cls) => {
        if (div.classList.contains(cls)) {
          div.classList.remove(cls);
        }
      });

      // Generate a random class from each set
      const randomClass1 =
        firstSet[Math.floor(Math.random() * firstSet.length)];
      const randomClass2 =
        secondSet[Math.floor(Math.random() * secondSet.length)];
      const randomClass3 =
        thirdSet[Math.floor(Math.random() * thirdSet.length)];

      // Add the randomly selected classes
      div.classList.add(randomClass1, randomClass2, randomClass3);
    });
  }

  // Set an interval to add a combination of random classes to all matching divs every 2 seconds
  setInterval(addRandomClasses, 2000);

  startHover();
});

function startHover() {
  var links = document.querySelector(".three").getElementsByTagName("a");
  var current = -1; // 初始化current为-1，以便第一次触发时从0开始
  var hoverInterval;

  function removeStyle() {
    if (links[current]) {
      // 确保在试图移除样式前当前链接存在
      links[current].classList.remove("hover-effect");
      links[current].style.backgroundColor = "";
    }
  }

  function triggerHover() {
    removeStyle(); // 无论如何首先移除当前元素的样式

    current = (current + 1) % links.length; // 循环更新current
    void links[current].offsetWidth; // 重置CSS动画
    links[current].classList.add("hover-effect");
    links[current].style.backgroundColor =
      current % 2 === 0 ? "#d1207c" : "#027596"; // 根据元素索引设置背景色
  }

  function startHoverEffect(nextIndex) {
    clearInterval(hoverInterval); // 停止任何已存在的interval
    current = nextIndex !== undefined ? nextIndex - 1 : -1; // 设置开始索引，允许从nextIndex - 1开始，使得triggerHover更新后从nextIndex开始
    hoverInterval = setInterval(triggerHover, 2000); // 设置interval
    triggerHover(); // 立即启动
  }

  function stopHoverEffect() {
    clearInterval(hoverInterval); // 停止动画循环
    hoverInterval = null;
    removeStyle(); // 清除当前元素的样式
  }

  Array.from(links).forEach(function (link, index) {
    link.addEventListener("mouseenter", stopHoverEffect);
    link.addEventListener("mouseleave", function () {
      startHoverEffect((index + 1) % links.length); // 鼠标离开后从下一个元素开始
    });
  });

  startHoverEffect(0); // 明确地从第一个元素开始
}
