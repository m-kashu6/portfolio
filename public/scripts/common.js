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


/**
 * スクロールでフェードイン
 * @function
 */
window.addEventListener('load', () => {
    'use strict';

    function scrollAddClass(
        targetElm, //ターゲット要素
        activeClass, //付与するクラス
        optionRootMargin, //optionのrootMargin
        optionThreshold //optionのthreshold
    ) {
        const targets = document.querySelectorAll(targetElm);

        // Intersection Observerのオプション
        const options = {
            rootMargin: optionRootMargin,
            threshold: optionThreshold
        };

        // Intersection Observerのインスタンス生成
        const observer = new IntersectionObserver(callback, options);

        // callback
        function callback(entries) {
            entries.forEach((entry, index) => {
                const target = entry.target;
                const delay = index * 100;

                if (entry.isIntersecting) {
                    setTimeout(() => {
                        target.classList.add(activeClass);
                        observer.unobserve(target); //対象要素の監視を停止
                    }, delay);
                }
            });
        }

        // 対象を監視
        for (const target of targets) {
            observer.observe(target);
        }
    }

    // 例：対象要素が画面下から20%の位置に到達したらクラス付与
    scrollAddClass('.js-fadein', 'is-active', '0px 0px -20%', 0); //フェードイン
    scrollAddClass('.js-fadein-up', 'is-active', '0px 0px -20%', 0); //フェードインアップ
    scrollAddClass('.js-slidein-to-left', 'is-active', '0px 0px -20%', 0); //左にスライドイン
    scrollAddClass('.js-slidein-to-right', 'is-active', '0px 0px -20%', 0); //右にスライドイン
});


/* ---------------------------------------------
*   フェードイン
--------------------------------------------- */
window.addEventListener('load', () => {
    'use strict';

    function scrollAddClass(
        targetElm, // ターゲット要素
        activeClass, // 付与するクラス
        optionRootMargin, // optionのrootMargin
        optionThreshold, // optionのthreshold
        delayBase = 0 // 遅延間隔（デフォルト300ms）
    ) {
        const targets = document.querySelectorAll(targetElm);

        // Intersection Observerのオプション
        const options = {
            rootMargin: optionRootMargin,
            threshold: optionThreshold
        };

        // Intersection Observerのインスタンス生成
        const observer = new IntersectionObserver(callback, options);

        // callback
        function callback(entries) {
            entries.forEach((entry) => {
                const target = entry.target;

                if (entry.isIntersecting) {
                    // 同じ位置に複数の要素がある場合でも、順番に表示
                    const siblings = [...targets]; // すべてのターゲットを配列化
                    const index = siblings.indexOf(target); // 現在の要素のインデックス
                    const delay = index * delayBase; // 遅延をインデックスに基づいて計算

                    setTimeout(() => {
                        target.classList.add(activeClass);
                        observer.unobserve(target); // 対象要素の監視を停止
                    }, delay);
                }
            });
        }

        // 対象を監視
        targets.forEach((target) => {
            observer.observe(target);
        });
    }
    
    scrollAddClass('.js-blur-spot', 'is-active', '0px 0px -20%', 0); //ぼかしanime
});