'use strict';

(function () {
    window.champions = window.champions || {};

    window.champions.vis = {
        "title": "Final Champions League 2016",
        "description": "Real Madrid vs. Atlético de Madrid. Powered by CartoDB.",
        "user": {
            "fullname": "Real Madrid",
            "avatar_url": "img/real_madrid.png"
        },
        "updated_at": "2016-05-23T11:50:30+00:00",
        "widgets": [
            {
                "type": "category",
                "title": "Jugadores",
                "layer_id": "e487cc62-45a0-4cbe-860c-2c6a14752755",
                "options": {
                    "type": "aggregation",
                    "column": "player",
                    "aggregation": "count",
                    "aggregationColumn": "cartodb_id",
                    "sync": true,
                },
            }
        ],
        "datasource": {
            "type": "public_map",
            "user_name": "realmadridweb",
            "maps_api_template": "https://{user}.cartodb.com",
            "stat_tag": "cadf276c-2122-11e6-ba6e-0e3ff518bd15",
        },
        "id": "8ecf42c6-ce29-11e5-83dc-0ea31932ec1d",
        "version": "0.1.0",
        "likes": 0,
        "scrollwheel": true,
        "legends": true,
        "url": null,
        "map_provider": "leaflet",
        "bounds":null,
        "center": "[15.199386048560008, 9.580078125]",
        "zoom": 3,
        "updated_at": "2016-05-23T13:40:50+00:00",
        "layers": [
            {
                "options": {
                    "visible": true,
                    "type": "Tiled",
                    "name": "Dark matter (lite)",
                    "className": "dark_matter_lite_rainbow",
                    "base_type": "default",
                    "urlTemplate": "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png",
                    "minZoom": "0",
                    "maxZoom": "18",
                    "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"http://cartodb.com/attributions\">CartoDB</a>",
                    "subdomains": "abcd",
                    "style": null,
                    "read_only": true,
                    "category": "CartoDB",
                    "order": 0,
                    "id": "90654225-5b6d-4be6-be89-1987a91fe824"
                },
                "infowindow": null,
                "tooltip": null,
                "id": "e326cfa4-5854-47eb-8e5a-9d6fd61b1c96",
                "order": 0,
                "type": "tiled"
            },
            {
                "id": "e487cc62-45a0-4cbe-860c-2c6a14752755",
                "type": "torque",
                "order": 2,
                "legend": null,
                "options": {
                    "stat_tag": "8ecf42c6-ce29-11e5-83dc-0ea31932ec1d",
                    "maps_api_template": "https://{user}.cartodb.com:443",
                    "sql_api_template": "https://{user}.cartodb.com:443",
                    "tiler_protocol": "http",
                    "tiler_domain": "cartodb.com",
                    "tiler_port": "80",
                    "sql_api_protocol": "http",
                    "sql_api_domain": "cartodb.com",
                    "sql_api_endpoint": "/api/v2/sql",
                    "sql_api_port": 80,
                    "layer_name": "final_champions_2016",
                    "cartocss": "/** torque_cat visualization */\n\nMap {\n-torque-frame-count:256;\n-torque-animation-duration:30;\n-torque-time-attribute:\"postedtime\";\n-torque-aggregation-function:\"CDB_Math_Mode(torque_category)\";\n-torque-resolution:2;\n-torque-data-aggregation:linear;\n}\n\n#final_champions_2016{\n  comp-op: source-over;\n  marker-fill-opacity: 0.9;\n  marker-line-color: #FFF;\n  marker-line-width: 0;\n  marker-line-opacity: 1;\n  marker-type: ellipse;\n  marker-width: 6;\n  marker-fill: #0F3B82;\n}\n#final_champions_2016[frame-offset=1] {\n marker-width:8;\n marker-fill-opacity:0.45; \n}\n#final_champions_2016[frame-offset=2] {\n marker-width:10;\n marker-fill-opacity:0.225; \n}#final_champions_2016[value=1] {\n   marker-fill: #FFFFFF;\n}\n#final_champions_2016[value=2] {\n   marker-fill: #FFFFFF;\n}#final_champions_2016[value=3] {\n   marker-fill: #B2DF8A;\n}\n#final_champions_2016[value=4] {\n   marker-fill: #33A02C;\n}\n#final_champions_2016[value=5] {\n   marker-fill: #FB9A99;\n}\n#final_champions_2016[value=6] {\n   marker-fill: #E31A1C;\n}\n#final_champions_2016[value=7] {\n   marker-fill: #FDBF6F;\n}\n#final_champions_2016[value=8] {\n   marker-fill: #FF7F00;\n}\n#final_champions_2016[value=9] {\n   marker-fill: #CAB2D6;\n}\n#final_champions_2016[value=10] {\n   marker-fill: #B2DF8A;\n}\n#final_champions_2016[value=11] {\n   marker-fill: #33A02C;\n}\n#final_champions_2016[value=13] {\n   marker-fill: #FB9A99;\n}\n#final_champions_2016[value=14] {\n   marker-fill: #E31A1C;\n}\n#final_champions_2016[value=15] {\n   marker-fill: #FDBF6F;\n}\n#final_champions_2016[value=16] {\n   marker-fill: #FF7F00;\n}\n#final_champions_2016[value=17] {\n   marker-fill: #CAB2D6;\n}\n#final_champions_2016[value=18] {\n   marker-fill: #B2DF8A;\n}\n#final_champions_2016[value=19] {\n   marker-fill: #33A02C;\n}\n#final_champions_2016[value=20] {\n   marker-fill: #FB9A99;\n}\n#final_champions_2016[value=21] {\n   marker-fill: #E31A1C;\n}\n#final_champions_2016[value=22] {\n   marker-fill: #FDBF6F;\n}\n#final_champions_2016[value=23] {\n   marker-fill: #FF7F00;\n}\n#final_champions_2016[value=24] {\n   marker-fill: #CAB2D6;\n}\n#final_champions_2016[value=25] {\n   marker-fill: #6A3D9A;\n}\n#final_champions_2016 {\n   marker-fill: #FFFFFF;\n}",
                    "sql": "select *, (CASE WHEN \"category_name\" = 3 THEN 'Zidane' WHEN \"category_name\" = 4 THEN 'Bale' WHEN \"category_name\" = 5 THEN 'Ramos' WHEN \"category_name\" = 6 THEN 'Cristiano' WHEN \"category_name\" = 7 THEN 'Navas' WHEN \"category_name\" = 8 THEN 'Pepe' WHEN \"category_name\" = 9 THEN 'Modric' WHEN \"category_name\" = 10 THEN 'Vázquez' WHEN \"category_name\" = 11 THEN 'Casemiro' WHEN \"category_name\" = 12 THEN 'James' WHEN \"category_name\" = 13 THEN 'Kroos' WHEN \"category_name\" = 14 THEN 'Benzema' WHEN \"category_name\" = 15 THEN 'Bale' WHEN \"category_name\" = 16 THEN 'Isco' WHEN \"category_name\" = 7 THEN 'Carvajal' WHEN \"category_name\" = 18 THEN 'Marcelo' WHEN \"category_name\" = 19 THEN 'Verane' WHEN \"category_name\" = 20 THEN 'Nacho' WHEN \"category_name\" = 21 THEN 'Casilla' WHEN \"category_name\" = 22 THEN 'Yáñez' WHEN \"category_name\" = 23 THEN 'Kovacic' WHEN \"category_name\" = 24 THEN 'Jesé' WHEN \"category_name\" = 25 THEN 'Arbeloa' ELSE NULL END) as player, (CASE WHEN \"category_name\" = 1 THEN 1 WHEN \"category_name\" = 2 THEN 2 WHEN \"category_name\" = 3 THEN 3 WHEN \"category_name\" = 4 THEN 4 WHEN \"category_name\" = 5 THEN 5 WHEN \"category_name\" = 6 THEN 6 WHEN \"category_name\" = 7 THEN 7 WHEN \"category_name\" = 8 THEN 8 WHEN \"category_name\" = 9 THEN 9 WHEN \"category_name\" = 10 THEN 10 WHEN \"category_name\" = 11 THEN 11 WHEN \"category_name\" = 13 THEN 13 WHEN \"category_name\" = 14 THEN 14 WHEN \"category_name\" = 15 THEN 15 WHEN \"category_name\" = 16 THEN 16 WHEN \"category_name\" = 17 THEN 17 WHEN \"category_name\" = 18 THEN 18 WHEN \"category_name\" = 19 THEN 19 WHEN \"category_name\" = 20 THEN 20 WHEN \"category_name\" = 21 THEN 21 WHEN \"category_name\" = 22 THEN 22 WHEN \"category_name\" = 23 THEN 23 WHEN \"category_name\" = 24 THEN 24 WHEN \"category_name\" = 25 THEN 25 ELSE NULL END) as torque_category FROM (SELECT * FROM final_champions_2016) _cdb_wrap",
                    "visible": true,
                    "table_name": "final_champions_2016",
                    "user_name": "realmadridweb",
                }
            }
        ],
        "overlays": [
            {
                "type": "search",
                "order": 3,
                "options": {
                    "display": true,
                    "x": 60,
                    "y": 20
                },
                "template": ""
            },
            {
                "type": "zoom",
                "order": 6,
                "options": {
                    "display": true,
                    "x": 20,
                    "y": 20
                },
                "template": '<div class="CDB-Overlay">' +
                    '<button class="CDB-Zoom-action CDB-Zoom-action--out js-zoomOut"></button>' +
                    '<button class="CDB-Zoom-action CDB-Zoom-action--in js-zoomIn"></button>' +
                    '</div>' +
                    '<div class="CDB-Zoom-info js-zoomInfo">-</div>'
            },
            {
                "type": "loader",
                "order": 8,
                "options": {
                    "display": true,
                    "x": 20,
                    "y": 150
                },
                "template": "<div class=\"loader\" original-title=\"\"></div>"
            },
            {
                "type": "logo",
                "order": 9,
                "options": {
                    "display": true,
                    "x": 10,
                    "y": 40
                },
                "template": ""
            }
        ],
        "prev": null,
        "next": null,
        "transition_options": {
            "time": 0
        }
    }
})();
