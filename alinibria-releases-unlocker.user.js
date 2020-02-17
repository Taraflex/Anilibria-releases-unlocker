// ==UserScript==
// @name         Anilibria releases unlocker
// @version      0.0.1
// @description  Восстанавливает ссылки на скачивание торрентов на скрытых релизах anilibria.tv
// @namespace    taraflex
// @author       taraflex.red@gmail.com
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/Taraflex/Anilibria-releases-unlocker/master/alinibria-releases-unlocker.user.js
// @homepageURL  https://github.com/Taraflex/Anilibria-releases-unlocker
// @supportURL   https://github.com/Taraflex/Anilibria-releases-unlocker/issues
// @noframes
// @match        http://anilibria.tv/release/*
// @match        http://www.anilibria.tv/release/*
// @match        https://anilibria.tv/release/*
// @match        https://www.anilibria.tv/release/*
// ==/UserScript==

(function () {
    'use strict';

    function torrentRow(id, series, quality, d) {
        return `<tr id="torrentTableID${id}">
<td id="torrentTableInfo${id}" class="torrentcol1">Серия ${series} [${quality}]</td>
<td class="torrentcol2"> </td>
<td id="torrentTableDate${id}" class="torrentcol3">Добавлен ${d}</td>
<td class="torrentcol4"><img style="margin-bottom: 3px;" src="/img/other/5.png" alt="dl"> <a class="torrent-download-link" href="/upload/torrents/${id}.torrent" download>Cкачать</a></td>
</tr>`;
    }

    /**
     * @type {HTMLTableElement}
     */
    const editTable = document.getElementById('editTorrentTable');

    if (editTable && !document.getElementById('publicTorrentTable')) {
        document
            .querySelector('.news-block .clear:last-child')
            .insertAdjacentHTML('beforebegin', `<div class="download-torrent" style="margin-bottom: 10px;">
<table id="publicTorrentTable">
${Array.from(editTable.rows).map(r => {
                const id = r.id.match(/\d+$/i)[0];
                return torrentRow(
                    id,
                    r.querySelector('#torrentEditTableSeries' + id).value,
                    r.querySelector('#torrentEditTableQuality' + id).value,
                    r.querySelector('#torrentEditTableDate' + id).value
                );
            }).join('')}
</table>
</div>`);
    }
})();