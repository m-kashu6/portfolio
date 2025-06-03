/**
 * スムーススクロールを初期化し、指定されたトリガー要素がクリックされたときにスクロールを実行します。
 * @function
 * @name initSmoothScroll
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const trigger = document.querySelectorAll('a[href^="#"]'); //トリガー要素

    for (let i = 0; i < trigger.length; i++) {
        trigger[i].addEventListener('click', function (e) {
            e.preventDefault();

            const href = this.getAttribute('href'); // href値
            let scrollPos; //スムーススクロールする位置

            if (href === '#') {
                scrollPos = 0;
            } else {
                const target = document.getElementById(href.replace('#', '')); // ターゲット要素
                if (target == null) return;
                const targetY = target.getBoundingClientRect().top, // ターゲット要素の垂直位置
                    currentY = window.pageYOffset; // スクロール量

                scrollPos = targetY + currentY;
            }

            window.scrollTo({
                top: scrollPos,
                behavior: 'smooth'
            });
        });
    }
});


// 自動ハイライトを有効にする
document.addEventListener("DOMContentLoaded", function () {
Prism.highlightAll();
});