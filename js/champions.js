'use strict';

(function () {
    window.onload = function () {
        cartodb.deepInsights.createDashboard('#dashboard', window.champions.vis);
    }
})();
