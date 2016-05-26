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
                "type": "formula",
                "title": "Total conversación",
                "layer_id": "e487cc62-45a0-4cbe-860c-2c6a14752755",
                "operation": "count",
                "column": "cartodb_id"
            },
            {
                "type": "category",
                "title": "Jugadores",
                "layer_id": "e487cc62-45a0-4cbe-860c-2c6a14752755",
                "options": {
                    "type": "aggregation",
                    "column": "jugador",
                    "aggregation": "count",
                    "aggregationColumn": "cartodb_id",
                    "sync": true,
                },
            },
            {
                "layer_id": "e487cc62-45a0-4cbe-860c-2c6a14752755",
                "type": "time-series",
                "columnType": "number",
                "column": "postedtime",
                "options": {
                    "bins": 256,
                    "start": 1464134400,
                    "end": new Date() / 1000
                }
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
                    "type": "Plain",
                    "base_type": "plain",
                    "className": "plain",
                    "color": "#1b2432",
                    "image": "",
                    "maxZoom": 32,
                    "id": "37d1339b-9ea6-425f-88d2-094e8fea7c8a",
                    "order": 0
                },
                "infowindow": null,
                "tooltip": null,
                "id": "37d1339b-9ea6-425f-88d2-094e8fea7c8a",
                "order": 0,
                "type": "background"
            },
            {
                "id": "d5652493-af1c-4b5f-9626-2712137a0fa0",
                "type": "CartoDB",
                "infowindow": {
                    "fields": [],
                    "template_name": "table/views/infowindow_light",
                    "template": "<div class=\"CDB-infowindow CDB-infowindow--light js-infowindow\">\n  <div class=\"CDB-infowindow-container\">\n    <div class=\"CDB-infowindow-bg\">\n      <div class=\"CDB-infowindow-inner\">\n        <ul class=\"CDB-infowindow-list js-content\">\n          {{#loading}}\n            <div class=\"CDB-Loader js-loader is-visible\"></div>\n          {{/loading}}\n          {{#content.fields}}\n          <li class=\"CDB-infowindow-listItem\">\n            {{#title}}<h5 class=\"CDB-infowindow-subtitle\">{{title}}</h5>{{/title}}\n            {{#value}}<h4 class=\"CDB-infowindow-title\">{{{ value }}}</h4>{{/value}}\n            {{^value}}<h4 class=\"CDB-infowindow-title\">null</h4>{{/value}}\n          </li>\n          {{/content.fields}}\n        </ul>\n      </div>\n    </div>\n    <div class=\"CDB-hook\">\n      <div class=\"CDB-hook-inner\"></div>\n    </div>\n  </div>\n</div>\n",
                    "alternative_names": {},
                    "width": 226,
                    "maxHeight": 180
                },
                "tooltip": {
                    "fields": [],
                    "template_name": "tooltip_light",
                    "template": "<div class=\"CDB-Tooltip CDB-Tooltip--isLight\">\n  <ul class=\"CDB-Tooltip-list\">\n    {{#fields}}\n      <li class=\"CDB-Tooltip-listItem\">\n        {{#title}}\n          <h3 class=\"CDB-Tooltip-listTitle\">{{{ title }}}</h3>\n        {{/title}}\n        <h4 class=\"CDB-Tooltip-listText\">{{{ value }}}</h4>\n      </li>\n    {{/fields}}\n  </ul>\n</div>\n",
                    "alternative_names": {},
                    "maxHeight": 180
                },
                "legend": {
                    "type": "none",
                    "show_title": false,
                    "title": "",
                    "template": "",
                    "visible": true
                },
                "order": 1,
                "visible": true,
                "options": {
                    "layer_name": "ne_10m_admin_0_countries_1",
                    "cartocss": "/** simple visualization */\n\n#ne_10m_admin_0_countries_1{\n  polygon-fill: #000000;\n  polygon-opacity: 0.35;\n  line-color: #1b2432;\n  line-width: 1;\n  line-opacity: 1;\n}",
                    "cartocss_version": "2.1.1",
                    "interactivity": "cartodb_id",
                    "sql": "select * from ne_10m_admin_0_countries_1"
                }
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
                    "cartocss": '@category1:#FFFFFF;@category2:#FFFFFF;@category3:#229A00;@category4:#F11810;@category9:#3E7BB6;@category5:#FFCC00;@category6:#F84F40;@category7:#643173;@category8:#fffd98;@category10:#89ce94;@category11:#9fb4c7;@category12:#f0b7b3;@category13:#8c271e;Map{-torque-frame-count:195;-torque-animation-duration:30;-torque-time-attribute:"postedtime";-torque-aggregation-function:"CDB_Math_Mode(category_name)";-torque-resolution:2;-torque-data-aggregation:linear;}#final_champions_2016{comp-op:overlay;marker-fill-opacity:0.7;marker-line-color:#FFF;marker-line-width:0;marker-line-opacity:1;marker-type:ellipse;marker-width:2;[value=1]{marker-fill:@category1;}[value=2]{marker-fill:@category2;}[value=3]{marker-fill:@category3;}[value=4]{marker-fill:@category4;}[value=5]{marker-fill:@category5;}[value=6]{marker-fill:@category6;}[value=7]{marker-fill:@category7;}[value=8]{marker-fill:@category8;}[value=9]{marker-fill:@category9;}[value=10]{marker-fill:@category10;}[value=11]{marker-fill:@category11;}[value=12]{marker-fill:@category12;}[value=13]{marker-fill:@category13;}}#final_champions_2016[frame-offset=1]{marker-width:4;marker-fill-opacity:0.2;}#final_champions_2016[frame-offset=2]{marker-width:6;marker-fill-opacity:0.1;}#final_champions_2016[frame-offset=3]{marker-width:12;marker-fill-opacity:0.05;}#final_champions_2016[frame-offset=4]{marker-width:14;marker-fill-opacity:0.04;}#final_champions_2016[frame-offset=5]{marker-width:16;marker-fill-opacity:0.03;}#final_champions_2016[frame-offset=6]{marker-width:18;marker-fill-opacity:0.02;}',
                    "sql": "select *, (CASE WHEN \"category_name\" = 3 THEN 'Cristiano' WHEN \"category_name\" = 4 THEN 'Bale' WHEN \"category_name\" = 5 THEN 'James' WHEN \"category_name\" = 6 THEN 'Ramos' WHEN \"category_name\" = 7 THEN 'Navas' WHEN \"category_name\" = 8 THEN 'Marcelo' WHEN \"category_name\" = 9 THEN 'Benzema' WHEN \"category_name\" = 10 THEN 'Pepe' WHEN \"category_name\" = 11 THEN 'Modric' WHEN \"category_name\" = 12 THEN 'Kroos' WHEN \"category_name\" = 13 THEN 'Otros' END) as jugador, (CASE WHEN \"category_name\" = 1 THEN 1 WHEN \"category_name\" = 2 THEN 2 WHEN \"category_name\" = 3 THEN 3 WHEN \"category_name\" = 4 THEN 4 WHEN \"category_name\" = 5 THEN 5 WHEN \"category_name\" = 6 THEN 6 WHEN \"category_name\" = 7 THEN 7 WHEN \"category_name\" = 8 THEN 8 WHEN \"category_name\" = 9 THEN 9 WHEN \"category_name\" = 10 THEN 10 WHEN \"category_name\" = 11 THEN 11 WHEN \"category_name\" = 12 THEN 12 WHEN \"category_name\" = 13 THEN 13 END) as torque_category FROM (SELECT * FROM final_champions_2016) _cdb_wrap",
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
