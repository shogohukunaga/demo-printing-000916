(() => {
  const replacements = [
    ['© IROHA PRINT — FICTIONAL DESIGN SAMPLE', '© NUVO PRINT — FICTIONAL DESIGN SAMPLE'],
    ['About Iroha Print', 'About Nuvo Print'],
    ['彩葉印刷', 'ニューヴォ・プリント'],
    ['彩葉について', 'NUVOについて'],
    ['彩葉の取り組み', 'NUVOの取り組み'],
    ['彩葉からのお知らせ。', 'NUVOからのお知らせ。'],
    ['iroha', 'nuvo'],
    ['印刷製品を見る', '加工メニューを見る'],
    ['製品紹介', '加工メニュー'],
    ['印刷の読みもの', 'ものづくりノート'],
    ['ラベル・シール', 'シルクスクリーン'],
    ['冊子・パンフレット', '刺繍・ワッペン'],
    ['パッケージ', 'ノベルティ・ウェア'],
    ['色も質感も\n多彩な用紙', '色も質感も\n多彩な素材'],
    ['企画から用紙選び、印刷、仕上げまで。', '企画から素材選び、プリント、刺繍、仕上げまで。'],
    ['ラベル、冊子、パッケージ。', 'ウェア、ワッペン、ノベルティ。'],
    ['紙の手ざわり、色の重なり、仕上がりのかたち。', '生地の手ざわり、糸と色の重なり、仕上がりのかたち。'],
    ['小さなラベルから、ブランドを包むパッケージまで。', '一枚のウェアから、チームで使うノベルティまで。'],
    ['製品の種類や制作の流れを、', '加工方法や制作の流れを、'],
    ['同じ色でも、紙が変わると印象が変わる。', '同じ色でも、素材が変わると印象が変わる。'],
    ['紙が変わると、\n印象が変わる。', '素材が変わると、\n印象が変わる。']
  ];
  const replace = value => replacements.reduce((text, [from, to]) => text.split(from).join(to), value);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) node.nodeValue = replace(node.nodeValue);
  document.querySelectorAll('[aria-label],[alt],[title]').forEach(el => {
    for (const attr of ['aria-label', 'alt', 'title']) if (el.hasAttribute(attr)) el.setAttribute(attr, replace(el.getAttribute(attr)));
  });
})();
